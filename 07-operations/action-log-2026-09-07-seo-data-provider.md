# Action Log — SEO Data Provider Discovery

Date: 2026-09-07

## Hypothesis / question
Can the remaining EXP-003 evidence gap (exact failure-query search volume) be filled with a structured SEO data provider instead of inference from public search snippets?

## Why this action now
EXP-003 has crossed the 30+ user-problem threshold and has a provisional 15/20 score. The key unresolved mandatory gate is quantitative Google demand for the troubleshooting keyword cluster.

## Action
Searched the available ChatGPT plugin directory for SEO/keyword-data providers.

## Evidence
Available integrations surfaced include:
- Semrush
- Ahrefs
- Serpstat
- other SEO/GSC-oriented tools

Semrush is explicitly described as providing structured keyword metrics, traffic, backlinks, and market data.

## Decision
Suggest/connect Semrush as the preferred next quantitative source.

## Evidence status
- FACT: a Semrush integration is available to connect.
- UNKNOWN: whether the user will authorize/connect it and whether the connected plan exposes all required keyword metrics.

## Next action
Once connected, run the full Bao failure-query cluster through Semrush and log volume, KD, CPC, intent, and related terms. Until then, keep `failure-cluster Google volume = UNKNOWN`.
