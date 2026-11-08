# AMATS City Scandal: Project Status & Handoff (updated)

**Status: about 90% complete.** The game engine, quiz system, pixel-art UI integration, and Google Sheets logging are built and tested. What remains is mostly your own images, deployment, and classroom testing (see section 9).

---

## 1. Project Overview
- **Subject:** English Language, News Item texts (5W1H, fact vs. opinion, direct vs. indirect speech, text structure).
- **Theme:** Detective investigation of Rp 50 billion embezzled from the Amats city treasury.
- **Format:** Static web game (HTML/CSS/JS, no framework, no server). Students scan 5 QR codes in the classroom. Each QR opens one stage page. Every action is logged to a Google Sheet through Google Apps Script.
- **Art style:** Pixel-art "terminal window" frame, vintage newspaper, dark navy and teal palette with cream-gold accents.

## 2. Story and Solution (for the teacher)
| Stage | Place | Paper | Key finding |
|---|---|---|---|
| 1 | Bank Lobby | Amats Daily Investigator | Rp 50 billion vanished, meant for road rehabilitation and green open-space. Mayor Johnson says he is innocent. Mr. Alpha (opposition) accuses him. **Popol and Kupa defend the Mayor** (they are the culprits). |
| 2 | Secretary's Office | Amats Tribune | Angela's luxury trip is funded by her late mother's textile inheritance. Secretaries have no authorization to disburse funds. She is cleared. |
| 3 | Inferno Coffee | The Metro Chronicle | Mr. Valir's cafe turned over Rp 350 million in a week, which is suspicious. Nothing links it to the missing Rp 50 billion. |
| 4 | Political Statements & Archive | Amats Express | Mr. Alpha blames the Mayor but has a personal grudge. Archives and contractors show technical project managers sign all disbursements, not the Mayor. |
| 5 | Final Archive | Investigative Gazette | Shell company **Kupa Jaya Supplies** and dummy invoices. Chief Inspector Ray announces **Popol and Kupa** as the real masterminds. |

Teaching twist: students must separate opinion/claims from evidence, since Popol and Kupa first appear as the Mayor's defenders.

## 3. Gameplay Flow
1. **Name gate:** every page asks for the student's name first. QR pages may open in a different browser, so each page handles this itself.
2. **Map hub (`index.html`):** 5 numbered station pins plus 4 witness pins (warung, cafe, store, bus stop). Witnesses have short branching dialogues in a pixel chat bubble. Station pins turn teal when solved.
3. **Stage page flow (per stage):**
   1. **Read** the news item, then press *Start quiz*.
   2. **Quiz:** 10 random questions from a bank of 20, one at a time, shuffled options, article hidden, no feedback, no going back.
   3. **Silent grading:** the score is logged but never shown to the student.
      - **Under 7:** "not high enough yet", the article returns, and a new random 10 starts.
      - **7 or more:** the essay (the stage's task question).
   4. **Essay:** at least 8 words, then auto-pass. The student receives the unlock code for the next stage. Stage 5 gives the final code to show the teacher.
4. **Unlock codes:** Stage 1 is open. Stages 2 to 5 ask for the code from the previous stage. Each is picked randomly from a pool of 20 valid codes.

## 4. File Structure
```text
amats-detective-game/
├── index.html        # map hub + witness dialogues (data-page="map")
├── stage1.html ... stage5.html   # tiny shells (data-page="stage" data-stage="N")
├── game.js           # engine: state, logging, map, stage flow, news text, code pools
├── questions.js      # QBANK: 20 MCQs per stage (100 total)
├── style.css         # pixel-art theme, terminal, newspaper, chat bubble
├── Code.gs           # Google Apps Script (paste into the Sheet's Apps Script editor)
└── assets/           # images (see section 7)
```
All code files sit in one folder. Images go only in `assets/` with the exact filenames below. `Code.gs` is not uploaded to the website.

## 5. Key Technical Details
**Constants (top of `game.js` and the quiz section):** `CONFIG.GAS_URL` (Apps Script `/exec` URL, still a placeholder), `MIN_WORDS=8`, `SET=10`, `PASS=7`.

**Data in `game.js`:** `POOLS` (unlock codes, keys 2 to 6, where 6 is the final dossier code), `NEWS` (news text, task question, and place name per stage), `SIDES` (witness NPCs and dialogue trees), `PINS` (station pin positions in % on the map).

**Question format in `questions.js`:** `["question", CORRECT, wrong, wrong, wrong]`. The correct answer is always first in the file. The game shuffles questions and options at runtime. Note: `NEWS[n].must` (old keyword checks) is no longer used.

**Browser storage (`localStorage`):**
- `amats`: `name`, `sid` (session ID), `u2..u5` (unlocked), `c1..c5` (codes earned), `qz` (quiz in progress), `qa` (attempt counts), `qp` (quiz passed, essay pending).
- `amats_q`: offline queue of log events, resent in order when online.
- Refreshing mid-quiz resumes the same questions (no rerolling).

**Pixel-art slicing (already done in `assets/`):** the terminal is split into `term_tl/tm/tr.png` (title bar pieces) plus `term_body.png` (9-slice frame). The newspaper is split into `news_head.png` (masthead only) plus `news_body.png` (9-slice body). The chat bubble is `chat_bubble.png` (fixed aspect on screens wider than 640px, and a CSS card fallback on phones). The garbled date line on the original newspaper image was dropped and replaced by a real dateline in HTML.

## 6. Google Sheets Logging (Apps Script)
**Setup:** create a Google Sheet, then Extensions > Apps Script, paste `Code.gs`, and Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone). Copy the `/exec` URL into `CONFIG.GAS_URL` in `game.js`. After editing the script, redeploy as a **new version**.

**Sheet `Log`** (one row per action): Server Time, Client Time, Student Name, Session ID, Stage, Event, Detail.
Events: `login`, `session_start`, `logout`, `map_view`, `map_pin`, `location_open`, `location_leave`, `dialogue_view`, `dialogue_choice`, `stage_open`, `code_entry` (valid/invalid), `stage_unlock`, `quiz_start` (attempt, question numbers), `quiz_answer` (Q# right/wrong), `quiz_result` (pass/fail, score, wrong Q numbers), `essay_submit` (essay text), `stage_complete` (code issued).

**Sheet `Progress`** (one row per student, matched by exact name): Last Activity, Stage 1 to 5 completion times, Final Code, **Quiz Fails**, Wrong Codes. Old sheets may still show the older "Wrong Answers" header, so rename it by hand or delete the sheet to regenerate.

## 7. Image Assets
**Done and wired in:** `term_tl.png`, `term_tm.png`, `term_tr.png`, `term_body.png`, `news_head.png`, `news_body.png`, `chat_bubble.png`.

**Still to generate and place in `assets/` (picked up automatically when the filename matches):**
- `city_map.png`: map background (a gradient shows until it exists)
- `npc_warung_uncle.png`, `npc_cafe_barista.png`, `npc_store_owner.png`, `npc_transport_driver.png`: portraits shown in the chat bubble (the portrait box stays empty until added)

**Generated list items not yet used by the code (optional for later):** stage and location backgrounds, main character portraits (Johnson, Angela, Valir, Popol, Kupa, Ray, Alpha), evidence props, stamps (CONFIDENTIAL, CASE SOLVED), dossier cover, logo, custom map pins.

## 8. Testing Done
- Syntax checks passed. All 5 pools have 20 codes. All 5 question banks have 20 questions with 4 distinct options.
- Browser test (Playwright) on Stage 1: a failed quiz returned to the article, a fresh perfect attempt reached the essay, a short essay was rejected, a valid essay gave a code from the correct pool, and log events were queued correctly. No page errors.
- Screens checked at desktop and phone width. Opening a stage page via `file://` works. If `questions.js` is missing, a clear message is shown.
- **Not yet tested:** real Google Sheets logging (needs your deployed URL), Stages 2 to 5 end to end, real classroom use and multiple devices.

## 9. Remaining To-Do
**Required before class**
1. Generate and add the map and the 4 NPC portraits.
2. Deploy `Code.gs` and paste the `/exec` URL into `game.js`. Confirm rows appear in the Sheet.
3. Host the whole folder (GitHub Pages or Netlify, for example) and print 5 QR codes to `stage1.html` to `stage5.html`.
4. Play through all 5 stages once yourself.
5. Skim the 100 questions for wording, and check that the direct/indirect speech backshifting rules match your lesson.

**Optional improvements**
- Wire in stage backgrounds, character portraits, stamps, the "Case Solved" screen, and a title/logo screen.
- Move code validation into Apps Script so codes can't be found by viewing the page source.
- Add a class or ID field at login to avoid duplicate-name confusion in the Progress sheet.
- Add a light keyword check on essays that only flags (never blocks) in the Sheet.
- Add a teacher view or summary chart from the Progress sheet.

## 10. Known Limitations
- Codes and correct answers are visible in the page source to a determined student. Fine for a classroom, but not secure.
- Student progress lives in the browser. Clearing browser data or switching devices loses the saved unlocks, although the code gate on each stage still lets them continue by typing the previous code.
- Essays are only length-checked, not graded. The teacher reviews them in the Log sheet.
- Heading font (Pixelify Sans) loads from Google Fonts, so offline devices fall back to a standard monospace font.
- Student names are matched exactly (case and spaces), so variants create separate Progress rows.
