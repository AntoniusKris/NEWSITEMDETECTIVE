/* AMATS City Scandal - shared game engine */
const CONFIG={GAS_URL:GAS}; // Apps Script /exec URL

// Codes a student receives after finishing stage N-1 (key = stage being unlocked; 6 = final dossier)
const POOLS={
2:'KU7G4 9J65I X8P2M R4W1N 5T9LQ B7V3C H2K9F M8L4P 3Z6Y8 W1D7V N5R2J P9X4K 7C3T6 F8B1Q L4M9Z 2W7V5 J3K8R Q6N1X 8P4D2 V9T5H'.split(' '),
3:'A5R9K D2M7P 8W3V1 N9X4Q 6T1L8 H7J2F P4C9Z V1B8R 3K5M2 9L8W4 R7X1T F2N9V C4Q6K W8Z3J 1M7P5 T9B2R K6V4X J8F1L 5D3N9 Z2W8Q'.split(' '),
4:'E9T2W 7M4K1 R1V8P X5N3L 3B9J6 K2Q7Z P8D1V W6F4C L3X9M 8N2T7 V5B1R J9K4Q 1Z8P3 C7M2W F4V9L 9Q3T8 T6R1K N2X5J 4P7D9 Z8W3V'.split(' '),
5:'G4K8V 2N7Q9 W9P3L 6J1M5 L8C2X P3R7K F9Z4V T1V8M 7B5N2 R2W9J X6Q3D 4K8T1 V9M5P N1J7Z 3C2F8 J5R4L 8Q9X2 M7V1K 9D3W6 Z8T4P'.split(' '),
6:'H3M9K L7X2P 9V4R1 C1J8Z 5W3T6 R8D4N F2P9Q V6B1M 3T7K5 K9N2V P4W8L J1X5D 8Z2Q7 N6M3F 2R9T1 W5V8P T3K7J 7D1N4 Q8X2M X4P9Z'.split(' ')};

const NEWS={
1:{paper:'AMATS DAILY INVESTIGATOR',sub:'Special Criminal Investigation Edition',bg:'bg_stage1_bank',place:'The Bank Lobby',
head:'City Budget Fund of Rp 50 Billion Mysteriously Vanishes from Central Treasury',
body:[['Newsworthy Event','A massive financial crisis has suddenly shaken the City of Amats after public budget funds totaling exactly fifty billion rupiah were reported missing from the main municipal treasury account last week. The funds had previously been officially approved by the city council for vital public road rehabilitation programs and digital green open-space developments across the metropolitan area.'],
['Background Events & Sources','To this day, Mayor Johnson firmly insists that he is completely innocent of any wrongdoing. However, a large majority of local citizens are demanding that city hall launch an independent forensic investigation immediately. On the other hand, opposition politician Mr. Alpha launched a harsh condemnation, declaring in a public briefing that Mayor Johnson is a corrupt leader who is entirely unfit for office.','Responding to these severe allegations, Popol and Kupa, acting as the senior public works supervisory officials, stepped forward to defend the Mayor against his critics. In a heated press conference yesterday, Popol stated that Mr. Alpha was merely jealous of the administration\'s achievements and intended to ruin Mayor Johnson\'s political career. Meanwhile, Kupa stated, "We have managed all public infrastructure projects transparently, and we are ready to prove our clean track records before the court of law."']],
task:'What specific amount of money disappeared, and what was its original intended purpose?',must:[/50|fifty/i,/road|green|open|space|rehabilit|infrastructure/i]},
2:{paper:'AMATS TRIBUNE',sub:'Politics & Lifestyle Investigation Report',bg:'bg_stage2_office',place:"The Secretary's Office",
head:'Mayor\'s Secretary Proves Luxury European Travel Stems From Family Estate',
body:[['Newsworthy Event','Angela, the personal confidential secretary to Mayor Johnson, suddenly became the center of intense public scrutiny following a social media scandal. Photographs documenting her extravagant vacation aboard a private luxury jet in Europe circulated widely online, sparking wild speculations among residents that she was funding her lifestyle using embezzled municipal treasury money.'],
['Background Events & Sources','The internal financial audit team moved quickly to examine Angela\'s personal bank account records and asset declarations. Based on strict digital banking security systems, administrative staff members operating at the secretarial level have proven to possess zero authorization, clearance, or technical access to disburse municipal budget funds.','Angela explained during an interrogation session that her entire wealth originated purely from a substantial family inheritance left by her late mother, who managed a successful textile business prior to passing away last year. In an exclusive interview with reporters, Angela asserted, "My luxury lifestyle is funded entirely by my family\'s legal estate, and I have never touched government money even a single bit."']],
task:'What evidence clears Angela from being the primary suspect of disbursing the city funds?',must:[/authori|access|clearance|permission/i]},
3:{paper:'THE METRO CHRONICLE',sub:'Business & Financial Investigation Desk',bg:'bg_stage3_inferno',place:'Inferno Coffee Shop',
head:'Sky-High Revenue at Newly Opened Inferno Coffee Raises Auditor\'s Suspicions',
body:[['Newsworthy Event','Inferno Coffee, a newly opened upscale cafe owned by Mr. Valir located in the central commercial district, suddenly recorded a phenomenal weekly turnover reaching three hundred and fifty million rupiah\u2014a financial figure considered utterly absurd for a newly established culinary business. State tax auditors are now actively suspecting the venue of potentially serving as a front for illegal money laundering operations.'],
['Background Events & Sources','Tax enforcement officers regularly visit the cafe to inspect ledger transaction books and digital receipts on a periodic basis. On the other hand, Mr. Valir argues through his legal counsel that his extraordinary business profit surge is purely driven by unique proprietary coffee blends and a massive, fiercely loyal customer base.','When investigative journalists questioned him regarding the legal origin of his financial transactions, Mr. Valir claimed that all of his business earnings originated from his extensive network of private restaurants operating overseas. Valir conveyed, "The profits of this cafe are generated completely legally, and no one has the ethical right to link my private business to the missing city treasury case."']],
task:'Why does the tax auditor suspect Mr. Valir\'s cafe of money laundering? Does the article explicitly tie his revenue to the missing Rp 50 billion city treasury?',must:[/revenue|turnover|profit|absurd|350|new/i,/\bno\b|\bnot\b|n't|never|neither/i]},
4:{paper:'AMATS EXPRESS',sub:'Amats City Premier Reporting',bg:'bg_stage4_archive',place:'Political Statements & Archive',
head:'Opposition Leader Blames Mayor as Damaged Road Projects Spark Public Rage',
body:[['Newsworthy Event','Chronic delays in road infrastructure repair projects across various corners of Amats city have triggered intense public fury and severe traffic congestion daily. Responding to this escalating crisis, opposition political figure Mr. Alpha openly accused Mayor Johnson of deliberately neglecting public facilities and infrastructure maintenance for personal financial gain.'],
['Background Events & Sources','Official city archive documents record that technical supervision and infrastructure maintenance fall strictly under the operational control of the field technical division rather than the Mayor\'s desk. Several former project contractors revealed during confidential interviews that every budget disbursement document approval must be signed by the relevant technical project manager.','Mr. Alpha revealed to media crew members that Mayor Johnson had cheated him in past private business partnership contracts years ago. Nevertheless, senior city archivists stated, "All project approval documents and technical disbursements are handled strictly by the operational staff of the relevant municipal department."']],
task:'Who holds direct technical authority to approve budget disbursements according to former project contractors?',must:[/technical|project manager|manager|operational/i]},
5:{paper:'INVESTIGATIVE GAZETTE',sub:'Law Enforcement Special Report',bg:'bg_stage5_warehouse',place:'The Final Archive',
head:'Shell Company Documents Expose Real Criminal Masterminds Behind Embezzlement',
body:[['Newsworthy Event','An in-depth, months-long police investigation has finally dismantled a sophisticated shell company network operating under the corporate name of Kupa Jaya Supplies. Based on conclusive forensic audit results, city treasury fund flows amounting to fifty billion rupiah were proven to be systematically transferred through dummy invoices into hidden offshore accounts belonging to the bogus corporation.'],
['Background Events & Sources','Detectives discovered hidden piles of fake material purchase receipts and forged administrative invoices intentionally concealed inside an abandoned archive warehouse near the industrial zone. Document forensic experts confirmed that all of these elaborate administrative fabrications would have been entirely impossible to execute without direct authorization from senior supervisory personnel who hold ultimate internal system control.','Chief Inspector of Police Ray announced during a midnight press briefing that Popol and Kupa were the actual criminal masterminds who orchestrated the entire embezzlement scheme behind Mayor Johnson\'s back. Chief Inspector Ray affirmed, "Both suspects will be arrested tonight, because all physical evidence, forged signatures, and digital tracking trails have proven their crimes beyond a shadow of a doubt."']],
task:'Who are the real masterminds of the Rp 50 billion embezzlement, and what method did they use?',must:[/popol/i,/kupa/i,/shell|invoice|fake|dummy|forg|bogus/i]}};

// Side-location witnesses: node = {t: what they say, o: [[your question, next node]]}; 'end' closes the chat
const menu=(t,q)=>({t,o:q.map((x,i)=>[x,'abc'[i]])});
const ans=t=>({t,o:[['Ask something else','m'],['Thank you.','end']]});
const SIDES={
warung:{x:24,y:70,icon:'\uD83C\uDF5C',name:'Mang Udin (Warung Owner)',place:'District 3 Street Corner',img:'npc_warung_uncle',
 n:{start:menu("Ah, Mr. Detective! Welcome, welcome! Sit down, sit down. A hot bowl of noodles first, or are you here to ask questions, hm?",['What have people been saying lately?','Did you see anything strange at night?','What do people say about the Mayor?']),
 m:menu("Still hungry for answers, Detective? Go on, ask.",['What have people been saying lately?','Did you see anything strange at night?','What do people say about the Mayor?']),
 a:ans("Everybody has a theory! Some say the Mayor took the money, some say his secretary, some say it was never there at all. Me? I only know noodles."),
 b:ans("Last Tuesday, very late, I saw two men in work vests carrying heavy boxes into the old municipal warehouse. Too dark to see their faces. They looked nervous, but maybe they were just tired."),
 c:ans("I think a mayor who lets the roads fall apart must be hiding something! ...But that is only what I think. I have never actually seen him near any warehouse.")}},
cafe:{x:12,y:44,icon:'\u2615',name:'Dewi (Barista, Inferno Coffee)',place:'Central Commercial District',img:'npc_cafe_barista',
 n:{start:menu("Welcome to Inferno Coffee! Oh, are you the detective everyone is talking about? Can I get you something, or can I help you with something else?",['How is business here?','Who takes care of the money?','Does Mr. Valir ever talk about the city?']),
 m:menu("Of course! Anything else I can help you with, Detective?",['How is business here?','Who takes care of the money?','Does Mr. Valir ever talk about the city?']),
 a:ans("The app says we are fully booked every day. But look around, half the tables are empty. Mr. Valir says it is the new coffee blends. I just pour the coffee."),
 b:ans("Mr. Valir handles every receipt himself. He does not let anyone else touch the ledger. The tax officers visit quite often, though."),
 c:ans("Never the city. He talks about his restaurants out of town, and about his 'investors'. I do not ask questions. I like my job.")}},
store:{x:38,y:82,icon:'\uD83C\uDFEA',name:'Pak Jaya (Small Store Owner)',place:'Market Lane',img:'npc_store_owner',
 n:{start:menu("Oh! Careful, careful, mind the crates! ...Eh? You are the detective? Well, what do you need? Make it quick, I have customers.",['Who shops here usually?','Have you seen any material deliveries?','Anything odd about the road projects?']),
 m:menu("Hm? Still here? Fine, one more question. What is it?",['Who shops here usually?','Have you seen any material deliveries?','Anything odd about the road projects?']),
 a:ans("Public works crews, mostly, and some city hall staff. They buy snacks and they gossip. Oh, they gossip more than they buy."),
 b:ans("The papers say a supplier is delivering building materials for the roads. I live right on Market Lane and I have not seen one truck. But maybe they use another route. I only sell snacks!"),
 c:ans("The projects keep 'buying materials', yet the potholes stay. If I were you, I would not look at the faces on the posters. I would look at who signs the paperwork.")}},
transport:{x:80,y:74,icon:'\uD83D\uDE8C',name:'Pak Joko (Bus Driver)',place:'Central Transit Stop',img:'npc_transport_driver',
 n:{start:menu("...You are not a passenger. Detective, right? Hmm. I have a schedule, so ask quickly.",['Do you have regular passengers?','Where does this route end?','Does anyone carry anything unusual?']),
 m:menu("Still here? Clock is ticking, Detective. What else?",['Do you have regular passengers?','Where does this route end?','Does anyone carry anything unusual?']),
 a:ans("The same faces. Students, market sellers. And every week, two men in work vests heading to the industrial zone. They whisper to each other. Probably office talk."),
 b:ans("The industrial zone. Old warehouses, a few post boxes, not much else. Nobody gets off there for fun."),
 c:ans("Heavy bags on the way there, light bags on the way back. Could be tools. Could be lunch. Do not ask me, I just drive.")}}};

const PINS={1:[48,52],2:[30,30],3:[62,38],4:[75,22],5:[85,55]};

// ---------- state & logging ----------
const $=s=>document.querySelector(s), app=$('#app');
const S=JSON.parse(localStorage.getItem('amats')||'{}'); S.sid=S.sid||Math.random().toString(36).slice(2,8).toUpperCase();
const save=()=>localStorage.setItem('amats',JSON.stringify(S));
const readQ=()=>JSON.parse(localStorage.getItem('amats_q')||'[]'), writeQ=q=>localStorage.setItem('amats_q',JSON.stringify(q));
let busy=false;
function log(event,stage,detail){const q=readQ();q.push({ts:new Date().toISOString(),name:S.name||'',sid:S.sid,stage:stage||'',event,detail:String(detail||'')});writeQ(q);flush();}
async function flush(){ // sends queued events in order; keeps them if offline
 if(busy||!CONFIG.GAS_URL.startsWith('http'))return; busy=true;
 try{while(readQ().length){await fetch(CONFIG.GAS_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(readQ()[0])});const q=readQ();q.shift();writeQ(q);}}catch(e){}
 busy=false;}
addEventListener('online',flush);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const bar=()=>`<div class="bar"><span class="typed">AMATS CASE FILE \u00b7 Detective ${esc(S.name)}</span><span><a href="join.html" style="color:var(--amber)">My file</a> <button id="chg">Not you?</button></span></div>`;
function wireBar(){const b=$('#chg');if(b)b.onclick=()=>{log('logout');S.name='';save();location.reload();};}

function gate(cb){
 if(S.name){log('session_start',document.body.dataset.stage||'',document.body.dataset.page);return cb();}
 app.innerHTML=`<div class="wrap"><div class="card"><h1>AMATS City Scandal</h1><p>Rp 50 billion has vanished from the city treasury. Sign the case file with your name to start investigating.</p><label for="nm">Your full name</label><input id="nm" autocomplete="name" maxlength="40"><button class="btn" id="go">Start investigation</button><div id="e" class="msg" hidden>Enter your name to continue.</div></div></div>`;
 const go=()=>{const v=$('#nm').value.trim();if(!v){$('#e').hidden=false;return;}S.name=v;save();log('login');cb();};
 $('#go').onclick=go;$('#nm').onkeydown=e=>{if(e.key==='Enter')go();};
}

// ---------- hub + npc ----------
function hub(){
 log('hub_view');
 const draw=st=>{
  const sl=st.phase==='intro'&&st.step>0?INTRO[Math.min(st.step,INTRO.length)-1]:null;
  const k=JSON.stringify([sl?st.step:0,S.last,S.name,[1,2,3,4,5].map(n=>S['c'+n]||0)]);
  if(hub.scan||k===hub.k)return;hub.k=k;
  const im=a=>a.map(i=>`<img src="assets/${i}.png" alt="" onerror="this.style.display='none'">`).join('');
  const items=[1,2,3,4,5].map(n=>`<div class="item ${S['c'+n]?'':'lock'}"><img src="assets/${S['c'+n]?ITEMS[n][0]:'ui_file_locked'}.png" alt="" onerror="this.style.visibility='hidden'"><small>${S['c'+n]?ITEMS[n][1]:'???'}</small></div>`).join('');
  const bd=Object.keys(CAST).map(c=>{let st='',n0=0;for(let n=1;n<=5;n++)if(S['c'+n]&&BOARD[n][c]){st=BOARD[n][c];n0=n;}
   return st?`<div class="pc ${st.startsWith('MASTER')?'bad':''}"><img src="assets/char_${c}.png" alt="" onerror="this.style.visibility='hidden'"><b>${CAST[c]}</b><small>${st}</small></div>`:`<div class="pc lock"><img src="assets/ui_file_locked.png" alt="" onerror="this.style.visibility='hidden'"><b>???</b><small>Not met yet</small></div>`;}).join('');
  app.innerHTML=bar()+`<div class="hub" style="background-image:url(assets/${S.last||'city_map'}.png)"><div class="hubin">`+(sl?`<div class="card"><h2>${sl.h}</h2><div class="simg">${im(sl.img)}</div><p>${sl.t}</p></div>`:`<div class="card idle"><img class="av" src="assets/char_player.png" alt="" onerror="this.style.display='none'"><h2>Detective ${esc(S.name)}</h2><p>Waiting for your next lead. Scan a QR code in the classroom.</p><button class="btn" id="scan">Scan QR code</button> <button class="btn alt" id="sx" hidden>Cancel</button><div id="rd"></div><div id="sm" class="msg" hidden></div><div class="items">${items}</div><h3>Case Board</h3><div class="board">${bd}</div>${S.c5?'<img class="stamp" src="assets/stamp_case_solved.png" alt="" onerror="this.style.display=\'none\'">':''}</div>`)+`</div></div>`;wireBar();wireScan();};
 const poll=async()=>{try{const r=await fetch(GAS+'?action=state');hub.last=await r.json();}catch(e){}draw(hub.last||{});};
 poll();setInterval(poll,4000);
}
function wireScan(){
 const b=$('#scan');if(!b)return;const m=$('#sm'),x=$('#sx');
 const say=t=>{m.hidden=!t;m.textContent=t||'';};
 const stop=async()=>{try{await hub.scan.stop();}catch(e){}hub.scan=null;hub.k='';x.hidden=true;b.hidden=false;};
 x.onclick=stop;
 b.onclick=async()=>{say('');
  try{
   if(!window.Html5Qrcode)await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s);});
   hub.scan=new Html5Qrcode('rd');b.hidden=true;x.hidden=false;
   await hub.scan.start({facingMode:'environment'},{fps:10,qrbox:220},async t=>{
    let u;try{u=new URL(t);}catch(e){return;}
    if(u.origin!==location.origin||!/\/(stage[1-5]|npc-[a-z]+)\.html$/.test(u.pathname)){say('That is not a station or witness QR code. Try another one.');return;}
    log('scan_open','',u.pathname.split('/').pop());await stop();location.href=u.href;},()=>{});
  }catch(e){await stop();say('The camera could not start. Allow camera access in your browser and try again.');}
 };
}
function npc(k){
 app.innerHTML=bar()+`<div class="wrap"><img class="banner" src="assets/bg_${k}.png" alt="" onerror="this.style.display='none'"><div id="panel"></div></div>`;wireBar();
 S.last='bg_'+k;save();talk(k,'start',true);
}
function talk(k,node,first){
 const v=SIDES[k];if(first)log('location_open','',k);
 if(node==='end'){log('location_leave','',k);$('#panel').innerHTML='<a class="btn" href="join.html" style="display:inline-block;text-decoration:none">Back to my file</a>';return;}
 const n=v.n[node];log('dialogue_view','',`${k}/${node}`);
 $('#panel').innerHTML=`<div class="bubble"><img class="face" src="assets/${v.img}.png" alt="" onerror="this.style.visibility='hidden'"><div class="txt"><b>${v.name}</b><small>${v.place}</small><br>"${n.t}"</div></div>${n.o.map((o,i)=>`<button class="opt" data-n="${o[1]}" data-i="${i}">${o[1]==='end'?'\uD83D\uDEB6 ':'\uD83D\uDDE3\uFE0F '}${o[0]}</button>`).join('')}<button class="opt" data-n="end">\uD83D\uDEB6 Leave conversation</button>`;
 document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{log('dialogue_choice','',`${k}/${node} -> ${b.dataset.n}`);talk(k,b.dataset.n);});
 $('#panel').scrollIntoView({behavior:'smooth',block:'nearest'});
}

// ---------- stages ----------
function stage(n){
 log('stage_open',n);S.last=STAGE_BG[n];save();
 if(n>1&&!S['u'+n])return codeGate(n);
 paper(n);
}
function codeGate(n){
 app.innerHTML=bar()+`<div class="wrap"><div class="card"><h1>Station ${n}: ${NEWS[n].place}</h1><p>This file is locked. Enter the 5-character code you received at Station ${n-1}.</p><input id="cd" maxlength="5" autocapitalize="characters" autocomplete="off"><button class="btn" id="ok">Unlock file</button><div id="e" class="msg" hidden></div></div></div>`;wireBar();
 const go=()=>{const c=$('#cd').value.trim().toUpperCase();const ok=POOLS[n].includes(c);log('code_entry',n,(ok?'valid ':'invalid ')+c);
  if(ok){S['u'+n]=c;save();log('stage_unlock',n,c);paper(n);}else{const e=$('#e');e.hidden=false;e.textContent='That code does not match. Check the code from the previous station and try again.';}};
 $('#ok').onclick=go;$('#cd').onkeydown=e=>{if(e.key==='Enter')go();};
}
const MIN_WORDS=8,SET=10,PASS=7;
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
S.qz=S.qz||{};S.qa=S.qa||{};S.qp=S.qp||{};
const who=n=>`<div class="who"><b>People in this report</b>${PEOPLE[n].map(c=>`<span><img src="assets/char_${c}.png" alt="" onerror="this.style.visibility='hidden'">${CAST[c]}</span>`).join('')}</div>`;
const articleHTML=n=>{const d=NEWS[n];return `<div class="newswrap"><img class="newshead" src="assets/news_head.png" alt="AMATS City Scandal"><div class="newsbody"><div class="newsbar"><span>${d.paper}</span><span>${d.sub}</span></div><h2>${d.head}</h2>${d.body.map(s=>`<h4>${s[0]}</h4>${s.slice(1).map(p=>`<p>${p}</p>`).join('')}`).join('')}</div></div>`;};

function paper(n){ // read -> quiz -> (fail: read again | pass: essay) -> done
 if(S['c'+n])return done(n);
 if(S.qp[n])return essay(n);
 if(S.qz[n])return quiz(n);
 read(n);
}
function read(n,msg){
 app.innerHTML=bar()+`<div class="wrap">${msg?`<div class="msg">${msg}</div>`:''}${who(n)}${articleHTML(n)}<div class="card"><p>Read the news item carefully. The quiz has ${SET} questions and the article is hidden while you answer.</p><button class="btn" id="st">Start quiz</button></div></div>`;wireBar();
 $('#st').onclick=()=>{
  const ids=shuffle([...QBANK[n].keys()]).slice(0,SET);S.qa[n]=(S.qa[n]||0)+1;
  S.qz[n]={set:ids.map(q=>({q,o:shuffle([0,1,2,3])})),ans:[]};save();
  log('quiz_start',n,`attempt ${S.qa[n]}; questions ${ids.map(i=>i+1).join(',')}`);quiz(n);};
}
function quiz(n){
 const z=S.qz[n],i=z.ans.length;if(i>=SET)return grade(n);
 const it=z.set[i],q=QBANK[n][it.q],t0=Date.now();
 app.innerHTML=bar()+`<div class="wrap"><div class="card"><small>Question ${i+1} of ${SET}</small><h3>${esc(q[0])}</h3>${it.o.map(k=>`<button class="opt" data-k="${k}">${esc(q[k+1])}</button>`).join('')}</div></div>`;wireBar();
 document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
  if(Date.now()-t0<400)return; // ignore accidental double taps
  const k=+b.dataset.k;z.ans.push(k);save();log('quiz_answer',n,`Q${it.q+1} ${k===0?'right':'wrong'}`);quiz(n);});
}
function grade(n){ // result is logged for the teacher but never shown to the student
 const z=S.qz[n],wrong=z.set.map((it,i)=>z.ans[i]===0?0:it.q+1).filter(Boolean),score=SET-wrong.length,ok=score>=PASS;
 log('quiz_result',n,`${ok?'pass':'fail'} ${score}/${SET}; wrong: ${wrong.join(',')||'none'}; attempt ${S.qa[n]}`);
 delete S.qz[n];if(ok)S.qp[n]=true;save();
 ok?essay(n):read(n,'Your quiz score is not high enough yet. Re-read the news item carefully, then start a new quiz with a fresh set of questions.');
}
function essay(n){
 app.innerHTML=bar()+`<div class="wrap"><div class="card"><div class="msg ok">Quiz passed. One last task.</div><h3>Your task</h3><p>${NEWS[n].task}</p><label for="ans">Answer in full sentences (at least ${MIN_WORDS} words).</label><textarea id="ans" rows="5"></textarea><button class="btn" id="chk">Submit answer</button><div id="res"></div></div></div>`;wireBar();
 $('#chk').onclick=()=>{
  const a=$('#ans').value.trim();
  if(a.split(/\s+/).filter(Boolean).length<MIN_WORDS){$('#res').innerHTML=`<div class="msg">Write at least ${MIN_WORDS} words so your answer is complete.</div>`;return;}
  log('essay_submit',n,a.slice(0,500));
  S['c'+n]=S['c'+n]||pick(POOLS[n+1]);delete S.qp[n];save();log('stage_complete',n,S['c'+n]);done(n);};
}
function done(n){
 const fin=n===5;
 app.innerHTML=bar()+`<div class="wrap"><div class="card"><div class="msg ok">${fin?'Case solved, Detective '+esc(S.name)+'! Show this code to your teacher.':'Station '+n+' complete! Write this code down. You need it to open Station '+(n+1)+'.'}</div><div class="code">${S['c'+n]}</div><a href="join.html" style="color:var(--amber)">Back to my file</a></div></div>`;wireBar();
}

const page=document.body.dataset.page, sn=Number(document.body.dataset.stage);
function boot(){gate(()=>page==='hub'?hub():page==='npc'?npc(document.body.dataset.npc):stage(sn));flush();}
if(page!=='stage'||typeof QBANK!=='undefined')boot();
else{ // older stage pages may not load questions.js, so load it here
 const sc=document.createElement('script');sc.src='questions.js';sc.onload=boot;
 sc.onerror=()=>{app.innerHTML='<div class="wrap"><div class="card"><h3>questions.js not found</h3><p>Put questions.js in the same folder as game.js and the stage pages, then reload this page.</p></div></div>';};
 document.head.appendChild(sc);}
