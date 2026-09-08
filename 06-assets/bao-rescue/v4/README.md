# Bao Rescue v4 visual assets

This directory contains the visual reference assets used by the v4.5 MVP diagnosis UI.

## Current MVP delivery

GitHub Pages reconstructs `bao-sprite.webp` from:

`06-assets/bao-rescue/v4/sprite-q20.b64.part-00` through `part-09`.

The sprite has a fixed 2-column × 5-row semantic layout:
1. normal / under-proofed
2. over-proofed / collapsed
3. wrinkled / wet-condensation
4. fluffy crumb / dense crumb
5. gummy crumb / cracked

## Product rule

- one visual state = one meaning
- visuals support diagnosis; they do not replace observable questions
- do not reuse old v3 4 KB JPG thumbnails in the live MVP
- special/weak-evidence branches remain Beta instead of inventing certainty

This asset set is frozen for the first traffic-validation round unless a P0 clarity problem is found.
