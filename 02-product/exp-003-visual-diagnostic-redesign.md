# EXP-003 Visual Diagnostic Redesign

Date: 2026-09-07
Status: ACTIVE

## Trigger
User rejected Bao Rescue PDF v1 as commercially weak.

### Rejection reasons
1. Layout does not feel like a paid consumer product.
2. The guide contains almost no visual evidence.
3. A buyer with a failed batch needs to identify the visible symptom quickly, not read paragraphs.
4. The product promise should be: **see a failure pattern -> compare to a visual example -> check the likely causes -> change the next batch**.

## Decision
**PDF v1 is not approved for sale.**
Do not upload or sell the existing v1 as the commercial product.

The next version must be image-first.

## Product architecture v2

### Page 1 — Visual symptom grid
A buyer should be able to compare their bun with 6–9 large visual examples immediately:
- wrinkled / elephant skin
- collapsed after steaming
- dense / gummy crumb
- barely risen
- rough or pitted surface / condensation damage
- spreading / over-proofed shape
- cracked / torn skin
- uneven large bubbles

Each visual card contains only:
- WHAT IT LOOKS LIKE
- CHECK FIRST
- MOST LIKELY CAUSE FAMILIES
- NEXT BATCH: CHANGE ONE THING

### Pages 2–8 — One failure pattern per page
Each page should use approximately 60–70% visual area and 30–40% text.

Required blocks:
1. Large failure image / illustration.
2. Close-up callouts marking the visible symptom.
3. Side-by-side comparison with normal result where useful.
4. Cause ranking (high / medium / secondary confidence).
5. One controlled test for the next batch.
6. 'Don't change these yet' box to prevent multi-variable troubleshooting.

### Final page — Quick decision tree
A printable one-page flowchart designed to sit next to the kitchen.

## Visual-source rule
For the commercial product, do NOT randomly copy blog / Reddit / recipe-site photos.
Preferred order:
1. original photos produced for the project;
2. custom generated diagnostic illustrations clearly presented as illustrations;
3. licensed / permission-cleared photographs;
4. public-domain / explicitly reusable material where suitable.

Community photos can be used internally to discover failure patterns, not automatically republished in the paid guide.

## Quality bar
Before commercial approval, ask:
- Can someone identify their problem without reading more than 20–30 seconds?
- Does every major symptom have a visual reference?
- Is the page useful when printed?
- Does it look materially better than a free recipe FAQ?
- Is every troubleshooting claim linked to an evidence note?

If any answer is no, the product is not ready to sell.
