# AMATS City Scandal: Project Status & Handoff (v5)

**Status: feature-complete, ready for classroom rehearsal.** Everything in v4 still holds. Since v4 the project gained a **realigned Stage 1** (road rehabilitation, city hospital and digital park, plus the open question about who holds technical authority), **five CLAIM questions** (one per stage), **consistent FACT / OPINION / CLAIM tags** in the Log Book, a **teacher screen that shows the visual-novel intro**, and cleaned-up code. Tested in jsdom only (see section 13). **Not yet tested in a real browser:** real artwork on screen, the real Google Sheet with live polling, real phone cameras, 30 devices at once, and the new teacher screen on a projector.

Hosting: GitHub Pages at `https://antoniuskris.github.io/NEWSITEMDETECTIVE/`

> **TEACHER ONLY.** This file contains the full answer key (Appendix F) and the culprits. Keep it in the Claude project, never in the GitHub repository.

How to read this file: sections 1 to 4 explain the game and the teaching content (useful for the modul ajar). Sections 5 to 12 are the technical handoff. Section 14 onward lists to-dos, limitations and a guide for writing the modul ajar. Appendices A to G hold the full texts, dialogues, intro script, log book notes, quiz bank and vocabulary.

---

## 0. Changelog

### Since v4 (this version, v5)

| # | Change | Where |
|---|---|---|
| 1 | **Stage 1 realigned to the teacher's plot.** The money was meant for road rehabilitation, **the city hospital** and **a digital park**. A police spokesperson says investigators must first establish **who holds the technical authority to transfer project funds** (left open; answered at Stage 4). Essay task updated. | `game.js` (`NEWS[1]`) |
| 2 | **Stage 1 quiz:** Q5 rewritten (three-part correct answer, new distractors, "Hospital equipment" removed). Q17 (press conference time) replaced by the technical-authority question. Q19 (headline job) replaced by a CLAIM question. | `questions.js` |
| 3 | **CLAIM questions:** one new question per stage (Stage 1 Q19, Stage 2 Q3, Stage 3 Q3, Stage 4 Q2, Stage 5 Q9) using the three boxes fact / opinion / claim. These replaced minor detail questions, so Q numbers in the Sheet now refer to the new questions. | `questions.js` |
| 4 | **Stage 2 Q8:** distractor "Her own restaurants overseas" replaced by "Savings from her secretary's salary". | `questions.js` |
| 5 | **Log Book tags made consistent.** Ray's statement about the masterminds is now CLAIM everywhere (was FACT on Johnson's card). Every witness statement (Mang Udin, Dewi, Pak Jaya, Pak Joko) is now a CLAIM (or OPINION where it is a guess) and says "X says". The Stage 5 FACT notes then confirm or answer them. | `story.js` |
| 6 | **Teacher screen (`index.html`) now renders the visual-novel intro** with `vnHTML`. The title and join QR are hidden while the intro runs (button **Join QR** toggles them), the joined count stays visible, Right arrow / Space = next, Left arrow = back. The slide is only redrawn when the step changes (no flicker every 5 s). | `index.html` |
| 7 | **`cheat.html` regenerated** from the real code. Its Stage 3 data was still the old Valir version (old questions and key). Stage 1 key updated, Valir noted as a separate case. | `cheat.html` |
| 8 | **Cleanup:** removed unused `PINS`, `x/y/icon` in `SIDES`, and the unused `must` regular expressions in `NEWS`. | `game.js` |
| 9 | **Cache version is now `?v=6`** in every HTML shell and in `game.js`. The shells received at the start of this round were still at `?v=3` (only `join.html` was `?v=6`), so upload them all. | all HTML, `game.js` |

### Since v3 (v4)

| # | Change | Where |
|---|---|---|
| 1 | **Case Log Book**: a second tab on the idle screen. One dossier card per character with photo, role, and notes that grow as the student reads stages and hears witnesses. Notes are tagged FACT / OPINION / CLAIM and show their source. "+N new" badges. Two hidden lead cards (*Two men in work vests*, *The Supplier*). | `game.js`, `story.js` (`LOGBOOK`, `SRC`, `TAG`, `CASE5`), `style.css` |
| 2 | **Visual-novel intro**: 13 slides (was 4). Background, characters and text box in one frame. Each main character is introduced one by one with a short spoken line (direct speech). Includes a "Detective's tip" slide on fact / opinion / claim, a "how to investigate" slide and a mission slide with the student's name. | `story.js` (`SCENES`, `INTRO`, `vnHTML`), `game.js` (`hub`), `style.css` |
| 3 | **Head cut off in circular portraits**: circles now anchor the image at the top (`object-position:50% 0`). Log book photos are shown uncropped in a rectangular frame. | `style.css` |
| 4 | **Valir storyline realigned to the teacher's plot**: his cafe launders money from his own secret restaurant and casino; this is a separate crime and is not linked to the Rp 50 billion. New Stage 3 article, new essay task, all 20 Stage 3 questions rewritten, Dewi's dialogue gets subtle hints, Case Board and Log Book updated, cheat sheet updated. | `game.js`, `questions.js`, `story.js`, `cheat.html` |
| 5 | **New saved state**: `seen` (stages read), `heard` (witness answers heard), `lbn` (notes already viewed). | `game.js` |
| 6 | **Cache version is now `?v=6`** . | every HTML shell, `game.js` |

Not touched this round: `Code.gs`, `index.html` (teacher screen), `poster.html`, the stage and NPC HTML shells (except the version number), `Stage 1/2/4/5` articles and questions.

---

## 1. Overview and teaching context

- **Subject:** English, **News Item** texts.
- **Skills practised:** 5W1H comprehension, fact vs opinion (plus a third category, claim), direct vs indirect speech, text structure of a News Item (newsworthy event, background events, sources), vocabulary in context, reading for inference, short written answers.
- **Theme:** Detective investigation of Rp 50 billion missing from the Amats city treasury.
- **Format:** Static web game (HTML, CSS, JS, no framework). About 30 students on their own phones and one teacher screen. Live sync through Google Apps Script and a Google Sheet.
- **Art style:** Pixel-art terminal frame, vintage newspaper, dark navy and teal with cream-gold accents, visual-novel style intro.
- **Language level:** The five articles are written in authentic news style (long sentences, formal words, many reporting verbs). The intro, log book notes and witness dialogues use simpler sentences.

### 1.1 Where each skill is practised

| Skill | Where in the game |
|---|---|
| Text structure of a News Item | Every article is split into *Newsworthy Event* and *Background Events & Sources*. About 10 quiz questions ask about sections and kinds of sources. |
| 5W1H and detail comprehension | Majority of the quiz questions (about 64 of 100). Essay tasks at the end of each stage. |
| Fact vs opinion | Quiz questions (about 8 of 100, plus opinion-phrase and vocabulary items). The intro "Detective's tip" slide. Every Case Log Book note carries a FACT / OPINION / CLAIM tag. |
| Claim (who says what, not proven) | Log Book tag, intro tip slide, witness answers that mix observation and guess. |
| Direct and indirect speech | 2 questions per stage (10 of 100), quotes inside every article, spoken lines in the intro, "Who said it" questions. |
| Reading for inference | The clue chain across stages and witnesses (see section 2.2). |
| Vocabulary in context | Appendix G. A few questions (for example "front" in Stage 3). |
| Writing | One short essay per stage (minimum 8 words, graded by the teacher). |

### 1.2 Quiz question mix (approximate, keyword based)

| Stage | Detail (5W1H) | Fact vs opinion | Direct / indirect speech | Who said it | Text structure and sources | Vocabulary |
|---|---|---|---|---|---|---|
| 1 | 14 | 2 | 2 | 1 | 1 | 0 |
| 2 | 13 | 1 | 2 | 1 | 3 | 0 |
| 3 | 11 | 3 | 2 | 1 | 2 | 1 |
| 4 | 13 | 1 | 2 | 1 | 2 | 1 |
| 5 | 13 | 1 | 2 | 1 | 2 | 1 |
| **Total** | **64** | **8** | **10** | **5** | **10** | **3** |

The counts come from keywords in the question text (taken at v4), so treat them as estimates. v5 added five CLAIM questions (one per stage) that replaced minor detail questions, so fact / opinion / claim now has about 13 questions in total. The bank is heavy on detail comprehension. If the modul ajar wants stronger coverage of fact vs opinion or speech, add questions or use the Case Log Book as a classroom discussion tool.

---

## 2. Story and solution (teacher)

### 2.1 Solution
Culprits: **Popol and Kupa** (the Mayor's loudest defenders, senior public works supervisory officials). Method: shell company **Kupa Jaya Supplies** and **dummy invoices**, with money moved to hidden offshore accounts. The Mayor, his secretary Angela, the opposition leader Alpha and the cafe owner Valir are all red herrings (each with a different reason to look guilty).

| Stage | Place | Paper | Key finding |
|---|---|---|---|
| 1 | Bank Lobby | Amats Daily Investigator | Rp 50 billion vanished from the main treasury account (money for roads, the city hospital and a digital park). A police spokesperson says investigators must first find out who holds the technical authority to transfer project funds. Mayor Johnson says he is innocent. Mr. Alpha accuses him. Popol and Kupa, senior public works officials, defend the Mayor loudly. |
| 2 | Secretary's Office | Amats Tribune | Angela's European trip is explained by her late mother's textile inheritance. Secretaries cannot disburse funds. Cleared. |
| 3 | Inferno Coffee | The Metro Chronicle | **(Updated)** Valir's cafe (Rp 350 million in a week) is a front for laundering profits of his own secret restaurant and casino. Auditors find no link to the Rp 50 billion. Police treat it as a separate case. Valir is a red herring, but he is guilty of something else. |
| 4 | Political Statements & Archive | Amats Express | Alpha has a personal grudge (Johnson cheated him in a past business deal). City archives and contractors say technical project managers, not the Mayor, sign disbursements. |
| 5 | Final Archive | Investigative Gazette | Kupa Jaya Supplies, dummy invoices, fake receipts hidden in an abandoned archive warehouse near the industrial zone. Chief Inspector Ray names Popol and Kupa. |

### 2.2 The clue chain (what the students should connect)
1. Stage 1: Popol and Kupa are **senior public works supervisory officials** who defend the Mayor loudly.
2. Witnesses (any order): two men in **work vests** carry heavy boxes and bags to the old warehouse and the industrial zone; a **supplier** delivers materials but nobody has seen its trucks; "look at **who signs the paperwork**".
3. Stage 4: only **technical project managers** (not the Mayor) sign disbursements.
4. Stage 5: the forgeries needed approval from senior supervisors with ultimate system control; the supplier was the shell company **Kupa Jaya Supplies**; fake receipts were in a warehouse near the industrial zone.

The Case Log Book makes this chain visible: the hidden cards *Two men in work vests* and *The Supplier* collect the witness hints and are "answered" by Stage 5 notes.

### 2.3 Alignment with the teacher's original plot (Indonesian plot)

| Point in the teacher's plot | Status in the game |
|---|---|
| Valir launders money from his own hidden restaurant and casino; not the city's money | **Done** (v4). Article, quiz, essay, Dewi's hints, board, log book, cheat sheet. |
| Public facilities are roads, the city hospital and a digital park | **Done** (v5). Intro, Case File text, Stage 1 article, Q5 and the essay key. |
| Stage 1 key question: who holds technical authority to transfer project funds | **Done** (v5). Stage 1 raises the question (police spokesperson, left unanswered, one quiz question). Stage 4 answers it (technical project managers). |
| Popol and Kupa defend the Mayor, then turn out to be the culprits | Done. |

### 2.4 Characters

| Id | Name | Role | Appears in reports | Intro slide |
|---|---|---|---|---|
| johnson | Mayor Johnson | Mayor of Amats | Stages 1, 2, 4 | 3 |
| alpha | Mr. Alpha | Opposition politician | Stages 1, 4 | 4 |
| popol | Popol | Senior public works official | Stages 1, 5 | 5 |
| kupa | Kupa | Senior public works official | Stages 1, 5 | 5 |
| angela | Angela | Mayor's personal secretary | Stage 2 | 6 |
| valir | Mr. Valir | Owner of Inferno Coffee | Stage 3 | 7 |
| ray | Chief Inspector Ray | Police investigator | Stage 5 | 8, 13 |
| player | The student ("Detective <name>") | Detective | none | 13 |
| men | Two men in work vests | Lead from witnesses (hidden card) | witnesses, Stage 5 | none |
| supplier | The Supplier | Unknown company (hidden card) | witness Pak Jaya, Stage 5 | none |

Witnesses: **Mang Udin** (warung owner, `npc-warung`), **Dewi** (barista, `npc-cafe`), **Pak Jaya** (small store owner, `npc-store`), **Pak Joko** (bus driver, `npc-transport`).

---

## 3. Screens and pages

| Who | Page | Role |
|---|---|---|
| Teacher (big screen) | `index.html` | Title logo, join QR (generated from the page's own URL), list of joined names, intro slides with Back / Start-Next / End intro. Asks for the teacher PIN. Does NOT load `game.js`. Shows the visual-novel intro (v5), the join QR (toggle) and the joined names. |
| Students (phones) | `join.html` (`data-page="hub"`) | Name gate, then the idle screen (items, Case Board / Case Log Book tabs, Scan button) or the intro slides. |
| Students | `stage1-5.html` (`data-page="stage"`, `data-stage="N"`) | Read, quiz, essay, code. |
| Students | `npc-warung/cafe/store/transport.html` (`data-page="npc"`, `data-npc="key"`) | Witness dialogue. |
| Print | `poster.html` | Map poster with 9 QR codes (A3 landscape). |
| Teacher only, never upload | `cheat.html` | Codes, code checker, solution, essay key points, 100-answer key. Updated this round for Stage 3. |
| Teacher only, never upload | `Code.gs` | Apps Script pasted in the Sheet. |

---

## 4. Student flow

1. Open `join.html` (scan the join QR on the teacher screen), type a name (the name gate runs on every page).
2. **Intro** (when the teacher presses Start/Next): the phone shows the current visual-novel slide, with a counter such as `5 / 13` and the note "Your teacher controls the story. Wait for the next slide." The teacher may also run the intro on the big screen before students join (recommended, lighter on the network).
3. **Idle screen:** background = last stage or witness opened (`S.last`, default `city_map`), `char_player.png`, name, five item slots (item appears when a stage is complete, locked icon otherwise), **Scan QR code** button, then two tabs:
   - **Case Board:** one card per main character with a short status from the latest completed stage. Unknown characters show "???". After Stage 5 the stamp `stamp_case_solved.png` appears.
   - **Case Log Book:** dossier cards with notes (section 7).
4. **In-page scanner** (html5-qrcode 2.3.8 from cdnjs, needs HTTPS and camera permission): accepts only same-origin URLs ending in `stageN.html` or `npc-*.html`, then navigates in the same tab and logs `scan_open`. Students should use this instead of the phone's own scanner app (another browser loses the saved name).
5. **Stage page:** read the article (with a "People in this report" strip) → quiz (10 random of 20, pass 7, result is silent) → essay (8+ words) → code. Stages 2 to 5 need the code from the previous stage. "My file" returns to `join.html`.
6. **Witness page:** banner image, greeting, three questions. Each heard answer is saved and unlocks Log Book notes.
7. After Stage 5 the student sees the final code to show the teacher.

---

## 5. Teacher run sheet (suggested, not yet timed in a real class)

1. **Before class:** upload all files, deploy the new `Code.gs` version, shrink the images, print the poster, rehearse with 3 to 5 phones (section 14).
2. **Warm-up on the big screen:** open `index.html`, enter the PIN, run the **13-slide intro** with Start/Next, before or while students join. Use the Detective's tip slide (fact / opinion / claim) as a mini lesson and ask students to give their own examples.
3. **Join in waves** (about 90 log rows are written within seconds when 30 students log in together).
4. **Investigation:** students scan the poster QR codes in any order for witnesses; stations 1 to 5 in order with codes.
5. **During play:** watch the Sheet (`Progress`: stage completion, quiz fails, wrong codes). Quiz scores are never shown to the students.
6. **Debrief:** use the Case Log Book as the discussion base: compare entries, sort statements into fact / opinion / claim, convert quotes between direct and indirect speech, trace how the clue chain leads to Popol and Kupa. Grade essays from the `Log` sheet with Appendix B.

---

## 6. Intro: visual novel (`SCENES` in `story.js`)

13 slides (full script in Appendix D). Layout: one framed scene with a background layer and up to two character sprites standing on the bottom edge, plus a text box with name plate, role, narration and spoken lines.

- **Slide order:** 1 city and what the council saves for; 2 the money vanishes; 3 Johnson; 4 Alpha; 5 Popol and Kupa (two sprites); 6 Angela; 7 Valir; 8 Ray; 9 "everyone has a story"; 10 Detective's tip (fact / opinion / claim examples); 11 how to investigate (map poster, stations, codes, witnesses); 12 the Case Log Book; 13 mission (player and Ray, uses the student's name).
- **Backgrounds used:** `bg_stage1_bank`, `bg_stage2_office`, `bg_stage3_inferno`, `bg_stage4_archive`, `city_map`.
- **Layout rules:** wide screens put the text box over the bottom of the scene (class `ov`). Slides with a list (the tip slide) and screens up to 640 px use a stacked layout (scene on top, text below). Sprites fade in (disabled for reduced-motion users).
- **Scene object:** `{bg, c:[[id,pos]], n, r, d, q:[], l:[[tag,text]]}`. `pos` is `l`, `c` or `r`. `d` narration, `q` spoken lines, `l` fact / opinion / claim examples. The token `{det}` becomes `, Detective <name>` on phones and nothing on the teacher screen.
- **`INTRO`** is built from `SCENES` and keeps the old fields (`h` heading, `img` list of image names, `t` text) so an older teacher screen still renders something sensible.
- **`vnHTML(scene, name, i, total)`** in `story.js` returns the HTML of one slide. It is shared by phones and can be reused by `index.html`.
- **Teacher screen:** `index.html` renders `vnHTML(INTRO[step-1], '', step, INTRO.length)` since v5 (the `{det}` token disappears there). It is only redrawn when the step changes.

---

## 7. Case Board and Case Log Book

### 7.1 Case Board (unchanged logic)
Defined in `story.js`: `CAST` (names), `PEOPLE` (who appears in each report), `BOARD` (status per character after finishing a stage). A card shows the status from the latest completed stage that has an entry for that character; otherwise "???". Popol and Kupa show "Defends the Mayor loudly" after Stage 1 (equal footing with the others, keeps the twist) and turn red "MASTERMIND" after Stage 5. Valir's status after Stage 3 is now *Laundered money from his own secret restaurant and casino, but nothing links it to the Rp 50 billion*. Ray appears after Stage 5.

### 7.2 Case Log Book
Data: `LOGBOOK` in `story.js` (full content in Appendix E2). Each entry: `{s: source, k: 'F'|'O'|'C', t: text}`.

- **Cards:** the seven main characters plus two hidden cards (`men`, `supplier`). Hidden cards (`hide:true`) only appear once their first note unlocks. Other characters show a locked "???" card until their first note unlocks.
- **Unlock rules:**
  - Stage notes (`s1` to `s5`): unlock when the student **reads** that stage (set in `paper(n)` after the code gate) or has completed it. This means Stage 5 notes, which name the culprits, appear as soon as the Stage 5 article is shown, before the quiz. This matches the article itself.
  - Witness notes (`npc/node`, node `a`, `b` or `c`): unlock when that answer is displayed. The greeting (`start`) and the menu (`m`) do not unlock anything.
- **Tags:** FACT (teal, can be checked), OPINION (amber, what someone thinks), CLAIM (lilac, what someone says, not proven). A legend is shown above the cards.
- **Display:** tap a card to expand its notes (one card open at a time, in memory only). The card shows the note count and a red "+N new" badge. The tab also shows the total of unseen notes. Opening a card marks its notes as seen (`S.lbn[c]`).
- **Tag policy (v5):** FACT = can be checked (documents, audits, police findings). OPINION = what someone thinks or guesses. CLAIM = what someone says, including every witness statement, until a later station confirms it. **Spoiler policy:** witnesses never name the culprits. Popol and Kupa only get notes beyond Stage 1 after Stage 5 is read. *Two men in work vests* and *The Supplier* are never identified before Stage 5.
- **Refresh:** the log book is drawn on `join.html`. It updates when the student returns to that page (and every 4 seconds if the poll changes something), not while reading a stage.
- **Photo handling:** card photos are shown uncropped (`object-fit:contain`, bottom aligned) in a 76 x 96 frame. Circular portraits elsewhere use a top-anchored crop. Hidden cards use `ui_file_locked.png` as their picture.
- **How to add a note:** add `{s:'s3',k:'F',t:'...'}` to a character in `LOGBOOK`, bump the cache version, upload `story.js` and the HTML shells.

---

## 8. NPC dialogue (`SIDES` in `game.js`)

Helpers `menu(text, [3 questions])` and `ans(text)` (adds "Ask something else" → node `m`, and "Thank you" → end). Each witness opens with an in-character greeting, then offers three questions (nodes `a`, `b`, `c`). Full text in Appendix C. Keys: `warung`, `cafe`, `store`, `transport`. Background for each witness page is `bg_<key>.png`. The store owner is **Pak Jaya** (was Bu Rina).

Witnesses give vague observations and mixed fact / opinion (two men in work vests, heavy boxes and bags to the old warehouse, a supplier whose trucks nobody saw, "look at who signs the paperwork"). **Changed this round:** Dewi now also mentions guests who come in through the back door and never order, and Valir's "private club" (hints at the casino without naming it).

The unused `x`, `y` and `icon` fields of the old in-page map were removed in v5.

---

## 9. Stage engine

- Flow: `stage(n)` logs `stage_open` and sets `S.last`; stages 2 to 5 go through `codeGate(n)` until `S['u'+n]` exists; then `paper(n)` marks `S.seen['s'+n]` and routes to done / essay / quiz / read.
- Constants: `MIN_WORDS=8`, `SET=10`, `PASS=7`. Q# in the Sheet = 1-based position in `questions.js`.
- Quiz: 10 random questions of 20, options shuffled, a click within 400 ms of the question appearing is ignored (double-tap guard), result logged (`quiz_result` with the wrong Q numbers) but never shown to the student. Below 7 the student returns to the article and gets a fresh set.
- Essay: length check only. The old `must` regular expressions were removed in v5; the expected answers are in Appendix B and `cheat.html`.
- Codes: `POOLS` in `game.js`, 20 valid 5-character codes per stage (2 to 5, plus 6 for the final code). Any of the 20 is accepted. One example per stage is listed in `cheat.html`.

---

## 10. Files and architecture

```text
index.html  join.html  stage1-5.html  npc-warung|cafe|store|transport.html   (tiny shells)
game.js      engine: state, logging, log book helpers, hub, scanner, npc, stage flow, news text, codes, dialogues
story.js     shared: GAS url, STAGE_BG, ITEMS, TAG, SCENES/INTRO/vnHTML, CAST, PEOPLE, BOARD, SRC, LOGBOOK
questions.js QBANK: 20 MCQs per stage, [question, CORRECT, wrong, wrong, wrong]
style.css    theme + tabs + log book + visual-novel intro
poster.html  print poster          cheat.html  teacher only (do not upload)
Code.gs      Apps Script (paste into the Sheet's script editor, not uploaded to GitHub)
assets/      images
```

- All pages load `story.js` before `game.js`.
- Every page references `style.css?v=6`, `story.js?v=6`, `game.js?v=6` and `questions.js?v=6` (the last one is set inside `game.js`). **Bump the number in every HTML shell and in `game.js` whenever you change a script or the CSS, and upload ALL changed files together.**
- `story.js` main contents: `GAS`, `STAGE_BG`, `ITEMS`, `TAG`, `SCENES`, `INTRO`, `vnHTML()`, `CAST`, `PEOPLE`, `BOARD`, `SRC`, `CASE5` (shared Stage 5 notes for Popol and Kupa), `LOGBOOK`.
- `game.js` main contents: `CONFIG`, `POOLS`, `NEWS`, `menu`/`ans`/`SIDES`, state and logging, `bar`, `gate`, log book helpers (`nm`, `heardSrc`, `lbNotes`, `srcName`, `lbHTML`), `hub`, `wireScan`, `npc`/`talk`, `stage`/`codeGate`, `who`, `articleHTML`, `paper`/`read`/`quiz`/`grade`/`essay`/`done`, `boot`.
- **Hub drawing:** `hub()` polls `GAS?action=state` every 4 s. `draw()` only redraws when a key changes. The key includes the intro step, `S.last`, name, completed stages, active tab, open card, note counts and `S.lbn`. Redraw is paused while the scanner is open.
- **New CSS classes:** tabs (`.tabs`, `.tab`, `.nw`), log book (`.lbl`, `.lbc`, `.lbh`, `.lbp`, `.lbi`, `.lbn`, `.tg`, `.tg-F`, `.tg-O`, `.tg-C`), intro (`.vnwrap`, `.vnnote`, `.vn`, `.vn-scene`, `.vn-spr` with `.l`, `.c`, `.r`, `.vn-step`, `.vn-box`, `.vn-who`, `.vn-d`, `.vn-q`, `.vn-l`, `.vn.ov`). Mobile breakpoint is 640 px.

---

## 11. State, logging and Google Apps Script

### 11.1 Browser storage
`localStorage` keys: `amats` and `amats_q` (offline log queue).

| Field in `amats` | Meaning |
|---|---|
| `name`, `sid` | Student name and a random session id. |
| `last` | Background of the last stage or witness opened. |
| `u2`..`u5` | Codes that unlocked stages 2 to 5. |
| `c1`..`c5` | Completion codes received after finishing stage N. |
| `qz`, `qa`, `qp` | Quiz in progress, attempt counts, quiz passed (essay pending). |
| `seen` (new) | `{s1:1, ...}` stages whose article was shown. |
| `heard` (new) | `{'warung/b':1, ...}` witness answers displayed. |
| `lbn` (new) | `{characterId: notesAlreadyViewed}` for the "+N new" badges. |

The active tab and open card are kept in memory only and reset when the page reloads.

### 11.2 Apps Script (`Code.gs`, not changed, not re-read this round; facts carried from v3)
- `TEACHER_PIN='amats2026'` (**change it**). After any edit: Manage deployments → edit → **New version**.
- `doPost`: `{action:'set', pin, phase, step}` stores the intro state in Script Properties; any other payload is a log row (`Log`) plus a `Progress` update.
- `doGet?action=state` returns `{phase, step}`; add `&p=1` for the player name list (teacher screen only).
- Events: `login`, `session_start`, `logout`, `hub_view`, `scan_open`, `location_open`, `location_leave`, `dialogue_view`, `dialogue_choice`, `stage_open`, `code_entry`, `stage_unlock`, `quiz_start`, `quiz_answer`, `quiz_result`, `essay_submit`, `stage_complete`.
- Sheets: `Log` (Server Time, Client Time, Student Name, Session ID, Stage, Event, Detail) and `Progress` (one row per exact name: Last Activity, Stage 1-5 Done, Final Code, Quiz Fails, Wrong Codes).
- **No new events were added** for the log book or the intro. The Sheet does not record tab use or which notes a student opened.
- Useful for assessment: the `Log` holds each quiz attempt's score and wrong question numbers, each essay text, and wrong code attempts; `Progress` holds completion times.

---

## 12. Assets

- **Used:** `bg_*` (9: five stage backgrounds plus `bg_warung`, `bg_cafe`, `bg_store`, `bg_transport`), `char_player`, `char_johnson/angela/alpha/valir/popol/kupa/ray`, `npc_*` (4 portraits), `obj_ledger_book`, `obj_luxury_jet_photo`, `obj_money_stack`, `obj_fake_invoices`, `obj_kupa_jaya_sign`, `stamp_case_solved`, `title_logo`, `ui_file_locked`, `city_map` (poster, idle background, and now an intro background), `chat_bubble`, `news_head/body`, `term_*`.
- **Unused:** `obj_boxes`, `stamp_confidential`, `ui_dossier_cover`, `ui_file_unlocked`, `ui_qr_frame`, `map_pin_active`, `map_pin_locked`.
- **Problem:** the 9 `bg_*` images and `city_map` are 5 to 8 MB each. Resize to about 1280 px wide and 300 KB or less (same filenames) before class. The intro now loads several backgrounds on every phone, so this matters even more.
- **Sprite assumption (to verify):** the intro draws `char_*.png` as standing sprites on top of the background, assuming a **transparent background**. The image files were not available in this round, so this was not checked. If a character image has a solid background it will look like a box in the intro.
- Missing images never break the game (placeholders, hidden `<img>`).

---

## 13. Testing

### Done this round (v5, jsdom with a local web server, mocked Sheet, no artwork, no real browser)
- Teacher screen: renders the visual-novel slide (slide 5 with "Popol and Kupa", counter `5 / 13`), hides the title and join QR during the intro, and the **Join QR** button brings them back.
- Stage 1 page shows the new article (city hospital, digital park, technical authority question).
- Hub and Log Book: cards unlock from `seen` / `heard`, tags and the new witness wording render.
- Full Stage 1 run: quiz (10 questions, all correct) -> essay with the new task -> completion code shown.
- Syntax check (`node --check`) of `game.js`, `story.js`, `questions.js` and the script inside `cheat.html`.
- Quiz bank structure: 5 stages x 20 questions, each with 4 unique options.
- No JavaScript errors (only the blocked Google Fonts and CDN requests of the sandbox).

### Done in earlier rounds
v4 (Playwright, Chromium, phone width): tabs, log book unlocking, hidden cards, "+N new" badges, spoiler check, visual-novel slides 5 / 10 / 13, `{det}`. v3: name typing, hub idle, NPC pages, scanner with a stub, Case Board, People strip, full Stage 1 run, teacher controls, poster, cheat sheet.

### Not tested
Real artwork on screen (head crop fix, sprite transparency, desktop overlay layout), the teacher screen on a real projector, a real Sheet round trip, real camera, Stages 2 to 5 end to end, multi-device load, school Wi-Fi, a full class timing.

---

## 14. To-do

### Before class
1. Upload **all** changed files together: `story.js`, `game.js`, `style.css`, `questions.js`, `index.html`, `join.html`, `stage1-5.html` and `npc-*.html` (all with `?v=6`). Never upload `cheat.html`, `Code.gs` or this file.
2. Paste the current `Code.gs`, set a new `TEACHER_PIN`, deploy a **New version**.
3. Shrink the large images (`bg_*` and `city_map`, 5 to 8 MB each). Check that `char_*.png` have transparent backgrounds.
4. Print `poster.html` (A3 landscape) and put it on the wall.
5. Rehearse with 3 to 5 phones: join, intro, scan, one stage, the log book. Check rows in the Sheet. Test one scan over mobile data. Run the intro once on the real projector with arrow keys.
6. Read the 100 questions (Appendix F) and check direct / indirect speech and backshifting against your lesson.

### Development (optional)
1. Check Stages 2 to 5 end to end in a real browser.
2. Add a few more direct / indirect speech questions if the lesson needs more practice (about 10 of 100 now).
3. Ideas in section 15.

---

## 15. Open ideas
- **Accuse** button on the Case Board: students pick the culprit before Stage 5, logged in the Sheet.
- Show the join QR on the teacher screen only after the intro ("Show join QR" button).
- Log new events (`logbook_open`, `note_new`) so the teacher can see who used the log book.
- Load hardening: stagger log sends with a random delay, fewer events at login, poll every 6 s.
- Optional: map with live progress on the teacher screen, stage backgrounds on stage pages, move code validation into Apps Script, typewriter text effect in the intro.

---

## 16. Known limitations and design decisions
- Codes and answers are visible in the page source to a determined student. Fine for a classroom.
- Live sync needs Wi-Fi or data on every device. Offline log events are queued and resent. The intro also needs the poll to work.
- 30 simultaneous logins write about 90 rows within seconds. Apps Script serializes writes (20 s lock), so some rows could be lost under heavy load. Have students join in waves.
- Names are matched exactly (case and spaces) in `Progress`.
- Essays are only length-checked; the teacher reads them in the `Log` sheet.
- Google Fonts and the CDN libraries (QR generator, scanner) need internet.
- Design decision: Log Book stage notes unlock when the article is read, not when the stage is completed (so the notes help during the quiz). Case Board still updates only on completion.
- Design decision: the intro always shows the same 13 slides; the teacher controls the pace.

---

## 17. Guide for writing the modul ajar

### 17.1 Inputs still needed from the teacher
Class and phase, time allocation (number of meetings and minutes), the official learning outcomes (CP) and learning objectives (TP) to cite, assessment policy (does the silent quiz score count? how are essays graded?), available devices and Wi-Fi, and the school's modul ajar template.

### 17.2 Draft learning objectives (inferred from the game, to be confirmed)
By the end of the activity students can:
1. Identify the newsworthy event, background events and sources in a News Item.
2. Answer 5W1H questions about a News Item.
3. Distinguish facts, opinions and claims (what someone says) in a text and in witness statements.
4. Report spoken statements as direct and indirect speech using reporting verbs (stated, claimed, conveyed, admitted, announced).
5. Infer information by connecting clues across several texts.
6. Write a short answer in full sentences using evidence from the text.

### 17.3 How the game fits common modul ajar components

| Component | Source in this project |
|---|---|
| Trigger questions | The intro slides ("Who really took the money?", "Is this a fact, an opinion or a claim?"). |
| Opening activity | The 13-slide visual-novel intro on the big screen. |
| Core activity | Stations 1 to 5 (read, quiz, essay, code) and witness interviews. |
| Student worksheet | Case Log Book (notes sorted by FACT / OPINION / CLAIM) and the essay tasks. |
| Reading material | Appendix A (five news items). |
| Glossary | Appendix G. |
| Formative assessment | Quiz results and attempts (Sheet), Log Book discussion. |
| Summative or product assessment | Essays (Appendix B key points), final code, class discussion. |
| Remedial | Students who fail a quiz re-read the article and get a fresh question set. |
| Enrichment | Write their own News Item about the cafe case or the arrest; convert witness answers to indirect speech; add an "Accuse" argument with evidence. |
| Reflection | Which clue was most useful? Which statements looked like facts but were claims? |

### 17.4 Suggested lesson sequence (adapt to your timing)
1. Intro on the big screen with a short discussion of the tip slide (fact / opinion / claim).
2. Students join and investigate in teams or individually.
3. Debrief with the Log Book: sort statements, convert quotes, trace the clue chain.
4. Essay grading and feedback from Appendix B.

---

## Appendix A. The five news items (full text)

Source: `NEWS` in `game.js`. Every article has the News Item structure used in class: headline, **Newsworthy Event**, **Background Events & Sources** (with quoted sources).

### Stage 1: The Bank Lobby (AMATS DAILY INVESTIGATOR)
*Special Criminal Investigation Edition*  
Background image: `bg_stage1_bank`

**Headline:** City Budget Fund of Rp 50 Billion Mysteriously Vanishes from Central Treasury

**Newsworthy Event**

A massive financial crisis has suddenly shaken the City of Amats after public budget funds totaling exactly fifty billion rupiah were reported missing from the main municipal treasury account last week. The funds had previously been officially approved by the city council for three vital public projects across the metropolitan area: road rehabilitation, the expansion of the city hospital and the development of a digital park.

**Background Events & Sources**

To this day, Mayor Johnson firmly insists that he is completely innocent of any wrongdoing. However, a large majority of local citizens are demanding that city hall launch an independent forensic investigation immediately. On the other hand, opposition politician Mr. Alpha launched a harsh condemnation, declaring in a public briefing that Mayor Johnson is a corrupt leader who is entirely unfit for office.

Responding to these severe allegations, Popol and Kupa, acting as the senior public works supervisory officials, stepped forward to defend the Mayor against his critics. In a heated press conference yesterday, Popol stated that Mr. Alpha was merely jealous of the administration's achievements and intended to ruin Mayor Johnson's political career. Meanwhile, Kupa stated, "We have managed all public infrastructure projects transparently, and we are ready to prove our clean track records before the court of law."

At the same time, a police spokesperson stated that investigators must first establish who holds the technical authority to transfer project funds out of the treasury account, a question that remains unanswered.

**Student task (essay):** What amount of money disappeared, what was it originally meant for, and what key question must investigators answer first?

### Stage 2: The Secretary's Office (AMATS TRIBUNE)
*Politics & Lifestyle Investigation Report*  
Background image: `bg_stage2_office`

**Headline:** Mayor's Secretary Proves Luxury European Travel Stems From Family Estate

**Newsworthy Event**

Angela, the personal confidential secretary to Mayor Johnson, suddenly became the center of intense public scrutiny following a social media scandal. Photographs documenting her extravagant vacation aboard a private luxury jet in Europe circulated widely online, sparking wild speculations among residents that she was funding her lifestyle using embezzled municipal treasury money.

**Background Events & Sources**

The internal financial audit team moved quickly to examine Angela's personal bank account records and asset declarations. Based on strict digital banking security systems, administrative staff members operating at the secretarial level have proven to possess zero authorization, clearance, or technical access to disburse municipal budget funds.

Angela explained during an interrogation session that her entire wealth originated purely from a substantial family inheritance left by her late mother, who managed a successful textile business prior to passing away last year. In an exclusive interview with reporters, Angela asserted, "My luxury lifestyle is funded entirely by my family's legal estate, and I have never touched government money even a single bit."

**Student task (essay):** What evidence clears Angela from being the primary suspect of disbursing the city funds?

### Stage 3: Inferno Coffee Shop (THE METRO CHRONICLE)
*Business & Financial Investigation Desk*  
Background image: `bg_stage3_inferno`

**Headline:** Auditors Trace Inferno Coffee's Sky-High Revenue to Owner's Secret Casino, Not City Funds

**Newsworthy Event**

Inferno Coffee, a newly opened upscale cafe owned by Mr. Valir in the central commercial district, recorded a phenomenal weekly turnover of three hundred and fifty million rupiah—a figure considered utterly absurd for a new culinary business. After a week of inspection, state tax auditors announced that the cafe was a front for illegal money laundering, used to hide the profits of a secret restaurant and casino that Mr. Valir also owns.

**Background Events & Sources**

Tax enforcement officers visited the cafe regularly to inspect ledger transaction books and digital receipts. At first, Mr. Valir argued through his legal counsel that his extraordinary profit surge was purely driven by unique proprietary coffee blends and a massive, fiercely loyal customer base. However, the auditors discovered that much of the cash recorded as coffee sales had been carried in from an unlicensed restaurant with a hidden gambling room on the edge of the city.

Confronted with the audit results, Mr. Valir admitted that all of his earnings came from his restaurant and casino. Valir conveyed, "I hid the profits of my secret restaurant and casino inside my cafe, and I will face the law. But I took nothing from the city treasury." The auditors stated that they found no transaction linking Mr. Valir's businesses to the missing fifty billion rupiah, and police confirmed that his illegal gambling and money laundering will be handled as a separate case.

**Student task (essay):** Where did the money of Inferno Coffee really come from, and does the article link it to the missing Rp 50 billion city treasury money?

### Stage 4: Political Statements & Archive (AMATS EXPRESS)
*Amats City Premier Reporting*  
Background image: `bg_stage4_archive`

**Headline:** Opposition Leader Blames Mayor as Damaged Road Projects Spark Public Rage

**Newsworthy Event**

Chronic delays in road infrastructure repair projects across various corners of Amats city have triggered intense public fury and severe traffic congestion daily. Responding to this escalating crisis, opposition political figure Mr. Alpha openly accused Mayor Johnson of deliberately neglecting public facilities and infrastructure maintenance for personal financial gain.

**Background Events & Sources**

Official city archive documents record that technical supervision and infrastructure maintenance fall strictly under the operational control of the field technical division rather than the Mayor's desk. Several former project contractors revealed during confidential interviews that every budget disbursement document approval must be signed by the relevant technical project manager.

Mr. Alpha revealed to media crew members that Mayor Johnson had cheated him in past private business partnership contracts years ago. Nevertheless, senior city archivists stated, "All project approval documents and technical disbursements are handled strictly by the operational staff of the relevant municipal department."

**Student task (essay):** Who holds direct technical authority to approve budget disbursements according to former project contractors?

### Stage 5: The Final Archive (INVESTIGATIVE GAZETTE)
*Law Enforcement Special Report*  
Background image: `bg_stage5_warehouse`

**Headline:** Shell Company Documents Expose Real Criminal Masterminds Behind Embezzlement

**Newsworthy Event**

An in-depth, months-long police investigation has finally dismantled a sophisticated shell company network operating under the corporate name of Kupa Jaya Supplies. Based on conclusive forensic audit results, city treasury fund flows amounting to fifty billion rupiah were proven to be systematically transferred through dummy invoices into hidden offshore accounts belonging to the bogus corporation.

**Background Events & Sources**

Detectives discovered hidden piles of fake material purchase receipts and forged administrative invoices intentionally concealed inside an abandoned archive warehouse near the industrial zone. Document forensic experts confirmed that all of these elaborate administrative fabrications would have been entirely impossible to execute without direct authorization from senior supervisory personnel who hold ultimate internal system control.

Chief Inspector of Police Ray announced during a midnight press briefing that Popol and Kupa were the actual criminal masterminds who orchestrated the entire embezzlement scheme behind Mayor Johnson's back. Chief Inspector Ray affirmed, "Both suspects will be arrested tonight, because all physical evidence, forged signatures, and digital tracking trails have proven their crimes beyond a shadow of a doubt."

**Student task (essay):** Who are the real masterminds of the Rp 50 billion embezzlement, and what method did they use?

## Appendix B. Essay tasks and expected key points (teacher)

Essays are only length-checked by the game (8 words minimum). The teacher grades content from the `Log` sheet (event `essay_submit`, column Detail, first 500 characters). Use these key points as the rubric basis.

- **Stage 1.** What amount of money disappeared, what was it originally meant for, and what key question must investigators answer first?  
  Key points: Rp 50 billion disappeared; it was meant for road rehabilitation, the city hospital and a digital park; the key question is who holds the technical authority to transfer project funds (the answer comes at Stage 4).
- **Stage 2.** What evidence clears Angela from being the primary suspect of disbursing the city funds?  
  Key points: Angela's luxury trip was paid from her late mother's textile inheritance; secretaries have no authority to disburse funds. She is cleared.
- **Stage 3.** Where did the money of Inferno Coffee really come from, and does the article link it to the missing Rp 50 billion city treasury money?  
  Key points: Valir launders the profits of his own secret restaurant and casino through the cafe (Rp 350 million a week). He first said the money came from coffee blends and loyal customers, then admitted the truth after the audit. Auditors found no link to the Rp 50 billion: Valir is a red herring and his case is separate.
- **Stage 4.** Who holds direct technical authority to approve budget disbursements according to former project contractors?  
  Key points: Technical project managers (not the Mayor) sign all disbursements. Mr. Alpha blames the Mayor but has a personal grudge.
- **Stage 5.** Who are the real masterminds of the Rp 50 billion embezzlement, and what method did they use?  
  Key points: Popol and Kupa are the masterminds. Method: shell company Kupa Jaya Supplies and dummy invoices.

## Appendix C. Witness (NPC) dialogues, full

Source: `SIDES` in `game.js`. Each witness greets the student, then offers three questions (a, b, c). After an answer the student can choose "Ask something else" (back to the menu) or "Thank you". Answers `a`, `b`, `c` are what unlock Case Log Book notes. Witnesses never name the culprits.

### Mang Udin (Warung Owner) (`npc-warung.html`)
Place: District 3 Street Corner · portrait `npc_warung_uncle` · background `bg_warung`

- Greeting: "Ah, Mr. Detective! Welcome, welcome! Sit down, sit down. A hot bowl of noodles first, or are you here to ask questions, hm?"
- Question a: *What have people been saying lately?*  
  Answer: "Everybody has a theory! Some say the Mayor took the money, some say his secretary, some say it was never there at all. Me? I only know noodles."
- Question b: *Did you see anything strange at night?*  
  Answer: "Last Tuesday, very late, I saw two men in work vests carrying heavy boxes into the old municipal warehouse. Too dark to see their faces. They looked nervous, but maybe they were just tired."
- Question c: *What do people say about the Mayor?*  
  Answer: "I think a mayor who lets the roads fall apart must be hiding something! ...But that is only what I think. I have never actually seen him near any warehouse."
- Menu text when returning: "Still hungry for answers, Detective? Go on, ask."

### Dewi (Barista, Inferno Coffee) (`npc-cafe.html`)
Place: Central Commercial District · portrait `npc_cafe_barista` · background `bg_cafe`

- Greeting: "Welcome to Inferno Coffee! Oh, are you the detective everyone is talking about? Can I get you something, or can I help you with something else?"
- Question a: *How is business here?*  
  Answer: "The app says we are fully booked every day. But look around, half the tables are empty. Mr. Valir says it is the new coffee blends. I just pour the coffee."
- Question b: *Who takes care of the money?*  
  Answer: "Mr. Valir handles every receipt himself. He does not let anyone else touch the ledger. And some nights, guests walk in through the back door and never order a single coffee. The tax officers visit quite often, though."
- Question c: *Does Mr. Valir ever talk about the city?*  
  Answer: "Never the city. He talks about his restaurants out of town, his 'investors' and his 'private club'. I do not ask questions. I like my job."
- Menu text when returning: "Of course! Anything else I can help you with, Detective?"

### Pak Jaya (Small Store Owner) (`npc-store.html`)
Place: Market Lane · portrait `npc_store_owner` · background `bg_store`

- Greeting: "Oh! Careful, careful, mind the crates! ...Eh? You are the detective? Well, what do you need? Make it quick, I have customers."
- Question a: *Who shops here usually?*  
  Answer: "Public works crews, mostly, and some city hall staff. They buy snacks and they gossip. Oh, they gossip more than they buy."
- Question b: *Have you seen any material deliveries?*  
  Answer: "The papers say a supplier is delivering building materials for the roads. I live right on Market Lane and I have not seen one truck. But maybe they use another route. I only sell snacks!"
- Question c: *Anything odd about the road projects?*  
  Answer: "The projects keep 'buying materials', yet the potholes stay. If I were you, I would not look at the faces on the posters. I would look at who signs the paperwork."
- Menu text when returning: "Hm? Still here? Fine, one more question. What is it?"

### Pak Joko (Bus Driver) (`npc-transport.html`)
Place: Central Transit Stop · portrait `npc_transport_driver` · background `bg_transport`

- Greeting: "...You are not a passenger. Detective, right? Hmm. I have a schedule, so ask quickly."
- Question a: *Do you have regular passengers?*  
  Answer: "The same faces. Students, market sellers. And every week, two men in work vests heading to the industrial zone. They whisper to each other. Probably office talk."
- Question b: *Where does this route end?*  
  Answer: "The industrial zone. Old warehouses, a few post boxes, not much else. Nobody gets off there for fun."
- Question c: *Does anyone carry anything unusual?*  
  Answer: "Heavy bags on the way there, light bags on the way back. Could be tools. Could be lunch. Do not ask me, I just drive."
- Menu text when returning: "Still here? Clock is ticking, Detective. What else?"

## Appendix D. Intro script (13 visual-novel slides)

Source: `SCENES` in `story.js`. Teacher presses Start/Next on the big screen, phones follow. `{det}` becomes ", Detective <name>" on phones and is empty on the teacher screen.

**Slide 1.** Background `bg_stage1_bank` · characters: none  
Narration: Welcome to Amats City, a busy city of roads, markets and offices. Every year the city council saves money for things all citizens need: roads, a city hospital and a digital park.

**Slide 2.** Background `bg_stage1_bank` · characters: none  
Narration: Last week, Rp 50 billion vanished from the city treasury. The road projects are stuck. Citizens are angry. Nobody knows where the money went.

**Slide 3.** Background `bg_stage1_bank` · characters: `johnson` (center) · name plate: **Mayor Johnson** (Mayor of Amats)  
Narration: He is the leader of the city. The money disappeared from his city’s treasury, so many people blame him.  
Spoken: “I am innocent. I did not take the money.”

**Slide 4.** Background `bg_stage4_archive` · characters: `alpha` (center) · name plate: **Mr. Alpha** (Opposition politician)  
Narration: He leads the opposition and criticises the Mayor in public.  
Spoken: “Mayor Johnson is a corrupt leader. He is not fit for office!”

**Slide 5.** Background `bg_stage1_bank` · characters: `popol` (left), `kupa` (right) · name plate: **Popol and Kupa** (Senior public works officials)  
Narration: They supervise the city’s public works. In front of the press, they defend the Mayor loudly.  
Spoken: Popol: “Mr. Alpha is only jealous of us!”  
Spoken: Kupa: “We have managed every project transparently.”

**Slide 6.** Background `bg_stage2_office` · characters: `angela` (center) · name plate: **Angela** (Personal secretary to the Mayor)  
Narration: Photos of her holiday on a private jet in Europe went viral. People ask how she can pay for it.  
Spoken: “Those holiday photos? I have never touched government money.”

**Slide 7.** Background `bg_stage3_inferno` · characters: `valir` (center) · name plate: **Mr. Valir** (Owner of Inferno Coffee)  
Narration: His new cafe earned a huge amount of money in just one week. Tax officers are watching him.  
Spoken: “My profits are legal. Nobody can link my business to the missing money.”

**Slide 8.** Background `bg_stage1_bank` · characters: `ray` (center) · name plate: **Chief Inspector Ray** (Police investigator)  
Narration: He leads the police investigation. He will not name anyone without solid proof.  
Spoken: “Bring me evidence, Detective. Facts, not rumours.”

**Slide 9.** Background `bg_stage1_bank` · characters: none  
Narration: Everyone has a story. But not every story is true. Some people tell facts. Some give opinions. Some only repeat what they heard.

**Slide 10.** Background `bg_stage4_archive` · characters: none · name plate: **Detective’s tip** (Three boxes)  
Narration: A good detective sorts every sentence into one of three boxes.  
FACT: The cafe earned Rp 350 million in one week. You can check the numbers.  
OPINION: The Mayor must be hiding something. This is only what someone thinks.  
CLAIM: Mr. Valir says his profits are legal. Someone says it, but it is not proven.

**Slide 11.** Background `city_map` · characters: none · name plate: **How to investigate**  
Narration: Find the QR codes on the map poster. Scan a station to read its news item. Pass the quiz, answer the question and earn a code to open the next station. Scan a witness to ask questions.

**Slide 12.** Background `bg_stage2_office` · characters: none · name plate: **Your Case Log Book**  
Narration: Everything you learn goes into your Case Log Book on this phone. It grows with every station and every witness. Read it again before each quiz.

**Slide 13.** Background `bg_stage1_bank` · characters: `player` (left), `ray` (right) · name plate: **Your mission**  
Narration: The city needs you. Find out who really took the Rp 50 billion.  
Spoken: Chief Inspector Ray: “The case is yours{det}.”

## Appendix E. Case Board and Case Log Book content

### E1. Case Board (status after finishing a stage)

The card shows the status from the **latest completed stage** that has an entry for that character. Source: `BOARD` in `story.js`.

- After Stage 1, **Mayor Johnson**: Accused, but says he is innocent
- After Stage 1, **Mr. Alpha**: Accuses the Mayor
- After Stage 1, **Popol**: Defends the Mayor loudly
- After Stage 1, **Kupa**: Defends the Mayor loudly
- After Stage 2, **Angela**: Cleared: her trip was paid from her late mother’s inheritance
- After Stage 3, **Mr. Valir**: Laundered money from his own secret restaurant and casino, but nothing links it to the Rp 50 billion
- After Stage 4, **Mr. Alpha**: Has a personal grudge against the Mayor
- After Stage 4, **Mayor Johnson**: Technical managers sign the payments, not the Mayor
- After Stage 5, **Popol**: MASTERMIND: shell company and dummy invoices
- After Stage 5, **Kupa**: MASTERMIND: shell company and dummy invoices
- After Stage 5, **Chief Inspector Ray**: Announced the real culprits

### E2. Case Log Book (all notes, in display order)

Source: `LOGBOOK` in `story.js`. Source key `s1`..`s5` = unlocked when that stage is read; `npc/a|b|c` = unlocked when that witness answer is heard. Tags: FACT (can be checked), OPINION (what someone thinks), CLAIM (what someone says, not proven).

#### Mayor Johnson (`johnson`)
Role: Mayor of Amats

- [FACT] The Rp 50 billion vanished from the treasury of his city. *(s1: Stage 1 · Amats Daily Investigator)*
- [CLAIM] He says he is completely innocent. *(s1: Stage 1 · Amats Daily Investigator)*
- [OPINION] Mr. Alpha calls him a corrupt leader who is unfit for office. No proof is given. *(s1: Stage 1 · Amats Daily Investigator)*
- [OPINION] Mang Udin hears many theories. Some people say the Mayor took the money. It is only a rumour. *(warung/a: Witness · Mang Udin)*
- [OPINION] Mang Udin thinks a mayor who lets the roads fall apart must be hiding something. He has never seen the Mayor near a warehouse. *(warung/c: Witness · Mang Udin)*
- [OPINION] Pak Jaya says: “Look at who signs the paperwork,” not at the faces on the posters. *(store/c: Witness · Pak Jaya)*
- [FACT] City archives show that technical supervision and maintenance belong to the field technical division, not the Mayor’s desk. *(s4: Stage 4 · Amats Express)*
- [CLAIM] Former contractors say every budget disbursement must be signed by the technical project manager. *(s4: Stage 4 · Amats Express)*
- [CLAIM] Chief Inspector Ray says the real masterminds worked behind the Mayor’s back. *(s5: Stage 5 · Investigative Gazette)*

#### Angela (`angela`)
Role: Personal secretary to the Mayor

- [FACT] Photos of her luxury holiday on a private jet in Europe spread widely online. *(s2: Stage 2 · Amats Tribune)*
- [OPINION] Many residents guessed she paid with stolen city money. This is only speculation. *(s2: Stage 2 · Amats Tribune)*
- [OPINION] Mang Udin says some people blame the secretary. Again, only a rumour. *(warung/a: Witness · Mang Udin)*
- [FACT] The audit team checked her bank accounts and asset declarations. *(s2: Stage 2 · Amats Tribune)*
- [FACT] Secretary-level staff have no authority or technical access to disburse city funds. *(s2: Stage 2 · Amats Tribune)*
- [CLAIM] She says her money comes from her late mother’s textile business and that she never touched government money. *(s2: Stage 2 · Amats Tribune)*

#### Mr. Alpha (`alpha`)
Role: Opposition politician

- [OPINION] He says Mayor Johnson is a corrupt leader who is unfit for office. *(s1: Stage 1 · Amats Daily Investigator)*
- [OPINION] Popol says Mr. Alpha is only jealous of the administration. That is Popol’s opinion. *(s1: Stage 1 · Amats Daily Investigator)*
- [OPINION] He accuses the Mayor of neglecting public facilities on purpose, for personal gain. *(s4: Stage 4 · Amats Express)*
- [CLAIM] He says Mayor Johnson cheated him in a private business deal years ago. This may be a personal grudge. *(s4: Stage 4 · Amats Express)*

#### Mr. Valir (`valir`)
Role: Owner of Inferno Coffee

- [FACT] His new upscale cafe is in the central commercial district. *(s3: Stage 3 · The Metro Chronicle)*
- [FACT] The cafe earned Rp 350 million in one week. *(s3: Stage 3 · The Metro Chronicle)*
- [CLAIM] Dewi says the app shows the cafe fully booked every day, but half the tables are empty. *(cafe/a: Witness · Dewi)*
- [CLAIM] Dewi says Mr. Valir handles every receipt himself and lets nobody touch the ledger. Some nights, guests use the back door and order nothing. Tax officers visit often. *(cafe/b: Witness · Dewi)*
- [CLAIM] Dewi says he talks about restaurants out of town, his “investors” and his “private club”, never about the city. *(cafe/c: Witness · Dewi)*
- [CLAIM] At first, his lawyer said the profits came from special coffee blends and loyal customers. The audit showed this was not true. *(s3: Stage 3 · The Metro Chronicle)*
- [FACT] Tax auditors announced that the cafe was a front for money laundering. *(s3: Stage 3 · The Metro Chronicle)*
- [FACT] Much of the cash came from an unlicensed restaurant with a hidden gambling room. Mr. Valir owns it. *(s3: Stage 3 · The Metro Chronicle)*
- [CLAIM] He admitted that all his earnings came from his restaurant and casino, and says he will face the law. *(s3: Stage 3 · The Metro Chronicle)*
- [CLAIM] He says he took nothing from the city treasury. *(s3: Stage 3 · The Metro Chronicle)*
- [FACT] Auditors found no transaction linking his businesses to the missing Rp 50 billion. Police will handle his gambling and laundering as a separate case. *(s3: Stage 3 · The Metro Chronicle)*

#### Popol (`popol`)
Role: Senior public works official

- [FACT] He is a senior public works supervisory official. *(s1: Stage 1 · Amats Daily Investigator)*
- [FACT] He defended the Mayor at a heated press conference. *(s1: Stage 1 · Amats Daily Investigator)*
- [OPINION] He says Mr. Alpha is jealous and wants to ruin the Mayor’s career. *(s1: Stage 1 · Amats Daily Investigator)*
- [FACT] Police dismantled a shell company network called Kupa Jaya Supplies. Rp 50 billion was moved through dummy invoices into hidden offshore accounts. *(s5: Stage 5 · Investigative Gazette)*
- [FACT] Fake receipts and forged invoices were hidden in an abandoned archive warehouse near the industrial zone. *(s5: Stage 5 · Investigative Gazette)*
- [FACT] Forensic experts say the forgeries were impossible without approval from senior supervisors with ultimate system control. *(s5: Stage 5 · Investigative Gazette)*
- [CLAIM] Chief Inspector Ray names Popol and Kupa as the masterminds and says they will be arrested tonight. *(s5: Stage 5 · Investigative Gazette)*

#### Kupa (`kupa`)
Role: Senior public works official

- [FACT] He is a senior public works supervisory official. *(s1: Stage 1 · Amats Daily Investigator)*
- [FACT] He defended the Mayor at a heated press conference. *(s1: Stage 1 · Amats Daily Investigator)*
- [CLAIM] He says all projects were managed transparently and he can prove a clean record in court. *(s1: Stage 1 · Amats Daily Investigator)*
- [FACT] Police dismantled a shell company network called Kupa Jaya Supplies. Rp 50 billion was moved through dummy invoices into hidden offshore accounts. *(s5: Stage 5 · Investigative Gazette)*
- [FACT] Fake receipts and forged invoices were hidden in an abandoned archive warehouse near the industrial zone. *(s5: Stage 5 · Investigative Gazette)*
- [FACT] Forensic experts say the forgeries were impossible without approval from senior supervisors with ultimate system control. *(s5: Stage 5 · Investigative Gazette)*
- [CLAIM] Chief Inspector Ray names Popol and Kupa as the masterminds and says they will be arrested tonight. *(s5: Stage 5 · Investigative Gazette)*

#### Chief Inspector Ray (`ray`)
Role: Chief Inspector of Police

- [FACT] He leads the police investigation, which lasted for months. *(s5: Stage 5 · Investigative Gazette)*
- [CLAIM] He says all the physical evidence, forged signatures and digital trails prove the crime beyond doubt. *(s5: Stage 5 · Investigative Gazette)*

#### Two men in work vests (`men`) [hidden card until first note unlocks]
Role: A lead from the witnesses

- [CLAIM] Mang Udin says he saw two men in work vests carry heavy boxes into the old municipal warehouse late on Tuesday. He did not see their faces. *(warung/b: Witness · Mang Udin)*
- [OPINION] Mang Udin thinks they looked nervous, but maybe they were just tired. *(warung/b: Witness · Mang Udin)*
- [CLAIM] Pak Joko says two men in work vests ride to the industrial zone every week and whisper to each other. *(transport/a: Witness · Pak Joko)*
- [CLAIM] Pak Joko says the route ends in the industrial zone: old warehouses and a few post boxes. *(transport/b: Witness · Pak Joko)*
- [CLAIM] Pak Joko says the men carry heavy bags on the way there and light bags on the way back. He does not know what is inside. *(transport/c: Witness · Pak Joko)*
- [FACT] The hidden fake receipts were found in an abandoned warehouse near the industrial zone, the same area the witnesses talked about. *(s5: Stage 5 · Investigative Gazette)*

#### The Supplier (`supplier`) [hidden card until first note unlocks]
Role: Unknown company

- [CLAIM] The papers say a supplier delivers building materials for the roads. Pak Jaya lives on Market Lane and has not seen one truck. *(store/b: Witness · Pak Jaya)*
- [CLAIM] Pak Jaya says the projects keep “buying materials”, but the potholes are still there. *(store/c: Witness · Pak Jaya)*
- [FACT] The supplier was Kupa Jaya Supplies, a shell company that only existed on paper. *(s5: Stage 5 · Investigative Gazette)*

## Appendix F. Quiz bank (100 questions, teacher only, regenerated in v5)

Source: `questions.js` (`QBANK`). Number = Q# in the Google Sheet. Format: question, then the correct answer. Each quiz gives 10 random questions of the 20; options are shuffled; pass mark 7/10; the result is logged but never shown to the student.

### Stage 1: The Bank Lobby

1. How much money disappeared from the city treasury? **Rp 50 billion**
2. From which account did the money go missing? **The main municipal treasury account**
3. When were the funds reported missing? **Last week**
4. Who officially approved the funds? **The city council**
5. What was the money originally meant for? **Road rehabilitation, the city hospital and a digital park**
6. What do most citizens demand? **An independent forensic investigation**
7. Who is Mr. Alpha? **An opposition politician**
8. Mr. Alpha said the Mayor is “a corrupt leader who is entirely unfit for office.” This statement is... **An opinion**
9. Which sentence is a FACT? **Fifty billion rupiah was reported missing from the treasury.**
10. Which part of a news item tells what happened and why it is important? **Newsworthy event**
11. Which part of a news item tells what people said about the event? **Background events and sources**
12. Who said, “We have managed all public infrastructure projects transparently”? **Kupa**
13. Which is the direct speech form of: Popol stated that Mr. Alpha was merely jealous? **Popol said, “Mr. Alpha is merely jealous.”**
14. Which is the indirect speech form of Kupa's words: “We have managed all projects transparently”? **Kupa said that they had managed all projects transparently.**
15. WHO defended the Mayor against his critics? **Popol and Kupa**
16. According to Popol, WHY did Mr. Alpha attack the Mayor? **He was jealous and wanted to ruin the Mayor's career**
17. According to a police spokesperson, what must investigators establish first? **Who holds the technical authority to transfer project funds**
18. What are Popol and Kupa's jobs? **Senior public works supervisory officials**
19. Which sentence is a CLAIM (someone says it, but it is not proven)? **Mayor Johnson insists that he is completely innocent.**
20. Which phrase shows Mr. Alpha's OPINION rather than a fact? **corrupt leader**

### Stage 2: The Secretary's Office

1. Who is Angela? **The Mayor's personal confidential secretary**
2. What put Angela under public scrutiny? **Photos of her luxury vacation in Europe**
3. Which sentence is a CLAIM (someone says it, but it is not proven)? **Angela says her wealth came from her late mother's inheritance.**
4. What did residents speculate? **That she paid for her lifestyle with embezzled city money**
5. Who examined Angela's bank records and asset declarations? **The internal financial audit team**
6. What did the audit find about secretarial-level staff? **They have no authorization or access to disburse city funds**
7. What system prevents secretarial staff from disbursing funds? **Strict digital banking security systems**
8. Where did Angela say her wealth came from? **A family inheritance**
9. When did Angela's mother pass away? **Last year**
10. What business did Angela's late mother manage? **A textile business**
11. “She was funding her lifestyle with embezzled money.” In the article, this is... **A speculation, not a proven fact**
12. Which sentence is a FACT? **The audit team examined Angela's bank records.**
13. Who said, “I have never touched government money even a single bit”? **Angela**
14. Which is the direct speech form of: Angela explained that her wealth originated from a family inheritance? **Angela said, “My wealth originated from a family inheritance.”**
15. Which is the indirect speech form of Angela's quote: “My luxury lifestyle is funded entirely by my family's legal estate”? **Angela asserted that her luxury lifestyle was funded entirely by her family's legal estate.**
16. The photos of the Europe vacation are part of which section? **Newsworthy event**
17. The audit team's findings are part of which section? **Background events and sources**
18. What kind of source is the “exclusive interview with reporters”? **A statement from the person directly involved**
19. Why is Angela NOT the primary suspect? **She has no authorization to disburse city funds**
20. Which expression shows that the public was only guessing? **wild speculations**

### Stage 3: Inferno Coffee Shop

1. Who owns Inferno Coffee? **Mr. Valir**
2. What was the cafe's weekly turnover? **Rp 350 million**
3. Which sentence is a CLAIM that the audit later showed to be untrue? **Mr. Valir's lawyer said the profits came from special coffee blends and loyal customers.**
4. Why is the turnover considered absurd? **The cafe is newly established**
5. What did the state tax auditors announce about the cafe? **That it was a front for illegal money laundering**
6. In “a front for illegal money laundering,” what does “front” mean? **A cover that hides illegal activity**
7. What do tax officers inspect during their visits? **Ledger books and digital receipts**
8. How did Mr. Valir first explain the profit surge through his lawyer? **Unique coffee blends and a loyal customer base**
9. What did the auditors discover about the cash recorded as coffee sales? **It was carried in from an unlicensed restaurant with a hidden gambling room**
10. Where did Mr. Valir admit his earnings came from? **His own restaurant and casino**
11. Does the article link Valir's money to the missing Rp 50 billion? **No, the auditors found no transaction linking his businesses to it**
12. Which sentence is a FACT? **Inferno Coffee recorded a weekly turnover of Rp 350 million.**
13. Which phrase is an OPINION? **utterly absurd**
14. Which sentence is an OPINION? **Valir's blends are unique and unbeatable.**
15. Who said, “I took nothing from the city treasury”? **Mr. Valir**
16. Which is the direct speech form of: Valir admitted that all of his earnings came from his restaurant and casino? **Valir said, “All of my earnings come from my restaurant and casino.”**
17. Which is the indirect speech form of: “I took nothing from the city treasury”? **Valir conveyed that he had taken nothing from the city treasury.**
18. Valir's explanations belong to which section? **Background events and sources**
19. Why does the article report the lawyer's first explanation and then Valir's admission? **To show that his first claim was disproved by the audit findings**
20. What is the newsworthy event of this article? **Auditors reveal that a new cafe laundered money from its owner's secret restaurant and casino**

### Stage 4: Political Statements & Archive

1. What caused public fury in Amats? **Chronic delays in road repair projects**
2. Which sentence is a CLAIM (someone says it, but it is not proven)? **Mr. Alpha says Mayor Johnson cheated him in a past business deal.**
3. Who accused Mayor Johnson? **Mr. Alpha**
4. What did Mr. Alpha accuse the Mayor of? **Deliberately neglecting public facilities for personal gain**
5. According to the city archive, who controls technical supervision and maintenance? **The field technical division**
6. Who revealed that disbursements must be signed by the technical project manager? **Former project contractors**
7. How did the contractors give this information? **In confidential interviews**
8. What must the relevant technical project manager sign? **Every budget disbursement approval document**
9. What did Mr. Alpha say about Mayor Johnson's past? **The Mayor cheated him in private business contracts**
10. Why might Mr. Alpha's accusation be biased? **He has a personal grudge against the Mayor**
11. “The Mayor deliberately neglected public facilities for personal gain.” In the article, this is... **An accusation, not a proven fact**
12. Which sentence is a FACT? **City archive documents record that technical supervision belongs to the field technical division.**
13. Who said, “All project approval documents ... are handled strictly by the operational staff”? **Senior city archivists**
14. Which is the indirect speech form of the archivists' quote? **The archivists stated that all approval documents were handled strictly by the operational staff.**
15. Which is the direct speech form of: Mr. Alpha revealed that Mayor Johnson had cheated him? **Mr. Alpha said, “Mayor Johnson cheated me in past business contracts.”**
16. The archive documents and contractor interviews belong to which section? **Background events and sources**
17. What is the newsworthy event of this article? **Mr. Alpha publicly blames the Mayor for the road delays**
18. Who holds direct technical authority to approve disbursements? **The relevant technical project manager**
19. Which evidence helps weaken the claim against the Mayor? **Approvals are handled by operational staff, not the Mayor's desk**
20. In “chronic delays,” what does “chronic” mean? **Long-lasting and repeated**

### Stage 5: The Final Archive

1. Who announced the arrests? **Chief Inspector Ray**
2. What is the name of the shell company? **Kupa Jaya Supplies**
3. How long did the police investigation last? **Several months**
4. How was the money moved? **Through dummy invoices into hidden offshore accounts**
5. Where did detectives find the fake receipts and forged invoices? **An abandoned archive warehouse near the industrial zone**
6. Who are the real masterminds? **Popol and Kupa**
7. According to Chief Inspector Ray, what role did Mayor Johnson play? **The scheme was run behind his back**
8. When will the suspects be arrested? **Tonight**
9. Which sentence is a CLAIM (someone says it, but it is not proven yet)? **Chief Inspector Ray says the evidence proves the suspects' crimes beyond doubt.**
10. Who confirmed the forgeries needed authorization from senior personnel? **Document forensic experts**
11. What is a shell company? **A company that exists mostly on paper to hide money movements**
12. In “bogus corporation,” what does “bogus” mean? **Fake**
13. Which sentence is a FACT supported by the article? **Fifty billion rupiah was transferred through dummy invoices.**
14. Which word is the writer's EVALUATION rather than evidence? **sophisticated**
15. Who said, “all physical evidence, forged signatures, and digital tracking trails have proven their crimes”? **Chief Inspector Ray**
16. Which is the indirect speech form of Ray's quote? **Ray affirmed that both suspects would be arrested that night.**
17. Which is the direct speech form of: Ray announced that Popol and Kupa were the actual masterminds? **Ray said, “Popol and Kupa are the actual masterminds.”**
18. The forensic experts' conclusions belong to which section? **Background events and sources**
19. What is the newsworthy event of this article? **Police dismantled a shell company network behind the embezzlement**
20. What twist does this article reveal about Popol and Kupa? **The officials who defended the Mayor were the real masterminds**


## Appendix G. Key vocabulary and reporting verbs found in the texts

**Vocabulary (from the five articles):** embezzle / embezzlement, treasury, disburse / disbursement, rehabilitation, scrutiny, speculation, inheritance, authorization, clearance, audit / auditor, turnover, ledger, front (a cover for illegal activity), money laundering, unlicensed, shell company, dummy invoice, forged, supervisory, mastermind, forensic, offshore.

**Reporting verbs used in the articles (useful for direct / indirect speech):** insists, declaring, stated, explained, asserted, argued, admitted, conveyed, announced, confirmed, revealed, accused, affirmed.

**Fact / opinion / claim, in one line each:**
- **Fact:** can be checked ("The cafe earned Rp 350 million in one week.").
- **Opinion:** what someone thinks ("The Mayor must be hiding something.").
- **Claim:** what someone says, not proven yet ("Mr. Valir says his profits are legal.").
