"""Consolidate research-workflow results into build/facts/<key>.md (one line per fact, grouped by topic).
Usage: python3 facts_build.py <journal.jsonl>
"""
import json, sys, collections, pathlib

J = sys.argv[1]
OUT = pathlib.Path(__file__).parent / "facts"
OUT.mkdir(exist_ok=True)
TITLES = {
    "india-class-licence": "India: risk classification and licences by class (MDR-2017)",
    "cdsco-guidance": "India: CDSCO obligations, guidance, clinical investigation, post-market, amendments",
    "india-ecosystem": "India: market, policy, infrastructure, regulator capacity, vigilance data",
    "international": "Abroad: USA, EU, UK, Japan, China, Australia, Canada, IMDRF, standards",
    "india-examples": "India: device examples by class, worked examples, cases, success stories",
}
res = [json.loads(l) for l in open(J) if '"type":"result"' in l]
index = []
for d in res:
    r = d.get("result") or {}
    facts = r.get("facts", [])
    KEYS = {"india-class-licence": ["Classification", "Fees", "Forms", "Licence validity", "Deemed"],
            "cdsco-guidance": ["Amendments", "Clinical investigation", "Core obligations", "Guidance"],
            "india-ecosystem": ["Market", "Policy", "PLI", "MvPI", "Capacity", "NPPA", "Ecosystem", "Export", "Import"],
            "international": ["FDA", "EU", "UK", "Japan", "China", "Australia", "Canada", "IMDRF", "Standards", "USA"],
            "india-examples": ["Examples", "Class A", "Class B", "Startup", "Case", "Success", "Innovator", "Worked", "Wearable", "PEMF"]}
    topics = " ".join(f.get("topic", "") for f in facts)
    score = {k: sum(topics.count(w) for w in ws) for k, ws in KEYS.items()}
    key = r.get("key") or max(score, key=score.get)
    if key in {k for k, _ in index}: key = key + "-2"
    if not facts:
        continue
    by = collections.OrderedDict()
    for f in facts:
        by.setdefault(f.get("topic", "General"), []).append(f)
    lines = [f"# {TITLES.get(key, key)}", "", f"Source agent: {key} · {len(facts)} facts · searches used: {r.get('searches_used')}", "",
             "Confidence tags: [confirmed] official or two independent reputable sources agree · [likely] consistent secondary sources · [unverified] from memory or a single weak source — do not put on a slide without a caveat.", ""]
    for topic, fl in by.items():
        lines.append(f"## {topic}")
        for f in fl:
            note = f" — Note: {f['note']}" if f.get("note") else ""
            date = f" ({f['source_date']})" if f.get("source_date") else ""
            lines.append(f"- **[{f.get('confidence','unverified')}] {f['id']}** {f['claim']}  \n  Source: {f.get('source_title','')}{date} <{f.get('source_url','')}>{note}")
        lines.append("")
    if r.get("open_questions"):
        lines.append("## Open questions (not resolved by research)")
        lines += [f"- {q}" for q in r["open_questions"]]
        lines.append("")
    (OUT / f"{key}.md").write_text("\n".join(lines))
    index.append((key, len(facts)))
print("wrote", index)
