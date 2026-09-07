# EXP-003 — Bao Rescue MVP Product Spec

Date: 2026-09-07
Status: build candidate after research gate

## Working title
**Bao Rescue — Why Did My Steamed Buns Fail?**

## User
English-speaking home cook who has already attempted steamed buns / bao and is unhappy with the result.

## Job to be done
Help the user diagnose the most likely failure mechanism from what they can observe and decide what to change in the next batch.

## Why this is not a recipe ebook
Current search results already contain many complete recipes. The recurring gap is not ingredient access; it is interpreting failure states.

The MVP should therefore be built around **symptoms and decisions**, not around a chronological recipe.

## MVP page architecture

### Page 1 — Cover / promise
- Product title
- `See the symptom. Check the cause. Fix the next batch.`
- Scope note: yeasted Chinese-style steamed buns / bao; not every regional dough formula.

### Page 2 — 60-second symptom finder
Entry points:
- wrinkled / elephant-skin surface
- collapsed after steaming
- dense / heavy / doughy
- tough / chewy
- did not rise / barely puffed
- yellow / brown spots
- wet / soggy surface or bottom
- wrapper tearing / leaking

Each symptom points to a page / branch.

### Page 3 — Wrinkled or collapsed
Decision checks:
1. Did the bun look inflated before the lid opened?
2. Did it collapse immediately after opening?
3. Was second proof visibly far beyond puffy / airy?
4. Was steaming aggressive?
5. Was there obvious lid condensation?

Candidate cause families to verify in final copy:
- thermal shock / sudden lid opening;
- over-proofing;
- surface drying;
- overly aggressive steam;
- condensation effects.

### Page 4 — Dense / not fluffy
Decision checks:
- did the dough rise at all?
- was yeast active?
- did first / second proof progress visibly?
- flour type / protein level;
- kneading / gluten development;
- dough hydration and texture.

### Page 5 — Proofing state guide
Visual / tactile states:
- under-proofed
- ready
- over-proofed

Important principle:
**time alone is not the diagnostic** because room temperature, yeast freshness and dough formulation change proofing speed.

### Page 6 — Steamer / condensation / lid behavior
Compare:
- bamboo steamer;
- metal steamer;
- lid condensation;
- steam intensity;
- post-steam resting before opening.

### Page 7 — Ingredient quick checks
- flour type / protein
- yeast freshness / yeast type
- liquid temperature
- hydration symptoms
- baking powder presence only when relevant to the specific formula

Avoid pretending one universal formula applies to every bao style.

### Page 8 — Surface and color symptoms
Quick references:
- yellow / brown spotting
- rough / pitted surface
- soggy bottom
- dry skin

Every item must distinguish evidence-backed cause from lower-confidence possibilities.

### Page 9 — Change-one-variable next-batch worksheet
Fields:
- flour
- yeast type / age
- room temperature
- first proof state
- second proof state
- steamer type
- steam intensity
- post-steam rest
- observed failure
- **one** change for next batch

Purpose: stop users from changing five variables and learning nothing.

### Page 10 — Pre-steam checklist
Printable checklist:
- dough condition checked
- proof state checked
- buns covered from drying
- steamer setup ready
- adequate spacing
- steam plan known
- post-steam lid-rest plan known

### Page 11 — Quick diagnostic one-pager
Single printable matrix:
`Symptom | Check first | Common cause families | Next experiment`

### Page 12 — Sources / scope / disclaimer
- source classes used
- limits of the guide
- food-safety note for fillings: follow safe handling / cooking guidance appropriate to the filling; the troubleshooting guide is primarily about dough and steaming behavior.

## Source hierarchy for final product
Every technical claim must be supported by at least one high-quality source and preferably cross-checked:
1. food-science / academic literature;
2. strong technical / institutional baking sources;
3. established specialist recipe authors with transparent tests;
4. community evidence only for identifying the problem, not proving the solution.

## Current supporting observations
- King Arthur notes that bamboo steamers absorb condensation and that rapid exposure to cool air can contribute to bun collapse; it recommends a covered rest after steaming for yeasted buns.
- Omnivore's Cookbook treats deflation, proofing and pressure/temperature changes as recurring troubleshooting issues and explicitly notes proof time varies with environment and ingredients.
- Red House Spice has 177 comments on its complete Bao guide and describes properly risen, smooth, fluffy wrappers as a recurring tricky part of the process.
- Current 2026 recipe pages continue to publish dedicated troubleshooting for `dense`, `not fluffy`, `wrinkled`, and `collapsed` buns.

## Non-goals for MVP
- no full filling cookbook;
- no 50-recipe collection;
- no universal claim that one proofing time works everywhere;
- no invented personal cooking experience;
- no unsupported `secret Chinese trick` positioning;
- no medical / nutrition claims.
