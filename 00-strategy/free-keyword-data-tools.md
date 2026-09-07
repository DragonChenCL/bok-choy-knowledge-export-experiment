# Free Keyword / Search-Demand Data Tools

> Purpose: provide a repeatable, low-cost way to validate search demand before paying for Semrush/Ahrefs APIs.

## Core principle

No single free tool should be treated as ground truth. Use at least 2–3 sources and classify each metric by origin:

- **Official Google data** — direct Google source, but often normalized or range-limited.
- **Google Ads API-derived** — third-party interface presenting Google advertising keyword data.
- **Third-party estimate** — modeled from clickstream or proprietary datasets.
- **Search-language proxy** — autocomplete/PAA/related searches; useful for wording and intent, not exact demand size.

## Recommended free stack

### 1. Google Trends

URL: https://trends.google.com/

Use for:
- relative interest over time
- seasonality
- country / region comparison
- related and rising searches

Important limitation:
- Trends is normalized, not an exact monthly-search-volume tool.
- A score of 100 means peak relative interest in the selected comparison, not 100 searches.

Best use in topic validation:
- compare candidate topics
- identify seasonal demand
- compare US / UK / AU / CA interest
- confirm whether a topic is stable, rising, falling, or too sparse

### 2. Google Keyword Planner

URL: https://ads.google.com/home/tools/keyword-planner/

Use for:
- Google monthly-search estimates
- keyword ideas
- advertising competition
- bid / cost estimates

Important limitations:
- requires a Google Ads account and account setup/billing information;
- low-spend accounts may see broad ranges rather than exact values.

Evidence status: official Google source.

### 3. WordStream Free Keyword Tool

URL: https://www.wordstream.com/keywords

Use for:
- keyword ideas
- search-volume data
- CPC
- competition
- location filtering

Current free behavior checked 2026-09-07:
- first 25 keyword rows visible immediately;
- full list can be sent as CSV after providing an email;
- tool states its search-volume data is sourced from Google's keyword research API.

Best use:
- fast free quantitative cross-check when Keyword Planner is inconvenient.

### 4. Ahrefs Free Keyword Generator

URL: https://ahrefs.com/keyword-generator/

Use for:
- keyword expansion
- question keywords
- related phrases
- local/global monthly volume estimates

Important limitation:
- Ahrefs states these metrics are powered by its own clickstream/database data; treat as a third-party estimate rather than official Google volume.

Best use:
- discover long-tail clusters and compare relative demand.

### 5. KeywordTool.io Search Volume Checker

URL: https://keywordtool.io/search-volume/google

Use for:
- Google search-volume checks
- keyword suggestions
- location/language targeting

Current free behavior checked 2026-09-07:
- accepts up to 1,000 keywords per list;
- limited free search-volume data is shown;
- full volume/CPC/competition/trend data requires Pro;
- site states Google volume originates from the Google Ads API.

Best use:
- spot-check the highest-priority query list.

### 6. SearchVolume.io

URL: https://searchvolume.io/

Use for:
- bulk keyword monthly-volume checks
- quick export

Important limitation:
- this is not an official Google source;
- the site says it uses its own methods and third-party purchased datasets.

Best use:
- supplementary cross-check only; never make a go/no-go decision from this number alone.

## Free Google SERP proxies (no exact volume)

Also record:

- Google autocomplete suggestions
- People Also Ask
- related searches
- number/type/freshness of dedicated pages ranking
- Reddit/forum pages appearing in SERP
- whether recent independent sites can rank

These do not prove volume, but they are powerful intent and competition evidence.

## Suggested validation protocol

For every candidate keyword cluster:

1. Generate the query family using Google autocomplete / SERP / Ahrefs free generator.
2. Check seasonality and regional demand in Google Trends.
3. Run top queries through WordStream.
4. Spot-check important queries in KeywordTool.io and/or SearchVolume.io.
5. Use Google Keyword Planner when exact/range official Google metrics materially affect the decision.
6. Record disagreements rather than averaging them silently.

## Confidence rules

### Strong quantitative signal
At least two independent tools agree on the order of magnitude, plus Google Trends/SERP behavior is consistent.

### Moderate signal
Only one quantitative source is available, but multiple SERP/community proxies agree.

### Weak signal
Only autocomplete/SERP results exist with no quantitative support.

### Unknown
Tools return no reliable data or disagree dramatically.

## EXP-003 note

For Bao / steamed-bun troubleshooting, the next free-data pass should run these clusters through WordStream + Ahrefs Free Keyword Generator + KeywordTool.io/SearchVolume.io where accessible:

- bao buns not fluffy
- steamed buns not fluffy
- bao buns dense
- bao buns doughy
- steamed buns wrinkled
- why are my steamed buns wrinkled
- bao buns collapse after steaming
- steamed buns collapse
- bao proofing
- bao overproofed
- bao underproofed
- steamed buns not rising
- bao buns tough

Do not substitute the broad `bao buns` volume for the troubleshooting-cluster volume.
