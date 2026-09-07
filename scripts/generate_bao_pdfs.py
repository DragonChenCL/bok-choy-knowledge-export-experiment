from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "06-assets" / "bao-rescue"
OUT.mkdir(parents=True, exist_ok=True)
GUIDE = OUT / "bao-rescue-guide-v1.pdf"
QUICK = OUT / "bao-rescue-quick-diagnostic-v1.pdf"

BG = HexColor("#FFF9F1")
INK = HexColor("#2A211B")
MUTED = HexColor("#6F6258")
ACCENT = HexColor("#C95832")
ACCENT_DARK = HexColor("#8F361D")
LINE = HexColor("#E9DDD1")
SOFT = HexColor("#F6ECE2")
WHITE = HexColor("#FFFFFF")
GREEN = HexColor("#3E6F56")
AMBER = HexColor("#A56A1C")
PAGE_W, PAGE_H = A4


def txt(c, s, x, y, size=10, font="Helvetica", color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, s)


def wrapped(c, s, x, y, width, size=10, leading=None, font="Helvetica", color=INK):
    leading = leading or size * 1.35
    words = s.split()
    lines, cur = [], ""
    for word in words:
        test = word if not cur else cur + " " + word
        if stringWidth(test, font, size) <= width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    c.setFont(font, size)
    c.setFillColor(color)
    yy = y
    for line in lines:
        c.drawString(x, yy, line)
        yy -= leading
    return yy


def rounded(c, x, y, w, h, fill=WHITE, stroke=LINE, r=10):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(1)
    c.roundRect(x, y, w, h, r, fill=1, stroke=1)


def callout(c, title, body, x, y, w, h, fill=SOFT, accent=ACCENT):
    rounded(c, x, y, w, h, fill, fill, 10)
    c.setFillColor(accent)
    c.roundRect(x, y, 5, h, 2.5, fill=1, stroke=0)
    txt(c, title, x + 14, y + h - 20, 9.5, "Helvetica-Bold")
    wrapped(c, body, x + 14, y + h - 36, w - 28, 8.5, 11, "Helvetica", MUTED)


def bullet(c, s, x, y, width, size=9, bullet_color=ACCENT):
    c.setFillColor(bullet_color)
    c.circle(x + 2.5, y + 3, 2.2, fill=1, stroke=0)
    return wrapped(c, s, x + 10, y + 7, width - 10, size, size * 1.4, "Helvetica", INK)


def header(c, eyebrow, title, page):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    txt(c, eyebrow.upper(), 22 * mm, PAGE_H - 22 * mm, 7.2, "Helvetica-Bold", ACCENT_DARK)
    wrapped(c, title, 22 * mm, PAGE_H - 34 * mm, PAGE_W - 44 * mm, 23, 26, "Helvetica-Bold")
    c.setStrokeColor(LINE)
    c.line(22 * mm, PAGE_H - 49 * mm, PAGE_W - 22 * mm, PAGE_H - 49 * mm)
    txt(c, f"{page:02d}", PAGE_W - 30 * mm, 14 * mm, 8, "Helvetica-Bold", MUTED)


def cover(c):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    txt(c, "BAO TROUBLESHOOTING, NOT ANOTHER RECIPE", 22 * mm, PAGE_H - 28 * mm, 8, "Helvetica-Bold", ACCENT_DARK)
    wrapped(c, "Bao Rescue", 22 * mm, PAGE_H - 53 * mm, 130 * mm, 38, 42, "Helvetica-Bold")
    wrapped(c, "Why did your steamed buns fail?", 22 * mm, PAGE_H - 76 * mm, 145 * mm, 21, 25, "Helvetica-Bold", ACCENT)
    wrapped(c, "See the symptom. Check the cause. Change one thing next batch.", 22 * mm, PAGE_H - 101 * mm, 140 * mm, 14, 19, "Helvetica", MUTED)
    callout(c, "Version 1 scope", "Common yeasted wheat steamed-bun dough failures across folded Bao / Gua Bao and filled Baozi. Filling formulation, no-yeast-only buns, and sourdough methods are outside this MVP.", 22 * mm, 38 * mm, PAGE_W - 44 * mm, 41 * mm)
    txt(c, "Research-driven diagnostic guide", 22 * mm, 20 * mm, 8, "Helvetica-Bold", MUTED)


def symptom(c):
    header(c, "Start here", "60-second symptom finder", 2)
    items = [
        ("Wrinkled or collapsed", "Go to page 3"),
        ("Dense, heavy, doughy, not fluffy", "Go to page 4"),
        ("Not sure if proofed enough", "Go to page 5"),
        ("Wet, pitted, or water-marked surface", "Go to page 6"),
        ("Barely rose at all", "Go to page 7"),
    ]
    y = PAGE_H - 72 * mm
    for label, route in items:
        rounded(c, 22 * mm, y, PAGE_W - 44 * mm, 22 * mm)
        txt(c, label, 29 * mm, y + 13 * mm, 12, "Helvetica-Bold")
        txt(c, route, PAGE_W - 63 * mm, y + 13 * mm, 9, "Helvetica-Bold", ACCENT_DARK)
        y -= 27 * mm
    callout(c, "Rule of the guide", "Diagnose before you change things. If you change flour, yeast, proofing time, hydration, and steam all at once, you learn almost nothing from the next batch.", 22 * mm, 30 * mm, PAGE_W - 44 * mm, 34 * mm)


def collapse(c):
    header(c, "Failure family 1", "Wrinkled or collapsed", 3)
    txt(c, "Start with WHEN the failure happened.", 22 * mm, PAGE_H - 69 * mm, 12, "Helvetica-Bold")
    cards = [
        ("Looked good until the lid opened", "Check proofing state AND the post-steam temperature transition. Over-proofing weakens structure; rapid exposure to a cooler environment is also a documented collapse / shrinkage pathway.", GREEN),
        ("Wrinkled + wet or pitted", "Check condensation. Direct lid drips are a strong candidate when the surface is visibly wet, blotchy, pitted, or water-marked.", ACCENT),
        ("Skin dried during proofing", "Some Bao troubleshooting sources identify surface drying as a contributor to rough or elephant-skin surfaces. Keep this as a secondary possibility, not a guaranteed diagnosis.", AMBER),
    ]
    y = PAGE_H - 82 * mm
    h = 42 * mm
    for title, body, color in cards:
        rounded(c, 22 * mm, y - h, PAGE_W - 44 * mm, h)
        c.setFillColor(color)
        c.roundRect(22 * mm, y - h, 5, h, 2.5, fill=1, stroke=0)
        txt(c, title, 30 * mm, y - 11 * mm, 10.5, "Helvetica-Bold")
        wrapped(c, body, 30 * mm, y - 20 * mm, PAGE_W - 65 * mm, 9, 12, "Helvetica", MUTED)
        y -= h + 7 * mm
    callout(c, "Next-batch rule", "If proofing and lid transition are both plausible, do not change both. Keep the recipe the same and control one branch at a time.", 22 * mm, 22 * mm, PAGE_W - 44 * mm, 29 * mm)


def dense(c):
    header(c, "Failure family 2", "Dense, heavy, doughy, or not fluffy", 4)
    colw = (PAGE_W - 50 * mm) / 2
    y = PAGE_H - 70 * mm
    rounded(c, 22 * mm, y - 70 * mm, colw, 70 * mm)
    txt(c, "1. Did the dough produce gas?", 30 * mm, y - 12 * mm, 11, "Helvetica-Bold")
    yy = bullet(c, "If it barely rose, check yeast method, yeast freshness, kitchen temperature, chilled ingredients, and major formula substitutions.", 30 * mm, y - 27 * mm, colw - 16 * mm)
    bullet(c, "Active dry and instant yeast are not always handled the same way. Follow the recipe and manufacturer instead of one universal temperature rule.", 30 * mm, yy - 3 * mm, colw - 16 * mm)
    x2 = 22 * mm + colw + 6 * mm
    rounded(c, x2, y - 70 * mm, colw, 70 * mm)
    txt(c, "2. It rose, but stayed dense?", x2 + 8 * mm, y - 12 * mm, 11, "Helvetica-Bold")
    yy = bullet(c, "Possible families: insufficient final proof, dough structure / kneading, flour / protein differences, hydration, or collapse after expansion.", x2 + 8 * mm, y - 27 * mm, colw - 16 * mm)
    bullet(c, "Do not use 'dense = dead yeast' as an automatic diagnosis.", x2 + 8 * mm, yy - 3 * mm, colw - 16 * mm)
    callout(c, "Why flour matters", "Food-science research on Chinese steamed bread shows flour protein / gluten properties and hydration materially affect volume and texture. That does NOT mean one flour label is universally best for every Bao style.", 22 * mm, 48 * mm, PAGE_W - 44 * mm, 39 * mm)
    callout(c, "What to record", "Flour brand + category, protein % if printed, flour weight, liquid weight, raw dough feel, and whether you substituted a different flour from the recipe.", 22 * mm, 20 * mm, PAGE_W - 44 * mm, 23 * mm, WHITE, GREEN)


def proof(c):
    header(c, "Failure family 3", "Proofing: under, ready, or over?", 5)
    txt(c, "Do not trust the clock by itself.", 22 * mm, PAGE_H - 68 * mm, 12, "Helvetica-Bold", ACCENT_DARK)
    wrapped(c, "Proofing speed changes with room temperature, yeast activity, sugar, dough formula, and chilling. Several current steamed-bun specialists recommend judging dough state.", 22 * mm, PAGE_H - 77 * mm, PAGE_W - 44 * mm, 10, 14, "Helvetica", MUTED)
    cols = [
        ("UNDER", ACCENT, ["Feels relatively dense / heavy", "Little visible puffing", "Finger press rebounds quickly", "Finished bun more likely dense / rough"]),
        ("READY", GREEN, ["Visibly plumper, not necessarily doubled", "Feels lighter / airier when lifted", "Gentle indent returns slowly", "A faint impression may remain"]),
        ("OVER", AMBER, ["Fragile / overly airy feel", "Spreads wider or flatter", "Finger indent does not recover", "Higher structural-collapse risk"]),
    ]
    gap = 5 * mm
    cw = (PAGE_W - 44 * mm - 2 * gap) / 3
    for i, (title, color, bullets) in enumerate(cols):
        x = 22 * mm + i * (cw + gap)
        rounded(c, x, 57 * mm, cw, 96 * mm)
        c.setFillColor(color)
        c.roundRect(x, 136 * mm, cw, 17 * mm, 9, fill=1, stroke=0)
        txt(c, title, x + 7 * mm, 141 * mm, 9, "Helvetica-Bold", WHITE)
        yy = 127 * mm
        for item in bullets:
            yy = bullet(c, item, x + 6 * mm, yy, cw - 12 * mm, 8.5, color) - 2 * mm
    callout(c, "Practical, not universal", "Finger-test and 'about 50% bigger' cues are practical indicators used by experienced steamed-bun authors, not laboratory constants across every Bao formula.", 22 * mm, 22 * mm, PAGE_W - 44 * mm, 27 * mm)


def steamer(c):
    header(c, "Equipment variable", "Steamer & condensation check", 6)
    cards = [
        ("Bamboo steamer", "Absorbs condensation, helping reduce direct dripping onto buns.", GREEN),
        ("Metal steamer", "Works, but monitor lid condensation and direct water droplets.", ACCENT),
        ("Steam intensity", "Use the heat profile intended by your dough method. No-yeast and yeast-only buns can behave differently.", AMBER),
        ("After steaming", "A short controlled transition before full lid opening is a reasonable variable to control. A 2026 experimental steamed-stuffed-bun study used a 3-minute standing period to reduce shrinkage from sudden temperature changes.", GREEN),
    ]
    y = PAGE_H - 70 * mm
    for title, body, color in cards:
        rounded(c, 22 * mm, y - 34 * mm, PAGE_W - 44 * mm, 34 * mm)
        txt(c, title, 29 * mm, y - 13 * mm, 9.5, "Helvetica-Bold", color)
        wrapped(c, body, 29 * mm, y - 23 * mm, PAGE_W - 58 * mm, 8.8, 11.5, "Helvetica", MUTED)
        y -= 39 * mm
    callout(c, "Important", "Proofing state remains a major independent branch. Do not treat lid-rest timing as a magic fix.", 22 * mm, 20 * mm, PAGE_W - 44 * mm, 26 * mm)


def no_rise(c):
    header(c, "Troubleshooting", "Dough barely rose", 7)
    steps = [
        ("Confirm the yeast method", "Active dry vs instant may be handled differently. Follow the recipe and yeast manufacturer's activation method."),
        ("Check yeast freshness / activity", "If the method expects blooming and there is no activity, the yeast may be compromised."),
        ("Check kitchen temperature", "A cool kitchen can make healthy dough move much more slowly than a headline recipe time."),
        ("Check substitutions", "Flour, sugar, yeast type, hydration and chilled ingredients can all change proof speed."),
    ]
    y = PAGE_H - 72 * mm
    for i, (title, body) in enumerate(steps, 1):
        c.setFillColor(ACCENT)
        c.circle(30 * mm, y + 2 * mm, 6 * mm, fill=1, stroke=0)
        txt(c, str(i), 27.4 * mm, y - 1.3 * mm, 10, "Helvetica-Bold", WHITE)
        txt(c, title, 42 * mm, y + 5 * mm, 11, "Helvetica-Bold")
        wrapped(c, body, 42 * mm, y - 7 * mm, PAGE_W - 64 * mm, 9, 12, "Helvetica", MUTED)
        y -= 39 * mm
    callout(c, "One-variable rule", "Do not increase yeast + heat + proof time all at once. That creates an unreadable experiment.", 22 * mm, 27 * mm, PAGE_W - 44 * mm, 27 * mm)


def flour(c):
    header(c, "Localization", "Flour & hydration without false equivalence", 8)
    callout(c, "Do not assume", "US all-purpose = UK plain = Chinese bao flour as exact technical equivalents.", 22 * mm, PAGE_H - 91 * mm, PAGE_W - 44 * mm, 33 * mm)
    txt(c, "Use measurable / observable information instead:", 22 * mm, PAGE_H - 107 * mm, 11, "Helvetica-Bold")
    y = PAGE_H - 120 * mm
    for item in ["Brand and flour category", "Protein % if printed", "Flour and liquid weights", "Raw dough feel: dry / supple / tacky / sticky", "The original recipe's flour recommendation"]:
        y = bullet(c, item, 22 * mm, y, PAGE_W - 44 * mm, 10) - 3 * mm
    callout(c, "Why this matters", "Food-science studies on Chinese steamed bread repeatedly show protein quality / quantity, gluten strength, starch behavior, and hydration affect final volume and texture. Different regional steamed breads target different properties.", 22 * mm, 38 * mm, PAGE_W - 44 * mm, 44 * mm, WHITE, GREEN)
    txt(c, "Troubleshoot relative to the recipe before changing flour categories.", 22 * mm, 25 * mm, 10, "Helvetica-Bold", ACCENT_DARK)


def worksheet(c):
    header(c, "Controlled learning", "Change one variable - next-batch worksheet", 9)
    fields = ["Recipe / source", "Flour / protein %", "Yeast type / age", "Room temperature", "First proof state", "Second proof state", "Steamer type", "Steam intensity", "Post-steam rest", "Visible failure", "Interior texture"]
    x, y = 22 * mm, PAGE_H - 69 * mm
    rowh = 13 * mm
    for i, field in enumerate(fields):
        if i == 6:
            x, y = PAGE_W / 2 + 4 * mm, PAGE_H - 69 * mm
        w = PAGE_W / 2 - 28 * mm
        txt(c, field, x, y, 8.5, "Helvetica-Bold", MUTED)
        c.setStrokeColor(LINE)
        c.line(x, y - 3 * mm, x + w, y - 3 * mm)
        y -= rowh
    callout(c, "Strongest hypothesis", "______________________________________________", 22 * mm, 55 * mm, PAGE_W - 44 * mm, 25 * mm, WHITE, ACCENT)
    callout(c, "ONE thing I will change next batch", "______________________________________________", 22 * mm, 26 * mm, PAGE_W - 44 * mm, 25 * mm, SOFT, GREEN)


def checklist(c):
    header(c, "Before steaming", "Pre-steam checklist", 10)
    checks = [
        "I know this is a yeasted formula.",
        "I am judging dough state, not only elapsed minutes.",
        "The buns feel lighter / look puffed rather than still dense.",
        "The shaped surface has not been left to dry.",
        "I know how waiting batches will be kept from over-proofing.",
        "Buns have room to expand.",
        "I have controlled lid condensation.",
        "I am using the steaming method intended for this recipe style.",
        "I have a plan for the post-steam transition.",
    ]
    y = PAGE_H - 70 * mm
    for item in checks:
        c.setStrokeColor(ACCENT)
        c.roundRect(22 * mm, y - 1 * mm, 6 * mm, 6 * mm, 1.5 * mm, fill=0, stroke=1)
        wrapped(c, item, 33 * mm, y + 3 * mm, PAGE_W - 55 * mm, 10, 13)
        y -= 20 * mm
    callout(c, "The point", "Consistency beats cleverness. Your next batch should answer one question.", 22 * mm, 20 * mm, PAGE_W - 44 * mm, 25 * mm)


def sources(c):
    header(c, "Evidence", "What this guide is built on", 11)
    wrapped(c, "Community posts and recipe comments were used to discover recurring symptoms and user language. Technical fixes were cross-checked against stronger baking and food-science sources.", 22 * mm, PAGE_H - 70 * mm, PAGE_W - 44 * mm, 9.5, 13, "Helvetica", MUTED)
    items = [
        ("King Arthur Baking", "Steamer setup, condensation, post-steam transition."),
        ("2026 steamed stuffed bun study (PMC)", "Controlled process used a 3-minute standing period to reduce surface shrinkage from sudden temperature changes."),
        ("Journal of Cereal Science", "Flour protein / dough properties and Chinese steamed bread quality."),
        ("Omnivore's Cookbook", "Bao deflation, proofing and environment-sensitive timing."),
        ("Red House Spice", "Practical Bao proofing, shape, and large reader-comment history."),
        ("What To Cook Today", "Observable proof-state cues and current steamed-bun troubleshooting."),
    ]
    gap = 6 * mm
    colw = (PAGE_W - 44 * mm - gap) / 2
    top = PAGE_H - 96 * mm
    card_h = 33 * mm
    for idx, (title, body) in enumerate(items):
        col, row = idx % 2, idx // 2
        x = 22 * mm + col * (colw + gap)
        ytop = top - row * (card_h + 6 * mm)
        rounded(c, x, ytop - card_h, colw, card_h)
        txt(c, title, x + 7 * mm, ytop - 10 * mm, 8.9, "Helvetica-Bold")
        wrapped(c, body, x + 7 * mm, ytop - 19 * mm, colw - 14 * mm, 7.7, 10.2, "Helvetica", MUTED)
    callout(c, "Scope & safety", "This product is primarily about dough, proofing, and steaming behavior. For meat or other perishable fillings, follow appropriate food-handling and cooking guidance.", 22 * mm, 20 * mm, PAGE_W - 44 * mm, 30 * mm)


def build_guide():
    c = canvas.Canvas(str(GUIDE), pagesize=A4)
    for page_fn in [cover, symptom, collapse, dense, proof, steamer, no_rise, flour, worksheet, checklist, sources]:
        page_fn(c)
        c.showPage()
    c.save()


def build_quick():
    w, h = landscape(A4)
    c = canvas.Canvas(str(QUICK), pagesize=(w, h))
    c.setFillColor(BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    txt(c, "BAO RESCUE - QUICK DIAGNOSTIC", 18 * mm, h - 17 * mm, 8.5, "Helvetica-Bold", ACCENT_DARK)
    wrapped(c, "What went wrong?", 18 * mm, h - 31 * mm, 110 * mm, 22, 25, "Helvetica-Bold")
    txt(c, "Symptom -> check first -> likely cause families -> next controlled test", 18 * mm, h - 42 * mm, 9.5, "Helvetica", MUTED)
    cols = [("SYMPTOM", 47 * mm), ("CHECK FIRST", 54 * mm), ("CAUSE FAMILIES", 78 * mm), ("NEXT TEST", 82 * mm)]
    x0, table_w, ytop = 18 * mm, w - 36 * mm, h - 55 * mm
    xpos = [x0]
    for _, cw in cols[:-1]:
        xpos.append(xpos[-1] + cw)
    c.setFillColor(INK)
    c.roundRect(x0, ytop, table_w, 11 * mm, 5 * mm, fill=1, stroke=0)
    for i, (label, _) in enumerate(cols):
        txt(c, label, xpos[i] + 4 * mm, ytop + 3.7 * mm, 7.5, "Helvetica-Bold", WHITE)
    rows = [
        ("Collapses at / after lid opening", "Proof state + lid transition", "Over-proofing; sudden temperature transition", "Control ONE branch next batch"),
        ("Wrinkled + wet / pitted", "Lid condensation", "Direct drips; plus proof / steam factors", "Prevent direct drips and compare"),
        ("Dense / heavy", "Did dough rise?", "Yeast / under-proof; flour / structure; collapse", "Separate gas vs structure issue"),
        ("Tough / chewy", "Flour + hydration", "Flour / dough-strength mismatch; dry dough", "Record flour, change one variable"),
        ("Barely rose", "Yeast method + room temp", "Inactive yeast; cold kitchen; formula change", "Verify yeast, log temperature"),
        ("Spread sideways / fragile", "Proof state", "Over-proofing is a strong candidate", "Shorten or slow final proof"),
    ]
    y = ytop - 3 * mm
    row_h = 20 * mm
    for r, row in enumerate(rows):
        y -= row_h
        fill = WHITE if r % 2 == 0 else HexColor("#FBF3EB")
        c.setFillColor(fill)
        c.roundRect(x0, y, table_w, row_h - 2 * mm, 4 * mm, fill=1, stroke=0)
        for i, cell in enumerate(row):
            cellw = cols[i][1] - 8 * mm if i < 3 else table_w - (xpos[i] - x0) - 8 * mm
            wrapped(c, cell, xpos[i] + 4 * mm, y + row_h - 7.7 * mm, cellw, 7.15, 8.5, "Helvetica-Bold" if i == 0 else "Helvetica", INK if i == 0 else MUTED)
    callout(c, "One-variable rule", "Do not change flour, yeast, proofing time, hydration, and steam all at once. A failed batch becomes useful only when the next test is readable.", 18 * mm, 6 * mm, w - 36 * mm, 17 * mm)
    c.save()


if __name__ == "__main__":
    build_guide()
    build_quick()
    print(GUIDE)
    print(QUICK)
