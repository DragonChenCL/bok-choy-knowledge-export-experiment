# Action Log — Free Keyword Path Run

Date: 2026-09-07
Experiment: EXP-003 Bao / Steamed Bun Failure Diagnosis

## Hypothesis / question
Can the proposed free keyword-data stack provide enough quantitative evidence to validate Bao failure-search demand without buying Semrush API units?

## Why this action now
The prior EXP-003 scorecard was blocked mainly by one UNKNOWN: exact monthly demand for the failure-keyword cluster. The user explicitly requested that the free validation path be executed.

## Actions
1. Opened and inspected WordStream Free Keyword Tool.
2. Opened and inspected Ahrefs Free Keyword Generator.
3. Opened and inspected KeywordTool.io Google search-volume tool and API docs.
4. Opened and inspected SearchVolume.io.
5. Tested Google Trends access for Bao terms.
6. Searched public web indexes for Bao keyword-volume data and trend proxies.
7. Re-ran representative failure SERPs to verify recurrent search intent.
8. Recorded all unavailable metrics as UNKNOWN rather than estimating them.

## Raw evidence
- WordStream publicly states first 25 keyword metrics are free and that its volume data is sourced through Google's keyword research API.
- Ahrefs publicly states its free generator provides local/global monthly volume estimates using clickstream data.
- KeywordTool.io publicly exposes a volume checker; its API requires an API key.
- SearchVolume.io publicly exposes a free bulk form and states its estimates use its own tools plus third-party data.
- Current chat web tooling could read all four public pages but could not submit their dynamic forms.
- Public indexed Semrush evidence: `bao buns` US June 2026 volume ~60,500/month, CPC ~$0.35, informational intent.
- Glimpse public page: `Bao Bun` ~196K current searches/month, +11% YoY; methodology/geography differs from Semrush.
- MerchantWords Amazon US public indexed data: `bao bun steamer` ~2,200/month, `bao steamer` ~1,800/month, `bao steamer basket` ~1,300/month.
- Exact failure queries continue to return multiple independent FAQ/troubleshooting pages.

## Observation
The free path is useful, but not all free tools are programmatically usable in the current chat environment. It can still provide strong parent-market, trend, commercial-intent and SERP evidence without paid APIs.

## Interpretation
For a low-cost experiment, requiring paid API data before running any behavioral test would be excessive. Exact long-tail volume improves forecasting but is weaker evidence than real user behavior once a minimal asset can be shipped cheaply.

## Confidence
Medium-high for parent-market demand; medium for failure-cluster demand; low for exact failure-cluster monthly volume.

## Decision
Continue EXP-003 without purchasing paid API units. Keep exact long-tail volume marked UNKNOWN. Do not use arbitrary estimates based on the head keyword.

## Next evidence needed
Create the smallest valid behavioral test only after the remaining SOP gates are reviewed; measure real impressions/clicks/downloads/payments and later use precise keyword data only if needed for scaling/forecasting.
