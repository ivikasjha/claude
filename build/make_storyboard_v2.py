"""Render the v2 storyboard (Markdown + HTML with slide thumbnails) from storyboard_v2.json and built_index.json.

Usage: python3 make_storyboard_v2.py <thumb_dir> <out_dir>
Thumbnails are expected as <thumb_dir>/s-NN.jpg (1-based, zero-padded to the width pdftoppm used).
"""
import base64
import html
import json
import pathlib
import sys

here = pathlib.Path(__file__).parent
data = json.loads((here / "storyboard_v2.json").read_text())
built = json.loads((here / "built_index.json").read_text()) if (here / "built_index.json").exists() else []
num = {b["id"]: b["n"] for b in built if b.get("id")}
thumbs = pathlib.Path(sys.argv[1])
out = pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)


def mmss(x):
    m = int(x)
    return f"{m}:{int(round((x - m) * 60)):02d}"


slides = [dict(s, section=sec["section"]) for sec in data["sections"] for s in sec["slides"]]
t_full = 0.0
t_core = 0.0
rows = []
for s in slides:
    a, b = t_full, t_full + s.get("time", 0)
    ca, cb = (t_core, t_core + s.get("time", 0)) if s.get("core") else (None, None)
    rows.append((s, a, b, ca, cb))
    t_full = b
    if s.get("core"):
        t_core = cb

md = [f"# Storyboard v2: {data['title']}", "", f"*{data['subtitle']}*", "", f"**Presenter:** {data['presenter']}  ",
      f"**Paths:** 40-minute workshop (core slides, {mmss(t_core)} scripted) · 75-minute seminar (all slides, {mmss(t_full)} scripted)", "",
      "## Story spine", "", data["spine"], "",
      "## Evidence-status key", "", "| Tag | Meaning |", "|---|---|",
      "| **Demonstrated** | Shown directly (e.g., prototype function on a volunteer) |",
      "| **Reported, preliminary** | Reported by the project or company; not independently verified or peer reviewed |",
      "| **Planned** | Future work in the project plan; not a result |",
      "| **Not established** | No adequate evidence yet; must not be claimed |", "",
      "## Slide-by-slide", "",
      "| # | Core | Full clock | Min | Section | Message | Visual | Interaction |",
      "|---|---|---|---|---|---|---|---|"]
for s, a, b, ca, cb in rows:
    clk = f"{mmss(a)}–{mmss(b)}" if s.get("time") else "ref"
    md.append("| {n} | {core} | {clk} | {t} | {sec} | {msg} | {vis} | {inter} |".format(
        n=num.get(s["id"], "—"), core="✓" if s.get("core") else "", clk=clk, t=s.get("time") or "—", sec=s["section"],
        msg=s.get("message", s.get("title", "")), vis=s.get("visual", ""), inter=s.get("interaction", "—")))
md += ["", "## Interaction map", "",
       "1. Opening vote and closing re-vote use the same three answers so the room can see its own shift.",
       "2. Five “Would you proceed?” decisions: home pilot, inventor-clinician consent, classify four devices (quiz), launch brochure, overnight software update.",
       "3. Takeaway exercise feeds the reusable decision checklist, also supplied as a printable handout.", ""]
(out / "Storyboard.md").write_text("\n".join(md))


def thumb(n):
    if n == "—":
        return ""
    for p in (thumbs / f"s-{n:02d}.jpg", thumbs / f"s-{n:03d}.jpg", thumbs / f"s-{n}.jpg"):
        if p.exists():
            return f'<img src="data:image/jpeg;base64,{base64.b64encode(p.read_bytes()).decode()}" alt="Slide {n}">'
    return ""


cards = []
for s, a, b, ca, cb in rows:
    n = num.get(s["id"], "—")
    clk = f"{mmss(a)}–{mmss(b)} · {s.get('time')} min" if s.get("time") else "Reference"
    core = ' · <span class="core">CORE (40-min path)</span>' if s.get("core") else " · deep-dive (75-min path)"
    cards.append(f"""
<section class="card">
  <div class="thumb">{thumb(n)}</div>
  <div class="body">
    <p class="meta">Slide {n} · {html.escape(s['section'])} · {clk}{core}</p>
    <h2>{html.escape(s.get('message', s.get('title', '')))}</h2>
    <p><b>Visual</b> {html.escape(s.get('visual', ''))}</p>
    <p><b>Interaction</b> {html.escape(s.get('interaction', '—'))}</p>
  </div>
</section>""")

page = f"""<!doctype html><html><head><meta charset="utf-8"><title>Storyboard</title>
<style>
@page {{ size: A4 landscape; margin: 12mm; }}
body {{ font-family: Calibri, Carlito, Arial, sans-serif; color: #17262B; margin: 0; }}
h1 {{ font-family: Cambria, Caladea, Georgia, serif; font-size: 26pt; margin: 0 0 4pt; color: #0E3B3D; }}
.sub {{ font-size: 13pt; color: #0F7C74; margin: 0 0 10pt; }}
.intro {{ display: grid; grid-template-columns: 1fr 1fr; gap: 14pt; font-size: 10.5pt; margin-bottom: 10pt; }}
.intro div {{ background: #EEF3F2; padding: 8pt 10pt; border-radius: 6pt; }}
.key span {{ display: inline-block; padding: 1pt 7pt; border-radius: 9pt; font-size: 9pt; font-weight: bold; margin-right: 4pt; }}
.d {{ background: #0F7C74; color: #fff; }} .r {{ border: 1.2pt solid #0F7C74; color: #0F7C74; }}
.p {{ border: 1.2pt dashed #E0962A; color: #B5701A; }} .x {{ border: 1.2pt solid #C2453A; color: #C2453A; }}
.core {{ color: #B5701A; font-weight: bold; }}
.card {{ display: grid; grid-template-columns: 92mm 1fr; gap: 10pt; padding: 7pt 0; border-top: 0.6pt solid #D5DFDD; break-inside: avoid; }}
.thumb img {{ width: 92mm; border: 0.6pt solid #D5DFDD; }}
.meta {{ font-size: 9pt; color: #6E7F7D; margin: 0; text-transform: uppercase; letter-spacing: .5pt; }}
h2 {{ font-family: Cambria, Caladea, Georgia, serif; font-size: 14pt; margin: 2pt 0 4pt; }}
.body p {{ font-size: 10pt; margin: 2pt 0; }}
</style></head><body>
<h1>Storyboard: {html.escape(data['title'])}</h1>
<p class="sub">{html.escape(data['subtitle'])} · {html.escape(data['presenter'])} · 40-min core {mmss(t_core)} · full {mmss(t_full)}</p>
<div class="intro"><div><b>Story spine.</b> {html.escape(data['spine'])}</div>
<div><b>Two paths.</b> {html.escape(data['paths']['core40'])} · {html.escape(data['paths']['full'])}<br><br><span class="key"><b>Evidence key</b> <span class="d">Demonstrated</span><span class="r">Reported, preliminary</span><span class="p">Planned</span><span class="x">Not established</span></span></div></div>
{''.join(cards)}
</body></html>"""
(out / "Storyboard.html").write_text(page)
print("storyboard written", out, "core", mmss(t_core), "full", mmss(t_full))
