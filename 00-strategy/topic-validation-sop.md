# Topic Validation SOP — From Idea to Evidence-Backed Experiment

> Version: v1.0  
> Created: 2026-09-07  
> Purpose: Given **any topic idea**, validate whether it deserves time, content, SEO, productization, or paid-knowledge development before execution.

---

## 0. Core rule

We do **not** begin by making the product.

We begin by asking:

> Is there enough external evidence that a real audience has this problem, searches for it, talks about it, struggles with existing answers, and may pay for a better-organized solution?

Every major action follows this chain:

**Hypothesis → Evidence needed → Data collection → Cross-check → Observation → Decision → Next action → Log**

No step may silently convert a guess into a fact.

If evidence is missing, write **UNKNOWN** or **HYPOTHESIS**.

---

# 1. Input: define the topic without assuming the product

## Required input

A raw topic, for example:

- Bok Choy pest control
- Dog kidney disease meal planning
- Java interview preparation
- Backyard greenhouse frost protection

## First transformation

Rewrite the topic into a neutral problem statement:

> **Who has what problem, in what context, and what decision/result are they trying to reach?**

Do **not** decide yet whether the answer should be a PDF, website, SaaS, course, checklist, or template.

## Output

`topic-hypothesis.md` containing:

- raw topic
- target user hypothesis
- problem hypothesis
- context hypothesis
- expected outcome hypothesis
- unknowns

## Gate

If we cannot identify a plausible user + problem combination, stop or reframe before research.

---

# 2. Demand discovery: prove that people actively look for the problem

This stage answers:

> **Does demand exist outside our imagination?**

## 2.1 Google search demand — mandatory

Google is mandatory for every topic where search behavior is relevant.

### Query expansion

Build a query family from:

**Topic × symptom/problem × action × decision × audience × situation**

Example pattern:

- [topic] problem
- [topic] symptoms
- why is [topic] ...
- how to fix [topic] ...
- can I still ...
- what is causing ...
- best way to ...
- [topic] beginner
- [topic] mistakes

### Data sources

Preferred quantitative sources:

1. Google Keyword Planner
2. Ahrefs / Semrush / similar keyword database
3. Google Trends for trend and seasonality
4. Google autocomplete / related searches / People Also Ask for query language
5. Search Console later, after a site exists

### Required fields

For each keyword/cluster where data is available:

- query
- country / language
- monthly volume
- trend / seasonality
- CPC if available
- keyword difficulty if available
- search intent
- source and date checked

### Rule

Never judge market size from **one keyword**.

Calculate demand at the **cluster level**.

A niche may have no single large keyword but still have meaningful combined demand across dozens of long-tail queries.

## Gate

Classify demand as:

- **Strong** — multiple related queries with repeatable demand
- **Moderate** — smaller but coherent cluster
- **Weak** — very low volume / fragmented / hard to prove
- **Unknown** — quantitative data unavailable

Do not write a product solely because the topic appears in Google results.

---

# 3. SERP structure: prove we have a realistic entry point

This stage answers:

> **Even if people search, can a new entrant realistically get attention?**

## Action

Search representative queries manually and inspect the first page.

## Record

For each query:

- large authority sites
- government / university / medical / legal authority sites
- niche independent sites
- Reddit / forums
- YouTube
- marketplace/product pages
- weak pages / outdated pages
- ads
- page freshness
- whether recent/new independent sites rank

## Positive signals

Examples:

- independent low-authority sites rank
- Reddit / forum threads rank for solution-seeking queries
- search results are old or shallow
- multiple pages answer the question poorly
- user intent is strong but results are mostly generic
- new sites can enter the SERP

## Negative signals

Examples:

- entire first page dominated by official institutions or major brands
- free authoritative answer completely satisfies the task
- no meaningful information gap
- ranking requires credentials we cannot legitimately provide

## Gate

Label the SERP:

- **Open**
- **Competitive but penetrable**
- **Difficult**
- **Closed / not worth attacking**

---

# 4. User-language validation: prove people experience the problem in real life

This stage answers:

> **What do users actually complain about, ask, try, and fail at?**

## Sources

Use the most relevant communities for the niche, such as:

- Reddit
- Quora
- specialist forums
- Facebook groups where public access is available
- Stack Exchange / Stack Overflow
- Ask Extension / university Q&A systems
- YouTube comments
- product reviews
- app reviews
- marketplace reviews

Do not depend on one platform.

## Collection method

Prefer human-style review of public discussions, not bulk scraping.

For each qualified problem record:

- source URL
- date
- platform/community
- user wording
- context
- problem/symptom
- what they already tried
- what they are unsure about
- what decision they want to make
- emotional urgency / failure cost
- repeated follow-up questions
- cluster tag

## Minimum sample target

Before making a confident content/product decision:

**30–50 qualified real user questions** where feasible.

For very small niches, record the inability to reach this sample as a market-size warning rather than hiding it.

## What we are looking for

Repeated patterns such as:

- “I don’t know what this is.”
- “I tried X and it didn’t work.”
- “Which option should I choose?”
- “Can this still be saved?”
- “Is this safe?”
- “What should I do first?”
- “There is too much conflicting advice.”

## Gate

Require at least **3 repeated problem clusters** before moving from anecdote to a structured hypothesis.

---

# 5. Authority cross-check: separate user pain from factual truth

Community posts prove **pain**, not necessarily **correct solutions**.

Every important factual claim must be verified independently.

## Preferred source hierarchy

1. government / regulator / official statistical source
2. university Extension / academic institution / professional body
3. primary product/platform documentation
4. peer-reviewed research when appropriate
5. established specialist source
6. community discussion only for user language and lived experience

## Cross-check rule

For consequential factual claims:

- prefer one authoritative primary/official source;
- where practical, confirm with a second independent credible source;
- if credible sources conflict, record the conflict instead of choosing silently.

## Output

A `source-ledger.md` that connects claims to sources and dates.

---

# 6. Payment evidence: prove that people pay for the outcome or format

This stage answers:

> **Is there evidence of money moving in this neighborhood?**

Search the relevant commercial channels:

- Etsy
- Gumroad
- Amazon / Kindle
- Udemy
- Shopify stores
- paid newsletters
- industry marketplaces
- SaaS pricing pages
- affiliate-heavy sites
- niche-specific marketplaces

## Capture

- product title
- URL
- price
- review count
- review recency
- sales/bestseller indicators where available
- format
- promised outcome
- buyer complaints
- differentiation

## Important distinction

Payment evidence has levels:

### Level A — direct
People pay for almost the same problem/outcome.

### Level B — adjacent
People pay for the broader category or similar format.

### Level C — weak
Only free content exists; willingness to pay is unproven.

Never write “people will pay” when we only have Level B evidence.

---

# 7. Existing-solution gap: identify what is missing

This is where the opportunity is defined.

Ask:

- What do free results already solve well?
- Where are users still confused after reading them?
- Is information scattered across many sources?
- Are current paid products too generic?
- Are they organized by expert terminology rather than beginner symptoms?
- Are they outdated?
- Are they too long?
- Do they fail to help the user make a decision?
- Is localization / audience specificity missing?

## Rule

We do not sell “more information.”

We need an information advantage such as:

- faster diagnosis
- clearer decision path
- better visual organization
- trustworthy synthesis
- specific audience/context
- checklist / flowchart / sequence
- reduced uncertainty
- saved research time

## Output

One sentence:

> Existing solutions do X, but users still struggle with Y; our hypothesis is that Z organization/format can reduce that friction.

---

# 8. Audience-size check: avoid niches that are too narrow

A topic can be real and still be commercially too small.

Validate size through several independent proxies:

- keyword cluster volume
- Google Trends relative interest
- frequency/recency of community questions
- YouTube video views
- Pinterest content/save activity where relevant
- marketplace product count/reviews
- number of dedicated websites/newsletters/products
- broader parent-category demand

## Rule

Do not treat any single proxy as market size.

Example:

- few Reddit posts ≠ no demand
- many Google pages ≠ high demand
- one Etsy bestseller ≠ broad market

## Decision

Compare at least 2–4 scope levels where possible:

- narrow topic
- medium niche
- parent niche
- broad category

Example:

Bok Choy → Asian Greens → Brassicas → Vegetable Garden Pests

This avoids committing to a scope simply because it was the original idea.

---

# 9. Acquisition-path validation: know how users can realistically find us

Before building anything, identify at least one plausible acquisition path.

Possible channels:

- Google SEO
- Pinterest
- Reddit/community participation
- YouTube
- TikTok/Shorts
- newsletters
- affiliates
- marketplace search (Etsy/Amazon)

## Channel evidence

For each channel ask:

- Is the target audience present?
- Are similar topics getting views/saves/search traffic?
- Can a new account/site enter?
- What content format performs there?
- Is self-promotion restricted?
- Can content naturally lead to our product?

## Gate

At least one channel must have a credible acquisition hypothesis supported by observable evidence.

---

# 10. Economics: check whether the idea can work at small scale

Do not begin with “I want a million visits.”

Work backward from a small revenue test.

## Basic model

**Monthly revenue = qualified visits × conversion rate × average order value**

Use scenarios, not promises.

Example scenarios:

- conservative
- base
- optimistic

If traffic is likely small, the product needs either:

- higher buyer intent
- better conversion
- higher order value
- bundles / upsells
- multiple related products

Record assumptions explicitly.

---

# 11. Risk / credibility / compliance gate

Before product creation, inspect:

- medical / financial / legal risk
- pesticide / food safety / health claims
- licensing / professional qualification requirements
- copyright
- platform rules
- payment restrictions
- refund expectations
- tax / regional restrictions where material

## Rule

If the product requires pretending to have expertise we do not have, reject or redesign it.

We may act as researchers/curators only when the value proposition honestly reflects that role.

---

# 12. Scoring: convert evidence into a comparable decision

Each dimension scores 0–2:

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| User specificity | vague | somewhat clear | precise user/context |
| Pain strength | weak | recurring | urgent / costly / high uncertainty |
| Payment evidence | none | adjacent | direct |
| Search evidence | none | modest | strong cluster |
| Competition structure | closed | mixed | clear gap |
| Real-user evidence | little | some | repeated clusters |
| Deliverability | difficult | possible | simple MVP |
| Acquisition | unclear | one weak path | credible path(s) |
| Compliance | high risk | manageable | low risk |
| Economics | poor/unknown | plausible | attractive |

**Maximum: 20**

Suggested interpretation:

- **16–20** → proceed to minimal commercial validation
- **13–15** → promising; gather missing evidence first
- **10–12** → research only / test a free asset before paid build
- **<10** → reject, broaden, narrow, or change angle

Scores never override a fatal compliance or credibility problem.

---

# 13. Decision outcomes

Every validation round must end in exactly one of these:

## PROCEED
Evidence supports the current scope.

## PIVOT-NARROW
Demand exists but a more specific problem has stronger intent.

## PIVOT-BROADEN
Problem is real but the initial scope is too small.

## HOLD
Evidence is incomplete; define exactly what data is missing.

## REJECT
Data does not justify further work.

Do not end with “maybe.”

---

# 14. Only after validation: choose the smallest commercial test

Do not automatically create a large product.

Choose the cheapest artifact capable of testing willingness to engage or pay:

- 1 SEO page
- 1 printable cheat sheet
- 1 checklist
- 1 decision tree
- 1 mini PDF
- 1 paid download
- 1 landing page with preorder/waitlist

The purpose is to obtain behavioral evidence:

**impression → click → engagement → download → email → checkout → payment**

A real stranger paying is stronger evidence than surveys, likes, or AI scores.

---

# 15. Logging protocol — mandatory

Every research/operational action must be reproducible.

Use this template:

```md
## [timestamp] Action title

### Hypothesis / question
What are we trying to learn?

### Why this action now
Which previous evidence made this the next logical action?

### Action
What exactly was searched/read/compared?

### Sources
URLs / tools / date checked.

### Raw evidence
Numbers, SERP observations, user questions, prices, reviews, etc.

### Observation
What does the data show without interpretation?

### Interpretation
What may it mean?

### Confidence
Low / Medium / High.

### Decision
Proceed / Pivot / Hold / Reject.

### Next evidence needed
What must be proven before the next action?
```

## Never log only the conclusion

Bad:

> Bok Choy has demand, so we will make a PDF.

Good:

> 12 community questions show repeated symptom confusion; Extension confirms common pest categories; Etsy proves adjacent paid printable demand; exact Bok-Choy keyword volume remains unknown. Therefore do not make the PDF yet; next action is cluster-level Google demand validation.

---

# 16. Evidence status labels

Every important statement in research notes should be mentally or explicitly classified as:

- **FACT** — directly supported by reliable evidence
- **OBSERVATION** — directly observed in search/community/marketplace data
- **INFERENCE** — interpretation of observations
- **HYPOTHESIS** — testable idea not yet validated
- **UNKNOWN** — missing evidence

This prevents AI-generated confidence from becoming fake certainty.

---

# 17. Minimum validation checklist

Before building a paid knowledge product, answer all of these:

- [ ] Can we clearly describe the target user?
- [ ] Can we clearly describe the problem and desired decision/result?
- [ ] Did we verify Google/search demand at cluster level?
- [ ] Did we inspect the SERP manually?
- [ ] Did we collect real user language from more than one source where possible?
- [ ] Do we have repeated problem clusters?
- [ ] Did authoritative sources confirm the factual problem domain?
- [ ] Did we verify direct or adjacent payment evidence?
- [ ] Did we identify a clear gap in existing free/paid solutions?
- [ ] Did we compare narrow vs broader scopes?
- [ ] Do we have at least one evidence-backed acquisition channel?
- [ ] Is the product legally/compliantly deliverable?
- [ ] Can we build the first test cheaply?
- [ ] Did we record assumptions and economics?
- [ ] Did we assign a score and explicit decision?
- [ ] Is every step logged?

If several boxes remain unchecked, the correct action is usually **more validation**, not product creation.

---

# 18. Example: how EXP-001 fits this SOP

Raw topic:

> Bok Choy pest control

What happened:

1. Community discussions proved recurring real-world pest confusion.
2. University/Extension sources confirmed the problem domain and common pest categories.
3. Etsy provided adjacent evidence that garden pest decision printables are sold.
4. Google/SERP checks showed real content competition but did not yet prove Bok-Choy-only demand size.
5. Therefore the project did **not** jump directly to PDF production.
6. The next evidence requirement became cluster-level search demand and scope comparison:
   - Bok Choy
   - Asian Greens
   - Brassicas
   - Vegetable Garden Pests

This is the intended behavior of the SOP: **evidence is allowed to change the original topic.**

---

# 19. The principle to preserve across all future experiments

The deliverable is not merely a product.

The real reusable asset is a repeatable system that can answer:

> Given a random topic, can we cheaply determine whether it is worth pursuing before spending significant time or money?

Therefore the validation process itself is part of the product of this experiment.
