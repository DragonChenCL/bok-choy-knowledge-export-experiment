const fs = require('fs');
const vm = require('vm');

const DATA = fs.readFileSync('site/diagnose/data.js', 'utf8');
const APP = fs.readFileSync('site/diagnose/app.js', 'utf8');
const CSS = fs.readFileSync('site/diagnose/styles.css', 'utf8');
const HTML = fs.readFileSync('site/diagnose/index.html', 'utf8');

class ClassList {
  constructor(){ this.s = new Set(); }
  add(...v){ v.forEach(x=>this.s.add(x)); }
  remove(...v){ v.forEach(x=>this.s.delete(x)); }
  toggle(v,on){ if(on===undefined) on=!this.s.has(v); on?this.s.add(v):this.s.delete(v); return on; }
  contains(v){ return this.s.has(v); }
}

const idMap = new Map();

function stripTags(s){ return s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(); }
function attr(attrs,name){ const m=attrs.match(new RegExp(`${name}="([^"]*)"`)); return m?m[1]:null; }

class FakeElement {
  constructor(id=''){
    this.id=id; this.dataset={}; this.classList=new ClassList(); this.style={};
    this.disabled=false; this.onclick=null; this._innerHTML=''; this._buttons=[]; this.label=''; this.textContent='';
    if(id) idMap.set(id,this);
  }
  set innerHTML(html){
    this._innerHTML=html; this._buttons=[];
    const re=/<button([^>]*)>([\s\S]*?)<\/button>/g;
    let m;
    while((m=re.exec(html))){
      const attrs=m[1], body=m[2];
      const el=new FakeElement();
      const id=attr(attrs,'id'); if(id){el.id=id; idMap.set(id,el);}
      const dv=attr(attrs,'data-value'); if(dv!==null) el.dataset.value=dv;
      const dv2=attr(attrs,'data-v'); if(dv2!==null) el.dataset.v=dv2;
      const b=body.match(/<b[^>]*>([\s\S]*?)<\/b>/i);
      el.label=b?stripTags(b[1]):stripTags(body);
      el.textContent=stripTags(body);
      this._buttons.push(el);
    }
  }
  get innerHTML(){ return this._innerHTML; }
  querySelectorAll(sel){
    if(sel==='[data-value]') return this._buttons.filter(x=>x.dataset.value!==undefined);
    if(sel==='[data-v]') return this._buttons.filter(x=>x.dataset.v!==undefined);
    return [];
  }
  querySelector(sel){
    if(sel==='b') return {textContent:this.label};
    if(sel.startsWith('#')) return idMap.get(sel.slice(1))||null;
    return null;
  }
}

const chooser=new FakeElement('chooser');
const question=new FakeElement('question');
const result=new FakeElement('result');
const nextBtn=new FakeElement('nextBtn'); nextBtn.disabled=true;
const specialBtn=new FakeElement('specialBtn');
const steps=[1,2,3,4].map(i=>new FakeElement(`step${i}`));
const symptomKeys=['normal','norise','collapse','wrinkle','dense','wet'];
const symptoms=symptomKeys.map(key=>{ const e=new FakeElement(); e.dataset.key=key; return e; });

const document={
  querySelector(sel){
    if(sel==='#chooser') return chooser;
    if(sel==='#question') return question;
    if(sel==='#result') return result;
    if(sel==='#nextBtn') return nextBtn;
    if(sel==='#specialBtn') return specialBtn;
    if(sel.startsWith('#')) return idMap.get(sel.slice(1))||null;
    return null;
  },
  querySelectorAll(sel){
    if(sel==='.symptom') return symptoms;
    if(sel==='.step') return steps;
    return [];
  }
};

const context={window:{},document,console};
vm.createContext(context);
vm.runInContext(DATA,context,{filename:'data.js'});
vm.runInContext(APP,context,{filename:'app.js'});

function fail(msg){ throw new Error(msg); }
function chooseSymptom(key){
  const btn=symptoms.find(x=>x.dataset.key===key); if(!btn) fail(`symptom missing: ${key}`);
  btn.onclick(); if(nextBtn.disabled) fail(`Next stayed disabled after ${key}`); nextBtn.onclick();
}
function chooseSpecial(){ specialBtn.onclick(); if(nextBtn.disabled) fail('Next stayed disabled after special'); nextBtn.onclick(); }
function pick(value){
  const btn=question.querySelectorAll('[data-value]').find(x=>x.dataset.value===value);
  if(!btn) fail(`data-value option missing: ${value}\nQuestion DOM: ${question.innerHTML.slice(0,500)}`);
  btn.onclick();
}
function pickV(value){
  const btn=question.querySelectorAll('[data-v]').find(x=>x.dataset.v===value);
  if(!btn) fail(`data-v option missing: ${value}`); btn.onclick();
}
function resultMeta(){
  const html=result.innerHTML;
  const status=(html.match(/<span class="badge[^>]*>([^<]+)<\/span>/)||[])[1]||'';
  const title=(html.match(/<h2>([^<]+)<\/h2>/)||[])[1]||'';
  if(!status||!title) fail(`Result not rendered correctly: ${html.slice(0,500)}`);
  return {status,title};
}
function restart(){ const b=idMap.get('restart'); if(!b||typeof b.onclick!=='function') fail('restart button unavailable'); b.onclick(); }
function runCase(name,start,values,expectedStatus,titleIncludes,specialV=false){
  start==='special'?chooseSpecial():chooseSymptom(start);
  for(const v of values){ specialV && v===values.at(-1) ? pickV(v) : pick(v); }
  const r=resultMeta();
  if(r.status!==expectedStatus) fail(`${name}: status ${r.status} != ${expectedStatus}`);
  if(titleIncludes && !r.title.includes(titleIncludes)) fail(`${name}: title "${r.title}" missing "${titleIncludes}"`);
  restart();
  console.log(`PASS ${name}: ${r.status} — ${r.title}`);
}

const cases=[
  ['normal','normal',[],'REFERENCE','broadly normal'],
  ['norise-cool','norise',['under','cool','none'],'CORE LOGIC','proofing endpoint'],
  ['norise-yeast','norise',['under','normal','yeast'],'CORE LOGIC','Yeast activity'],
  ['norise-stiff','norise',['under','normal','stiff'],'CORE LOGIC','too stiff'],
  ['norise-over-conflict','norise',['over','normal','none'],'NEEDS MORE INFO','not a simple'],
  ['collapse-over','collapse',['after','over','dry'],'CORE LOGIC','Over-proofing'],
  ['collapse-wet','collapse',['after','ready','wet'],'CORE LOGIC','Condensation'],
  ['collapse-transition','collapse',['after','ready','dry'],'CONFLICTED EVIDENCE','Post-steam transition'],
  ['wrinkle-volume-loss','wrinkle',['yes','dry'],'CORE LOGIC','Over-proofing'],
  ['wrinkle-wet','wrinkle',['no','wet'],'CORE LOGIC','Condensation'],
  ['wrinkle-unknown','wrinkle',['no','smooth'],'NEEDS MORE INFO','Wrinkling alone'],
  ['dense-under','dense',['under','densecrumb','no'],'CORE LOGIC','rise before blaming flour'],
  ['dense-gummy','dense',['ready','gummy','no'],'BETA','gummy'],
  ['dense-fluffy','dense',['ready','fluffy','no'],'NEEDS MORE INFO','does not look truly dense'],
  ['dense-stiff','dense',['ready','densecrumb','yes'],'CORE LOGIC','Flour / hydration'],
  ['dense-mixed','dense',['ready','densecrumb','no'],'NEEDS MORE INFO','two live branches'],
  ['wet-drip','wet',['drip'],'CORE LOGIC','Condensation'],
  ['wet-unknown','wet',['none'],'NEEDS MORE INFO','source is not isolated'],
  ['special-reheat','special',['reheat'],'OUT OF SCOPE','separate module'],
  ['special-other','special',['other'],'BETA','not validated']
];
for(const c of cases) runCase(...c);

chooseSpecial(); pick('crack'); pickV('intentional');
let r=resultMeta(); if(r.status!=='STYLE GATE') fail(`crack intentional: ${r.status}`); console.log(`PASS crack-intentional: ${r.status}`); restart();
chooseSpecial(); pick('crack'); pickV('fault');
r=resultMeta(); if(r.status!=='BETA') fail(`crack fault: ${r.status}`); console.log(`PASS crack-fault: ${r.status}`); restart();

// Static P0 contracts.
if(/high altitude|very dry dough/i.test(HTML)) fail('Homepage promises an unsupported special-case branch');
if(!HTML.includes('Cracked/opened, frozen/reheated, or another unlisted case.')) fail('Special-case copy not aligned');
if(!HTML.includes('product-stage:MVP_FREEZE')) fail('MVP freeze marker missing');
const imgs=new Set();
for(const flow of Object.values(context.window.BAO_FLOWS)) for(const q of flow) for(const o of (q.options||[])) if(o.img) imgs.add(o.img);
for(const img of imgs){ if(!CSS.includes(`.p-${img}`)) fail(`Missing CSS sprite mapping for ${img}`); }
const sprite='06-assets/bao-rescue/v4/bao-sprite.webp';
if(!fs.existsSync(sprite)) fail('Reviewed sprite missing');
if(fs.statSync(sprite).size<=100000) fail('Reviewed sprite unexpectedly small / blurry regression');

console.log(`PASS ${cases.length+2} decision-path scenarios`);
console.log(`PASS visual mappings: ${[...imgs].sort().join(', ')}`);
console.log(`PASS reviewed sprite size: ${fs.statSync(sprite).size} bytes`);
