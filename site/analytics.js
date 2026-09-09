(()=> {
  const MAX_BUFFER=120;
  const KEY='bao_rescue_event_buffer_v1';
  const GA4_ID='G-GVD03YFR9C';
  const CLARITY_ID='yfjx2b9bn4';
  const SUPPORTED_EVENTS=['page_view','symptom_select','diagnosis_start','question_answer','diagnosis_complete','diagnosis_back','diagnosis_restart','seo_diagnosis_cta','diagnosis_hero_cta'];
  const state={symptom:null,runId:null,completed:false};

  // GA4. SEO landing pages only load analytics.js, so initialize gtag here.
  // Root pages that already initialized gtag will skip the loader and reuse it.
  try{
    window.dataLayer=window.dataLayer||[];
    if(typeof window.gtag!=='function'){
      window.gtag=function(){window.dataLayer.push(arguments)};
      const s=document.createElement('script');
      s.async=true;
      s.src='https://www.googletagmanager.com/gtag/js?id='+GA4_ID;
      document.head.appendChild(s);
      window.gtag('js',new Date());
      window.gtag('config',GA4_ID,{send_page_view:false});
    }
  }catch{}

  // Microsoft Clarity. Initialize the queue before the remote script finishes so
  // Bao Rescue events can be attached to the same session immediately.
  try{
    const c=window,l=document,a='clarity',r='script',i=CLARITY_ID;
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    const t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
    const y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  }catch{}

  const qp=new URLSearchParams(location.search);
  const sessionId=(()=>{try{let v=sessionStorage.getItem('bao_session_id');if(!v){v=(crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`);sessionStorage.setItem('bao_session_id',v);}return v;}catch{return 'session-unavailable';}})();
  const context=()=>({page_path:location.pathname,page_title:document.title,referrer:document.referrer||'',session_id:sessionId,run_id:state.runId||'',symptom:state.symptom||'',utm_source:qp.get('utm_source')||'',utm_medium:qp.get('utm_medium')||'',utm_campaign:qp.get('utm_campaign')||'',entry:qp.get('entry')||''});
  const clean=o=>Object.fromEntries(Object.entries(o).filter(([,v])=>v!==''&&v!=null));
  const buffer=payload=>{try{const items=JSON.parse(localStorage.getItem(KEY)||'[]');items.push(payload);localStorage.setItem(KEY,JSON.stringify(items.slice(-MAX_BUFFER)));}catch{}};

  function track(name,props={}){
    const ctx=clean(context());
    const eventProps=clean({...ctx,...props});
    const payload={event:name,event_time:new Date().toISOString(),...eventProps};
    buffer(payload);
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(payload);
    try{if(typeof window.gtag==='function')window.gtag('event',name,eventProps);}catch{}
    try{if(window.umami?.track)window.umami.track(name,eventProps);}catch{}
    try{if(window.posthog?.capture)window.posthog.capture(name,eventProps);}catch{}
    try{
      if(typeof window.clarity==='function'){
        window.clarity('event',name);
        if(eventProps.symptom)window.clarity('set','symptom',String(eventProps.symptom));
        if(eventProps.entry)window.clarity('set','entry',String(eventProps.entry));
        if(eventProps.utm_source)window.clarity('set','utm_source',String(eventProps.utm_source));
        if(eventProps.result_status)window.clarity('set','result_status',String(eventProps.result_status));
      }
    }catch{}
    const endpoint=window.BAO_ANALYTICS_ENDPOINT;
    if(endpoint){
      try{
        const body=JSON.stringify(payload);
        if(navigator.sendBeacon)navigator.sendBeacon(endpoint,new Blob([body],{type:'application/json'}));
        else fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body,keepalive:true}).catch(()=>{});
      }catch{}
    }
    return payload;
  }

  window.BaoAnalytics={
    track,
    supportedEvents:[...SUPPORTED_EVENTS],
    exportBuffer:()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}},
    clearBuffer:()=>localStorage.removeItem(KEY)
  };

  track('page_view');

  document.addEventListener('click',e=>{
    const symptom=e.target.closest?.('.symptom');
    if(symptom){
      state.symptom=symptom.dataset.key||'';
      track('symptom_select',{symptom:state.symptom,label:symptom.querySelector('b')?.textContent||''});
      return;
    }
    if(e.target.closest?.('#specialBtn')){
      state.symptom='special';
      track('symptom_select',{symptom:'special',label:'Special case'});
      return;
    }
    const next=e.target.closest?.('#nextBtn');
    if(next&&!next.disabled){
      state.runId=(crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`);
      state.completed=false;
      track('diagnosis_start');
      return;
    }
    const answer=e.target.closest?.('#question [data-value],#question [data-v]');
    if(answer){
      track('question_answer',{
        question:answer.closest('.panel')?.querySelector('h2')?.textContent||'',
        answer_value:answer.dataset.value||answer.dataset.v||'',
        answer_label:answer.querySelector('b')?.textContent||answer.textContent.trim()
      });
      return;
    }
    if(e.target.closest?.('#backBtn,#backResult')){track('diagnosis_back');return;}
    if(e.target.closest?.('#restart')){track('diagnosis_restart');state.runId=null;state.completed=false;return;}
    const tracked=e.target.closest?.('[data-track]');
    if(tracked)track(tracked.dataset.track,{target:tracked.getAttribute('href')||'',placement:tracked.dataset.placement||''});
    if(e.target.closest?.('.heroCta'))track('diagnosis_hero_cta');
  });

  const result=document.querySelector('#result');
  if(result){
    const inspect=()=>{
      if(state.completed||result.style.display!=='block'||!result.querySelector('.panel'))return;
      const badge=result.querySelector('.badge')?.textContent?.trim()||'';
      const title=result.querySelector('h2')?.textContent?.trim()||'';
      state.completed=true;
      track('diagnosis_complete',{result_status:badge,result_title:title});
    };
    new MutationObserver(inspect).observe(result,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
  }
})();
