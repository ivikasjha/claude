# Deck v2 design spec (for section builders)

Deck: **Bridging the Gap: From Innovation to Patient Impact** — *Ethics, Evidence, Regulation and Responsible Medical Device Translation*. Presenter: Dr Vikas Kumar Jha, KIIT University, Bhubaneswar. Audience: engineering, medical and management students and faculty in India. Today: 7 October 2026.

The user rejected v1 as "very basic, not aesthetic, too little content, too few infographics". v2 must be **information-rich and visually layered**: every slide has one dominant infographic built from the `ui.js` components, supporting text with real specifics (rule numbers, forms, dates, numbers, examples), and speaker notes that go deeper. Target 45–90 visible words on content slides (more is fine on tables), never a wall of prose.

## Files
- `build/ui.js` — design system. Read it; use only its components and `ui.text`. `sections/_demo.js` shows every component in use.
- `build/sections/<name>.js` — one module per section: `module.exports = { SECTION, build }` where `async function build(ui, ctx)` adds slides in storyboard order.
- `build/notes/<name>.js` — `module.exports = { NOTES_DATA, SOURCES }` keyed by slide id (see "Notes" below).
- `build/storyboard_v2.json` — the slide list with ids, titles, messages, visuals, interactions and timings. Build exactly these slides, in this order, with these ids.
- `build/facts/*.md` — verified facts with confidence tags and source URLs. **Use only facts from these files, `refs.js` and the storyboard.** Anything you add from memory must be listed in your return value under `unverified_claims` with the slide id, so it can be checked or removed.
- Render your section: `cd build && NODE_PATH=./node_modules node build_section.js <name> --out /tmp/claude-0/-home-user/9e4b9fe4-ecb0-53c7-a8dc-1aafb6b2898c/scratchpad/render/<name>` then view `s-N.jpg` files (Read tool) and iterate until clean. Rendering takes ~1–2 min; batch fixes.

## Canvas and layouts
- 13.333 × 7.5 in, margin `M = 0.6`. Content area: x 0.6–12.73, y 1.65–6.85. Source line sits at y 7.0 (placeholder), slide number bottom-right.
- Layouts: `CONTENT` (light), `DARK` (gradient), `SECTION` (divider via `ui.sectionDivider`), `TITLE_DARK`, `REFERENCE`.
- Use `ui.newSlide(master, SECTION, { id, kicker, title, stage, core })`. `stage` 0–5 draws the six-dot tracker (Need, Evidence, People, Permission, Access, Safety). Decision/vote slides use `DARK`; most content slides use `CONTENT`; alternate so no more than three light slides in a row.
- Kicker: `PART · TOPIC` in caps (e.g. `INDIA · RISK CLASSES`, `WOULD YOU PROCEED? 2/5`). Title: one line, sentence case, ≤ 60 characters, states the message.

## Components (all in `ui`)
`statTiles` (big numbers), `chevronFlow` (process), `timeline`, `classLadder` (A→D bands), `matrix` (native table, colour-coded cells), `cardGrid` (icon cards), `compareColumns` (side-by-side with flags), `stepsVertical`, `callout` (key message bar), `barChart`/`doughnut` (native charts), `mapPanel("world"|"india")` with markers, `flag`, `imageFrame` (rounded photos), `iconDisc`, `pill`, `statusChip` (Demonstrated / Reported, preliminary / Planned / Not established), `numBadge`, `optionCards` + `factRows` (decision slides), `arrow`, `vline`, `card`.
- Colours via `ui.C` (scheme): `C.accent1` teal (supported/India), `C.accent2` marigold (interaction/planned/highlight), `C.accent3` vermilion (risk/not established), `C.accent4` indigo (regulation/abroad), `C.accent5` grey captions, `C.accent6` pale teal (text on dark), `C.text1` ink, `C.text2` deep teal, `C.background1` white, `C.background2` panel. Risk classes: `ui.CLASS_COLORS` A green, B teal, C amber, D red. Hex only where a component asks for hex (`ui.HEX`).
- Photos: `ui.img("file")` for `assets/img`; restored authentic photos in `/tmp/claude-0/-home-user/9e4b9fe4-ecb0-53c7-a8dc-1aafb6b2898c/scratchpad/restored/` (fogo_v1/v2/v3, fogo_system, fogo_module, fogo_emc_test, fogo_ankle_in_use, fogo_app_cue/normal, swaknee_controller_applicator, swaknee_iterations, swaknee_tablet_controller). Copy any you use into `build/assets/img/` first and reference with `ui.img`. No faces; no patient photos.
- Videos (only in the evidence section): `s.addMedia({ type: "video", path: ui.vid("fogo_prototype.mp4"), cover: ui.dataUri(ui.img("fogo_video_poster.png")), x, y, w, h })`.

## Composition rules
1. One dominant visual per slide occupying ≥ 55% of the content area; a secondary panel (cards, stat, callout) fills the rest. No empty quadrants; no element closer than 0.25 in to another or to the slide edge.
2. Text: titles 30 pt (placeholder), section labels 12–14 pt bold, body 11–13 pt, captions 9.5–10 pt. Minimum 9 pt anywhere. Use runs with `breakLine`, `bullet: { indent: 10 }`, `paraSpaceAfter`.
3. Specific beats generic: name the rule, form, authority, number, date. Every number on a slide must be in `facts/` or `refs.js`; label projections and estimates as such.
4. India first, then compare: when a slide shows a foreign system, say what it means for an Indian team.
5. Evidence-status vocabulary on every FoGO/SwaKnee claim: Demonstrated · Reported, preliminary · Planned · Not established (`ui.statusChip`).
6. Each decision slide: DARK layout, 3 fact rows (left) with one fact that argues against the safe answer, A/B/C option cards (right), kicker `WOULD YOU PROCEED? n/5`.
7. Source line: `ui.newSlide` reads `SOURCES[id]` from your notes file; write one for every content slide (short: "Sources: MDR-2017 Rules 20–22; CDSCO Form MD-3; PIB 26 Apr 2023").
8. `objectName` on every shape you add directly (components do this already). `isTextBox` is set by `ui.text`.
9. Never share option objects between calls (pptxgenjs mutates them). Hex colours never carry `#`.
10. Check your renders: nothing clipped, nothing overlapping, nothing hugging the footer; numbers never broken across lines (use ` `).

## Notes (per slide, in `notes/<name>.js`)
```js
NOTES_DATA["in-classes"] = {
  title: "Four classes decide the route",
  core: "≤120 words to say when time is tight (≤60 on decision slides)",
  purpose: "...", say: "full narrative with specifics", ask: "activity instructions", debrief: "...",
  status: "evidence status line (case slides only)", india: "India adaptation (where a foreign source is used)",
  caution: "what not to claim; what to check", transition: "one line into the next slide",
  src: ["mdr", "md12"],   // keys from refs.js, or new keys you define in your notes file under NEW_REFS
};
SOURCES["in-classes"] = "Sources: MDR-2017 Rule 4 and First Schedule; CDSCO classification lists (2020–22)";
```
If a source is not in `refs.js`, add it to `NEW_REFS` in your notes file as `{ key: { group: "india"|"intl"|"teach"|"evid"|"media", short, cite, url } }` using only URLs from `facts/`.
