# EXP-003 — Search Demand Status Batch 03

Date: 2026-09-07

## Goal
Separate what we actually know about demand from what is still unknown, without substituting parent-category volume for failure-intent volume.

## Confirmed quantitative proxies

### Google parent-market proxy
Public Semrush organic-keyword data for a ranking recipe site shows:
- `bao buns`
- United States
- June 2026
- estimated Google monthly volume: **60,500**
- informational intent
- CPC shown around **US$0.35**

Source:
https://www.semrush.com/website/tablefortwoblog.com/overview/

**Interpretation:** strong parent-topic interest. This is NOT the volume for troubleshooting queries.

### Amazon / marketplace intent proxy — UK
MerchantWords public UK keyword result surfaced `bao buns` as an evergreen/current grocery query with a current volume field around **3,500**, with 3-month / 12-month fields also in the low-thousands range.

Source:
https://www.merchantwords.com/search/uk/buns

**Interpretation:** consumers actively search for Bao as a purchasable/food concept outside Google as well. This remains a marketplace-interest proxy, not troubleshooting demand.

### Amazon / equipment intent proxy — US
MerchantWords reverse-keyword data for a bamboo steamer product surfaced:
- `bao bun steamer` ~2,200
- `bao steamer` ~1,800
- `bun steamer for home` ~1,400
- `bao steamer basket` ~1,300

Source:
https://www.merchantwords.com/asin/us/B0GV93R43F

**Interpretation:** there is a non-trivial home equipment ecosystem around making bao/dumplings. This supports a home-cook audience but does not directly prove troubleshooting traffic.

## Search-result evidence for failure intent

Exact failure queries repeatedly return dedicated FAQ sections, videos and recent articles for:
- why are my bao buns not fluffy
- why do bao buns collapse after steaming
- steamed buns wrinkled
- dense steamed buns
- bao proofing problems

Examples include:
- Dished by Kate: dedicated `Why are my bao buns not fluffy?` FAQ
- Wagamama: dedicated `why are my bao buns not fluffy?` FAQ
- YouTube video explicitly titled `Why are my Bao buns not fluffy?`
- multiple 2026 recipe/blog pages with troubleshooting sections

This confirms the language exists as an indexed search intent, but still does not provide reliable exact monthly volume.

## Mandatory UNKNOWN

As of this batch, we still do **not** have trustworthy quantitative Google volume for the combined failure cluster:

- `bao buns not fluffy`
- `bao buns collapse after steaming`
- `steamed buns wrinkled`
- `bao buns dense`
- `bao proofing`
- related long tails

Therefore:

> `Google failure-cluster demand = UNKNOWN quantitatively`

## Evidence rule

Do not use:
- 60,500 parent-topic Google volume;
- Amazon bao/equipment searches;
- recipe-page traffic;
- Reddit upvotes

as a substitute for exact troubleshooting Google volume.

They are independent proxies only.

## What this means for the experiment

The market is clearly not “too small because nobody knows Bao.” The unresolved question is narrower:

> Is the subset of users actively seeking failure diagnosis large enough to acquire profitably through SEO/content?

## Next best evidence paths

Priority order:
1. Google Keyword Planner export for the full failure-query cluster;
2. Ahrefs/Semrush keyword batch export;
3. if quantitative tools remain unavailable, publish a very small free diagnostic asset/page and use impressions/clicks as behavioral evidence rather than inventing volume.

Current decision remains **HOLD / continue validation**.
