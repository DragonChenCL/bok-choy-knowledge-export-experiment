# EXP-003 v4.1 — Interaction QA Pass 01

Date: 2026-09-08
Status: FIRST USABILITY GATE PASSED FOR PATH DEPTH

## Goal
Verify that the focused diagnostic prototype does not become a long questionnaire.

Measurement starts **after the user has selected the visible symptom**, because style/context questions are setup rather than diagnosis.

## Core path depth

| Symptom | Typical discriminating questions after symptom | Worst-case before result | QA result |
|---|---:|---:|---|
| Wet / pitted | 1 | 1 | PASS |
| Collapsed / lost volume | 2 | 2 | PASS |
| Barely rose | 2–3 | 3 | PASS |
| Wrinkled / elephant skin | 2–3 | 3 | PASS |
| Dense / not fluffy | 2–4 | 4 | PASS, but watch complexity |

## Example paths

### Collapse with strong over-proof cues
`collapse -> pre-steam proof cues = yes -> result`

Outcome:
- over-proofing ranks first;
- next experiment = steam an earlier-proof comparison batch;
- post-steam transition remains lower confidence.

Questions after symptom: **1**.

### Collapse without over-proof cues
`collapse -> proof cues = no -> moisture = none -> transition result`

Outcome:
- thermal transition and hidden proof/structure weakness remain medium-confidence alternatives;
- output proposes an A/B immediate-open vs short-covered-rest test only after proofing is controlled.

Questions after symptom: **2**.

### Wrinkle without collapse
`wrinkle -> lost volume = no -> wet surface = no -> over-proof cues = no -> cautious result`

Outcome:
- system refuses to pretend it knows the cause;
- asks the next batch to record skin drying, proof state, and failure timing.

Questions after symptom: **3**.

### Dense with clear dry/stiff dough clue
`dense -> clearly rose = yes -> dry/tight crumb -> dry/stiff/flour change = yes -> result`

Outcome:
- flour/hydration mismatch ranks first;
- experiment = one measured hydration correction while proofing/steam remain unchanged.

Questions after symptom: **3**.

### Dense without a clear formula clue
`dense -> clearly rose = yes -> dry/tight crumb -> dry clue = no -> dough smooth = yes -> cautious result`

Outcome:
- proofing vs flour/hydration/style remains unresolved;
- system asks for better observations instead of giving ten fixes.

Questions after symptom: **4**.

## Rescue paths
The in-progress rescue module resolves after one classification question for the three currently supported cases:
- proofing too fast / already fragile;
- later shaped batches waiting for steamer capacity;
- clearly dry/stiff dough.

This is intentional: these cases already contain a strong observed process constraint.

## Findings
1. Path depth is acceptable for an MVP.
2. `dense / not fluffy` is the only branch that risks feeling questionnaire-like; future visual crumb comparisons may remove one text question.
3. Cautious outcomes are a product feature, not a failure. The tool must say when evidence cannot separate causes.
4. The next visual investment should go to **proof-state cues** and **crumb texture**, because those nodes currently require the most user interpretation.

## Decision
Proceed to visual-node testing before any new PDF work.
