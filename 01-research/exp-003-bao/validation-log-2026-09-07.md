# EXP-003 Validation Log — Bao / Steamed Bun Failure Diagnosis

Date: 2026-09-07
Status: validation in progress

## Step 1 — Validate parent-market demand

### Hypothesis / question
Is the broader bao / steamed-bun market large enough that a failure-diagnosis niche could plausibly exist inside it?

### Why this action now
EXP-001 (Bok Choy) showed that a real problem can still be too small. Before studying failure sub-queries, confirm the parent market is not tiny.

### Action
Checked current public keyword / search / content signals for `bao buns`, plus recent content and YouTube view counts.

### Sources checked
- Semrush public overview for tablefortwoblog.com (US, June 2026): https://www.semrush.com/website/tablefortwoblog.com/overview/
- MerchantWords UK keyword page: https://www.merchantwords.com/search/uk/buns
- Future of Frozen Food 2025 report (Circana-backed market trend context)
- YouTube: Seonkyoung Longest, "The BEST Bao Steamed Buns Recipe"
- YouTube: Magic Ingredients, "Steamed Buns"
- Babish bao recipe page / video view counter
- Glasp mirror for Joshua Weissman steamed pork bao video view count

### Raw evidence
- Semrush public page reports `bao buns` at **60,500 US monthly search volume** in June 2026, informational intent, CPC $0.35.
- MerchantWords UK page reports `bao buns` appearing as an evergreen Amazon query with recent search count shown around **3,500** on that page.
- Circana-derived 2025 frozen-food report described bao buns as the fastest-growing global street-food format in its tracked US frozen category, +583% volume sales from Oct 2022 to Oct 2024.
- Seonkyoung Longest bao recipe YouTube video: ~**1.73M** views.
- Magic Ingredients steamed buns video: ~**2.22M** views.
- Joshua Weissman steamed BBQ pork buns video: ~**3.1M** views (secondary indexed source).
- Babish bao page shows ~**10.49M** views for the associated video/page counter.

### Observation
The parent topic is clearly not microscopic. Search and video consumption are material, and bao has broad food-interest momentum.

### Interpretation
The parent-market-size problem that weakened Bok Choy is less concerning here. This does **not** prove that troubleshooting queries are large enough or that a paid troubleshooting product will sell.

### Confidence
High for parent-market demand; low/unknown for failure-subcluster demand.

### Decision
Proceed to failure-query / SERP validation.

### Next evidence needed
Exact or proxy demand for failure-focused queries such as `wrinkled`, `collapsed`, `dense`, `not fluffy`, `proofing`, `flat`, etc.

---

## Step 2 — Inspect failure-query SERPs

### Hypothesis / question
Are users searching for specific bao failures, and are those questions served by dedicated strong competitors or only scattered FAQ sections?

### Action
Searched representative failure phrases including:
- why are my bao buns not fluffy
- bao buns collapsed after steaming
- steamed buns wrinkle / wrinkled
- bao buns dense
- bao dough not rising
- bao buns flat
- bao buns yellow spots
- bao proofing

### Raw observation
Search results repeatedly surfaced:
- recipe pages with small troubleshooting FAQ sections;
- small/niche recipe sites;
- YouTube explanations;
- community/forum discussions;
- few obvious dedicated troubleshooting brands or standalone decision products.

Examples observed:
- Dished by Kate: `Why are my bao buns not fluffy?` inside a general bao recipe FAQ.
- Wagamama: `why are my bao buns not fluffy?` inside its steamed-bun FAQ.
- Jenn Smith: `Bao Bun Troubleshooting & FAQ` embedded in a recipe page.
- What To Cook Today: troubleshooting section for dense / not-fluffy steamed buns.
- ChefSteps community: user troubleshooting dense/lumpy bao dough.
- Fresh Loaf (Mar 2026): user asks about over-proofing after a failed char siu bao batch.

### Observation
Failure intent is real enough to produce recurring search results, but supply appears fragmented and mostly embedded inside recipe content rather than dominated by dedicated troubleshooting properties.

### Interpretation
Potential information-architecture gap: `failure -> diagnosis -> corrective action` may still be underserved as a standalone experience.

### Important UNKNOWN
We do **not** yet have reliable monthly keyword volume for the failure queries. Parent keyword volume cannot be substituted for subquery volume.

### Confidence
Medium.

### Decision
Continue validation; do not build.

---

## Step 3 — Validate current real-user pain

### Hypothesis / question
Are people still experiencing these failures in 2026, and do the questions map to repeatable diagnostic patterns?

### Sources checked
- Reddit r/Baking (Aug 13, 2026): https://www.reddit.com/r/Baking/comments/1vnd77a/what_causes_steamed_buns_to_wrinkle_up_like_this/
- Reddit r/chinesecooking (Apr 26, 2026): https://www.reddit.com/r/chinesecooking/comments/1sw77vh/rate_my_bao/
- Fresh Loaf (Mar 27, 2026): https://www.thefreshloaf.com/node/79617/how-does-timing-when-you-add-yeast-affect-dough-also-few-questions-over-proofing
- ChefSteps Community: https://community.chefsteps.com/discussion/10336/help-with-bao-buns

### Raw evidence
- Aug 2026 Reddit post asking why one bun in a batch wrinkles received ~**474 upvotes**. Highly upvoted replies proposed opening the lid too quickly (~491) and condensation droplets (~423).
- Apr 2026 Reddit user reported dough becoming very dry, needing repeated water additions, buns only partly fluffy, and shape not holding.
- Mar 2026 Fresh Loaf user reported badly over-proofed char siu bao after following generic internet proofing advice.
- ChefSteps user reported repeated attempts with dense/lumpy bao dough and uncertainty about over/under-kneading and flour choice.

### Observation
The recurring problem is not simply `give me a recipe`; it is `my result differs from expected and I do not know which process variable caused it`.

### Interpretation
This is compatible with a decision-support product rather than another recipe PDF.

### Confidence
Medium-high for pain existence; still low for market size and willingness to pay.

---

## Step 4 — Check paid-product competition

### Hypothesis / question
Is there already a mature paid category specifically for bao-failure troubleshooting?

### Sources checked
Etsy / Gumroad / Amazon-focused web searches for:
- bao recipe pdf
- bao troubleshooting printable
- steamed bun troubleshooting pdf
- bao digital guide

### Raw evidence
Observed Etsy listings mainly sell ordinary recipe PDFs, e.g.:
- `Cheat Bao (bun) Recipe | Easy Homemade Steamed Buns | Digital Download` — $4.53.
- Vegan shiitake bao recipe PDF — roughly $1.94–$3 equivalent depending locale.
- Other bao-related Etsy hits were recipe PDFs or unrelated crochet patterns.

### Observation
During this scan, no obvious mature category of `Bao Troubleshooting Flowchart / Failure Diagnosis / Rescue Kit` surfaced.

### Important wording
This is **not proof that no competitor exists**. Correct statement: `no obvious mature paid troubleshooting category surfaced in this validation batch`.

### Interpretation
Competition appears lighter than sourdough troubleshooting, but direct payment evidence for failure diagnosis is currently weak.

### Confidence
Medium-low.

### Decision
Keep candidate alive; payment evidence remains a major gap.

---

## Step 5 — Validate cross-market knowledge-source advantage

### Hypothesis / question
Does Chinese steamed-bread research contain structured process knowledge that could create a source advantage after localization?

### Sources checked
- Journal of Cereal Science / ScienceDirect: optimized northern-style Chinese steamed bread processing.
- PMC / Jiangnan University-related Chinese steamed bread research.
- Oxford Academic / International Journal of Food Science and Technology.
- ScienceDirect research on sourdough addition and Chinese steamed bread quality.

### Raw evidence
Published research treats proof temperature, humidity, flour properties, sheeting, proof time and steaming as measurable process variables.
Examples include experimental procedures using proofing around 30–35°C and 75–95% RH, with sheeting/proofing/steam parameters explicitly controlled. One classic response-surface study identifies sheeting as a critical processing variable.

### Observation
There is a substantial technical literature around Chinese steamed bread that goes beyond typical English recipe FAQs.

### Interpretation
Potential source advantage exists, but research conditions cannot be copied directly into home-kitchen advice. US/UK flour, yeast forms, climate, steamer hardware and target bao style require localization.

### Confidence
High that technical source material exists; low until we map it to specific home-user failures.

### Decision
Proceed to structured failure taxonomy + localization map.

---

# Current status after Batch 1

## FACT
- Parent `bao buns` search market is materially larger than Bok-Choy-only.
- Bao/steamed-bun videos can attract large audiences.
- 2026 users still report concrete texture/proofing/steaming failures.
- Generic paid bao recipe PDFs exist.
- Chinese steamed-bread technical research exists.

## OBSERVATION
- Failure answers are often fragmented inside recipe FAQ sections.
- This scan did not surface a mature paid troubleshooting-product category.

## UNKNOWN
- Aggregate monthly Google search volume for the failure-query cluster.
- Conversion willingness for a troubleshooting-only knowledge product.
- Whether a free diagnostic chart alone satisfies most users.
- Whether Pinterest / YouTube Shorts can acquire traffic efficiently for this problem.

## Working decision
**HOLD / CONTINUE VALIDATION.** Candidate remains stronger than Bok Choy, but it has not passed the full SOP.
