# Payment Gateway

Reusable Cloudflare Worker payment gateway. The first provider is Waffo Pancake; Bao Rescue is the first product integration.

## What it does

- `POST /checkout` — creates a hosted Waffo checkout session from an internal `app + sku` catalog mapping.
- `POST /webhook/waffo` — verifies Waffo RSA webhook signatures and updates D1 order state.
- `GET /payment/:gatewayOrderId` — returns non-sensitive payment status.
- `GET /entitlement` — verifies a random bearer token and returns the purchased entitlement only after payment succeeds.
- Refund success revokes the entitlement by moving the order to `refunded`.

The browser never supplies the price. Price and tax configuration stay in the Waffo product.

## Product catalog

Products are configured through the Worker environment variable `PRODUCT_CATALOG`. The gateway code does not contain per-product branches.

Current production catalog:

```json
{
  "bao-rescue:next-batch-fix": {
    "productId": "PROD_2b2TqUlq9zqplZinQZVRjD",
    "currency": "USD",
    "successUrl": "https://bao.serunio.com/payment-success/"
  },
  "coopcheck:permit-report": {
    "productId": "PROD_3bUkTKRP0CwDVB1skadqe4",
    "currency": "USD",
    "successUrl": "https://coopcheck.serunio.com/payment-success/"
  }
}
```

Also configure `ALLOWED_ORIGINS` in the Worker, for example:

```text
https://bao.serunio.com,https://coopcheck.serunio.com
```

`wrangler.jsonc` uses `keep_vars: true`, so dashboard-managed variables are preserved when deploying with Wrangler.

## 1. Install

```bash
cd payment-gateway
npm install
```

## 2. Create D1

Login once if needed:

```bash
npx wrangler login
```

Create the database:

```bash
npx wrangler d1 create payment-gateway-db
```

Copy the returned `database_id` into `wrangler.jsonc`, replacing:

```text
REPLACE_WITH_D1_DATABASE_ID
```

Apply migrations:

```bash
npm run d1:migrate:remote
```

For local development:

```bash
npm run d1:migrate:local
```

## 3. Add the Waffo private key as a Cloudflare Secret

Rotate the test private key if it has ever been pasted into chat, logs, tickets, or source control. Use the newly generated key here.

```bash
npx wrangler secret put WAFFO_PRIVATE_KEY
```

Paste the new Waffo private key when prompted. Do **not** add it to `wrangler.jsonc`, `.dev.vars.example`, GitHub, or Bao frontend code.

For local development only, copy `.dev.vars.example` to `.dev.vars` and put the test private key there.

## 4. Deploy the Worker

```bash
npm run deploy
```

Wrangler will return a URL similar to:

```text
https://payment-gateway.<your-subdomain>.workers.dev
```

Health check:

```bash
curl https://payment-gateway.<your-subdomain>.workers.dev/health
```

Expected response:

```json
{"ok":true,"service":"payment-gateway","environment":"test"}
```

## 5. Configure the Waffo test webhook

In Waffo Pancake, add an HTTP webhook for the Bao store:

```text
https://payment-gateway.<your-subdomain>.workers.dev/webhook/waffo
```

Use **test mode** and subscribe at minimum to:

- `order.completed`
- `refund.succeeded`

The Worker verifies `X-Waffo-Signature` using Waffo's official SDK and its embedded test/prod public keys.

## 6. Smoke-test checkout

```bash
curl -X POST \
  https://payment-gateway.<your-subdomain>.workers.dev/checkout \
  -H 'Content-Type: application/json' \
  -d '{
    "app":"bao-rescue",
    "sku":"next-batch-fix",
    "referenceId":"diag_test_001"
  }'
```

Response shape:

```json
{
  "gatewayOrderId": "PG_...",
  "checkoutSessionId": "...",
  "checkoutUrl": "https://pancake.waffo.ai/...",
  "expiresAt": "...",
  "accessToken": "..."
}
```

Keep `accessToken` in browser storage. Do not put it in a public URL. Open `checkoutUrl` and complete a Waffo sandbox payment.

After Waffo delivers `order.completed`, check status:

```bash
curl https://payment-gateway.<your-subdomain>.workers.dev/payment/PG_xxx
```

Then verify the entitlement:

```bash
curl https://payment-gateway.<your-subdomain>.workers.dev/entitlement \
  -H 'Authorization: Bearer <accessToken>'
```

Successful paid entitlement:

```json
{
  "granted": true,
  "status": "paid",
  "app": "bao-rescue",
  "sku": "next-batch-fix",
  "referenceId": "diag_test_001"
}
```

## 7. Bao frontend integration

The Bao result flow should be:

1. Generate/persist a random diagnosis id, e.g. `diag_<uuid>`.
2. Call `POST /checkout` with `app=bao-rescue`, `sku=next-batch-fix`, `referenceId=<diagnosis id>`.
3. Store `accessToken` in `localStorage` keyed by `gatewayOrderId`.
4. Open the returned Waffo `checkoutUrl` in a new tab.
5. Waffo redirects to `https://bao.serunio.com/payment-success/?payment=PG_xxx`.
6. The success page reads `payment`, retrieves the corresponding access token from `localStorage`, and calls `/entitlement` with `Authorization: Bearer ...`.
7. Only when `granted === true` should Bao fetch/render the paid Next-Batch Fix.

This is safer than treating a Waffo order number as the password: knowing an order id alone does not grant access.

## Adding another product later

No code change is required.

Create the product in Waffo, then add one entry to the Worker `PRODUCT_CATALOG` variable:

```json
{
  "bead-studio:pro-export": {
    "productId": "PROD_xxx",
    "currency": "USD",
    "successUrl": "https://bead.example.com/payment-success/"
  }
}
```

If the new project uses a new domain, also append that origin to `ALLOWED_ORIGINS`.

## Production checklist

Before switching from test to production:

- Create/publish the production Waffo product/version.
- Generate a production Waffo API/private key and store it only as a Worker Secret.
- Change `WAFFO_ENV` to `prod`.
- Change product IDs to production IDs if Waffo supplies different versions/IDs.
- Create a **production** Waffo webhook for `/webhook/waffo`.
- Bind a custom Worker domain such as `pay.qizhongai.com`.
- Restrict `ALLOWED_ORIGINS` to production sites only.
- Add rate limiting / Turnstile if checkout abuse becomes measurable.
- Test checkout, webhook, entitlement, refund, and retry/idempotency end-to-end before accepting real buyers.

## Security notes

- Never expose `WAFFO_PRIVATE_KEY` to a browser.
- Never accept `amount`, `price`, or arbitrary `productId` from the browser.
- Webhooks use the **raw body** for signature verification.
- `webhook_events.event_id` is stored for idempotent delivery handling.
- Entitlement tokens are stored only as SHA-256 hashes in D1.
- Public `/payment/:id` status is intentionally non-sensitive; actual paid entitlement requires the random bearer token.
