// Legacy v1 notes keyed by old slide number; storyboard_v2.json 'legacy' maps new ids to these. Not loaded by notes_compose (underscore prefix).
module.exports = { LEGACY: {
 "1": {
  "title": "Bridging the Gap: From Innovation to Patient Impact",
  "activity": "Opening question to the room",
  "purpose": "Start with the person who will use the device, not with the technology.",
  "say": "“Imagine the prototype on your desk is about to be used by someone at home — in Bhubaneswar, in Cuttack, or in a village two hours from a neurologist. What would you need to know before you recommended it?”\n“Today we practise that judgement on two devices from my own development work: FoGO, a wearable being developed to detect freezing of gait in Parkinson’s disease and trigger a vibration cue (so far tested only on public datasets and in a staged demonstration), and SwaKnee, a pulsed electromagnetic field (PEMF) system for knee osteoarthritis. The photographs are authentic: the FoGO alpha prototype and the SwaKnee product.”\n“By the end you should be able to: state an intended use and claim precisely; judge what evidence supports it; recognise consent, conflict-of-interest and affordability burdens; know which Indian permission answers which question; and assign responsibility for safety after launch.”",
  "preflight": "1. Slide 2: replace “[state role]” with your SwaKnee (Swayogya Rehab Solutions) role and any equity, royalty or salary interest; add your FoGO equity position if you wish to state it.\n2. Slide 13: re-check the SwaKnee figures (≈32% vs ≈14% average VAS reduction; n = 40 vs n = 42) against swayogya.in/evidence.html, and be ready to state SwaKnee’s CDSCO licence status and whether the study was registered on CTRI.\n3. Align your own live web pages and leaflets with slide 13: the SwaKnee website source reviewed for this deck says “Clinically Proven”.\n4. NPPA knee-implant cap: extended to 15 November 2026; check for any further extension (slide 19 notes).\n5. Check the status of MDR-2017 amendments reported in August 2026, NMC conduct regulations, UCMPMD amendments and DPDP Rules phase dates (slides 16, 17, 20, 10).\n6. Media: confirm written permission from the FoGO volunteer (face obscured) and the person in the SwaKnee step videos (no face shown) for public teaching.\n7. Test both embedded videos on the venue computer; bring a flipchart, printed checklists, index cards and a timer.",
  "caution": "The decision checklist at the end is a workshop synthesis, not an official regulatory checklist or certification.",
  "transition": "“Before we start, you should know my interests.”",
  "src": [
   "fogoDeck",
   "swaMedia"
  ],
  "core": "Imagine this prototype is about to be used by someone at home: in Bhubaneswar, in Cuttack, or two hours from a neurologist. What would you need to know before recommending it? Today we practise that judgement on two devices I am involved with: FoGO, a wearable being developed to detect freezing of gait and cue walking, and SwaKnee, a pulsed electromagnetic knee system. By the end you will judge claims, evidence, consent, permission, cost and safety for yourselves."
 },
 "2": {
  "title": "My interests, stated first",
  "activity": "Disclosure and ground rules (1 minute)",
  "purpose": "Model good conflict-of-interest practice before asking the audience to judge evidence.",
  "say": "“I have professional interests in both case studies.” Say them specifically. FoGO: founder and principal investigator, Ahilaya Biomedicals Pvt Ltd (incubated at KIIT TBI); a provisional patent (202531119165) and a design application have been filed; ₹25.5 lakh in grants has been received from three programmes (Startup Odisha, DST NIDHI PRAYAS, Startup India Seed Fund); a BIRAC BIG proposal is under review. SwaKnee: state your role at Swayogya Rehab Solutions and any equity, royalty or salary interest (the slide shows “[state role]” until you edit it). Name any other financial interests.\n“Apply a ‘reasonably perceived’ test to everything I say about these devices — the test used in the University of Cambridge conflict-of-interest policy. The Institute of Medicine defines a conflict of interest as circumstances that create a risk that judgement about a primary interest is unduly influenced by a secondary one — a risk, not an accusation.”\n“Three ground rules: vote before you hear my view; challenge every claim, including mine; and protect identities — no names or photographs of patients from your own practice.”",
  "debrief": "Stanford sources flag physician-innovator roles as prone to conflicts of interest that should be managed without ending collaboration (Stanford GSB case OIT105), and question whether physician-innovators should evaluate their own devices (Chao, Riskin & Krummel 2010). Johnson and Rogers list conflicts of interest among four ethical challenges of surgical innovation; they apply to devices by analogy. We return to management on slide 16.",
  "transition": "“Let’s make a decision before we look at any details.”",
  "src": [
   "camCoi",
   "iom",
   "sbChao",
   "sbGsbCoi",
   "johnsonRogers"
  ],
  "core": "Before you judge my evidence, you should know my interests. FoGO: I am founder and principal investigator of Ahilaya Biomedicals; a provisional patent and a design application are filed; we have received ₹25.5 lakh in grants, and a BIRAC BIG proposal is under review. SwaKnee: [state your role and any equity, royalty or salary interest]. So: vote before you hear my view, challenge every claim, mine included, and protect identities."
 },
 "3": {
  "title": "Would you let a patient use it? (opening vote)",
  "activity": "OPENING VOTE by show of fingers",
  "purpose": "Surface the room’s intuitions before any teaching, so we can see the shift at the end.",
  "say": "Read the three facts slowly: a working prototype, promising results on public datasets, a test licence granted.\n“Hold up one, two or three fingers. One: suitable for routine care. Two: suitable for a research study. Three: not yet — I need more information.”",
  "ask": "Count roughly and write the split on the flipchart (1 = __, 2 = __, 3 = __). Ask one person from each group: “What made you choose that?” Do not give the answer yet, and do not say which device this is.",
  "debrief": "Keep it brief; the full answer unfolds during the session.\n• A test licence (Form MD-13 under the Medical Devices Rules, 2017) allows small quantities to be made for clinical investigation, test, evaluation, demonstration or training. Devices made under it cannot be sold. It is not permission to treat patients and not, by itself, permission to run a study.\n• A study needs approval from an ethics committee registered with CDSCO and, for an investigational device, Central Licensing Authority permission (Form MD-22 → MD-23), prospective CTRI registration and arrangements for injury compensation.\n• Routine care needs a licence for the intended use and evidence appropriate to the claim.\n“We will vote again at the end with exactly the same options.”",
  "caution": "These three facts match FoGO’s real status in August 2026 (alpha prototype, public-dataset results, MD-13 test licence for 25 units). Do not say so now. By slides 8–17 many people will have spotted it; at the closing vote (slide 23), confirm it.",
  "transition": "“To judge this well, we borrow three teaching traditions.”",
  "src": [
   "mdr",
   "md12",
   "md22",
   "ndct"
  ],
  "core": "Three facts: a working prototype, promising results on public datasets, a test licence granted. Hold up one finger for routine care, two for a research study, three for not yet. [Count and record the split.] Why did you choose that? I will not answer yet; we vote again at the end."
 },
 "4": {
  "title": "Three teaching traditions, one patient in India",
  "purpose": "Credit the frameworks we use and show how each is adapted to Indian practice.",
  "say": "Stanford Biodesign: innovation starts from a validated need, not a technology. Its Identify–Invent–Implement process asks teams to observe care, write solution-neutral need statements and screen needs before inventing. Its ‘Principled Decision-Making’ brief advises teams to write a team-culture document setting out their ethical principles early.\nHarvard bioethics: the HMS Center for Bioethics teaches through cases; the MRCT Center of Brigham and Women’s Hospital and Harvard provides practical tools on diversity, accessibility, plain-language consent, return of results and post-trial access for devices; the Petrie-Flom Center studies device regulation, home digital health and AI.\nCambridge design and translation: the Engineering Design Centre’s Inclusive Design Toolkit asks who is excluded by a product’s demands; Engineering Better Care (2017; working group chaired by Cambridge’s Prof John Clarkson) adds people, systems, design and risk perspectives; Cambridge’s Institute for Biomedical Innovation (announced January 2026) addresses the gap between a lab prototype and trial-ready devices; Cambridge Judge Business School’s health centre focuses on making proven solutions affordable.",
  "india": "Stanford’s process was localised in India through Stanford-India Biodesign (from 2007–08), now the School of International Biodesign at AIIMS and IIT Delhi. Chaturvedi and colleagues (BMJ Innovations 2015) adapted it in an Indian emergency department: 100 needs, filtered to 10. Our regulatory and ethics anchors are CDSCO under MDR-2017, ICMR’s 2017 guidelines, MvPI, NPPA pricing, and the reality that families pay out of pocket for most outpatient devices.",
  "caution": "None of these institutions has evaluated or endorsed FoGO or SwaKnee. The Biodesign textbook is Stanford content published by Cambridge University Press, so cite it as Stanford. IDEAL (slide 9) is Oxford-led, not Cambridge.",
  "transition": "“Now meet the two people we will keep in mind.”",
  "src": [
   "sbProcess",
   "sbPrincipled",
   "sbIndia",
   "sbChaturvedi",
   "hmsBioethics",
   "mrctDiversity",
   "pfHome",
   "camIdt",
   "camEbc",
   "camIbi",
   "camCchle"
  ],
  "core": "We borrow from three traditions. Stanford Biodesign: start from a validated need. Harvard bioethics and the MRCT Center: respect and protect every participant. Cambridge’s design centres: design for the whole system and for the people it excludes. We apply all three to Indian rules and Indian patients: CDSCO, ICMR, MvPI and NPPA."
 },
 "5": {
  "title": "Two people we will follow",
  "purpose": "Give every later decision a human face.",
  "say": "“Ramesh and Kamala are composites, not real patients, built from situations common in Odisha clinics.”\nRamesh, 71: Parkinson’s disease for eight years; freezes in doorways and when turning; has fallen twice this year; lives with his daughter, who works days and lends him her smartphone.\nKamala, 64: knee osteoarthritis in both knees; lives 30 km from the clinic at the district hospital; travels by shared auto; her household pays out of pocket and loses wages when someone accompanies her.\n“Every decision today is made for one of them. When you vote, vote for them.”",
  "india": "Burden context: about 7.7 lakh people in India were living with Parkinson’s disease in 2019 (India State-Level Disease Burden Initiative, as cited in the FoGO project material). Knee osteoarthritis was found in 28.7% of 5,000 people in a five-site community survey (Pal et al. 2016) — one study, not a national estimate.",
  "caution": "Do not attach these personas to the volunteer or demonstrator shown in the photographs or videos.",
  "transition": "“Their journey has six stages.”",
  "src": [
   "gbdIndiaNeuro",
   "palOA"
  ],
  "core": "Meet Ramesh, 71, with Parkinson’s: he freezes in doorways, has fallen twice this year and borrows his daughter’s phone. And Kamala, 64, with knee osteoarthritis: she lives 30 km from the clinic and her family pays out of pocket. They are composites, not real patients. When you vote today, vote for them."
 },
 "6": {
  "title": "Each stage must answer a patient’s question",
  "purpose": "Introduce the six-stage spine of the session; the progress dots on later slides show where we are.",
  "say": "Need — Will it help me? Evidence — Is there proof, for people like me? People — Can I freely say no, and are the people asking me free of hidden interests? Permission — Is it allowed for this use? Access — Can I afford it, use it and keep using it? Safety — Who answers if it fails, after the sale?\n“These questions adapt familiar research-ethics principles (benefit, risk minimisation, voluntary participation, accountability; compare the general principles in ICMR’s 2017 guidelines) to the device life cycle. The stages are not strictly sequential: Engineering Better Care’s ‘Sustain’ phase reminds us that access and safety must be designed from the start. We follow Ramesh and Kamala along this path.”",
  "transition": "“Stage one: what exactly are we promising?”",
  "src": [
   "icmr",
   "sbProcess",
   "camEbc"
  ],
  "core": "Every stage answers a question a patient would ask. Will it help? Is it proven? Can I refuse? Is it allowed? Can I afford it? Who answers if it fails? The dots at the top of later slides show which stage we are in."
 },
 "7": {
  "title": "Claim wording sets the evidence bar",
  "activity": "Quick call-out: rewrite one need statement",
  "purpose": "Show that the intended use and claim decide the regulatory route and the evidence needed.",
  "say": "Stanford’s need-statement format is: a way to [address the problem] in [a specific population] in order to [achieve a desired outcome]. It is deliberately solution-neutral. For Ramesh: “A way to reduce freezing-related immobility and falls in people with Parkinson’s disease living at home, in order to preserve safe, independent walking.” Notice: no sensor, no vibration, no app.\nNow compare two claims. “Shows walking patterns” promises information. “Detects freezing of gait in Parkinson’s” promises detection of a disease-related event and, in FoGO, triggers an action (a cue). Under MDR-2017, intended use and claims determine whether a product is a medical device and its risk class (A–D). CDSCO’s Guidance on Medical Device Software (21 July 2026) covers software as a medical device, software in a device and IVD software, including AI and IoT, whenever the intended purpose is medical; risk depends on how far the output drives clinical decisions and how serious the condition is. Calling a product ‘wellness’ does not remove obligations when the real purpose is medical; Simon, Shachar and Cohen (JAMA 2022) describe the liability grey zone of ‘prediagnostic’ wearables.",
  "ask": "“Rewrite Kamala’s need without naming any device.” Model answer: “A way to reduce pain and functional limitation in adults with knee osteoarthritis who cannot access or tolerate current options, in order to maintain daily function at an affordable cost.”",
  "caution": "FoGO’s project material proposes Class B; that is the developer’s proposal, not a CDSCO classification. Do not state SwaKnee’s class as fact; confirm with CDSCO or a regulatory adviser.",
  "transition": "“Let’s look at what FoGO has actually shown.”",
  "src": [
   "sbNeed",
   "mdr",
   "mdsw",
   "pfWearables"
  ],
  "core": "Stanford’s need statement is solution-neutral: a way to address a problem, in a population, to achieve an outcome. No sensor, no app. Now the claims. ‘Shows walking patterns’ promises information. ‘Detects Parkinson’s freezing’ promises detection of a disease event: a medical claim, with a higher evidence bar and a licence. Your wording chooses your obligations. Quick task: rewrite Kamala’s need without naming any device."
 },
 "8": {
  "title": "FoGO: what did the prototype actually show?",
  "activity": "Play the embedded 12-second clip, then ‘seen vs inferred’",
  "purpose": "Separate what a demonstration shows from what it seems to promise.",
  "say": "Introduce FoGO: an ankle module with a six-axis motion sensor streaming at 100 Hz to a phone app, which runs the detection model and, when a freeze is confirmed, triggers a vibrotactile cue from a chest module worn on an adhesive patch.\nPlay the clip (click the video). It shows a volunteer, face obscured, stopping mid-walk on purpose to mimic a freeze. The ankle module registers the stop, the app’s detection paths cross their thresholds and flag it as a freeze, and the chest module vibrates.\nAsk: “What did you see? What did you infer?” Write two columns on the flipchart.",
  "debrief": "Seen: the components work together in a staged demonstration, on a deliberate stop.\nNot shown: detection of real freezes in people with Parkinson’s; whether it tells a real freeze from a voluntary stop or a pause at a doorway (at home, that would be a false cue); performance across many users, homes, turns, doorways and walking aids; tolerability of repeated cues; and any clinical benefit such as fewer falls or more walking.\nA demonstration is valuable for understanding a system; it is not evidence of efficacy.",
  "status": "Demonstrated: staged prototype function (volunteer, simulated freeze). Not established: clinical detection performance and benefit.",
  "caution": "The project has built three prototype iterations (January 2024 to June 2025); results apply to the version tested. Do not describe the clip as clinical footage.",
  "transition": "“So where does FoGO sit on the evidence ladder?”",
  "src": [
   "fogoDeck"
  ],
  "core": "Watch twelve seconds. [Play.] A volunteer stops on purpose to mimic a freeze; the ankle sensor registers the stop, the app flags it as a freeze, and the chest module vibrates. What did you see, and what did you infer? We saw the parts working together on a deliberate stop. We did not see real freezes, many users, a freeze told apart from a pause, or fewer falls."
 },
 "9": {
  "title": "FoGO has climbed two rungs, not five",
  "purpose": "Make the difference between demonstrated, preliminary, planned and unestablished evidence visible.",
  "say": "Rung 1, Demonstrated: a staged demonstration on a volunteer (simulated freeze): sensing, flagging and the chest cue operate together.\nRung 2, Reported and preliminary: on three public datasets (Daphnet, CuPiD, Turning-in-place) the project reports subject-wise F1 scores of 0.83–0.85 (sensitivity 0.86–0.89, specificity 0.85–0.88), with 0.15–0.18 false alarms per minute in subject-wise tests, and F1 0.74–0.80 when tested on an unseen dataset (cross-dataset false-alarm rates appear higher, about 0.21–0.27 per minute on the project chart; confirm from the project analysis). A project bench study (sample not stated) found the chest had the lowest vibration-perception threshold (0.72) and the widest usable range (0.72–4.77, internal scale) of five body sites.\nBoth rungs are preclinical — ‘Pre-IDEAL’ in the 2019 update of the IDEAL framework.\nRung 3, Planned: a prospective clinical proof-of-concept with AIIMS Bhubaneswar neurology and rehabilitation advisers, proposed as an 18-month BIRAC BIG project (IDEAL stages 1–2a). The proposal is under review; the study is not yet funded, ethics-approved or permitted by CDSCO. A planned study and its targets are not results.\nRungs 4 and 5, Not established: benefit in daily life, and long-term safety and fair performance across groups.",
  "debrief": "Context: the best-known public benchmark, Daphnet, recorded 10 patients in a laboratory, of whom 8 froze (237 video-labelled events). One systematic review (Silva de Lima et al. 2017) reported sensitivity of 73–100% and specificity of 67–100%, mostly from laboratory studies; Pardoel et al. (2019) found that 68 of 74 studies addressed detection, and prediction is still early. So public-dataset F1 scores, however careful, cannot tell us how FoGO performs in Odisha homes.\nIDEAL (McCulloch et al., Lancet 2009; Oxford-led) and IDEAL-D (Sedrakyan et al., BMJ 2016) ask for prospective design, registration and full reporting from the earliest human stages, and suggest that device approval can be staged and tied to registries. The rungs are questions, not a compulsory sequence.\nFor the next rung, ask for: video-annotated reference events; participant-level validation; false alarms per hour and detection latency in real use; and testing in homes, during turns and in doorways.\nCambridge’s Institute for Biomedical Innovation (announced January 2026) names the gap between ‘a clever prototype that works in a lab’ and devices suitable for clinical trials, and offers batch prototyping of tens to hundreds of devices in ISO-certified environments.",
  "ask": "“Which rung matters most before Ramesh uses it at home?”",
  "status": "1 Demonstrated · 2 Reported, preliminary (project-reported, public datasets) · 3 Planned · 4–5 Not established.",
  "transition": "“Here is a realistic decision.”",
  "src": [
   "fogoDeck",
   "daphnet",
   "silvaDeLima",
   "pardoel",
   "ideal",
   "idealD",
   "camIbi"
  ],
  "core": "Five rungs. FoGO has a staged demonstration: demonstrated. It has project-reported F1 scores of 0.83 to 0.85 on public datasets: reported, preliminary. A prospective patient study is planned, not done. Benefit in daily life, and long-term, fair performance, are not established. The rungs are questions to answer, not a compulsory sequence. Which one matters most before Ramesh uses it at home?"
 },
 "10": {
  "title": "Would you proceed? A home pilot for Ramesh next month",
  "activity": "DECISION 1 of 4: vote A/B/C, then pairs name conditions",
  "purpose": "Turn the evidence ladder into a concrete decision with conditions and owners.",
  "say": "Read the facts: F1 0.83–0.85 on public datasets; ten participants using the device alone at home; Ramesh has fallen twice this year and asks to join. Ethics approval and CDSCO permission are not yet in place: do not say so; see whether anyone asks.\n“A: proceed. B: proceed only with conditions — name them. C: not yet.”",
  "ask": "Vote. Give pairs 60 seconds: “If B, which two conditions?” Take three answers.",
  "debrief": "Conditions an ethics committee and regulator would expect:\n1. Permissions first: approval from an ethics committee registered with CDSCO; for an unlicensed investigational device, CDSCO permission (MD-22 → MD-23) — the academic-study exemption covers only licensed devices; units built under the MD-13 test licence; prospective CTRI registration before the first participant; insurance and compensation arrangements.\n2. Start supervised: in-clinic sessions with video-annotated freezes before any home use; then home use with a caregiver, stopping rules and a contact number.\n3. Plan for failure: fall-risk assessment, cue limits, an easy off switch, a visible loss-of-monitoring alert.\n4. Consent for fluctuating cognition: ICMR 2017 sections on consent and vulnerability; involve caregivers; plain language (MRCT Clinical Research Glossary).\n5. Data: the app logs gait events; design notice, minimisation and retention now — under the DPDP Rules (notified 13 November 2025) the core obligations apply from about May 2027.\n6. After the study: Declaration of Helsinki 2024 (para 34) requires post-trial provisions to be arranged in advance and disclosed in consent; the MRCT Center’s 2025 device framework shows how (apply by analogy).\n“Not yet” is legitimate while permissions are pending, but it has a cost: Ramesh keeps falling meanwhile, so the answer is a fast, properly permitted and supervised study, not indefinite delay. Wexler and Largent (2023) note that even ‘harmless’ sensor tests on lab members merit independent oversight.",
  "caution": "Hypothetical scenario built on real FoGO facts; it does not describe the planned FoGO proof-of-concept, which is proposed with AIIMS Bhubaneswar advisers; its protocol is not yet finalised or approved.",
  "transition": "“If we do proceed, which failures matter most?”",
  "src": [
   "md12",
   "md22",
   "mdr",
   "ndct",
   "icmr",
   "helsinki",
   "mrctGlossary",
   "mrctPostTrial",
   "dpdpRules",
   "wexler"
  ],
  "core": "Facts: good scores on public data; ten users, alone at home; Ramesh has fallen twice and asks to join. A, proceed. B, proceed with conditions. C, not yet. Vote. Pairs: if B, name two conditions in 60 seconds. [Take three answers.] Did anyone ask whether ethics approval and CDSCO permission exist? They do not yet. Permissions come first, then a supervised study, then home use."
 },
 "11": {
  "title": "Rank each failure by harm and likelihood",
  "activity": "Risk-map discussion",
  "purpose": "Practise risk prioritisation and connect it to testable controls.",
  "say": "“Risk combines severity and likelihood. The six failure modes are placed for discussion, not from measured data.”\nMissed freeze: no cue when Ramesh needs one — serious, and possibly critical if he falls. Silent signal loss: the system stops monitoring without telling him — false reassurance. Flat battery mid-walk. False cue: frequent but usually minor. Skin irritation under the strap or patch. Data exposure from the app.\nThe right-hand panel translates reported numbers into lived experience: 0.15–0.18 false alarms per minute (subject-wise tests on public datasets) would mean about 9–11 unnecessary vibrations in every hour of walking, and the higher cross-dataset rates (about 0.21–0.27 per minute) about 13–16, if those rates held at home. Would Ramesh keep wearing it?",
  "debrief": "ISO 14971:2019 approach: identify hazards; estimate and evaluate risk; control it; verify that controls work; and keep monitoring after release. Usability engineering (IEC 62366-1) tests whether real users can operate the controls.\nThe FoGO project material already names missed or false detections (2-of-3 debounce, patient-specific fine-tuning) and discomfort or habituation (cue intensity within the bench-tested range). Ask how each control will be shown to work.\nControls to test first: a visible and tactile loss-of-monitoring alert; cue-intensity limits and an easy stop; performance during turns, in doorways and with walking aids; low-battery warnings; encryption and short data retention.\nEngineering Better Care’s risk perspective and Gerke and colleagues’ ‘system view’: evaluate the whole system — patient, caregiver, phone battery, network, physiotherapist follow-up — not only the algorithm. Kellmeyer and colleagues warn that closed-loop devices can blur accountability when automation fails.",
  "ask": "“Which control would you test first, and how would you show it works?”",
  "caution": "Placement on the grid is illustrative. The 9–16 per hour range is an extrapolation from project-reported dataset rates, not a measured home rate.",
  "transition": "“Now to Kamala, and a different kind of burden.”",
  "src": [
   "fogoDeck",
   "iso14971",
   "iec62366",
   "camEbc",
   "pfSystem",
   "kellmeyer"
  ],
  "core": "Risk is harm and likelihood together. A missed freeze or a silent signal loss could mean a fall; a false cue is minor but frequent. At the project’s reported dataset rates, Ramesh would feel about 9 to 16 unnecessary vibrations in every hour of walking, if those rates held at home. Would he keep wearing it? Which control would you test first?"
 },
 "12": {
  "title": "A device is also a daily routine",
  "activity": "Play the embedded 20-second clip",
  "purpose": "Show that use burden is part of benefit–risk.",
  "say": "Introduce SwaKnee: a knee applicator and controller that deliver pulsed electromagnetic fields, described in the supplied original deck as having an intended adjunctive role in knee osteoarthritis care. State its current labelled intended use and CDSCO licence status yourself; this deck does not assert either.\nPlay the clip: fit the applicator, switch on the controller, rest for the session. It is a company demonstration of use; it shows no clinical response.\n“The supplied leaflet describes 45-minute sessions daily for 45 days. That is 2,025 minutes — about 34 hours of Kamala’s time — before travel, fitting, charging and help from family.”",
  "ask": "“Who helps Kamala when the cuff slips, the controller shows an error, or her knee feels warm?”",
  "debrief": "Use burden affects adherence, which affects real-world benefit. Each task also makes demands on vision, dexterity, reach and memory — we audit these on slide 18.\nOptional: the company’s longer online explainer video (YouTube link in Sources) can be shared after the session.",
  "caution": "The 45 × 45 schedule illustrates time burden. It is not a prescription; current instructions and clinician advice define actual use.",
  "transition": "“What can the SwaKnee evidence support?”",
  "src": [
   "swaLeaflet",
   "swaMedia",
   "swaVideo"
  ],
  "core": "SwaKnee delivers pulsed electromagnetic fields to the knee. [Play the 20-second clip.] The leaflet describes 45 minutes a day for 45 days: about 34 hours of Kamala’s time, before travel, charging and help from family. Who helps her when the cuff slips or the controller shows an error?"
 },
 "13": {
  "title": "Which claim can this evidence carry?",
  "activity": "Claim challenge: one participant defends, one challenges",
  "purpose": "Match the strength of a claim to the strength of the evidence.",
  "say": "The chart reproduces the company-reported 45-day comparative study: device group n = 40, comparison group n = 42; average VAS pain fell by about 32% versus 14% from baseline. These are average relative changes, not the proportion of people who improved.\nThe callout adds a patient’s yardstick: in knee osteoarthritis, the minimal clinically important improvement in pain is about −19.9 mm, or −40.8%, on a 100 mm scale (Tubach et al. 2005). An average fall of 32% does not tell us how many people reached a change they would notice as important.\nThe public summary does not report: how groups were allocated; blinding or a sham control; prospective CTRI registration; how missing data were handled; the between-group difference with its confidence interval; adverse events; or durability beyond 45 days. [Presenter: state what the full study report shows, or that it is not public.]\nSwaKnee today: CDSCO licence status [state, with document]; CTRI registration [number, or not registered]; planned independent trial [describe, or none disclosed].",
  "ask": "Invite one person to defend claim 1 and another to challenge claim 3.",
  "debrief": "Claim 1, “less pain on average in one 45-day company study”, is acceptable if clearly labelled as company-reported.\nClaim 2, “clinically proven”, needs independent, prospectively registered, sham-controlled trials and consistent results. Independent evidence on PEMF is mixed: a Cochrane review (2013; 9 trials, all osteoarthritis sites and electromagnetic field types) found pain probably improves by about 15 points out of 100 more than sham, with function uncertain; meta-analyses disagree (Chen 2019, knee OA, 8 RCTs: no pain advantage over placebo; Yang 2020, all OA sites, 16 RCTs: an advantage); OARSI’s 2019 guideline strongly recommends against electromagnetic therapy.\nClaim 3, “regrows cartilage”, was not measured. No human evidence of cartilage regeneration was found; a pain change cannot establish structural change.\nIndustry sponsorship matters: a Cochrane methodology review found manufacturer-sponsored drug and device studies reach favourable conclusions more often (RR 1.34). The same standard applies to every leaflet and web page, including those of any company the presenter is linked to (see slide 2).",
  "status": "Reported (company study; not peer-reviewed or independently verified). ‘Clinically proven’: not established. Cartilage regrowth: not measured.",
  "caution": "The MCII is a within-patient threshold from a four-week cohort, not a between-group minimal important difference; use it to ask whether individuals improved meaningfully, not as a pass/fail test.",
  "transition": "“Even a good average can mislead.”",
  "src": [
   "swaEvidence",
   "tubach",
   "cochranePemf",
   "chenPemf",
   "yangPemf",
   "oarsi",
   "lundh"
  ],
  "core": "The company reports that average pain fell about 32% with SwaKnee and 14% with comparison care, in one 45-day study of 82 people. That is an average. A change patients notice as important is about 41% for each person, so how many reached it? Which claim can this carry? ‘Less pain on average in one company study’: yes, if labelled. ‘Clinically proven’: not established. ‘Regrows cartilage’: never measured. One volunteer defends claim 1; another challenges claim 3."
 },
 "14": {
  "title": "An average can hide a patient",
  "purpose": "Show, with an independent published case, why subgroup performance matters.",
  "say": "Sjoding and colleagues (NEJM 2020), University of Michigan cohort: when the pulse oximeter read 92–96%, arterial oxygen saturation was below 88% in 11.7% of paired measurements for Black patients versus 3.6% for White patients (88 of 749 vs 99 of 2,778; 95% CI 8.5–16.0 vs 2.7–4.7), more than three times as often. The unit is paired measurements; race was recorded, not skin pigmentation measured; it was observational. It does not justify a race-based correction — it shows that a device that looked accurate on average missed dangerous low oxygen more often in one group.\nRegulators responded: the US FDA’s January 2025 draft guidance asks for clinical testing across a diverse range of skin tones, assessed on the Monk Skin Tone scale.",
  "ask": "“Who is missing from our data?” Take two answers for each case.",
  "debrief": "Ramesh: people using walking aids; cognitive fluctuation; crowded homes and floor-level living; clothing such as saris or dhotis over the sensor; public datasets with few or no Indian participants.\nKamala: women, people with obesity, manual and agricultural workers, people with other illnesses, rural users.\nThe MRCT Center’s diversity guidance defines diversity broadly — including comorbidities, concurrent medicines and environment — and asks for subgroup reporting. Stanford Biodesign’s health-equity programme trains innovators to see how decisions at the identify, invent and implement stages affect equity.",
  "transition": "“Now the people: consent and conflicts.”",
  "src": [
   "sjoding",
   "fdaOximeter",
   "mrctDiversity",
   "sbEquity"
  ],
  "core": "An average can hide a patient. In one US hospital cohort, oximeters reading 92 to 96% missed dangerously low oxygen in 11.7% of paired readings for Black patients, against 3.6% for White patients. Who is missing from our data? For Ramesh: walking aids, saris, crowded homes. For Kamala: women, rural users, people with other illnesses.",
  "optional": true
 },
 "15": {
  "title": "Would you proceed? Ramesh’s neurologist is also the inventor",
  "activity": "DECISION 2 of 4: vote, then 60-second role-play (patient, recruiter, observer)",
  "purpose": "Practise consent when there is a dependent relationship, a language barrier and a request to film.",
  "say": "Read the facts: Ramesh asks, “Will saying no change my care?”; the consent form is in English only; this neurologist is the only one within 100 km, and the study needs participants by March.\nTwist if time allows: the clinic also wants to film him for a talk.\n“A: recruit as planned. B: proceed with safeguards — which ones? C: not yet.”",
  "ask": "Vote. Then one participant plays Ramesh, one the recruiting neurologist, and one observes for 60 seconds. The observer reports one thing that would make refusal easier.",
  "debrief": "• Dependent relationship: the Declaration of Helsinki (2024, para 27) says that when a potential participant is in a dependent relationship with the physician, consent must be sought by an appropriately qualified individual independent of that relationship. State plainly that refusal will not change care.\n• Disclose the inventor’s interest to the ethics committee and in the consent conversation (ICMR 2017; CIOMS Guideline 25); use an independent outcome assessor.\n• Language and understanding: ICMR 2017 requires consent in a language the participant understands, with an impartial witness if the participant cannot read. Put key information first (the US Common Rule’s ‘key information’ requirement is a useful model) and use teach-back; the MRCT Clinical Research Glossary helps explain ‘investigational’ and ‘sham’.\n• Therapeutic misconception (Appelbaum): participants may assume research procedures are care chosen for them; say clearly what is uncertain.\n• Filming: separate, specific and revocable consent for recordings used in teaching or publicity, in writing for public media (the UK GMC’s guidance is a good comparator); gait videos usually identify people, so anonymisation rarely suffices; never make filming a condition of care or of study entry.\nGood answers: B with these safeguards, or C until the consent process is fixed. “Not yet” has a cost here too: excluding Ramesh because the only neurologist is conflicted denies him access; the fix is an independent consenter and assessor, not exclusion.",
  "caution": "Fictional vignette; it does not describe either project’s actual consent procedure.",
  "transition": "“Disclosure is only the start.”",
  "src": [
   "helsinki",
   "icmr",
   "cioms",
   "commonRule",
   "mrctGlossary",
   "appelbaum",
   "appelbaum1987",
   "gmc"
  ],
  "core": "Ramesh’s neurologist is FoGO’s inventor and wants to recruit him. Ramesh asks, ‘Will saying no change my care?’ The consent form is in English only, and this is the only neurologist within 100 km. A, recruit now. B, proceed with safeguards. C, not yet. Vote. Then 60 seconds of role-play: patient, recruiter, observer. Observer: what would make refusal easier? Key safeguards: an independent person takes consent, in Ramesh’s language, with teach-back, and the inventor’s interest is disclosed."
 },
 "16": {
  "title": "Disclosure starts the work; management finishes it",
  "purpose": "Move from declaring conflicts to managing them.",
  "say": "Interests: equity or royalties; grants and institutional reputation; personal reputation.\nRisks: pressure to enrol dependent patients; optimistic reading of outcomes; selective reporting of positive results. A Cochrane methodology review found that manufacturer-sponsored drug and device studies report favourable conclusions more often than other studies (RR 1.34).\nSafeguards: independent consent and outcome assessment; prospective CTRI registration with pre-specified outcomes; publication of all results, including null and negative ones, with a plain-language summary to participants.",
  "debrief": "Cambridge’s spinout guidance advises founders to be clear about when they are working for the company and when for research. Harvard Medical School’s 2010 policy moved from disclosure to limits (for example, no industry speakers’ bureaus). The US publishes industry payments to physicians (Open Payments); the UK Cumberlege Review recommended a register of doctors’ financial interests.\nIn India the rules are split: the Uniform Code for Marketing Practices in Medical Devices (2024, amended 2026) is a voluntary code for companies; for doctors, the NMC’s 2023 regulations were held in abeyance on 23 August 2023 (no replacement was found in October 2026 searches; check nmc.org.in), so the IMC 2002 regulations apply; clause 6.8 covers the ‘pharmaceutical and allied health sector industry’, commonly read to include device companies; ICMR 2017 requires COI disclosure to ethics committees. None removes the need for project-level management.",
  "ask": "“Which safeguard is cheapest to add today?” (Usually CTRI registration and naming an independent assessor.)",
  "transition": "“Next: which Indian permission answers which question?”",
  "src": [
   "lundh",
   "sbChao",
   "sbGsbCoi",
   "camSpinout",
   "hmsCoi",
   "openPayments",
   "cumberlege",
   "ucmpmd",
   "imc2002",
   "nmcAbeyance",
   "icmr",
   "mrctResults"
  ],
  "core": "Disclosure starts the work; management finishes it. Interests create risks: pressure to enrol, optimistic reading, selective reporting. Manage them with independent consent and assessment, CTRI registration before the first participant, and publication of every result. Which safeguard is cheapest to add today?"
 },
 "17": {
  "title": "Each permission answers a different question",
  "activity": "“Where is Ramesh’s device on this path today?”",
  "purpose": "Give a practical map of the Indian route, anchored in a real project.",
  "say": "Test licence: application in Form MD-12, licence in MD-13 (Central Licensing Authority) — make small quantities for test, evaluation, clinical investigation, demonstration or training; not for sale.\nClinical investigation of an investigational device: application in Form MD-22 (Rule 51) with Seventh Schedule documents (clinical investigation plan, investigator’s brochure, risk management, verification and validation, informed consent form, insurance); permission in MD-23 (Rule 52); an ethics committee registered with CDSCO; CTRI registration before the first participant.\nManufacturing licence for sale: Class A/B from the State Licensing Authority (MD-3 → MD-5); Class C/D from the Central Licensing Authority (MD-7 → MD-9); quality management system under the Fifth Schedule (aligned with ISO 13485).\nPost-market: complaint handling, periodic safety update reports (reported as six-monthly for two years, then annually for two), adverse-event and recall duties, and reporting to MvPI. Software follows CDSCO’s Medical Device Software guidance (21 July 2026).\nFoGO today: MD-13 test licence for 25 units (10 August 2026, for evaluation with AIIMS Bhubaneswar and AMTZ), after IEC 60601-1-2 EMC pre-compliance testing (July 2026). Next: an MD-22 application, ethics approval and CTRI registration.",
  "debrief": "International comparison: in the US the sponsor proposes, and the IRB decides, whether a device study is significant or non-significant risk (FDA is the final arbiter); significant-risk studies need an investigational device exemption (21 CFR 812), followed by 510(k), De Novo or PMA. In the EU, notified-body CE marking is followed by post-market clinical follow-up under MDR 2017/745; transition deadlines run to 2027–2028 and a targeted revision proposed in December 2025 is under negotiation. Clinical investigations worldwide follow ISO 14155, now in its 2026 edition. Rules differ; the ethical duties do not.\nA licence is not proof of benefit: among 157 US cardiovascular devices with Class I recalls (2013–2022), only 19.1% had any premarket clinical testing (Kadakia et al. 2024).\nRule 51(2) waives the clinical-investigation fee for government-run or government-funded institutions. Current-affairs digests reported in late August 2026 that MoHFW had proposed MDR-2017 amendments to simplify compliance; content and status are unconfirmed, so check before the talk.\nRisk class (shown in the third card): Class A and B manufacturing licences come from the State Licensing Authority, C and D from the Central Licensing Authority; higher classes need more evidence and central review.",
  "caution": "Simplified overview; device class, study purpose and specific exemptions determine the route. The academic clinical-study exemption applies only to licensed devices with ethics approval and data not used for marketing submissions. FoGO’s ‘Class B (proposed)’ is the developer’s proposal.",
  "transition": "“Permission does not mean people can use it.”",
  "src": [
   "mdr",
   "md12",
   "md22",
   "mdrPath",
   "ndct",
   "mdsw",
   "cdscoPms",
   "fogoDeck",
   "cfr812",
   "euMdr",
   "euProposal",
   "iso14155",
   "kadakia"
  ],
  "core": "Each Indian permission answers a different question. A test licence lets you make units for testing. Clinical-investigation permission, with ethics approval and CTRI registration, lets you test in people. A manufacturing licence lets you sell for the intended use: State for Class A and B, Central for C and D. Post-market duties keep it safe. FoGO today has an MD-13 test licence for 25 units; next come MD-22, ethics approval and CTRI. Where is your project on this path?"
 },
 "18": {
  "title": "Who can’t use it? Audit the demands",
  "activity": "Inclusive-design audit: pick one demand to redesign",
  "purpose": "Make usability and exclusion an ethical question, not only a design question.",
  "say": "The Cambridge Engineering Design Centre’s Inclusive Design Toolkit rates the demands a product makes on seven capabilities: vision, hearing, thinking, communication, locomotion, reach and stretch, and dexterity. Its Exclusion Calculator estimates how many people cannot complete the tasks.\nOn the slide the ratings are illustrative. FoGO asks a person with Parkinson’s to bend and strap an ankle module, stick on a chest patch and pair a phone — high demands on reach, dexterity and thinking. SwaKnee asks an older person with knee osteoarthritis to position an applicator, connect a controller and time a 45-minute session.\nThe FoGO team reports consulting 30+ potential users (project-reported); a common request was more comfort and easier use.",
  "india": "Add Indian demands the toolkit does not list: language (Odia, Hindi, English), literacy, unreliable power, shared or no smartphone, and dependence on a caregiver. The Exclusion Calculator uses UK population data from 1996–97, so its percentages must not be presented as Indian figures. The MRCT Center’s Accessibility by Design toolkit (2023) supports including people with disabilities in research; adaptations such as home visits, travel support and accessible consent formats follow from it (workshop suggestions). Usability engineering under IEC 62366-1 turns these into testable requirements.",
  "ask": "“Which one demand would you redesign first?” A quick classroom version of the Cambridge simulation tools: try fastening a strap wearing thick gloves.",
  "transition": "“And then there is cost.”",
  "src": [
   "camIdt",
   "mrctAbd",
   "iec62366",
   "cam4g9",
   "fogoDeck"
  ],
  "core": "Cambridge’s Inclusive Design Toolkit asks what a product demands of seven capabilities. FoGO asks someone with Parkinson’s to bend, strap and pair a phone; SwaKnee asks an older person to position an applicator and time a session. India adds language, literacy, power cuts, no smartphone and dependence on a caregiver. Which demand would you redesign first?",
  "optional": true
 },
 "19": {
  "title": "The price tag is only part of the cost",
  "purpose": "Widen affordability from purchase price to the total cost of use.",
  "say": "Walk Kamala’s 45 days: buy or rent the device; travel 30 km to the clinic for fitting and training; about 34 hours of sessions; a family member’s time and lost wages; repairs and support. “Who pays for each step?” Ask the room to fill each dashed box. For home-use devices this is usually the household, out of pocket.\nThe panel: in July 2021 NPPA capped trade margins on five home-use devices (pulse oximeters, BP monitors, nebulisers, digital thermometers, glucometers); 91% of 684 brands cut their MRP, by up to 88%. Home devices are within the reach of price policy.\nAn implant precedent: on 16 August 2017 the National Pharmaceutical Pricing Authority capped knee-implant prices; the average price of the widely used cobalt-chromium primary knee fell from ₹1,58,324 to ₹54,720 (65%). The cap has been extended repeatedly, most recently to 15 November 2026. Coronary stents were capped on 13 February 2017 (₹7,260 bare-metal, ₹29,600 drug-eluting). Close with: “Affordability is an ethical design input, not an afterthought.”",
  "debrief": "Cambridge Judge Business School’s Centre for Health Leadership and Enterprise describes progress in three phases: develop technologies, integrate them into care at scale, and make proven solutions affordable and widely available. The Harvard Business School Aravind case shows affordability built in through local manufacture (Aurolab lenses) with quality systems. FoGO’s plan targets ₹27,000 plus a ₹3–4,000 annual service plan — a planned price, not a market result.\nResponsible options for an adjunct with modest evidence: rental rather than purchase; clinic-shared devices; a trial period with refund if not tolerated; a transparent statement of the total cost of a course.",
  "caution": "Price caps are a trade-off: manufacturers sought to withdraw some premium stents (refused), and observers feared hospitals would shift costs to other charges — a reported concern, not a measured effect. SwaKnee is not an implant and is not covered by the knee-implant cap. Check NPPA for any extension after 15 November 2026.",
  "transition": "“Now a commercial decision.”",
  "src": [
   "nppaTmr",
   "nppaKnee",
   "nppaKneeExt",
   "nppaStent",
   "stentWithdraw",
   "camCchle",
   "hbsAravind",
   "fogoDeck"
  ],
  "core": "Walk Kamala’s 45 days: buy or rent, travel, about 34 hours of sessions, family time, repairs. Who pays each step? Call out an answer for each box. Usually it is the household, out of pocket. Price policy can reach home devices: after NPPA capped trade margins in July 2021, 91% of brands of five home devices cut their prices. Affordability is a design input, not an afterthought."
 },
 "20": {
  "title": "Would you proceed? Launch with this brochure",
  "activity": "DECISION 3 of 4: vote, then rewrite one claim",
  "purpose": "Practise responsible commercialisation under real pressure.",
  "say": "Kamala’s son finds this hypothetical brochure online: “Clinically proven! Regrows cartilage. Doctor recommended. Avoid surgery forever.” The distributor insists on these claims, and the company has cash for three months.\n“A: launch as written. B: fix the claims first, then launch. C: not yet.”",
  "ask": "Vote. Then ask each table to rewrite one claim in 30 seconds.",
  "debrief": "• “Clinically proven” needs independent, controlled replication; one company study is not enough, and guideline bodies are sceptical of PEMF (OARSI 2019).\n• “Regrows cartilage” was not measured, and no human evidence of regeneration was found.\n• “Doctor recommended” implies an endorsement and raises conflict-of-interest questions for the company (marketing code) and the doctor (professional conduct rules).\n• “Avoid surgery forever” is an absolute promise no evidence supports.\nThe Uniform Code for Marketing Practices in Medical Devices (2024, as amended 30 April 2026) requires product information to be accurate, balanced, not misleading and capable of substantiation, and bars gifts and hospitality to healthcare professionals; it is a voluntary code run through industry associations. The Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 lists ‘rheumatism’ among conditions for which cure claims may not be advertised — take legal advice on how it applies to device claims. The ASCI Code (Chapter I.1) requires truthful and substantiated claims.\nA better line: “In a company study of 82 adults over 45 days, average pain fell more with SwaKnee than with comparison care. Independent trials are needed to confirm this.”\nStanford’s Principled Decision-Making brief advises teams to write a team-culture document setting out their ethical principles early, before moments like this.\n“Not yet” also has a cost: if the company folds, current users lose support and service. That is why B, honest claims and a launch, is usually the responsible answer.",
  "caution": "The brochure is hypothetical and does not reproduce any actual SwaKnee material. Check any of your own live web or print claims against this standard before the talk.",
  "transition": "“The last decision comes after launch.”",
  "src": [
   "ucmpmd",
   "dmra",
   "asci",
   "oarsi",
   "sbPrincipled",
   "swaEvidence"
  ],
  "core": "Kamala’s son finds this brochure: ‘Clinically proven! Regrows cartilage. Doctor recommended. Avoid surgery forever.’ The distributor insists, and the company has three months of cash. A, launch as written. B, fix the claims first. C, not yet. Vote, then each table rewrites one claim in 30 seconds. A better line: ‘In one company study of 82 adults over 45 days, average pain fell more with SwaKnee than with comparison care; independent trials are needed.’"
 },
 "21": {
  "title": "Would you proceed? Push tonight’s FoGO update",
  "activity": "DECISION 4 of 4",
  "purpose": "Show that evidence belongs to a version, and changes need governance.",
  "say": "Read the facts: the new detection threshold gives fewer false cues, may miss more freezes, and has been tested on stored data only.\n“A: push to all users tonight. B: staged release after review, with monitoring and rollback. C: not yet.”\nThe screenshot is the real prototype app: the cue was ‘debounced’ — confirmed in two of three windows — before it fired. Changing that rule changes the device’s behaviour.",
  "debrief": "A threshold trades sensitivity against specificity: fewer nuisance cues can mean more missed freezes. Evidence for version 1 may not cover version 2.\nCDSCO’s Medical Device Software guidance (21 July 2026) expects lifecycle documentation, version control, validation and documented change management, and says an Algorithm Change Protocol may be devised where applicable — the guidance describes itself as interpreting the Rules, not adding a new control. The US FDA’s predetermined change control plan (PCCP) guidance for AI-enabled device software (December 2024) lets manufacturers pre-specify modifications with a validation protocol and impact assessment — it is not a blank cheque.\nIf the device is in a study: notify the ethics committee, seek an amendment, and re-consent if the change could affect a participant’s decision.\nA good release: shadow mode first; a small staged group; pre-set monitoring metrics and a rollback trigger; tell users and clinicians what changed. Who can pause or reverse the release? Name them.",
  "caution": "Hypothetical update; not a report of an actual FoGO release.",
  "transition": "“And if, despite all this, someone is harmed?”",
  "src": [
   "mdsw",
   "mdswDraft",
   "pccp",
   "pfSystem",
   "kellmeyer",
   "fogoDeck"
  ],
  "core": "Tonight’s update gives fewer false cues, but it may miss more freezes, and it has been tested only on stored data. A, push to everyone. B, staged release with monitoring and rollback. C, not yet. Vote. Evidence belongs to a version: results for version 1 may not cover version 2. Who in your team can pause or reverse a release?"
 },
 "22": {
  "title": "When harm happens, someone must answer",
  "activity": "Assign an owner to each step of the loop",
  "purpose": "Make post-market responsibility concrete.",
  "say": "“Suppose Ramesh falls after a missed cue.” Follow a report around the loop. Care: meet the person’s immediate needs. Record: device identity, serial number, software version, context. Report: to the Materiovigilance Programme of India using the Medical Device Adverse Event Reporting Form (helpline 1800-180-3024; mvpi-ipc@gov.in) and through the manufacturer’s statutory channels; in a study, to the sponsor and ethics committee. Investigate: root cause and context. Correct: corrective and preventive action, labelling, software fix or recall. Follow up: the person, and whether the correction worked.\nIndian case: DePuy recalled its ASR metal-on-metal hip systems worldwide in August 2010. About 4,700 ASR surgeries had been done in India (2004–2010). A Health Ministry expert committee chaired by Dr Arun K Agarwal reported on 19 February 2018; by August 2018 only 1,080 patients had been traced. The compensation formula — a ₹20 lakh base adjusted for disability and age — was approved only on 29 November 2018. Traceability and registries matter from day one.",
  "debrief": "MvPI was launched on 6 July 2015 at the Indian Pharmacopoeia Commission, Ghaziabad; manufacturers, importers, distributors, healthcare professionals and patients can report. Kramer and colleagues (PLoS Medicine 2013) found that post-market systems in the US, EU, Japan and China rely mainly on passive reporting. Passive systems are prone to under-reporting (our inference), so build reporting into the product (serial numbers, an in-app ‘report a problem’ button, a phone line). The UK Cumberlege Review (2020) recommended a Patient Safety Commissioner, redress and device registries.\nAvoid a blanket instruction to stop a needed device; safety decisions need clinical assessment and continuity of care.",
  "ask": "“Who in your team owns each of the six steps?”",
  "transition": "End with: “Who will still answer the phone after the sale?”",
  "src": [
   "mvpiIpc",
   "mvpiForm",
   "asrCommittee",
   "asrFormula",
   "kramer2013",
   "cumberlege",
   "mdr"
  ],
  "core": "Suppose Ramesh falls after a missed cue. Who answers? Follow the loop: care for him; record the device and software version; report to MvPI on 1800-180-3024; investigate; correct; follow up. In India’s ASR hip recall, about 4,700 people had the implant, but only 1,080 had been traced by 2018. Traceability starts on day one. Who owns each step in your team?"
 },
 "23": {
  "title": "Would you let a patient use it now? (closing vote)",
  "activity": "CLOSING VOTE with the same options as slide 3",
  "purpose": "Let the room see its own change in reasoning.",
  "say": "Read the three facts again: a working prototype, promising results on public datasets, a test licence granted. “Same three facts, same three options. Before you vote, answer four questions silently: which patient, which use, which evidence, and who is responsible?”",
  "ask": "Vote and compare with the opening split on the flipchart. Ask two people whose vote changed: “What changed your mind?”",
  "debrief": "Confirm what many will have spotted: “The three facts on slide 3 describe FoGO in August 2026 — an alpha prototype, public-dataset results and an MD-13 test licence for 25 units. My own answer, as the inventor, is option 2 only after ethics approval, MD-23 permission and CTRI registration: a supervised research study, not routine care.” Disclosing this models the behaviour we asked for on slide 2.\nThe goal is better reasons, not agreement with the speaker. Delaying use to resolve important uncertainty is different from blocking useful research: safeguards should be proportionate to the exact use and risk. Access and continuity remain part of the decision.\n“A patient-ready decision names the patient, the purpose, the evidence, the limits and the person responsible.”",
  "transition": "“Now make it personal.”",
  "src": [
   "fogoDeck",
   "md12",
   "md22"
  ],
  "core": "Same three facts: a working prototype, promising dataset results, a test licence. Same options. First answer silently: which patient, which use, which evidence, who is responsible? Vote. [Compare with the opening split.] What changed your mind? As many of you spotted, this is FoGO today. My own answer as its inventor: option 2, a supervised study, and only after ethics approval, MD-23 permission and CTRI registration."
 },
 "24": {
  "title": "Commit to one change in your own project",
  "activity": "TAKEAWAY EXERCISE: 90 seconds writing, 60 seconds sharing",
  "purpose": "Convert discussion into one specific, owned action.",
  "say": "“Think of a device, study or project you are working on. Complete the card: Before [next step], I will [action]. Owner: [name]. I proceed only if [condition].”\nExample: “Before our first home test, I will register the study on CTRI. Owner: me. I proceed only if the ethics committee approves and an independent outcome assessor is named.”",
  "ask": "Read it to a neighbour. Take two examples from the room.",
  "debrief": "Stanford’s Principled Decision-Making brief advises teams to write down their ethical principles early; this exercise adapts that advice into a personal commitment. Encourage participants to photograph or keep their card; the printable checklist handout has space for it.",
  "transition": "“Here is a checklist to keep using.”",
  "src": [
   "sbPrincipled"
  ],
  "core": "Think of your own device, study or project. Complete the card: Before [next step], I will [action]. Owner: [name]. I proceed only if [condition]. You have ninety seconds. Then read it to a neighbour. [Take two examples.]"
 },
 "25": {
  "title": "Patient-impact decision checklist",
  "activity": "Reusable tool and printed handout",
  "purpose": "Leave participants with a tool they can apply to any device decision.",
  "say": "Use one row per stage. The evidence column should link to real documents; the owner column names a person or team; every ‘Not yet’ needs an owner and a condition for proceeding.\nRow sources: Need — Stanford need statements. Evidence — IDEAL-D, subgroup reporting (MRCT), ISO 14971 risk file and a version log. People — Declaration of Helsinki 2024, ICMR 2017, conflict-of-interest management. Permission — MDR-2017 and CDSCO’s 2026 software guidance. Access — Cambridge inclusive design, total cost of use, NPPA context. Safety — MvPI reporting, ISO 14971 risk management, change control.",
  "caution": "A workshop synthesis, not a substitute for ethics, scientific, regulatory or quality review. One device can meet the conditions for a narrowly defined use and remain unsuitable for another. Do not infer completion from a licence, patent, grant or institutional association.",
  "transition": "Close: thank the audience; point to the appendix and the handout.",
  "src": [
   "sbNeed",
   "idealD",
   "mrctDiversity",
   "helsinki",
   "icmr",
   "mdr",
   "mdsw",
   "camIdt",
   "mvpiIpc",
   "iso14971"
  ],
  "core": "Here is a checklist to keep: one row per stage, with the evidence to see, an owner and a go or not-yet column. Every ‘not yet’ needs an owner and a condition for proceeding. A licence, patent, grant or famous partner is not evidence of readiness. Thank you."
 },
 "26": {
  "title": "Evidence to request before stronger claims",
  "purpose": "Back-pocket slide for Q&A on what each project should show next.",
  "say": "FoGO: freeze detection against video-annotated events; participant-level validation; false alarms per hour and latency in real use; cue versus no-cue (or sham) comparison; falls, confidence and walking outcomes; testing in homes, turns and doorways; firmware and model version for every result.\nSwaKnee: a randomised, blinded, sham-controlled design with prospective registration; pain and function compared with patient-important thresholds; adverse events; adherence to 45-minute sessions; durability; structural outcomes only if structural claims are made; the controller and applicator version for every result.",
  "src": [
   "fogoDeck",
   "swaEvidence",
   "idealD",
   "tubach"
  ]
 },
 "27": {
  "title": "What independent evidence says",
  "purpose": "Back-pocket slide: the independent literature around each case, for Q&A.",
  "say": "FoGO domain: the Daphnet benchmark has 10 laboratory patients (8 froze); one systematic review (Silva de Lima 2017) reported sensitivity of 73–100% and specificity of 67–100%, mostly in laboratories; the RESCUE home-cueing trial (n = 153) found small gait gains and lower freezing severity in freezers, but fall counts were not measured, and no trial found here showed fewer falls (narrative review: Ginis 2018); FoGO’s own results are project-reported on public datasets, with a prospective study planned.\nSwaKnee domain: the Cochrane review (2013; 9 trials, 636 adults, all osteoarthritis sites and electromagnetic field types) found pain probably improves by about 15/100 more than sham, with function uncertain; meta-analyses disagree (Chen 2019, knee OA, 8 RCTs: no pain advantage; Yang 2020, all OA sites, 16 RCTs: an advantage); OARSI 2019 strongly recommends against electromagnetic therapy; NICE NG226 (2022) advises against several electrotherapies for insufficient evidence; no human evidence of cartilage regeneration was found.",
  "caution": "‘Not found’ in our searches is not proof of absence. NICE NG226’s list does not name PEMF explicitly.",
  "src": [
   "daphnet",
   "silvaDeLima",
   "pardoel",
   "ginis",
   "rescue",
   "fogoDeck",
   "cochranePemf",
   "chenPemf",
   "yangPemf",
   "markovicPemf",
   "oarsi",
   "nice226",
   "tubach"
  ]
 }
} };
