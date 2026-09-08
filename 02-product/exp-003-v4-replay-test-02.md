# EXP-003 v4 — Historical Case Replay Test 02

Date: 2026-09-08
Tree tested: v0.1 + v0.2 patch

## Cases re-run after patch

### P001 — occasional wrinkle while same batch mostly fine
Route: failed batch -> fresh -> wrinkle -> ask lost volume -> ask wet/pitted -> ask proof state -> shaping/process.

Expected output: LOW/MEDIUM confidence unless user adds moisture/proof observations.

**Verdict: PASS.** No forced “open lid slower” answer.

---

### P002 — very dry dough + not fluffy
Route: failed batch -> fresh -> dense -> rise? -> dry/tight -> flour/hydration substitution clue.

Expected top cause: flour/hydration mismatch HIGH if dry/stiff observation confirmed.

**Verdict: PASS.**

---

### P003 — severe over-proofing in a warm oven before steaming
Route: `rescue_batch_in_progress` -> `proofing_too_fast_or_already_fragile`.

Expected output: stop following fixed clock; judge proof state; cool/chill waiting dough if it is already ready and cannot steam yet.

**Verdict: PASS after v0.2.**

---

### P006 — tears during pleating + wrinkles after steaming
Route: failed -> wrinkle -> no clear wet surface / no proven overproof -> shaping-state question -> dry/tight/tearing.

Expected output: flour/hydration mismatch and dough-development rise to MEDIUM; avoid blaming lid timing first.

**Verdict: PASS after v0.2.**

---

### P008 / P021 — small steamer, later batches wait and over-proof
Route: prevent/rescue -> later batches waiting for steamer.

Expected output: cover + chill later shaped batches to slow further yeast activity; judge readiness by state rather than equal room-temperature wait.

**Verdict: PASS after v0.2.**

---

### P009 — wide/flat but still fluffy
Route: failed -> `spread_wide_flat_but_not_collapsed` -> proof-state cues.

If fragile/spreading/no finger recovery: over-proofing HIGH.
If proof cues absent: proof mismatch vs flour/hydration remains MEDIUM rather than forced overproof diagnosis.

**Verdict: PASS after v0.2.**

---

### P013 — frozen/reheated buns become gummy/wrinkled unevenly
Route: freshness gate -> reheated/frozen -> out of scope.

**Verdict: PASS.** The first-cook diagnostic product should not pretend this is the same system.

---

### P014 — yellow but texture successful
Route: appearance only.

Expected output: color alone is not proof of texture failure; diagnose exact appearance concern separately.

**Verdict: PASS.**

---

### P016 — high-altitude repeated fluffy-texture failure
Route: high-altitude context notice -> continue general diagnosis, but no altitude-specific fix.

Expected output: flag localization risk; avoid pretending general sea-level proofing advice is validated for Denver.

**Verdict: PASS WITH LIMITATION.** Altitude-specific module remains future research.

---

### P028 — damp/translucent blotches
Route: wet/pitted/translucent -> condensation clues.

If metal steamer/drips: condensation HIGH.
If no drips but marks around filling/thin wrapper: beta filling/wrapper branch.

**Verdict: PASS.**

---

### P032 — wrinkly despite 5-minute covered rest in metal steamer
Route: wrinkle -> proof/condensation checks before post-steam transition.

Expected output: because a long covered rest already failed, the system should not repeat “wait longer before opening.”

**Verdict: PASS.** This is a key differentiation from generic FAQ content.

---

### P035 — pasta-like / not fluffy despite following instructions
Route: dense -> pre-steam rise -> interior-type question.

If dry/tight: core dense branch.
If wet/gummy: beta branch and request more cooking/filling observations.

**Verdict: PASS/PARTIAL.** Gummy-interior diagnosis remains a known evidence gap.

---

# Replay 02 conclusion

v0.2 is materially better than v0.1 because it now handles:
- failed batches;
- in-progress proofing rescue;
- batch-capacity overproof prevention;
- flat/spread without assuming collapse;
- shaping-time dryness/tearing as a discriminator;
- frozen/reheated cases as a separate system;
- high-altitude as an explicit localization uncertainty.

## Remaining red flags before product UI

1. Gummy/wet interior branch still lacks strong evidence.
2. Crack/seal branch is style-sensitive and remains beta.
3. Filling moisture/thin wrapper needs independent validation.
4. The tree still needs UX compression: a user should not answer 15 questions for a simple condensation case.
5. Need a visual-asset brief for every observable question so users can answer by comparison, not jargon.

## Decision
**LOGIC MVP PASSED FIRST REPLAY GATE, WITH BETA BRANCHES EXCLUDED FROM STRONG COMMERCIAL CLAIMS.**

Next recommended deliverable: turn the validated tree into a lightweight interactive web prototype before making another PDF.
