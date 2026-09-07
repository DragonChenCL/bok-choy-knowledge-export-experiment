# EXP-003 — Free Keyword Validation Path Run

Date: 2026-09-07
Scope: Bao / steamed bun failure-diagnosis keyword validation
Status: completed as far as current web environment permits

## Goal
Test the free keyword-data path proposed in `00-strategy/free-keyword-data-tools.md` using the same Bao failure cluster, and record both usable data and tool-access limitations.

## Seed / failure queries
- bao buns
- bao bun
- steamed buns
- mantou
- bao buns not fluffy
- why are my bao buns not fluffy
- bao buns collapsed
- bao buns collapse after steaming
- steamed buns wrinkled
- steamed buns dense
- bao buns proofing

---

## 1. WordStream Free Keyword Tool

### What was verified
- The public tool is live.
- It states that the first 25 keyword results and analytics are viewable for free.
- It states that data includes Google search volume, competition and CPC / top-page bid information.
- WordStream states that its keyword and search-volume data is sourced through Google's keyword research API.

### Execution result
The current ChatGPT web-search environment can read the public page but cannot submit the site's interactive JavaScript keyword form. Therefore no Bao-specific WordStream numbers were obtained.

### Evidence status
- Tool capability: FACT
- Bao-specific WordStream volume: UNKNOWN

---

## 2. Ahrefs Free Keyword Generator

### What was verified
- Public free keyword generator is live.
- It supports Google, Bing, YouTube and Amazon keyword ideas.
- It states that keyword results include local/global monthly search-volume estimates and other SEO metrics, powered by clickstream data.

### Execution result
The current web-search environment can read the form page but cannot submit the dynamic form, so Bao-specific Ahrefs free-tool results were not retrieved.

### Evidence status
- Tool capability: FACT
- Bao-specific Ahrefs volume/KD: UNKNOWN

---

## 3. KeywordTool.io

### What was verified
- Public Google search-volume checker exists.
- KeywordTool.io API documentation confirms Google search-volume support and up to 1,000 keywords per volume request.
- API access requires an API key/subscription.

### Execution result
The public page is interactive and the current web-search environment cannot submit the keyword form. The API route is not a free anonymous endpoint.

### Evidence status
- Tool capability: FACT
- Bao-specific KeywordTool.io volume: UNKNOWN

---

## 4. SearchVolume.io

### What was verified
- Public page states users can submit a keyword list and receive average monthly search volume.
- It states that values are estimates based on its own tools and third-party purchased data, not direct Google-only numbers.
- It supports English US among many locales.

### Execution result
The current web-search environment can read the page but cannot submit the interactive form.

### Evidence status
- Tool capability: FACT
- Bao-specific SearchVolume.io volume: UNKNOWN

---

## 5. Google Trends

### Execution result
The Google Trends landing page is publicly readable, but custom interactive comparison URLs could not be executed reliably in the current web-search environment. No fabricated trend score was recorded.

### Evidence status
- Exact US 5-year comparison for failure terms: UNKNOWN

### Additional public trend proxy
Glimpse has a public indexed page for `Bao Bun` showing:
- current search-interest volume: ~196K searches/month
- YoY growth: +11%

Important: Glimpse's geography/scope is not directly equivalent to Semrush US Google volume and must not be merged numerically with it.

---

## 6. Public indexed SEO / search-demand evidence that DID return numbers

### Semrush public indexed page
For `bao buns` in the United States, June 2026:
- Volume: 60,500/month
- CPC: $0.35
- Intent: Informational

This came from a publicly indexed Semrush domain-overview page for a ranking recipe site, not from the Semrush MCP API.

### MerchantWords — Amazon US intent proxy
Current public indexed data shows:
- `bao bun steamer`: ~2,200/month
- `bao steamer`: ~1,800/month
- `bao steamer basket`: ~1,300/month
- `bamboo steamer`: ~27,800/month

These are Amazon searches, NOT Google searches. They are used only as a proxy that a meaningful subset of people are actively buying equipment to make steamed foods / bao at home.

### Glimpse trend proxy
Public indexed page for `Bao Bun`:
- ~196K current searches/month
- +11% YoY

Again: source methodology/geography is different and should be treated as a macro-demand proxy rather than merged with Semrush.

---

## 7. Google / web SERP qualitative demand evidence

Exact failure queries return dedicated or FAQ-style answers across multiple independent domains, including:
- `why are my bao buns not fluffy`
- `bao buns collapse after steaming`
- `steamed buns wrinkled`
- `bao buns dense`
- `bao buns proofing`

The result structure includes:
- Wagamama FAQ
- Dished by Kate FAQ
- School of Wok FAQ
- Red House Spice troubleshooting
- newer niche cooking sites with dedicated troubleshooting sections

Observation: the failure intent is sufficiently recurrent that multiple recipe publishers have created dedicated FAQ/troubleshooting content around it.

This proves search intent and content demand, but does NOT provide exact monthly volume for the failure cluster.

---

## 8. What we can and cannot conclude

### FACT / strong observation
- `bao buns` is a materially sized US Google head term (public Semrush: 60,500/month).
- Bao-related home-steaming equipment has non-trivial Amazon search demand.
- Multiple independent sites rank content specifically answering failure questions.
- The Bao topic has positive broader trend signals.

### UNKNOWN
We still do not have trustworthy exact Google monthly volumes for the long-tail failure queries themselves because the free interactive keyword tools could not be submitted programmatically from the current chat web environment.

### Important rule
Do NOT estimate the failure cluster by applying an arbitrary percentage to the 60,500 head-term volume.

---

## Decision
**Continue validation / low-cost commercial test remains plausible.**

The lack of exact long-tail volume is not a reason to buy paid API data yet because:
1. parent demand is clearly non-trivial;
2. real-user failure evidence exceeds 30 qualified examples;
3. failure SERPs exist across multiple independent sites;
4. adjacent paid digital-product evidence exists;
5. the minimum commercial test can be extremely cheap.

However, exact long-tail search volume remains an explicit uncertainty in any financial forecast.

## Next evidence needed
- If a precise traffic forecast becomes necessary, obtain direct keyword-tool output manually or via an authorized browser/API.
- Before that, prioritize a minimal behavioral test that can produce stronger evidence than modeled keyword volume: impressions -> clicks -> engagement -> email/download -> checkout/payment.
