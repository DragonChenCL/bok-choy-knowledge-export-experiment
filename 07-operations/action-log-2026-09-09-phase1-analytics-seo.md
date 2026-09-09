# 2026-09-09 — Phase 1 Analytics + SEO Entry Pages

## Scope
P0 MVP remains frozen. This phase only adds measurement instrumentation and three high-intent SEO entry pages.

## What changed
- Added `site/analytics.js`, a vendor-agnostic event layer.
- Instrumented: `page_view`, `symptom_select`, `diagnosis_start`, `question_answer`, `diagnosis_complete`, `diagnosis_back`, `diagnosis_restart`, `seo_diagnosis_cta`, and `diagnosis_hero_cta`.
- Captures page path, referrer, anonymous session/run IDs, entry slug, and UTM source/medium/campaign. No email, photo, or free-text user input is collected.
- Supports GA4/GTM, Umami, PostHog, Clarity, or a custom `BAO_ANALYTICS_ENDPOINT` when a collector is configured.
- Added a local event buffer for QA via `window.BaoAnalytics.exportBuffer()`; this is not a substitute for a production collector.
- Added an explicit `SUPPORTED_EVENTS` schema so CI can audit event names.
- Replaced the three old placeholder SEO pages in place, preserving their existing slugs:
  - `/bao-buns-collapse-after-steaming/`
  - `/why-do-steamed-buns-wrinkle/`
  - `/why-are-bao-buns-not-fluffy/`
- Added real canonical URLs, meta descriptions, FAQ structured data, internal links and diagnosis CTAs with UTM attribution.
- Fixed `robots.txt` and `sitemap.xml`, removing `REPLACE_WITH_DOMAIN` placeholders.
- Removed the old placeholder `$6.90 PDF` CTA from SEO pages.
- Added `scripts/qa-bao-phase1.cjs` and wired it into Pages CI.

## Evidence behind SEO page logic
- King Arthur Baking documents condensation control and recommends a post-steam covered rest.
- Red House Spice documents over-proofed wrinkling/collapse and presents a conflicting view that lid-rest is unnecessary when proofing is correct.
- Published Chinese steamed bread research shows hydration and gluten structure affect final quality, supporting the dense/flour-hydration branch.
- Current public SERP review still shows many pages presenting flat lists of causes, leaving room for Bao Rescue's observation-first diagnostic flow.

## QA / deployment
- First Phase 1 run (#18) failed only because the QA script expected `seo_diagnosis_cta` to be explicitly declared while the runtime emitted it dynamically from `data-track`.
- Fixed by adding explicit `SUPPORTED_EVENTS`; no diagnosis logic changed.
- Final main commit deployed: `c46cc175c439ced30857a1cf95b4de0014841fb1`.
- GitHub Actions run #19 (`34296132491`):
  - P0 decision-path QA: PASS
  - Phase 1 analytics + SEO QA: PASS
  - Stage latest site: PASS
  - Verify staged site: PASS
  - Pages build: SUCCESS
  - Pages deploy: SUCCESS
- `build.json` is generated from the exact triggering `GITHUB_SHA`, and CI verifies that it contains the deployed commit before publishing.

## Important limitation
The instrumentation code is deployed, but cross-user analytics will not be collected until an external analytics provider or custom endpoint is configured. The local buffer only supports browser-level QA. Do not treat the current state as a production analytics dashboard.

## URLs
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/bao-buns-collapse-after-steaming/
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/why-do-steamed-buns-wrinkle/
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/why-are-bao-buns-not-fluffy/
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/diagnose/
- https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/sitemap.xml
