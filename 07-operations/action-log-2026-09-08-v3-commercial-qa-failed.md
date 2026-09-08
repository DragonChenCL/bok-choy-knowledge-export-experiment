# Action Log — Bao Rescue v3 Commercial QA Failed

Date: 2026-09-08
Status: FAIL

## Trigger
User reviewed `bao-rescue-photo-guide-v3.pdf` and reported:
- multiple text-overlap / layout issues;
- content still did not feel sellable.

## QA findings after page-by-page review
1. **Page 2 layout collision:** several symptom titles visually overlap or sit too close to the image/card boundary, reducing readability.
2. **Image-to-label mismatch risk:** some generated reference images are not diagnostic enough for the assigned symptom; the "normal" reference also does not consistently look like an ideal control image.
3. **Weak diagnostic specificity:** many recommendations remain generic (for example, "check proofing", "check yeast", "change one variable") and do not provide enough concrete differentiation between similar failure modes.
4. **Insufficient paid-product delta:** a buyer could still obtain much of the current advice from free recipe FAQs and troubleshooting posts. The product does not yet compress enough uncertainty or save enough time to justify the proposed paid price.
5. **AI-reference-photo limitation:** generated images are useful as illustrations, but they must not create false precision. A paid diagnostic guide needs stronger visual comparison logic and explicit uncertainty handling.
6. **Commercial usability failure:** current v3 should not be listed for sale.

## Decision
- Mark v3 as **NOT FOR SALE**.
- Keep v3 in the repository only as a retrospective artifact.
- Do not proceed to checkout integration yet.

## v4 requirements
A future v4 must be rebuilt around decision value, not page count:
- 4–6 highest-frequency failure modes only;
- each mode starts with `looks like / does NOT look like` visual comparison;
- side-by-side normal vs failure references;
- differentiating questions that separate adjacent causes;
- ranked causes with confidence levels;
- concrete checks using observable signals (time, temperature, size change, finger-test behavior, dough feel, condensation evidence, etc. where evidence supports them);
- one next-batch experiment with a clearly stated expected result;
- no overlapping text, no crowded atlas cards, and full render QA before release;
- final paid-product test must answer: `What uncertainty does this remove that free Google results do not?`

## Commercial rule added
A knowledge product is not sale-ready merely because:
- the information is mostly correct;
- the PDF is visually nicer than a text document;
- AI-generated photos are present.

It must materially reduce the buyer's decision time and uncertainty compared with free search.
