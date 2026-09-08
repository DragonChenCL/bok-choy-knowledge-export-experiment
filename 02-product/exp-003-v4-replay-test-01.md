# EXP-003 v4 — Historical Case Replay Test 01

Date: 2026-09-08
Tree tested: v0.1
Sample: historical qualified user problems already collected in EXP-003 research

## Goal
A diagnostic tree is not validated because it sounds logical. Replay historical cases through it and check whether it:

1. avoids unsupported certainty;
2. asks for the missing observation that would actually distinguish causes;
3. routes obvious cases to the right cause family;
4. exposes gaps instead of inventing an answer.

---

## Replay summary

| Case | Historical problem | v0.1 behavior | Verdict |
|---|---|---|---|
| P001 | One/few buns wrinkle badly while same batch mostly fine | Routes to wrinkle; without volume/wet/proof observations it cannot rank strongly | PASS — appropriate uncertainty |
| P002 | Dough felt too dry; user repeatedly added water; final bao not fluffy | Dense path -> flour/hydration mismatch becomes high | PASS |
| P003 | Generic warm-oven advice caused severe over-proofing before steaming | No clean primary symptom for an in-progress proofing problem | FAIL — missing prevention/in-progress mode |
| P004 | Repeated dense/lumpy dough; flour changed AP -> bread flour | Dense path -> flour/hydration and dough development | PASS |
| P005 | Dense/translucent bottoms; suspects rest or too much filling | Mixed dense/moisture case lacks enough evidence | PASS — should request more observations, not guess |
| P006 | Dough tears during pleating and finished buns wrinkle | Wrinkle path does not explicitly ask whether dough was tearing/dry during shaping | PARTIAL — add shaping/dough-state discriminator |
| P008 | Small steamer; later batches may over-proof while waiting | No failed product yet, so v0.1 has no suitable entry | FAIL — prevention/batch-wait mode needed |
| P009 | Bao spread wide/flat but remain fluffy | Not exactly collapse; v0.1 can only approximate via collapse path | PARTIAL — add `spread/flat without collapse` observable symptom |
| P010 | Doughy/raw-like interior despite apparent rise | Routes to beta gummy branch | PASS AS BETA — correctly refuses unsupported paid diagnosis |
| P014 | Yellow rather than restaurant-white but texture good | Appearance-only path says color is not automatically a texture failure | PASS |
| P017 | Bumpy surface/grey patches, asks about lid opening | Insufficient visual/process facts; should ask moisture/condensation/timing | PASS — avoids assuming lid timing |
| P021 | Small steamer creates later-batch proofing problem | Same gap as P008 | FAIL — prevention/batch timing mode |
| P022 | Half batch became unexpectedly dry | Dense/flour-hydration branch if texture failed, but no explicit in-progress dry-dough rescue mode | PARTIAL |
| P028 | Damp/translucent blotches | Moisture path -> ask condensation location/steamer/filling zone | PASS |
| P029 | Many previous attempts; mainly wrinkle/collapse | Routes correctly but still needs current-batch distinguishing observations | PASS |
| P032 | Wrinkly despite metal steamer + 5-min covered rest | v0.1 does NOT conclude “open lid slower”; asks proof and condensation first | PASS — this is an important improvement |
| P035 | Followed instructions, final texture like pasta, not fluffy | Dense path; may end in beta if wet/gummy | PASS/PARTIAL — core dense path useful, gummy branch still needs evidence |

---

# What the replay proved

## Good behavior worth keeping

### 1. The tree is willing to say “not enough observations”
This is better than v3-style generic multi-cause advice.

### 2. Flour/hydration cases are distinguishable when the user reports the dough itself felt dry/stiff
P002/P004/P022 support keeping this discriminator.

### 3. The lid-opening conflict is modeled correctly
P032 is the best stress test. The historical user already rested the buns covered for ~5 minutes but still had wrinkles. A system that simply says “wait 3–5 minutes before opening” would fail this user immediately.

The v4 ordering — proof state -> condensation -> only then post-steam transition — is better.

### 4. Color-only complaints should not be sold as a “failure”
P014 confirms this.

---

# v0.1 gaps found

## GAP-01 — No prevention/in-progress mode
Real users sometimes seek help **before** the batch is ruined:
- P003: dough already over-proofing rapidly
- P008/P021: later steamer batches are still fermenting while waiting
- P022: dough is obviously too dry during mixing

### Required change
Add initial mode:
- `FAILED_BATCH_DIAGNOSIS`
- `IN_PROGRESS_RESCUE`
- `PREVENT_NEXT_BATCH_FAILURE`

The first commercial MVP can support a narrow subset of in-progress rescue:
- proofing too fast
- later batches waiting for steamer
- dough clearly too dry/stiff

Do not expand to every possible cooking rescue yet.

---

## GAP-02 — Spread/flat is not identical to collapse
P009 was wide/flat but fluffy.

### Required change
Add neutral symptom:
- `spread / wide / flat but not obviously collapsed`

Then ask proof-state cues before assigning over-proofing.

---

## GAP-03 — Wrinkle path needs a shaping/dough-state discriminator
P006 combines tearing during pleating with wrinkling.

### Required change
If no condensation and no clear over-proof cues, ask:
- did dough tear/feel dry/tight during shaping?
- were visible bubbles trapped in the surface?

If dry/tight/tearing, route toward flour-hydration / dough-development rather than generic surface advice.

---

## GAP-04 — Fresh cook vs reheating
P013 is a frozen-reheat problem, not a first-cook bao problem.

### Required change
Add scope context:
- freshly steamed batch
- reheated/frozen batch

Reheating is out of scope for commercial v4 core unless separately researched.

---

## GAP-05 — High altitude is a localization flag
P016 repeatedly failed in Denver/high elevation despite formula changes.

### Required change
Capture high-altitude context, but do **not** give altitude-specific instructions until separately verified. Return a localization warning / beta branch.

---

# v0.2 acceptance target

After adding these gaps, rerun at least:
- P001
- P002
- P003
- P006
- P008
- P009
- P013
- P014
- P016
- P021
- P028
- P032
- P035

v0.2 should produce no obviously false high-confidence conclusion.

---

## Decision
**v0.1 is useful but not yet product-ready. Upgrade the logic before any visual/PDF work.**
