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

The repository also contains an older `sprite-p0.b64.part-*` staging attempt, but it is incomplete (`part-02` is missing), so it cannot be used as evidence of a completed HD asset.

## QA result
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

The script then failed only at the sprite guard:
`Reviewed sprite unexpectedly small / blurry regression`

Therefore current P0 logic QA is green; the HD sprite remains the blocking P0 item.

## Deploy result
- Build: failed at the sprite size guard after all 22 path checks passed.
- Deploy: skipped.
- No new Pages deployment was produced from this attempt.

## Repository safety action
Because the connected GitHub binary upload truncated the candidate, main is restored to the original 7500-byte sprite blob rather than leaving the repository in a worse 7182-byte state.

## Current status
P0 is NOT complete.

Remaining blocker:
- get the reviewed 108598-byte HD WebP (or an equivalently reviewed >100KB sprite) into `06-assets/bao-rescue/v4/bao-sprite.webp` without connector truncation;
- rerun the same QA/deploy workflow;
- confirm Pages + `build.json` commit match.

No v4.6/v4.7 work or feature expansion was started.
