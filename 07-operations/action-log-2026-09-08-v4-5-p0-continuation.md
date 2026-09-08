# Bao Rescue v4.5 P0 continuation — 2026-09-08

## Scope
Continue v4.5 MVP Freeze only. No feature expansion.

## Repository facts verified
- `site/diagnose/index.html` Special Case copy is already: `Cracked/opened, frozen/reheated, or another unlisted case.`
- Special Case choices remain only `Cracked / opened`, `Frozen / reheated`, `Other`.
- `scripts/qa-bao-mvp.cjs` exists and covers 22 diagnostic paths.
- `.github/workflows/deploy-site-pages.yml` runs the QA script first, publishes `06-assets/bao-rescue/v4/bao-sprite.webp` directly, and requires the sprite to be >100000 bytes.
- The pre-existing main sprite was only 7500 bytes, so the claimed P0 HD replacement had not actually been completed.

## Visual work performed
Recovered previous photo-diagnosis assets from earlier Bao Rescue artifacts and rejected v4.1 illustration/line-art assets under the current visual rules. Reused suitable photographic cells where possible and rebuilt a local 2x5 sprite with this mapping:
1. normal / underproof
2. overproof / collapsed
3. wrinkled / wet
4. fluffyCrumb / denseCrumb
5. gummyCrumb / cracked

Local rebuilt candidate: 2400x4500 WebP, 108598 bytes.

Semantic review notes:
- normal: smooth, full, clearly normal.
- underproof: smaller/tighter and not collapsed.
- overproof: expanded/fragile and visually distinct from collapsed.
- collapsed: visibly lost volume after steaming.
- wrinkled: dry shrink/wrinkle appearance rather than wetness.
- wet: condensation/water-mark appearance.
- fluffyCrumb: open, even airy crumb.
- denseCrumb: small pores and compressed crumb.
- cracked: visibly split bun.
- gummyCrumb: initial candidate looked too much like filling and was rejected; replacement kept conservative/BETA semantics.

## GitHub connector limitation encountered
A direct binary blob upload through the connected GitHub tool truncated the 108598-byte WebP. The resulting repository blob was only 7182 bytes. This was detected immediately and was not accepted as P0 completion.

The repository also contained an older `sprite-p0.b64.part-*` staging attempt, but it was incomplete (`part-02` was missing), so it was not used as evidence of a completed HD asset.

## Earlier QA result
GitHub Actions run `34238993894` executed `node scripts/qa-bao-mvp.cjs`.

All 22 decision-path cases printed PASS:
- normal
- 4 Didn't rise paths
- 3 Collapsed paths
- 3 Wrinkled paths
- 5 Dense paths
- 2 Wet paths
- 2 Special non-crack paths
- crack intentional
- crack fault

That earlier run then failed only at the old 7500-byte sprite guard:
`Reviewed sprite unexpectedly small / blurry regression`

## P0 HD sprite resolution
The reviewed WebP was transferred as small UTF-8 base64 chunks and reconstructed inside GitHub Actions, avoiding the unreliable direct binary connector path.

Source-of-truth checks for the reviewed asset:
- dimensions: `2400x4500`
- file size: `108598` bytes
- SHA256: `fac8b73eee3440a03cbfbd521024527b9b7e000f64018a25d4d5b7f1ef084448`
- Git blob SHA: `81fb1a2754b493d61c5b58d132947d65a539ec07`

One staged chunk (`part-01`) was detected as incorrect before reconstruction and was deliberately ignored. Three independently verified 6000-character correction chunks were used in its place. All other staged chunks matched the local reviewed asset at Git-blob level.

One-shot reconstruction Action:
- run: `34245084971`
- rebuild exact reviewed WebP: PASS
- exact byte size check: PASS
- SHA256 check: PASS
- Git blob SHA check: PASS
- `node scripts/qa-bao-mvp.cjs`: PASS
- commit reviewed sprite: PASS
- remove temporary upload chunks: PASS

HD sprite install commit:
- `d59d7fe90c52d6c627ad14376e577fc37ee47f32`
- message: `p0: install reviewed HD Bao Rescue sprite`

After that commit, GitHub main reports `06-assets/bao-rescue/v4/bao-sprite.webp` as exactly `108598` bytes with blob SHA `81fb1a2754b493d61c5b58d132947d65a539ec07`, matching the reviewed local candidate byte-for-byte.

## P0 manual/code-level interaction review
Reviewed `site/diagnose/index.html`, `data.js`, `app.js`, and `styles.css` against the frozen MVP scope.

- Back: question flow decrements the question index and removes the latest answer; first-question Back resets safely.
- Restart / Start over: resets selected symptom, answers, question index, visual selected state, progress, and disables Next again.
- Step bar: starts at step 1; question flow activates steps 2/3; result activates step 4.
- Next disabled/enabled: initially disabled, enabled only after selecting a symptom/special case, reset to disabled on restart.
- Result content: preserves evidence-aware statuses (`CORE LOGIC`, `CONFLICTED EVIDENCE`, `NEEDS MORE INFO`, `BETA`, `OUT OF SCOPE`, `STYLE GATE`) and always provides a next-batch test rather than a generic cause list.
- Image mapping: CSS maps the 2x5 sprite exactly as `normal / underproof`, `overproof / collapsed`, `wrinkled / wet`, `fluffyCrumb / denseCrumb`, `gummyCrumb / cracked`.
- Mobile layout: responsive breakpoints at 920px, 740px and 520px collapse the main layout, answer grids, symptom grids and Next button appropriately.
- Special Case remains limited to `Cracked / opened`, `Frozen / reheated`, `Other`; no High Altitude / Dry Dough expansion was introduced.

## Final deployment closure
The one-shot reconstruction workflow is temporary and is removed before final deployment. The normal Pages workflow remains the deployment source of truth and continues to publish `06-assets/bao-rescue/v4/bao-sprite.webp` directly with the >100000-byte guard.

Because the Pages workflow is path-filtered, the final closure commit intentionally touches only a non-functional comment in `.github/workflows/deploy-site-pages.yml` to trigger the normal deployment after this log is recorded. The exact final deployed commit is verified from the generated online `build.json`; `build.json` must equal GitHub main before P0 is declared complete.

No v4.6/v4.7 work or feature expansion was started.
