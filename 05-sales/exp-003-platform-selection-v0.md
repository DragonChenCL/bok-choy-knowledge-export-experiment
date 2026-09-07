# EXP-003 — Launch Platform Selection v0

Date: 2026-09-07
Status: evidence-based operating decision

## Goal
Choose a realistic checkout / delivery path for the first commercial test of Bao Rescue.

The platform decision is not about building a permanent commerce stack. It is about minimizing friction for the first stranger purchase.

## Etsy

### Positive signals
- Strong marketplace for printables / digital guides.
- Useful for competitor, pricing, listing-image, and demand research.
- Current official seller fees include a $0.20 listing fee and a 6.5% transaction fee, plus country-specific payment-processing fees.

### Critical operational constraint
Etsy's current official Payments eligibility page states that **new shops cannot open in China at this time**. Existing China-based Etsy shops may continue to use Etsy Payments, but a new China-based shop cannot currently be opened.

Sources:
- https://help.etsy.com/hc/en-us/articles/115015710408-Countries-Eligible-for-Etsy-Payments
- https://help.etsy.com/hc/en-us/articles/16999319005207-How-Do-I-Use-a-Payoneer-Account-With-Etsy-Payments
- https://help.etsy.com/hc/en-us/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy

### Decision
Use Etsy primarily for **market / competitor evidence** unless the operator already has an eligible existing shop or a legitimate supported setup.

Do not build EXP-003 around an Etsy launch assumption.

---

## Gumroad

### Positive signals
- Purpose-built for digital products and file delivery.
- No monthly fee.
- Current direct-sale fee: 10% + $0.50, excluding underlying card processing / PayPal fees.
- Gumroad currently acts as Merchant of Record and handles applicable sales-tax collection and remittance for digital products.
- Gumroad states that sellers in countries without supported direct bank payouts can be paid via PayPal, assuming PayPal payouts are available to them.

Sources:
- https://gumroad.com/help/article/66-gumroads-fees
- https://gumroad.com/pricing
- https://gumroad.com/help/article/121-sales-tax-on-gumroad
- https://gumroad.com/help/article/13-getting-paid.html
- https://gumroad.com/help/article/64-is-gumroad-for-me

### Cost implication at the $6.90 test price
Ignoring country/payment-method-specific processor fees, Gumroad platform fee alone is approximately:

`$6.90 × 10% + $0.50 = $1.19`

Remaining before processor fees: approximately **$5.71**.

This is acceptable for the first validation because the objective is not margin optimization; it is willingness-to-pay validation.

### Important operating caveat
Actual payout eligibility still depends on the operator's legitimate country, identity, bank / PayPal support, and Gumroad verification requirements. No false country / identity setup is allowed.

### Decision
**Preferred first checkout candidate: Gumroad**, subject to successful legitimate payout setup.

---

## Why not build our own checkout first
A custom checkout would introduce:
- payment integration work;
- tax handling complexity;
- file delivery / fraud / refund handling;
- additional failure modes unrelated to the core hypothesis.

These are distractions before the first stranger payment.

## Current launch architecture

`SEO / Pinterest / community answer`
→ `Bao Rescue landing page`
→ `real Gumroad checkout`
→ `instant PDF delivery`

## Revisit trigger
Re-evaluate platform only after one of these occurs:
- payout setup cannot be completed legitimately;
- first 10+ sales show fees materially harm the economics;
- marketplace discovery becomes important enough to justify a different channel;
- a broader knowledge-product portfolio makes a custom storefront economically sensible.
