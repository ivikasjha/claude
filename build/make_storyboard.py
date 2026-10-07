"""Render the storyboard (Markdown + HTML with slide thumbnails) from storyboard.json.

Usage: python3 make_storyboard.py <thumb_dir> <out_dir>
Thumbnails are expected as <thumb_dir>/s-NN.jpg (1-based, zero-padded to 2).
"""
import base64
import html
import json
import pathlib
import sys

here = pathlib.Path(__file__).parent
data = json.loads((here / "storyboard.json").read_text())
thumbs = pathlib.Path(sys.argv[1])
out = pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)


def clock(slides):
    t = 0.0
    for s in slides:
        start = t
        t += s["time"]
        yield s, start, t


def mmss(x):
    m = int(x)
    return f"{m}:{int(round((x - m) * 60)):02d}"


rows = list(clock(data["slides"]))
total = rows[-1][2]

# ---------- Markdown ----------
md = [f"# Storyboard: {data['title']}", "", f"*{data['subtitle']}*", "", f"**Presenter:** {data['presenter']}  ", f"**Length:** {data['length']} (scripted total {mmss(total)})", "",
      "## Story spine", "", data["spine"], "", "## Teaching lenses", "", data["lenses"], "",
      "## Evidence-status key", "", "| Tag | Meaning |", "|---|---|",
      "| **Demonstrated** | Shown directly (e.g., prototype function on a volunteer) |",
      "| **Reported, preliminary** | Reported by the project or company; not independently verified or peer reviewed |",
      "| **Planned** | Future work in the project plan; not a result |",
      "| **Not established** | No adequate evidence yet; must not be claimed |", "",
      "## Slide-by-slide", "",
      "| # | Clock | Min | Section | Central message | Visual | Interaction | Evidence status | Sources |",
      "|---|---|---|---|---|---|---|---|---|"]
for s, a, b in rows:
    clk = f"{mmss(a)}–{mmss(b)}" if s["time"] else "ref"
    md.append("| {n} | {clk} | {t} | {sec} | {msg} | {vis} | {inter} | {st} | {src} |".format(
        n=s["n"], clk=clk, t=s["time"] or "—", sec=s["section"], msg=s["message"], vis=s["visual"],
        inter=s["interaction"], st=s.get("status", "—"), src=s["sources"]))
md += ["", "## Interaction map", "",
       "1. Opening vote (slide 3) and closing re-vote (slide 22) use the same three answers so the room can see its own shift.",
       "2. Four “Would you proceed?” decisions: home pilot (10), inventor-clinician consent (15), launch brochure (19), overnight software update (20).",
       "3. Takeaway exercise (23) feeds the reusable decision checklist (24), which is also supplied as a printable handout.", ""]
(out / "Storyboard.md").write_text("\n".join(md))

# ---------- HTML (for PDF) ----------
def thumb(n):
    p = thumbs / f"s-{n:02d}.jpg"
    if not p.exists():
        return ""
    return f'<img src="data:image/jpeg;base64,{base64.b64encode(p.read_bytes()).decode()}" alt="Slide {n}">'

cards = []
for s, a, b in rows:
    clk = f"{mmss(a)}–{mmss(b)} · {s['time']} min" if s["time"] else "Reference"
    st = f'<p class="status"><b>Evidence status</b> {html.escape(s["status"])}</p>' if s.get("status") else ""
    cards.append(f"""
<section class="card">
  <div class="thumb">{thumb(s['n'])}</div>
  <div class="body">
    <p class="meta">Slide {s['n']} · {html.escape(s['section'])} · {clk}</p>
    <h2>{html.escape(s['message'])}</h2>
    <p><b>Visual</b> {html.escape(s['visual'])}</p>
    <p><b>Interaction</b> {html.escape(s['interaction'])}</p>
    {st}
    <p class="src"><b>Sources</b> {html.escape(s['sources'])}</p>
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
.card {{ display: grid; grid-template-columns: 92mm 1fr; gap: 10pt; padding: 7pt 0; border-top: 0.6pt solid #D5DFDD; break-inside: avoid; }}
.thumb img {{ width: 92mm; border: 0.6pt solid #D5DFDD; }}
.meta {{ font-size: 9pt; color: #6E7F7D; margin: 0; text-transform: uppercase; letter-spacing: .5pt; }}
h2 {{ font-family: Cambria, Caladea, Georgia, serif; font-size: 14pt; margin: 2pt 0 4pt; }}
.body p {{ font-size: 10pt; margin: 2pt 0; }}
.status {{ color: #3D5A80; }} .src {{ color: #6E7F7D; }}
</style></head><body>
<h1>Storyboard: {html.escape(data['title'])}</h1>
<p class="sub">{html.escape(data['subtitle'])} · {html.escape(data['presenter'])} · {html.escape(data['length'])}; scripted total {mmss(total)}</p>
<div class="intro"><div><b>Story spine.</b> {html.escape(data['spine'])}</div>
<div><b>Teaching lenses.</b> {html.escape(data['lenses'])}<br><br><span class="key"><b>Evidence key</b> <span class="d">Demonstrated</span><span class="r">Reported, preliminary</span><span class="p">Planned</span><span class="x">Not established</span></span></div></div>
{''.join(cards)}
</body></html>"""
(out / "Storyboard.html").write_text(page)
print("storyboard written", out, "scripted minutes", total)
