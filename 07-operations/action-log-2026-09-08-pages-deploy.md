# Action Log — Bao Rescue GitHub Pages Deployment

Date: 2026-09-08

## Goal
Deploy the current Bao Rescue photo-first diagnostic prototype so it can be reviewed as a real webpage instead of only as a local HTML file.

## Changes
1. Replaced `site/diagnose/index.html` with the v4.3 photo-first diagnostic flow.
2. Added `.github/workflows/deploy-site-pages.yml`.
3. The workflow stages `site/` into `_site/` and copies the Bao reference JPGs from `06-assets/bao-rescue/v3/source/` into `_site/assets/bao-rescue/`.
4. The workflow deploys through the official GitHub Pages actions.

## Trigger
The deployment runs on pushes to `main` that modify:
- `site/**`
- `06-assets/bao-rescue/v3/source/**`
- `.github/workflows/deploy-site-pages.yml`

It also supports manual `workflow_dispatch`.

## Verification
Workflow run: `Deploy Bao Rescue Site` run #1.

- build job: success
- stage site: success
- configure pages: success
- upload pages artifact: success
- deploy job: success

GitHub reported the Pages environment URL as:

`https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/`

Direct diagnostic route:

`https://dragonchencl.github.io/bok-choy-knowledge-export-experiment/diagnose/`

## Current status
DEPLOYED FOR REVIEW.

This is still a product prototype, not a commercially approved diagnostic product. Visual direction is accepted for continued iteration; evidence/logic gaps remain intentionally labeled beta or needs-more-info.
