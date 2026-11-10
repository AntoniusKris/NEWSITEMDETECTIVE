// AMATS Detective Game - Google Apps Script (logger + live state)
// Deploy > New deployment (or Manage deployments > edit > New version). Execute as: Me, Access: Anyone.
const TEACHER_PIN='amats2026'; // CHANGE THIS
const LOG_HEADERS=['Server Time','Client Time','Student Name','Session ID','Stage','Event','Detail'];
const PROG_HEADERS=['Student Name','Last Activity','Stage 1 Done','Stage 2 Done','Stage 3 Done','Stage 4 Done','Stage 5 Done','Final Code','Quiz Fails','Wrong Codes','Avatar'];
const AVATAR_COL=11;

function sheet_(name,headers){
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  let sh=ss.getSheetByName(name);
  if(!sh){sh=ss.insertSheet(name);sh.appendRow(headers);sh.setFrozenRows(1);sh.getRange(1,1,1,headers.length).setFontWeight('bold');}
  return sh;
}
function doPost(e){
  const lock=LockService.getScriptLock();
  lock.waitLock(20000);
  try{
    const p=JSON.parse(e.postData.contents);
    if(p.action==='set'){ // teacher controls the intro
      if(p.pin!==TEACHER_PIN)return ContentService.createTextOutput('bad pin');
      PropertiesService.getScriptProperties().setProperties({phase:String(p.phase),step:String(p.step)});
      return ContentService.createTextOutput('ok');
    }
    const now=new Date();
    sheet_('Log',LOG_HEADERS).appendRow([now,p.ts,p.name,p.sid,p.stage,p.event,p.detail]);
    if(p.name)updateProgress_(p,now);
    return ContentService.createTextOutput('ok');
  }catch(err){
    return ContentService.createTextOutput('error: '+err);
  }finally{lock.releaseLock();}
}
function updateProgress_(p,now){
  const sh=sheet_('Progress',PROG_HEADERS);
  const names=sh.getRange(2,1,Math.max(sh.getLastRow()-1,1),1).getValues().flat();
  let row=names.indexOf(p.name);
  if(row<0){sh.appendRow([p.name,now,'','','','','','',0,0,'']);row=sh.getLastRow();}else{row+=2;}
  sh.getRange(row,2).setValue(now);
  if(p.event==='stage_complete'){
    const n=Number(p.stage);
    sh.getRange(row,2+n).setValue(now);
  }
  if(p.event==='case_solved')sh.getRange(row,8).setValue(p.detail); // final code is only issued after a correct accusation
  if(p.event==='case_failed')sh.getRange(row,8).setValue('FAILED');
  if(p.event==='quiz_result'&&String(p.detail).indexOf('fail')===0){const c=sh.getRange(row,9);c.setValue(Number(c.getValue())+1);}
  if(p.event==='code_entry'&&String(p.detail).indexOf('invalid')===0){const c=sh.getRange(row,10);c.setValue(Number(c.getValue())+1);}
  if(p.event==='avatar_set'){ // e.g. "female: hf2 tf3 bf1"; the latest choice wins
    const h=sh.getRange(1,AVATAR_COL);
    if(h.getValue()!=='Avatar')h.setValue('Avatar').setFontWeight('bold'); // adds the header to an older Progress sheet
    sh.getRange(row,AVATAR_COL).setValue(p.detail);
  }
}
function doGet(e){
  const a=(e&&e.parameter)||{};
  if(a.action!=='state')return ContentService.createTextOutput('AMATS logger is running.');
  const pr=PropertiesService.getScriptProperties();
  const o={phase:pr.getProperty('phase')||'idle',step:Number(pr.getProperty('step')||0)};
  if(a.p==='1'){const sh=sheet_('Progress',PROG_HEADERS),n=sh.getLastRow()-1;o.players=n>0?sh.getRange(2,1,n,1).getValues().flat().filter(String):[];}
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
