# Action Log — EXP-003 PDF Build + Launch Platform Gate

Date: 2026-09-07

## Action 1 — Build the real minimum deliverable

### Why now
Desk research had passed the internal threshold for moving into minimum commercial validation. A real checkout must not be connected to a fake or unfinished product.

### Input
- `02-product/exp-003-bao-rescue-content-v1.md`
- solution evidence matrix and VERIFY-closure notes
- MVP scope: wrinkled / collapse, dense / not fluffy, proofing uncertainty

### Output
Two actual customer-deliverable PDFs were generated:
- `bao-rescue-guide-v1.pdf` — 11 pages
- `bao-rescue-quick-diagnostic-v1.pdf` — 1 landscape A4 page

### Quality loop
The PDFs were rendered to PNG images before acceptance.

Initial render found two real layout failures:
1. the last rows of the quick diagnostic were pushed outside the printable page;
2. the final sources card on the guide overlapped the safety callout.

The files were regenerated with revised layout.

Second render / preflight result:
- guide: 11 pages, openable, not encrypted, no detected scanning issue;
- quick diagnostic: 1 page, openable, not encrypted;
- all quick-diagnostic rows visible;
- source cards no longer overlap;
- no visible clipping / black glyphs / broken layout in the reviewed render.

### Decision
PDF v1 accepted as a **minimum commercial-test deliverable**, not as a final long-term product edition.

---

## Action 2 — Make the PDF build reproducible in GitHub

### Why
A one-off file generated inside one AI session is not a maintainable product asset.

### Repository additions
- `scripts/generate_bao_pdfs.py`
- `requirements-bao.txt`
- `.github/workflows/generate-bao-pdfs.yml`

### Workflow behavior
On relevant source changes, GitHub Actions:
1. installs pinned ReportLab dependency;
2. regenerates the guide and quick diagnostic;
3. commits binary PDF deliverables into `06-assets/bao-rescue/` when output changes.

### Observed result
GitHub Actions run `Generate Bao Rescue PDFs` completed successfully.

Binary deliverables confirmed on `main`:
- `06-assets/bao-rescue/bao-rescue-guide-v1.pdf`
- `06-assets/bao-rescue/bao-rescue-quick-diagnostic-v1.pdf`

This changes the experiment from `AI created a file once` to `the repository can reproduce the product`.

---

## Action 3 — Re-evaluate Etsy as the launch checkout

### Why
Etsy had been used as adjacent payment evidence, but an experiment must distinguish `marketplace has buyers` from `operator can actually open a compliant shop`.

### Evidence
Current Etsy official documentation states:
- China is listed in Etsy Payments context for existing eligible shops;
- **new shops cannot currently open in China**;
- existing China sellers may continue using Etsy Payments / Payoneer where applicable.

### Decision
Etsy remains useful for:
- competitor observation;
- pricing evidence;
- listing visual research;
- digital-product category validation.

Etsy is **not** the default EXP-003 launch checkout for a new China-based shop.

---

## Action 4 — Evaluate Gumroad as first checkout candidate

### Evidence
Current Gumroad official documentation states:
- digital products can be sold without a monthly subscription;
- direct-link platform fee is currently 10% + $0.50 per transaction, excluding underlying processor fees;
- Gumroad acts as Merchant of Record for applicable digital-product sales-tax handling;
- payout route depends on country; where direct bank payouts are unavailable Gumroad states PayPal can be the payout path, subject to local / account eligibility.

### Test-price economics
At $6.90:
- Gumroad platform fee only: about $1.19;
- about $5.71 remains before payment-processor / payout-specific costs.

### Decision
Gumroad becomes the **preferred first checkout candidate**, provided the operator can complete legitimate payout / identity setup.

### Important classification
- platform fee: FACT from current official documentation;
- operator payout eligibility: UNKNOWN until account setup is completed;
- $6.90 willingness-to-pay: HYPOTHESIS.

---

## Next hard gate
The repository now has a real deliverable and a landing page.

The next experiment blocker is no longer product creation. It is:

> connect a legitimate real checkout URL and make the product instantly deliverable.

After that, the first traffic test can begin.
