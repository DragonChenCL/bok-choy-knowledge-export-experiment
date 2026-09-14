import { WaffoPancake, verifyWebhook } from "@waffo/pancake-ts";

interface Env {
  PAYMENT_DB: D1Database;
  WAFFO_MERCHANT_ID: string;
  WAFFO_PRIVATE_KEY: string;
  WAFFO_ENV: "test" | "prod";
  BAO_NEXT_BATCH_PRODUCT_ID: string;
  BAO_SUCCESS_URL: string;
  ALLOWED_ORIGINS: string;
}

type CheckoutRequest = {
  app: string;
  sku: string;
  referenceId: string;
  buyerEmail?: string;
};

type ProductConfig = {
  productId: string;
  currency: string;
  successUrl: string;
};

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), request, env);

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return withCors(json({ ok: true, service: "payment-gateway", environment: env.WAFFO_ENV }), request, env);
      }

      if (request.method === "POST" && url.pathname === "/checkout") {
        assertAllowedOrigin(request, env);
        const response = await createCheckout(request, env);
        return withCors(response, request, env);
      }

      if (request.method === "POST" && url.pathname === "/webhook/waffo") {
        return handleWaffoWebhook(request, env, ctx);
      }

      const paymentMatch = url.pathname.match(/^\/payment\/([^/]+)$/);
      if (request.method === "GET" && paymentMatch) {
        assertAllowedOrigin(request, env);
        const response = await getPayment(decodeURIComponent(paymentMatch[1]), env);
        return withCors(response, request, env);
      }

      if (request.method === "GET" && url.pathname === "/entitlement") {
        assertAllowedOrigin(request, env);
        const response = await getEntitlement(request, env);
        return withCors(response, request, env);
      }

      return withCors(json({ error: "not_found" }, 404), request, env);
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown_error";
      const status = message === "origin_not_allowed" ? 403 : message === "invalid_request" ? 400 : 500;
      console.error("payment-gateway error", error);
      return withCors(json({ error: message }, status), request, env);
    }
  },
};

async function createCheckout(request: Request, env: Env): Promise<Response> {
  const body = (await request.json().catch(() => null)) as CheckoutRequest | null;
  if (!body || !isSafeId(body.app, 64) || !isSafeId(body.sku, 64) || !isSafeId(body.referenceId, 128)) {
    throw new Error("invalid_request");
  }
  if (body.buyerEmail && !isEmail(body.buyerEmail)) throw new Error("invalid_request");

  const product = resolveProduct(body.app, body.sku, env);
  if (!product) return json({ error: "unknown_product" }, 404);

  const gatewayOrderId = `PG_${crypto.randomUUID().replaceAll("-", "")}`;
  const entitlementToken = randomToken(32);
  const entitlementTokenHash = await sha256Hex(entitlementToken);
  const now = new Date().toISOString();

  await env.PAYMENT_DB.prepare(
    `INSERT INTO orders (
      gateway_order_id, provider, environment, app, sku, reference_id, product_id,
      currency, status, buyer_email, entitlement_token_hash, created_at, updated_at
    ) VALUES (?, 'waffo', ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`
  )
    .bind(
      gatewayOrderId,
      env.WAFFO_ENV,
      body.app,
      body.sku,
      body.referenceId,
      product.productId,
      product.currency,
      body.buyerEmail ?? null,
      entitlementTokenHash,
      now,
      now,
    )
    .run();

  const successUrl = new URL(product.successUrl);
  successUrl.searchParams.set("payment", gatewayOrderId);

  try {
    const client = new WaffoPancake({
      merchantId: env.WAFFO_MERCHANT_ID,
      privateKey: env.WAFFO_PRIVATE_KEY,
      fetch: globalThis.fetch.bind(globalThis),
    });

    // Price is intentionally NOT accepted from the browser. The Waffo product owns the price.
    const result = await client.checkout.anonymous.create({
      productId: product.productId,
      currency: product.currency,
      buyerEmail: body.buyerEmail,
      successUrl: successUrl.toString(),
      orderMerchantExternalId: gatewayOrderId,
      metadata: {
        app: body.app,
        sku: body.sku,
        referenceId: body.referenceId,
        gatewayOrderId,
      },
    });

    await env.PAYMENT_DB.prepare(
      `UPDATE orders
       SET provider_checkout_session_id = ?, status = 'checkout_created', updated_at = ?
       WHERE gateway_order_id = ?`
    )
      .bind(result.sessionId, new Date().toISOString(), gatewayOrderId)
      .run();

    return json({
      gatewayOrderId,
      checkoutSessionId: result.sessionId,
      checkoutUrl: result.checkoutUrl,
      expiresAt: result.expiresAt,
      accessToken: entitlementToken,
    });
  } catch (error) {
    await env.PAYMENT_DB.prepare(
      `UPDATE orders SET status = 'checkout_failed', updated_at = ? WHERE gateway_order_id = ?`
    )
      .bind(new Date().toISOString(), gatewayOrderId)
      .run();
    throw error;
  }
}

async function handleWaffoWebhook(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const rawBody = await request.text();
  const signature = request.headers.get("x-waffo-signature");

  let event: any;
  try {
    event = verifyWebhook(rawBody, signature, { environment: env.WAFFO_ENV });
  } catch (error) {
    console.warn("Invalid Waffo webhook signature", error);
    return new Response("Invalid signature", { status: 401 });
  }

  // Acknowledge quickly, then persist/process with waitUntil.
  ctx.waitUntil(processWaffoEvent(event, rawBody, env));
  return new Response("OK", { status: 200 });
}

async function processWaffoEvent(event: any, rawBody: string, env: Env): Promise<void> {
  const eventId = String(event?.id ?? "");
  const eventType = String(event?.eventType ?? "");
  if (!eventId || !eventType) return;

  const existing = await env.PAYMENT_DB.prepare("SELECT event_id FROM webhook_events WHERE event_id = ?")
    .bind(eventId)
    .first();
  if (existing) return;

  const data = event?.data ?? {};
  const gatewayOrderId = typeof data.orderMerchantExternalId === "string" ? data.orderMerchantExternalId : null;
  const now = new Date().toISOString();

  if (gatewayOrderId && eventType === "order.completed") {
    await env.PAYMENT_DB.prepare(
      `UPDATE orders SET
        provider_order_id = ?, amount_total = ?, currency = COALESCE(?, currency), buyer_email = COALESCE(?, buyer_email),
        status = 'paid', paid_at = COALESCE(paid_at, ?), updated_at = ?
       WHERE gateway_order_id = ?`
    )
      .bind(
        nullableString(data.orderId),
        nullableString(data.total),
        nullableString(data.currency),
        nullableString(data.buyerEmail),
        now,
        now,
        gatewayOrderId,
      )
      .run();
  }

  if (gatewayOrderId && eventType === "refund.succeeded") {
    await env.PAYMENT_DB.prepare(
      `UPDATE orders SET status = 'refunded', refunded_at = ?, updated_at = ? WHERE gateway_order_id = ?`
    )
      .bind(now, now, gatewayOrderId)
      .run();
  }

  await env.PAYMENT_DB.prepare(
    `INSERT OR IGNORE INTO webhook_events (event_id, event_type, gateway_order_id, payload, received_at)
     VALUES (?, ?, ?, ?, ?)`
  )
    .bind(eventId, eventType, gatewayOrderId, rawBody, now)
    .run();
}

async function getPayment(gatewayOrderId: string, env: Env): Promise<Response> {
  if (!isSafeId(gatewayOrderId, 96)) return json({ error: "invalid_payment_id" }, 400);

  const row = await env.PAYMENT_DB.prepare(
    `SELECT gateway_order_id, provider_order_id, app, sku, reference_id, currency, amount_total,
            status, created_at, paid_at, refunded_at
     FROM orders WHERE gateway_order_id = ?`
  )
    .bind(gatewayOrderId)
    .first<Record<string, unknown>>();

  if (!row) return json({ error: "payment_not_found" }, 404);

  return json({
    gatewayOrderId: row.gateway_order_id,
    providerOrderId: row.provider_order_id,
    app: row.app,
    sku: row.sku,
    referenceId: row.reference_id,
    currency: row.currency,
    amount: row.amount_total,
    status: row.status,
    paid: row.status === "paid",
    createdAt: row.created_at,
    paidAt: row.paid_at,
    refundedAt: row.refunded_at,
  });
}

async function getEntitlement(request: Request, env: Env): Promise<Response> {
  const auth = request.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return json({ error: "missing_access_token" }, 401);
  const token = auth.slice(7).trim();
  if (token.length < 32 || token.length > 256) return json({ error: "invalid_access_token" }, 401);

  const hash = await sha256Hex(token);
  const row = await env.PAYMENT_DB.prepare(
    `SELECT gateway_order_id, provider_order_id, app, sku, reference_id, status, paid_at
     FROM orders WHERE entitlement_token_hash = ?`
  )
    .bind(hash)
    .first<Record<string, unknown>>();

  if (!row) return json({ error: "invalid_access_token" }, 401);

  return json({
    granted: row.status === "paid",
    status: row.status,
    gatewayOrderId: row.gateway_order_id,
    providerOrderId: row.provider_order_id,
    app: row.app,
    sku: row.sku,
    referenceId: row.reference_id,
    paidAt: row.paid_at,
  });
}

function resolveProduct(app: string, sku: string, env: Env): ProductConfig | null {
  if (app === "bao-rescue" && sku === "next-batch-fix") {
    return {
      productId: env.BAO_NEXT_BATCH_PRODUCT_ID,
      currency: "USD",
      successUrl: env.BAO_SUCCESS_URL,
    };
  }
  return null;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function allowedOrigins(env: Env): Set<string> {
  return new Set(
    (env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
  );
}

function assertAllowedOrigin(request: Request, env: Env): void {
  const origin = request.headers.get("origin");
  if (!origin) return; // permits curl/server-to-server tests; browser CORS still limits untrusted sites.
  if (!allowedOrigins(env).has(origin)) throw new Error("origin_not_allowed");
}

function withCors(response: Response, request: Request, env: Env): Response {
  const origin = request.headers.get("origin");
  const headers = new Headers(response.headers);
  if (origin && allowedOrigins(env).has(origin)) {
    headers.set("access-control-allow-origin", origin);
    headers.set("vary", "Origin");
    headers.set("access-control-allow-methods", "GET,POST,OPTIONS");
    headers.set("access-control-allow-headers", "Content-Type,Authorization");
    headers.set("access-control-max-age", "86400");
  }
  headers.set("x-content-type-options", "nosniff");
  headers.set("cache-control", "no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function isSafeId(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength && /^[A-Za-z0-9._:-]+$/.test(value);
}

function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function nullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  return String(value);
}

function randomToken(bytes: number): string {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  let binary = "";
  for (const byte of data) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
