# EXP-003 Static Site Deployment Notes

This directory contains the minimum public site for the Bao Rescue commercial test.

## Before deployment
Replace every occurrence of:

- `REPLACE_WITH_REAL_CHECKOUT_URL`
- `REPLACE_WITH_DOMAIN`

with the real checkout URL and final public domain.

Do **not** deploy while the fake checkout placeholder remains.

## Pages
- `/` — product landing page
- `/why-do-steamed-buns-wrinkle/` — exact failure-intent SEO page
- `/bao-buns-collapse-after-steaming/` — exact failure-intent SEO page
- `/why-are-bao-buns-not-fluffy/` — exact failure-intent SEO page

## Initial SEO rules
1. Deploy as static HTML that Google can read without client-side rendering.
2. Use HTTPS.
3. Replace canonical placeholders with the final domain.
4. Submit `/sitemap.xml` in Google Search Console after deployment.
5. Request indexing for the home page and the three initial failure pages.
6. Do not publish 30 more AI pages before these first pages generate impressions / query data.
7. Expand from Search Console queries and repeated user questions, not from keyword brainstorming alone.

## Commercial measurement
Track, if the deployment platform allows it:
- landing-page visits;
- SEO-page visits;
- CTA clicks;
- checkout starts;
- purchases;
- which page / source produced the purchase.

The first meaningful milestone remains **one purchase from a stranger**.
