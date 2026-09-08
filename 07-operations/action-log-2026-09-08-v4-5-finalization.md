# Bao Rescue v4.5 finalization

Goal: finish the photo-guided diagnosis product without drifting into asset-packaging work.

Finalization scope:
- keep `site/diagnose/index.html` as the single product source;
- deploy high-resolution WebP diagnostic assets;
- use independent semantic images for normal / underproofed / overproofed / collapsed / wrinkled / wet / crumb states;
- keep cracked/reheated/special cases outside the core grid;
- add fluffy / dense / gummy cut-open comparison to the dense path;
- deploy root and `/diagnose/` from the same latest source;
- verify the deployed commit and staged asset sizes in GitHub Actions.

A temporary upload sentinel was created before this log while re-aligning the deployment workflow; it has no product behavior and will be removed in the final cleanup commit.
