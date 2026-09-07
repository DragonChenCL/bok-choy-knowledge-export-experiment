# Action Log — EXP-003 Public Site Preparation

Date: 2026-09-07

## Why this action was taken
The product now exists as a real deliverable, but a commercial test also needs acquisition pages that match the user's problem state.

Research repeatedly showed three dominant failure-intent families:
1. wrinkled / rough steamed buns;
2. collapse / deflation after steaming;
3. dense / not-fluffy texture.

These are closer to purchase intent than the broad head term `bao buns` because the searcher already has a failed batch and wants an explanation.

## Action
A deployable static site was created under `site/`.

Files:
- `site/index.html`
- `site/assets/style.css`
- `site/why-do-steamed-buns-wrinkle/index.html`
- `site/bao-buns-collapse-after-steaming/index.html`
- `site/why-are-bao-buns-not-fluffy/index.html`
- `site/robots.txt`
- `site/sitemap.xml`
- `site/README.md`

## SEO design decisions
- static HTML, no JS rendering requirement;
- each failure family gets its own intent page;
- pages link to related failure pages and the product landing page;
- pages include source links for technical claims;
- canonical and sitemap domain remain placeholders until a real domain is selected;
- checkout URL remains a placeholder until a legitimate real checkout exists.

## Explicit non-action
No 20–100 page content farm was created.

Reason:
The experiment has not yet collected Search Console query data. Publishing many speculative pages would violate the project's evidence-driven rule.

## Launch blocker
Before public deployment:
- replace `REPLACE_WITH_REAL_CHECKOUT_URL`;
- replace `REPLACE_WITH_DOMAIN`;
- verify the real checkout delivers both PDF files;
- then deploy and submit sitemap to Google Search Console.

## Next measurable stage
After launch, record:
- indexing;
- impressions;
- search queries;
- clicks;
- CTA clicks;
- purchases;
- acquisition source of first stranger purchase.
