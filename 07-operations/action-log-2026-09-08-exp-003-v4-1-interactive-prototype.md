# Action Log — EXP-003 v4.1 Focused Interactive Prototype

Date: 2026-09-08
Status: PROTOTYPE / NOT FOR SALE

## Trigger
User approved trying the redesigned diagnostic-system direction after rejecting PDF-first versions.

## Decision before implementation
Do **not** build another PDF yet.

The v4.1 interaction prototype intentionally narrows the commercial core to the strongest repeated symptom families already supported by the research sample:
- barely rose / under-proofed-looking result
- dense / not fluffy
- collapsed / lost volume
- wrinkled / elephant-skin surface
- wet / pitted / condensation-like surface

Cracking, color, reheating, high-altitude adjustments, gummy crumb ranking, and other weaker branches remain beta or excluded until evidence improves.

## Why this shape
Earlier v1–v3 products repeatedly made the same mistake: presenting a list of possible causes rather than reducing uncertainty.

v4.1 therefore enforces:
1. observable symptom first;
2. 2–3 discriminating questions after symptom selection;
3. ranked cause family rather than one absolute answer;
4. one next-batch experiment;
5. explicit caution when evidence cannot separate causes.

## Implemented artifact
`site/diagnose-v4-1/index.html`

### Interaction characteristics
- responsive single-file prototype;
- no external JS framework;
- uses existing AI-generated bao images only as symptom-recognition aids;
- image cards are not treated as causal evidence;
- result page displays user path, confidence, and one controlled experiment;
- deliberate `CAUTION` / `BETA` outcomes exist where the evidence is insufficient;
- rescue-in-progress has only three supported cases: fast proofing, steamer queue, clearly dry/stiff dough.

## Scope / safety discipline
Current prototype is limited to freshly steamed, yeast-leavened wheat buns for the main diagnosis flow.

The system does not claim validated diagnosis for:
- frozen/reheated bao;
- gluten-free or sourdough-only bao;
- meat-filling food safety;
- several appearance-only / specialty-style branches.

## Commercial gate
This prototype is **not a product launch asset**.

Before commercial approval:
1. run user-path tests and count question depth;
2. replay more historical user cases against the actual UI;
3. verify that common paths resolve within roughly 3–5 meaningful questions after selecting the symptom;
4. improve visual references only after a node demonstrably benefits from a visual comparison;
5. only then decide whether the paid deliverable should be interactive web access, printable diagnostic cards, PDF, or a bundle.
