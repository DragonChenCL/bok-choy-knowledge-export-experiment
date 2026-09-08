# EXP-003 v4 — Bao Rescue Diagnostic System Spec

Date: 2026-09-08
Status: LOGIC DESIGN ACTIVE — DO NOT BUILD PDF YET

## Product reset

The paid product is **not** a recipe book and **not** a list of possible causes.

The core promise is:

> **Observe what happened -> rule out mismatched causes -> rank the remaining causes -> run one controlled next-batch test.**

The user should leave with one concrete experiment, not ten generic tips.

---

## 1. Scope gate comes before diagnosis

### Supported in v4 core
- wheat-flour steamed buns
- yeast-leavened dough
- plain mantou-style buns
- filled baozi
- folded gua-bao-style buns when the symptom applies to the dough itself

### Record but do not automatically generalize
- yeast + baking powder formulas
- enriched/high-sugar formulas
- chilled/overnight dough
- very wet fillings
- metal steamer / bamboo steamer / electric steamer

### Out of scope for first commercial version
- sourdough-only bao
- gluten-free bao
- no-yeast-only bao
- pan-fried sheng jian bao
- safety/cooking diagnosis for raw meat filling

### Why this gate matters
The same visual symptom can mean different things in different formulas. Even “cracked top” can be intentional in Cantonese-style char siu bao, so the system must know what style the user intended before calling it a failure.

---

## 2. Diagnostic architecture

Every branch follows the same six-step structure:

1. **OBSERVE** — only things the user can see, feel or remember.
2. **TIMING** — when the problem appeared.
3. **DISTINGUISH** — ask questions that separate similar causes.
4. **RANK** — output Top 1–3 hypotheses, not one absolute answer.
5. **TEST** — change one major variable next batch.
6. **LEARN** — use the result to strengthen or weaken the hypothesis.

### Rule
Never use a cause label as a symptom label.

Bad:
- `Collapsed / Overproofed`

Good:
- `Collapsed / lost volume`

Then diagnose whether over-proofing is supported.

---

# 3. Intake / context gate

Before the user chooses a symptom, capture:

### C1 — What are you making?
- plain mantou
- filled baozi
- folded gua bao
- Cantonese cracking-top char siu bao
- other / unsure

### C2 — Main leavening method
- yeast only
- yeast + baking powder
- unknown

### C3 — Steamer
- bamboo
- metal
- electric / pressure device
- other

### C4 — Did you substantially change the recipe?
- flour type / brand
- liquid amount
- yeast type
- sugar
- filling
- no major change

This context is used to re-rank later hypotheses.

---

# 4. Primary symptom selector

The first screen should use neutral visual descriptions only.

1. **Barely rose before steaming**
2. **Dense / tough / not fluffy after steaming**
3. **Collapsed / lost volume / flattened**
4. **Wrinkled / elephant-skin surface**
5. **Wet / pitted / translucent surface**
6. **Cracked / split / opened**
7. **Appearance only** — color, smoothness, spots

Commercial v4 should prioritize 1–5. Branches 6–7 stay secondary until stronger evidence is assembled.

---

# 5. Core diagnostic paths

## PATH A — Barely rose before steaming

### Observe
User reports shaped buns remained small, tight or heavy before steaming.

### Distinguish A1 — dough-state check
Ask:
- Did they become visibly plumper / roughly ~50% larger?
- Did they feel noticeably lighter when lifted?
- Did a gentle finger press spring back immediately, slowly, or not at all?

### Interpretation
If:
- little size increase
- still heavy
- finger press rebounds quickly

then **insufficient proofing / fermentation progression** becomes HIGH.

### Distinguish A2 — environment
Ask:
- Was the kitchen/dough unusually cool?
- Was the dough refrigerated or were ingredients very cold?

If yes, **temperature-limited fermentation / insufficient time for actual dough state** rises.

### Distinguish A3 — yeast / formula
Ask:
- Was yeast expired or very old?
- Was active dry yeast used in a cool-water method without the recipe accounting for it?
- Was instant yeast substituted for active dry or vice versa?
- Was the formula substantially changed?

### Output example
1. Insufficient proofing relative to actual temperature — HIGH
2. Yeast activation / yeast activity issue — MEDIUM
3. Stiff or modified formula slowing expansion — MEDIUM/LOW

### Next-batch experiment
Keep flour, hydration, yeast quantity and steaming unchanged.

**Change only the proof endpoint:** wait until buns are visibly/plausibly puffed, lighter in the hand, and the finger press returns slowly instead of immediately.

Record actual room temperature and elapsed time, but judge readiness by dough state rather than the clock.

### Result interpretation
- Better rise + lighter crumb -> under-proof hypothesis strengthened.
- Still no meaningful rise -> yeast/formula branch rises in priority.

---

## PATH B — Dense / tough / not fluffy after steaming

### First split: did the shaped buns rise before steaming?

#### If NO
Route to PATH A first. Do not diagnose flour immediately.

#### If YES
Continue.

### Distinguish B1 — what is the interior like?
- dry / tight / heavy
- wet / gummy
- reasonably airy but chewy
- uneven large holes

The first commercial version should fully support **dry/tight/heavy**. Other subtypes require more evidence.

### Distinguish B2 — recipe substitution
Ask:
- Did you change flour type/brand?
- Did the dough feel much stiffer/drier than the source recipe describes?
- Did you add extra flour while kneading?

If yes, **flour/hydration mismatch** rises.

### Distinguish B3 — dough development
Ask:
- Was the dough actually smooth, elastic and cohesive before shaping?
- Was kneading stopped while the dough still tore/crumbled easily?

If no, **insufficient dough structure** rises.

### Output example
1. Under-proofing — HIGH if pre-steam rise was weak
2. Low hydration / excess flour / flour substitution mismatch — HIGH if dough was dry/stiff
3. Insufficient gluten/dough development — MEDIUM
4. Flour protein/style mismatch — MEDIUM/LOW unless substitution evidence exists

### Next-batch experiments
Choose ONE based on evidence:

**Test B-A — proof endpoint**
If proof looked weak, change only final proof endpoint.

**Test B-B — hydration/flour**
If dough was clearly drier than intended, keep flour brand and all timing constant; make a small measured hydration adjustment rather than adding flour by feel.

**Test B-C — dough development**
If dough never became smooth/elastic, keep formula constant and improve kneading endpoint only.

### Result interpretation
The changed branch moves up or down in confidence based on the next crumb comparison.

---

## PATH C — Collapsed / lost volume / flattened

### Timing question C1
When did volume loss appear?
- before steaming / while waiting
- during steaming
- immediately when steaming stopped
- mainly after lid opening / cooling
- unsure

### Proof-state question C2
Before steaming, were buns:
- very puffy / fragile / spreading
- light, and finger indentation barely recovered
- normal-looking and elastic
- still tight/heavy

### If very puffy + non-recovering / spreading
**Over-proofing / weakened gas-holding structure = HIGH.**

This has support from multiple experienced steamed-bun sources and is consistent with general yeast/gluten mechanics.

### If proof signs looked normal but collapse happens mainly after heat stops / lid opens
**Post-steam thermal transition = MEDIUM, CONFLICTED.**

Important: this must not outrank proof-state evidence automatically.

Reason for conflict:
- Some experienced sources and a 2026 standardized experimental process use a short covered stand to reduce sudden-change shrinkage.
- Red House Spice reports repeated tests where correctly proofed mantou can be uncovered immediately without collapse.

### If filled bao + very wet filling / thin wrapper
**Filling moisture / wrapper support = MEDIUM**, especially when wrinkling is local to the filled area.

### Next-batch experiments

**Test C-A — over-proof hypothesis**
Keep recipe and steaming identical; steam one comparison batch at an earlier final-proof endpoint.

**Test C-B — post-steam transition**
Only after proofing is controlled: split equivalent buns into two conditions if practical.
- condition 1: immediate opening
- condition 2: 3-minute covered rest

Do not change other variables.

### Result interpretation
This A/B test is especially valuable because the public advice is contradictory. The product should help the user resolve which rule matters in their own formula/setup.

---

## PATH D — Wrinkled / elephant-skin surface

Wrinkles are not automatically the same as collapse.

### Distinguish D1 — did the bun also lose volume?
- yes -> combine with PATH C
- no -> continue

### Distinguish D2 — is the surface visibly wet/pitted?
- yes -> PATH E condensation branch rises
- no -> continue

### Distinguish D3 — proof state
Signs of over-proofing before steaming?
- spreading
- very light/fragile
- indentation does not recover

If yes: **over-proofing = HIGH.**

### Distinguish D4 — surface/process
Ask:
- Were shaped buns left uncovered and allowed to dry?
- Was steam extremely aggressive/high?
- Were visible air bubbles left in the surface during shaping?

These remain secondary branches unless supported by the specific observation.

### Output example
1. Over-proofing — HIGH when proof cues support it
2. Condensation — HIGH when wet/pitted marks are present
3. Surface drying / shaping bubbles / aggressive steam — MEDIUM
4. Post-steam temperature transition — LOW/MEDIUM and conflicted unless timing strongly points there

### Next-batch test
Choose only the highest-observation-supported branch.

---

## PATH E — Wet / pitted / translucent surface

### Distinguish E1 — visible condensation clue
Ask:
- Were droplets visible on the steamer lid?
- Are marks located where water could drip?
- Are you using a metal steamer?

If yes: **lid condensation / direct water dripping = HIGH.**

Bamboo absorbs condensation better; metal lids commonly require a cloth/towel strategy to keep droplets off buns.

### Distinguish E2 — filled bao
If no obvious lid droplets but wet/translucent areas cluster around filling or thin wrapper zones:
- filling moisture / thin wrapper = MEDIUM, NEEDS FURTHER EVIDENCE before strong commercial wording.

### Next-batch experiment
Keep recipe/proofing unchanged.

Change only condensation control:
- wrap metal lid with a clean dry cloth as appropriate for the setup, or
- use a bamboo-steamer equivalent.

If the marks disappear or sharply reduce, condensation hypothesis is strengthened.

---

# 6. Secondary branches

## PATH F — Cracked / split / opened

**Context gate is mandatory.**

If the user is intentionally making Cantonese cracking-top char siu bao, cracking may be the target style, not a defect.

If the intended style should be smooth/closed, potential branches include:
- seal failure / wrapper geometry
- insufficient proofing
- surface drying / outer tension
- overly thin center around filling

Current evidence quality is not strong enough to publish a confident generic ranking. Keep this branch in beta until more style-specific evidence is collected.

---

## PATH G — Appearance only

Examples:
- yellowish rather than white
- grey/damp spots
- restaurant-level smoothness

Do not imply yellowish color means bad texture. Flour treatment/type can affect color independently of eating quality.

This is lower purchase urgency than failure-to-rise, dense texture, collapse and wrinkles.

---

# 7. Confidence model

The product must display **two different confidence concepts**.

### Evidence strength
How well the underlying cause relationship is supported externally.

- **A** — multiple independent practitioner/technical sources, or experimental/mechanistic support
- **B** — one strong practitioner source plus compatible general baking mechanism
- **C** — anecdotal, recipe-specific, conflicting, or weakly transferable
- **UNKNOWN** — insufficient evidence

### Case confidence
How well the user's own observations match the hypothesis.

- **HIGH** — multiple distinguishing observations point to the same branch
- **MEDIUM** — plausible but competing branches remain
- **LOW** — only generic symptom match

Never display HIGH case confidence based on a symptom alone.

---

# 8. Required output format for a diagnosis

Every result screen/card should look like:

## What we know
- observable facts selected by the user

## Most likely
### #1 Hypothesis — HIGH
Why it ranks first from this user's observations.

## Also possible
### #2 Hypothesis — MEDIUM
What observation would make it more likely.

### #3 Hypothesis — LOW
Why it is currently deprioritized.

## Do this next batch
- one change only
- what must remain fixed
- what to observe before steaming
- what outcome would strengthen the hypothesis
- what outcome would weaken it

## Evidence note
- evidence grade
- whether sources disagree

---

# 9. Commercial value test

The system is only worth charging for if it consistently does something a free article usually does not:

> **reduce 5–10 plausible causes to the 1–2 causes worth testing first.**

A page that merely says “could be yeast, flour, proofing or temperature” fails the paid-product bar.

---

# 10. v4 build gate

Do NOT generate another PDF until all are true:

- [x] symptom labels are separated from cause labels
- [x] scope gate exists
- [x] top 5 symptom paths have first-pass decision logic
- [x] post-steam lid-rest conflict is explicitly modeled
- [x] each core path ends with a single-variable experiment
- [ ] every decision node is mapped to evidence grade
- [ ] uncertain branches are marked beta / unknown
- [ ] image brief is derived from diagnostic questions, not decorative layout needs
- [ ] at least 10 historical real-user cases can be replayed through the tree without obviously nonsensical outputs
- [ ] a non-PDF interactive prototype is tested before final packaging

Next deliverable: evidence matrix + machine-readable tree + replay test set.
