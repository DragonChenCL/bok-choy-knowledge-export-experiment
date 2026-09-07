# EXP-003 — Free Web Demand Validation Batch 04

Date: 2026-09-07
Purpose: Determine whether EXP-003 can continue without paid keyword-volume tooling.

## Question
Do we need paid keyword APIs to validate Bao / Steamed Bun Failure Diagnosis, or can public web evidence carry the experiment far enough?

## Action
Run exact-problem web searches for representative failure queries:
- `bao buns not fluffy`
- `steamed buns wrinkled`
- `bao buns collapse after steaming`
- `steamed buns dense`
- `bao buns proofing`

## Raw observations
Search results repeatedly surface dedicated FAQ/troubleshooting sections across multiple independent food sites, including:
- Cheers Jenn: explicit `Bao Bun Troubleshooting & FAQ`, including not fluffy and collapsed cases.
- Wagamama: explicit FAQ `why are my bao buns not fluffy?`.
- Dished by Kate: detailed failure causes for not-fluffy bao, including dead yeast/baking powder, wrapper thickness, and inadequate resting.
- Home Cook Simple: dedicated FAQ for not-fluffy and collapse-after-steaming failures.
- What To Cook Today: detailed proofing-state diagnostics and distinctions among under-proofed, correctly proofed, and over-proofed buns.
- Multiple other independent sites include dense, wrinkled, collapse, proofing, or steaming-troubleshooting sections.

## Observation
The failure-query family clearly maps to recurring search intent and enough content supply that independent publishers repeatedly create troubleshooting sections for it.

The SERP is not dominated by one specialist troubleshooting brand. Most answers remain embedded inside recipe pages or generic cooking sites.

## Important limitation
Public web search does **not** give a reliable, standardized batch table for:
- exact monthly volume;
- keyword difficulty;
- CPC;
- commercial competition.

Therefore these fields remain `UNKNOWN` unless a quantitative provider is available.

## Decision
Continue EXP-003 using a **free evidence stack**. Do not purchase keyword API access solely for the current validation stage.

Paid keyword data is optional, not mandatory, for early validation.

Use free/public evidence for:
1. query-family existence;
2. recency;
3. SERP composition;
4. competition structure;
5. independent-site presence;
6. repeated user language;
7. marketplace/payment evidence;
8. social/video demand proxies.

Keep exact keyword volume/KD/CPC explicitly marked `UNKNOWN` instead of inventing estimates.

## Gate
The project may proceed to a minimal commercial test without exact volume **only if** the combined qualitative evidence is strong enough across multiple independent sources and the test is cheap.

Exact volume should become mandatory only when:
- choosing between multiple very similar niches;
- forecasting SEO revenue at meaningful scale;
- deciding whether to invest heavily in site build/content inventory;
- comparing keyword portfolios quantitatively.

## Status
`CONTINUE VALIDATION — no paid SEO API required at current stage.`
