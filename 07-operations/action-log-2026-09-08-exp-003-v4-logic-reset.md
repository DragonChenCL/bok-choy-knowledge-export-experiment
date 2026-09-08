# Action Log — EXP-003 Bao Rescue v4 Logic Reset

Date: 2026-09-08

## Trigger
User approved a full product-logic reset after rejecting v3 as commercially weak.

## Premise
The product must provide **decision compression**, not a long list of possible causes.

## Actions completed

1. Re-verified key technical branches using current public sources.
2. Separated observable symptoms from cause labels.
3. Added a scope gate so style/formula differences are not silently generalized.
4. Added explicit evidence grades and case-confidence grades.
5. Modeled the post-steam lid-rest question as a real contradiction instead of picking one source.
6. Added single-variable next-batch experiments to every core branch.
7. Created the machine-readable v0.1 diagnostic tree.
8. Replayed historical EXP-003 user cases through v0.1.
9. Identified missing modes: in-progress rescue, batch-wait prevention, wide/flat-but-not-collapsed, shaping-time dry/tearing, reheating exclusion, high-altitude flag.
10. Added v0.2 patch addressing those gaps.
11. Replayed the historical cases a second time.
12. Built a clickable, noindex web logic prototype at `site/diagnose/index.html`.

## New files

- `02-product/exp-003-v4-diagnostic-system-spec.md`
- `01-research/exp-003-bao/diagnostic-evidence-matrix-v4.md`
- `02-product/exp-003-v4-diagnostic-tree.json`
- `02-product/exp-003-v4-diagnostic-tree-v0.2.patch.json`
- `02-product/exp-003-v4-replay-test-01.md`
- `02-product/exp-003-v4-replay-test-02.md`
- `site/diagnose/index.html`

## Key evidence decisions

### Strong / allowed
- proof state should be judged by observable dough state, not fixed time alone;
- under-proofing can contribute to dense/heavy results;
- over-proofing can produce spreading/collapse/wrinkle when proof cues support it;
- condensation dripping from a lid is a strong cause of wet/pitted surface damage;
- flour/hydration differences materially affect dough/texture;
- yeast type/activity and temperature affect rise rate.

### Conflicted / must stay cautious
- whether a covered rest after steaming is necessary to prevent collapse.

### Beta / do not overclaim yet
- gummy/wet interior;
- filled-bao moisture/thin-wrapper ranking;
- smooth-style crack/split diagnosis;
- altitude-specific fixes;
- reheating/frozen-bao troubleshooting.

## Commercial gate
Do not generate v4 PDF yet.

Next valid sequence:
1. test the clickable diagnostic prototype;
2. reduce unnecessary question count;
3. create visual references for questions users struggle to answer;
4. only then package the validated flow into downloadable cards/PDF if that packaging still adds value.

## Important lesson
A paid diagnostic product should not maximize the number of answers. It should maximize how quickly it eliminates the wrong answers.
