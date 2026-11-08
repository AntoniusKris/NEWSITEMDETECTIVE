/* shared by teacher + student pages */
const GAS='https://script.google.com/macros/s/AKfycbzqbwKbRIA7QeEzihWjKzdmQ5h4Y-cV5Ggy1iznh32N5d-RMM4f1XbaxTQH6xyGgr_7yg/exec';
const STAGE_BG={1:'bg_stage1_bank',2:'bg_stage2_office',3:'bg_stage3_inferno',4:'bg_stage4_archive',5:'bg_stage5_warehouse'};
const ITEMS={1:['obj_ledger_book','Bank ledger'],2:['obj_luxury_jet_photo','Jet photo'],3:['obj_money_stack','Cafe cash'],4:['obj_fake_invoices','Invoices'],5:['obj_kupa_jaya_sign','Kupa Jaya sign']};
/* ---- intro as a visual novel ----
 bg = background image, c = characters [id, position l|c|r], n = name, r = role,
 d = narration, q = spoken lines (direct speech), l = fact/opinion/claim examples.
 {det} becomes ", Detective <name>" on phones and disappears on the teacher screen. */
const TAG={F:'FACT',O:'OPINION',C:'CLAIM'};
const SCENES=[
{bg:'bg_stage1_bank',c:[],n:'',r:'',d:'Welcome to Amats City, a busy city of roads, markets and offices. Every year the city council saves money for things all citizens need: roads, a city hospital and a digital park.'},
{bg:'bg_stage1_bank',c:[],n:'',r:'',d:'Last week, Rp 50 billion vanished from the city treasury. The road projects are stuck. Citizens are angry. Nobody knows where the money went.'},
{bg:'bg_stage1_bank',c:[['johnson','c']],n:'Mayor Johnson',r:'Mayor of Amats',d:'He is the leader of the city. The money disappeared from his city\u2019s treasury, so many people blame him.',q:['\u201CI am innocent. I did not take the money.\u201D']},
{bg:'bg_stage4_archive',c:[['alpha','c']],n:'Mr. Alpha',r:'Opposition politician',d:'He leads the opposition and criticises the Mayor in public.',q:['\u201CMayor Johnson is a corrupt leader. He is not fit for office!\u201D']},
{bg:'bg_stage1_bank',c:[['popol','l'],['kupa','r']],n:'Popol and Kupa',r:'Senior public works officials',d:'They supervise the city\u2019s public works. In front of the press, they defend the Mayor loudly.',q:['Popol: \u201CMr. Alpha is only jealous of us!\u201D','Kupa: \u201CWe have managed every project transparently.\u201D']},
{bg:'bg_stage2_office',c:[['angela','c']],n:'Angela',r:'Personal secretary to the Mayor',d:'Photos of her holiday on a private jet in Europe went viral. People ask how she can pay for it.',q:['\u201CThose holiday photos? I have never touched government money.\u201D']},
{bg:'bg_stage3_inferno',c:[['valir','c']],n:'Mr. Valir',r:'Owner of Inferno Coffee',d:'His new cafe earned a huge amount of money in just one week. Tax officers are watching him.',q:['\u201CMy profits are legal. Nobody can link my business to the missing money.\u201D']},
{bg:'bg_stage1_bank',c:[['ray','c']],n:'Chief Inspector Ray',r:'Police investigator',d:'He leads the police investigation. He will not name anyone without solid proof.',q:['\u201CBring me evidence, Detective. Facts, not rumours.\u201D']},
{bg:'bg_stage1_bank',c:[],n:'',r:'',d:'Everyone has a story. But not every story is true. Some people tell facts. Some give opinions. Some only repeat what they heard.'},
{bg:'bg_stage4_archive',c:[],n:'Detective\u2019s tip',r:'Three boxes',d:'A good detective sorts every sentence into one of three boxes.',l:[['F','The cafe earned Rp 350 million in one week. You can check the numbers.'],['O','The Mayor must be hiding something. This is only what someone thinks.'],['C','Mr. Valir says his profits are legal. Someone says it, but it is not proven.']]},
{bg:'city_map',c:[],n:'How to investigate',r:'',d:'Find the QR codes on the map poster. Scan a station to read its news item. Pass the quiz, answer the question and earn a code to open the next station. Scan a witness to ask questions.'},
{bg:'bg_stage2_office',c:[],n:'Your Case Log Book',r:'',d:'Everything you learn goes into your Case Log Book on this phone. It grows with every station and every witness. Read it again before each quiz.'},
{bg:'bg_stage1_bank',c:[['player','l'],['ray','r']],n:'Your mission',r:'',d:'The city needs you. Find out who really took the Rp 50 billion.',q:['Chief Inspector Ray: \u201CThe case is yours{det}.\u201D']}];
const INTRO=SCENES.map(s=>({...s,h:s.n||'Amats City',img:[s.bg].concat(s.c.map(x=>'char_'+x[0])),t:s.d+(s.q?' '+s.q.join(' '):'')}));
/* one scene as HTML (phones and teacher screen). name = student name or empty; i, total = slide counter */
function vnHTML(s,name,i,total){
 const e=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const det=name?', Detective '+e(name):'',f=x=>x.replace(/\{det\}/g,det);
 const spr=s.c.map(x=>`<img class="vn-spr ${x[1]}" src="assets/char_${x[0]}.png" alt="" onerror="this.style.display='none'">`).join('');
 const ls=(s.l||[]).map(x=>`<p class="vn-l"><span class="tg tg-${x[0]}">${TAG[x[0]]}</span> ${f(x[1])}</p>`).join('');
 return `<div class="vn${s.l?'':' ov'}"><div class="vn-scene" style="background-image:url(assets/${s.bg}.png)">${spr}${total?`<span class="vn-step">${i} / ${total}</span>`:''}</div><div class="vn-box">${s.n?`<div class="vn-who"><b>${f(s.n)}</b>${s.r?` <em>${s.r}</em>`:''}</div>`:''}<p class="vn-d">${f(s.d)}</p>${(s.q||[]).map(q=>`<p class="vn-q">${f(q)}</p>`).join('')}${ls}</div></div>`;
}
/* characters: names, who appears in each report, and the case board (status after finishing a stage) */
const CAST={johnson:'Mayor Johnson',angela:'Angela',alpha:'Mr. Alpha',valir:'Mr. Valir',popol:'Popol',kupa:'Kupa',ray:'Chief Inspector Ray'};
const PEOPLE={1:['johnson','alpha','popol','kupa'],2:['angela','johnson'],3:['valir'],4:['alpha','johnson'],5:['ray','popol','kupa']};
const BOARD={
1:{johnson:'Accused, but says he is innocent',alpha:'Accuses the Mayor',popol:'Defends the Mayor loudly',kupa:'Defends the Mayor loudly'},
2:{angela:'Cleared: her trip was paid from her late mother\u2019s inheritance'},
3:{valir:'Laundered money from his own secret restaurant and casino, but nothing links it to the Rp 50 billion'},
4:{alpha:'Has a personal grudge against the Mayor',johnson:'Technical managers sign the payments, not the Mayor'},
5:{popol:'MASTERMIND: shell company and dummy invoices',kupa:'MASTERMIND: shell company and dummy invoices',ray:'Announced the real culprits'}};

/* ---- Case Log Book: notes unlock when the stage is read (s1..s5) or the witness answer is heard (npc/node) ----
 k: F fact, O opinion, C claim. hide:true = card stays hidden until the first note unlocks. */
const SRC={s1:'Stage 1 \u00b7 Amats Daily Investigator',s2:'Stage 2 \u00b7 Amats Tribune',s3:'Stage 3 \u00b7 The Metro Chronicle',s4:'Stage 4 \u00b7 Amats Express',s5:'Stage 5 \u00b7 Investigative Gazette',warung:'Witness \u00b7 Mang Udin',cafe:'Witness \u00b7 Dewi',store:'Witness \u00b7 Pak Jaya',transport:'Witness \u00b7 Pak Joko'};
const CASE5=[
{s:'s5',k:'F',t:'Police dismantled a shell company network called Kupa Jaya Supplies. Rp 50 billion was moved through dummy invoices into hidden offshore accounts.'},
{s:'s5',k:'F',t:'Fake receipts and forged invoices were hidden in an abandoned archive warehouse near the industrial zone.'},
{s:'s5',k:'F',t:'Forensic experts say the forgeries were impossible without approval from senior supervisors with ultimate system control.'},
{s:'s5',k:'C',t:'Chief Inspector Ray names Popol and Kupa as the masterminds and says they will be arrested tonight.'}];
const LOGBOOK={
johnson:{role:'Mayor of Amats',notes:[
{s:'s1',k:'F',t:'The Rp 50 billion vanished from the treasury of his city.'},
{s:'s1',k:'C',t:'He says he is completely innocent.'},
{s:'s1',k:'O',t:'Mr. Alpha calls him a corrupt leader who is unfit for office. No proof is given.'},
{s:'warung/a',k:'O',t:'Mang Udin hears many theories. Some people say the Mayor took the money. It is only a rumour.'},
{s:'warung/c',k:'O',t:'Mang Udin thinks a mayor who lets the roads fall apart must be hiding something. He has never seen the Mayor near a warehouse.'},
{s:'store/c',k:'O',t:'Pak Jaya says: \u201CLook at who signs the paperwork,\u201D not at the faces on the posters.'},
{s:'s4',k:'F',t:'City archives show that technical supervision and maintenance belong to the field technical division, not the Mayor\u2019s desk.'},
{s:'s4',k:'C',t:'Former contractors say every budget disbursement must be signed by the technical project manager.'},
{s:'s5',k:'C',t:'Chief Inspector Ray says the real masterminds worked behind the Mayor\u2019s back.'}]},
angela:{role:'Personal secretary to the Mayor',notes:[
{s:'s2',k:'F',t:'Photos of her luxury holiday on a private jet in Europe spread widely online.'},
{s:'s2',k:'O',t:'Many residents guessed she paid with stolen city money. This is only speculation.'},
{s:'warung/a',k:'O',t:'Mang Udin says some people blame the secretary. Again, only a rumour.'},
{s:'s2',k:'F',t:'The audit team checked her bank accounts and asset declarations.'},
{s:'s2',k:'F',t:'Secretary-level staff have no authority or technical access to disburse city funds.'},
{s:'s2',k:'C',t:'She says her money comes from her late mother\u2019s textile business and that she never touched government money.'}]},
alpha:{role:'Opposition politician',notes:[
{s:'s1',k:'O',t:'He says Mayor Johnson is a corrupt leader who is unfit for office.'},
{s:'s1',k:'O',t:'Popol says Mr. Alpha is only jealous of the administration. That is Popol\u2019s opinion.'},
{s:'s4',k:'O',t:'He accuses the Mayor of neglecting public facilities on purpose, for personal gain.'},
{s:'s4',k:'C',t:'He says Mayor Johnson cheated him in a private business deal years ago. This may be a personal grudge.'}]},
valir:{role:'Owner of Inferno Coffee',notes:[
{s:'s3',k:'F',t:'His new upscale cafe is in the central commercial district.'},
{s:'s3',k:'F',t:'The cafe earned Rp 350 million in one week.'},
{s:'cafe/a',k:'C',t:'Dewi says the app shows the cafe fully booked every day, but half the tables are empty.'},
{s:'cafe/b',k:'C',t:'Dewi says Mr. Valir handles every receipt himself and lets nobody touch the ledger. Some nights, guests use the back door and order nothing. Tax officers visit often.'},
{s:'cafe/c',k:'C',t:'Dewi says he talks about restaurants out of town, his \u201Cinvestors\u201D and his \u201Cprivate club\u201D, never about the city.'},
{s:'s3',k:'C',t:'At first, his lawyer said the profits came from special coffee blends and loyal customers. The audit showed this was not true.'},
{s:'s3',k:'F',t:'Tax auditors announced that the cafe was a front for money laundering.'},
{s:'s3',k:'F',t:'Much of the cash came from an unlicensed restaurant with a hidden gambling room. Mr. Valir owns it.'},
{s:'s3',k:'C',t:'He admitted that all his earnings came from his restaurant and casino, and says he will face the law.'},
{s:'s3',k:'C',t:'He says he took nothing from the city treasury.'},
{s:'s3',k:'F',t:'Auditors found no transaction linking his businesses to the missing Rp 50 billion. Police will handle his gambling and laundering as a separate case.'}]},
popol:{role:'Senior public works official',notes:[
{s:'s1',k:'F',t:'He is a senior public works supervisory official.'},
{s:'s1',k:'F',t:'He defended the Mayor at a heated press conference.'},
{s:'s1',k:'O',t:'He says Mr. Alpha is jealous and wants to ruin the Mayor\u2019s career.'}].concat(CASE5)},
kupa:{role:'Senior public works official',notes:[
{s:'s1',k:'F',t:'He is a senior public works supervisory official.'},
{s:'s1',k:'F',t:'He defended the Mayor at a heated press conference.'},
{s:'s1',k:'C',t:'He says all projects were managed transparently and he can prove a clean record in court.'}].concat(CASE5)},
ray:{role:'Chief Inspector of Police',notes:[
{s:'s5',k:'F',t:'He leads the police investigation, which lasted for months.'},
{s:'s5',k:'C',t:'He says all the physical evidence, forged signatures and digital trails prove the crime beyond doubt.'}]},
men:{name:'Two men in work vests',role:'A lead from the witnesses',img:'ui_file_locked',hide:true,notes:[
{s:'warung/b',k:'C',t:'Mang Udin says he saw two men in work vests carry heavy boxes into the old municipal warehouse late on Tuesday. He did not see their faces.'},
{s:'warung/b',k:'O',t:'Mang Udin thinks they looked nervous, but maybe they were just tired.'},
{s:'transport/a',k:'C',t:'Pak Joko says two men in work vests ride to the industrial zone every week and whisper to each other.'},
{s:'transport/b',k:'C',t:'Pak Joko says the route ends in the industrial zone: old warehouses and a few post boxes.'},
{s:'transport/c',k:'C',t:'Pak Joko says the men carry heavy bags on the way there and light bags on the way back. He does not know what is inside.'},
{s:'s5',k:'F',t:'The hidden fake receipts were found in an abandoned warehouse near the industrial zone, the same area the witnesses talked about.'}]},
supplier:{name:'The Supplier',role:'Unknown company',img:'ui_file_locked',hide:true,notes:[
{s:'store/b',k:'C',t:'The papers say a supplier delivers building materials for the roads. Pak Jaya lives on Market Lane and has not seen one truck.'},
{s:'store/c',k:'C',t:'Pak Jaya says the projects keep \u201Cbuying materials\u201D, but the potholes are still there.'},
{s:'s5',k:'F',t:'The supplier was Kupa Jaya Supplies, a shell company that only existed on paper.'}]}};
