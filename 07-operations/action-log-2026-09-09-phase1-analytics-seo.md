# 2026-09-09 — Phase 1 Analytics + SEO Entry Pages

## Scope
P0 MVP remains frozen. This phase only adds measurement instrumentation and three high-intent SEO entry pages.

## What changed
- Added `site/analytics.js`, a vendor-agnostic event layer.
- Instrumented: `page_view`, `symptom_select`, `diagnosis_start`, `question_answer`, `diagnosis_complete`, `diagnosis_back`, `diagnosis_restart`, `seo_diagnosis_cta`, and hero CTA.
- Captures page path, referrer, anonymous session/run IDs, entry slug, and UTM source/medium/campaign. No email, photo, or free-text user input is collected.
- Supports GA4/GTM, Umami, PostHog, Clarity, or a custom `BAO_ANALYTICS_ENDPOINT` when a collector is configured.
- Added a local event buffer for QA via `window.BaoAnalytics.exportBuffer()`; this is not a substitute for a production collector.
- Replaced the three old placeholder SEO pages in place, preserving their existing slugs:
  - `/bao-buns-collapse-after-steaming/`
  - `/why-do-steamed-buns-wrinkle/`
  - `/why-are-bao-buns-not-fluffy/`
- Added real canonical URLs, meta descriptions, FAQ structured data, internal links and diagnosis CTAs with UTM attribution.
- Fixed `robots.txt` and `sitemap.xml`, removing `REPLACE_WITH_DOMAIN` placeholders.
- Added `scripts/qa-bao-phase1.cjs` and wired it into Pages CI.

## Evidence behind SEO page logic
- King Arthur Baking documents condensation control and recommends a post-steam covered rest.
- Red House Spice documents over-proofed wrinkling/collapse and presents a conflicting view that lid-rest is unnecessary when proofing is correct.
- Published Chinese steamed bread research shows hydration and gluten structure affect final quality, supporting the dense/flour-hydration branch.
- Current public SERP review still shows many pages presenting flat lists of causes, leaving room for Bao Rescue's observation-first diagnostic flow.

## Important limitation
The instrumentation code is live, but cross-user analytics will not be collected until an external analytics provider or custom endpoint is configured. The local buffer only supports browser-level QA.

## URLs
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/bao-buns-collapse-after-steaming/
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/why-do-steamed-buns-wrinkle/
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/why-are-bao-buns-not-fluffy/
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/diagnose/
