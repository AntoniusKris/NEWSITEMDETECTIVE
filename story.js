/* shared by teacher + student pages */
const GAS='https://script.google.com/macros/s/AKfycbzqbwKbRIA7QeEzihWjKzdmQ5h4Y-cV5Ggy1iznh32N5d-RMM4f1XbaxTQH6xyGgr_7yg/exec';
const STAGE_BG={1:'bg_stage1_bank',2:'bg_stage2_office',3:'bg_stage3_inferno',4:'bg_stage4_archive',5:'bg_stage5_warehouse'};
const ITEMS={1:['obj_ledger_book','Bank ledger'],2:['obj_luxury_jet_photo','Jet photo'],3:['obj_money_stack','Cafe cash'],4:['obj_fake_invoices','Invoices'],5:['obj_kupa_jaya_sign','Kupa Jaya sign']};
const INTRO=[
{h:'Breaking News: Amats City',img:['bg_stage1_bank'],t:'Rp 50 billion, saved for roads, the city hospital and a digital park, has vanished from the city treasury. Nobody knows where it went.'},
{h:'The City Is Talking',img:['obj_luxury_jet_photo','obj_money_stack'],t:'Rumours spread fast. The Mayor\'s secretary posts photos from a private jet. A new cafe reports impossible profits. The road projects are stuck. Who can the city trust?'},
{h:'The People Involved',img:['char_johnson','char_angela','char_alpha','char_valir','char_popol','char_kupa'],t:'Mayor Johnson. Angela, his secretary. Mr. Alpha, the opposition leader. Mr. Valir, the cafe owner. And Popol and Kupa, the Mayor\'s loyal defenders. Everyone has a story. Not every story is true.'},
{h:'Your Mission',img:['char_player','char_ray'],t:'You are a detective. Scan the QR codes to open each station, read the news item, and separate facts from opinions. Question the witnesses. Earn the codes. Find who really took the money.'}];
