# EXP-003 — VERIFY Closure Batch 01

Date: 2026-09-07
Purpose: resolve or narrow the five remaining verification gaps in `exp-003-bao-rescue-content-v0.md`.

---

## V1 — Active dry yeast liquid temperature

### Evidence
King Arthur Baking (`Desired dough temperature`) notes:
- instant yeast can be mixed with flour and used with cool water;
- when using active dry yeast with cool-water dough, they recommend dissolving ADY in a small portion of recipe water warmed to about 110°F, then proofing before combining.

URL:
https://www.kingarthurbaking.com/blog/2018/05/29/desired-dough-temperature

### Decision
Do **not** put one universal yeast-water temperature in Bao Rescue.

Final wording should be:
> `Follow the yeast manufacturer's and recipe's activation method. Active dry and instant yeast are not always handled the same way.`

If a recipe specifically expects blooming active dry yeast, the guide may use King Arthur's example as a reference, not a universal rule.

### Status
**RESOLVED by narrowing claim.**

---

## V2 — Surface drying as a wrinkling / rough-surface cause

### Evidence
Current Bao troubleshooting sources such as CharWok explicitly identify shaped dough drying during rest as one potential cause of an elephant-skin / wrinkled surface and recommend keeping buns covered.

URL:
https://charwok.com/steamed-bao-buns/

Other current steamed-bun recipes routinely keep shaped buns covered during proofing to prevent surface drying, but the project does not yet have a strong controlled food-science source that isolates surface drying as a cause of wrinkling.

### Decision
Keep surface drying in the diagnostic tree as a **secondary possible cause**, not a primary guaranteed diagnosis.

### Status
**RESOLVED for MVP wording; confidence remains MEDIUM.**

---

## V3 — Post-steam lid rest vs proofing dominance

### Evidence A — 2026 experimental steamed stuffed bun study
`Improving the quality of steamed stuffed bun wrappers during steaming: Insights into the synergistic effects of soluble soybean polysaccharide and lard`

PMC:
https://pmc.ncbi.nlm.nih.gov/articles/PMC12907837/

The standardized process described proofing at controlled temperature / humidity, steaming, then removing buns after **3 minutes of standing to prevent surface shrinkage caused by sudden temperature changes**.

### Evidence B — King Arthur Baking
Recommends leaving fluffy yeasted buns covered briefly after heat is turned off and describes rapid cool-air exposure as a collapse risk.

### Evidence C — Omnivore's Cookbook / What To Cook Today
Both use a gradual post-steam transition / short covered rest in troubleshooting guidance.

### Counterpoint
Some practitioner sources argue that correctly proofed buns should hold shape regardless and that proofing state is more important than lid-rest timing.

### Decision
The product should not choose a fake single-cause story.

Final hierarchy:
1. **Proofing / structural state is a major diagnostic branch.**
2. **Post-steam temperature transition is independently worth controlling and has experimental-process support.**
3. Teach the user to change one variable at a time when the cause is ambiguous.

### Status
**RESOLVED — both proofing and transition remain in the tree.**

---

## V4 — Folded Gua Bao vs filled Baozi scope

### Observation
English users frequently use `bao buns` for folded Gua Bao-style buns as well as filled steamed buns. Current recipes for both share core yeasted wheat-dough operations: mixing, gluten development, shaping, proofing and steaming, while filling-specific failures differ.

### Decision
MVP scope:
> **common yeasted wheat steamed-bun dough failures across folded Bao and filled Baozi**

Included:
- rise / proofing;
- density / fluffiness;
- collapse / wrinkling;
- steamer / condensation;
- flour / hydration / yeast checks.

Excluded from MVP:
- detailed filling safety;
- filling formulation;
- wrapper leakage / sealing as a core chapter;
- no-yeast-only buns;
- sourdough-specific buns.

### Status
**RESOLVED as explicit product-scope decision.**

---

## V5 — US / UK / AU flour localization

### Evidence
Food-science literature on Chinese steamed bread shows flour protein quantity, gluten strength and starch properties materially affect steamed-bread volume / texture. Different studies and regional CSB styles do not produce one universal ideal flour specification.

Examples:
- Zhu et al., Journal of Cereal Science, 2001 — protein quantity / quality and dough properties correlate with Chinese steamed bread quality.
- Huang et al., Journal of Cereal Science, 1996 — flour quality / dough strength materially affect northern-style CSB quality.
- PubMed / recent studies continue to show gluten-starch ratio and hydration alter texture and structure.

Bon Appétit also notes ordinary all-purpose flour can make Bao, while flour choice changes color / chew.

### Decision
Do not publish a simplistic country equivalence table such as:
`US AP = UK plain = Chinese bao flour`.

Instead the MVP will tell readers to record:
- brand / flour category;
- protein percentage if printed;
- measured flour and water weights;
- dough feel;
- whether they substituted flour relative to the recipe.

When a specific recipe calls for a specific flour, troubleshoot relative to that recipe before recommending a new flour category.

### Status
**RESOLVED by avoiding false equivalence.**

---

# Result
All five v0 `[VERIFY]` items are now either:
- resolved with stronger evidence; or
- deliberately narrowed to a lower-confidence / non-universal claim.

## Release-quality implication
The next product version can remove the `[VERIFY]` flags if it preserves the limitations documented here.

## New quality rule discovered
When traditional culinary knowledge crosses markets, **local ingredient labels must not be treated as exact technical equivalents**. Prefer measurable properties (weight, protein %, temperature, observable dough state) over translated ingredient names wherever possible.
