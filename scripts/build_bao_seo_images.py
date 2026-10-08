"""Generate semantic, individually indexable symptom illustrations for Bao Rescue.

The existing 2x5 WebP atlas remains the single source of truth. These are visual
references, not photographs of a controlled experiment or evidence of results.
Run after the deploy workflow stages bao-sprite-v2.webp.
"""
from pathlib import Path
from PIL import Image

SITE = Path("_site")
ATLAS = SITE / "assets/bao-rescue/bao-sprite-v2.webp"
DEST = SITE / "assets/bao-rescue/symptoms"
TILES = (
    ("normal", 0, 0),
    ("underproof", 1, 0),
    ("overproof", 0, 1),
    ("collapsed", 1, 1),
    ("wrinkled", 0, 2),
    ("wet", 1, 2),
    ("fluffy-crumb", 0, 3),
    ("dense-crumb", 1, 3),
    ("gummy-crumb", 0, 4),
    ("cracked", 1, 4),
)


def build():
    DEST.mkdir(parents=True, exist_ok=True)
    with Image.open(ATLAS) as atlas:
        atlas.load()
        width, height = atlas.size
        if width % 2 or height % 5 or width < 400 or height < 500:
            raise ValueError(f"Unexpected 2x5 atlas size: {width}x{height}")
        tile_w, tile_h = width // 2, height // 5
        for name, col, row in TILES:
            tile = atlas.crop((col*tile_w, row*tile_h, (col+1)*tile_w, (row+1)*tile_h)).convert("RGB")
            dest = DEST / f"{name}.webp"
            tile.save(dest, "WEBP", quality=88, method=6)
            if dest.stat().st_size < 1500:
                raise ValueError(f"Unexpectedly small symptom tile: {dest}")
            print(f"Generated {dest}: {tile_w}x{tile_h}, {dest.stat().st_size} bytes")


if __name__ == "__main__":
    build()
