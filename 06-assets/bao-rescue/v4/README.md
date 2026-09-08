# Bao Rescue v4 visual assets

This directory contains the reviewed visual reference assets used by the v4.5 MVP diagnosis UI.

## Current MVP delivery

GitHub Pages publishes the binary file directly:

`06-assets/bao-rescue/v4/bao-sprite.webp`

The reviewed P0 sprite is 1000 × 1875 px with a fixed 2-column × 5-row semantic layout:
1. normal / under-proofed
2. over-proofed / collapsed
3. wrinkled / wet-condensation
4. fluffy crumb / dense crumb
5. gummy crumb / cracked

The collapsed cell was replaced with a clearly sunken post-steam state, and the gummy cell uses a wetter cut-open crumb reference. The live build no longer reconstructs or ships the old q20 sprite parts.

## Product rule

- one visual state = one meaning
- visuals support diagnosis; they do not replace observable questions
- do not reuse old v3 4 KB JPG thumbnails in the live MVP
- do not use the old q20 sprite reconstruction in the live MVP
- special/weak-evidence branches remain Beta instead of inventing certainty

This asset set is frozen for the first traffic-validation round unless a P0 clarity problem is found.
