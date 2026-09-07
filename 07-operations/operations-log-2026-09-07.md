# Operations Log — 2026-09-07

Purpose: record **every material action**, its prerequisite evidence, output, and reason for the next step.

## O001 — Initialize experiment repository

**Action:** Created project README and repository structure description.

**Prerequisite evidence:** User explicitly chose Bok Choy pest rescue as EXP-001 and required evidence-first execution plus full logs.

**Output:** `README.md`

**Reason for next step:** Before research, define evidence rules so later decisions cannot silently rely on model memory.

---

## O002 — Define evidence standard

**Action:** Added evidence tiers, cross-check rules, and safety boundary.

**Prerequisite evidence:** The subject includes agricultural pest management; inaccurate treatment advice can damage crops or conflict with local rules.

**Output:** `00-strategy/evidence-standard.md`

**Reason for next step:** With the standard fixed, validate the actual existence of repeated user problems.

---

## O003 — Search current public user discussions

**Action:** Used web search to discover and read public Reddit discussions about bok choy pest/damage problems.

**Prerequisite evidence:** Gavin-style method requires direct user language and repeated pain, not AI-generated pain points.

**Observed examples:**
- users report leaves/centers being eaten while seeing no pest;
- beginners ask whether damage is serious;
- users ask whether badly damaged plants can recover or should be pulled;
- repeated aphid questions;
- examples of users trying online remedies that did not work or harmed crops.

**Output:** initial findings recorded in `01-research/research-log-2026-09-07.md` and later in `01-research/pain-points-batch-01.md`.

**Reason for next step:** Community anecdotes must be cross-checked against authoritative agricultural sources before shaping factual product guidance.

---

## O004 — Cross-check pest categories with authoritative sources

**Action:** Searched current university Extension/agricultural sources for bok choy / brassica pests.

**Prerequisite evidence:** Reddit can identify user problems but is not reliable enough for factual pest-treatment guidance.

**Observed cross-source overlap:** aphids, flea beetles, caterpillars/loopers/worms, slugs/snails and multiple diseases repeatedly appear in authoritative guidance.

**Output:** source entries in `01-research/source-ledger.md`.

**Reason for next step:** Problem existence alone does not establish that a paid PDF/printable format is commercially plausible.

---

## O005 — Validate paid digital-format evidence

**Action:** Searched current Etsy listings/market pages for pest-identification printables and decision guides.

**Prerequisite evidence:** The proposed business is knowledge export, not SaaS; we need proof that similar information is packaged and sold digitally.

**Observed evidence:**
- a current 7-page plant-pest diagnostic flowchart listed at $11.99;
- garden pest identification printables shown around $2.99–$9.99+;
- at least one $9.99 good-bug/bad-bug garden pest printable showed about 70 reviews in search results.

**Important limitation:** This proves **format/category activity**, not Bok-Choy-specific willingness to pay.

**Output:** `01-research/source-ledger.md`

**Reason for next step:** Because generic pest printables already exist, our value cannot be "a list of pests"; we need to identify a narrower decision problem.

---

## O006 — Create first keyword / intent map

**Action:** Organized observed phrases into search-intent clusters: broad pests, holes/chewing, flea beetles, aphids, caterpillars, slugs/night damage, recovery/save-vs-pull, prevention, yellowing/mixed symptoms.

**Prerequisite evidence:** Search results + direct user discussions showed symptom-first wording and decision questions.

**Output:** `03-seo/keyword-map-v0.md`

**Important limitation:** No reliable search-volume dataset has yet been collected, so this is an **intent map**, not a volume-ranked keyword plan.

**Reason for next step:** We need a larger direct-user sample before selecting the first SEO pages or lead magnet.

---

## O007 — Formalize EXP-001 and falsification conditions

**Action:** Created experiment card with user hypothesis, job-to-be-done, product hypothesis, evidence gaps, falsification conditions, and success ladder.

**Prerequisite evidence:** Initial problem evidence + authoritative confirmation + marketplace format evidence were sufficient to justify further validation, but not product production.

**Output:** `08-experiments/EXP-001-bok-choy.md`

**Reason for next step:** Keep the project from drifting into “build because we can.”

---

## O008 — Record decisions

**Action:** Logged four decisions:
1. Treat Bok Choy as an experiment, not a committed business.
2. Organize around symptoms/decisions, not pest taxonomy.
3. Do not create the paid PDF yet.
4. Avoid universal pesticide instructions in MVP.

**Prerequisite evidence:** Findings from O003–O007.

**Output:** `08-experiments/decision-log.md`

**Reason for next step:** Turn the next evidence gap into an explicit task.

---

## O009 — Create GitHub Issue #1

**Action:** Created issue to collect and cluster 30–50+ real Bok Choy pest questions.

**Prerequisite evidence:** Current sample was too small to rank problem clusters confidently.

**Output:** GitHub Issue #1: `EXP-001 next: collect and cluster 30–50 real Bok Choy pest questions`

**Reason for next step:** Directly fill the largest remaining demand-research gap.

---

## O010 — Collect pain-point batch 01

**Action:** Reviewed an additional set of public Reddit discussions and normalized 12 qualified question records.

**Prerequisite evidence:** Issue #1 requires a structured direct-user dataset; no bulk scraping is necessary.

**Observed multi-tag counts in this first batch:**
- identification / unknown cause: 7
- beginner / uncertainty: 6
- aphids: 5
- prevention / recurrence: 5
- unseen culprit: 4
- severity / recovery / save-vs-pull: 4
- treatment frustration / conflicting advice: 2
- mixed disease-vs-pest symptoms: 1

**Output:** `01-research/pain-points-batch-01.md`

**Provisional inference:** a symptom-first damage-triage asset appears more aligned with user language than a generic pest encyclopedia.

**Reason for next step:** Continue to 30–50+ questions and see whether this cluster pattern persists before choosing the first lead magnet or SEO pages.

---

## Current status at end of log

Completed:
- repository initialized;
- evidence standard established;
- authoritative source ledger started;
- paid-format evidence recorded;
- keyword/intent map v0 created;
- EXP-001 card + decisions created;
- GitHub Issue #1 created;
- 12-question first pain-point batch collected.

Not yet justified:
- writing the paid PDF;
- final pricing;
- buying a domain;
- building a website;
- selecting final SEO page list;
- committing to Pinterest/Reddit/other channel spend.

Next evidence target: **30–50+ qualified user questions + cluster counts + representative SERP review.**
