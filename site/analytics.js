(()=> {
  const MAX_BUFFER=120;
  const KEY='bao_rescue_event_buffer_v1';
  const SEO_ENTRY_KEY='bao_seo_entry_v1';
  const SEO_ENTRY_TTL=30*60*1000;
  const SEO_CTA_RECEIPT_KEY='bao_seo_cta_receipt_v2';
  const SEO_CTA_ARRIVAL_KEY='bao_seo_cta_arrival_v2';
  const GA4_ID='G-GVD03YFR9C';
  const CLARITY_ID='yfjx2b9bn4';
  const SUPPORTED_EVENTS=['page_view','diagnosis_view','symptom_select','diagnosis_start','question_answer','diagnosis_complete','diagnosis_back','diagnosis_restart','seo_diagnosis_cta','seo_diagnosis_view','seo_diagnosis_start','seo_diagnosis_complete','diagnosis_hero_cta'];
  const state={symptom:null,runId:null,completed:false};

  // GA4: use the native config-generated page_view so session_start, source/medium,
  // landing page and page_view are created by the same Google tag session.
  // Custom product events are sent separately below and never override GA4 session_id.
  try{
    window.dataLayer=window.dataLayer||[];
    if(typeof window.gtag!=='function')window.gtag=function(){window.dataLayer.push(arguments)};
    if(!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA4_ID}"]`)){
      const s=document.createElement('script');
      s.async=true;
      s.src='https://www.googletagmanager.com/gtag/js?id='+GA4_ID;
      document.head.appendChild(s);
    }
    if(!window.__baoGa4Configured){
      window.gtag('js',new Date());
      window.gtag('config',GA4_ID,{send_page_view:true});
      window.__baoGa4Configured=true;
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
  const baoSessionId=(()=>{try{let v=sessionStorage.getItem('bao_session_id');if(!v){v=(crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`);sessionStorage.setItem('bao_session_id',v);}return v;}catch{return 'session-unavailable';}})();

  function readSeoEntry(){
    try{
      const raw=sessionStorage.getItem(SEO_ENTRY_KEY);
      if(!raw)return null;
      const value=JSON.parse(raw);
      if(!value?.entry||!value?.time||Date.now()-value.time>SEO_ENTRY_TTL){sessionStorage.removeItem(SEO_ENTRY_KEY);return null;}
      return value;
    }catch{return null;}
  }

  function rememberSeoEntry(entry,landingPath=location.pathname,landingReferrer=document.referrer||''){
    if(!entry)return;
    try{sessionStorage.setItem(SEO_ENTRY_KEY,JSON.stringify({entry,landingPath,landingReferrer,time:Date.now()}));}catch{}
  }

  const queryEntry=qp.get('entry')||'';
  if(queryEntry){
    const existing=readSeoEntry();
    if(!existing||existing.entry!==queryEntry)rememberSeoEntry(queryEntry);
  }

  const currentEntry=()=>{
    const stored=readSeoEntry();
    return queryEntry||stored?.entry||'';
  };

  const context=()=>{
    const stored=readSeoEntry();
    return {
      page_path:location.pathname,
      page_title:document.title,
      referrer:document.referrer||'',
      bao_session_id:baoSessionId,
      run_id:state.runId||'',
      symptom:state.symptom||'',
      utm_source:qp.get('utm_source')||'',
      utm_medium:qp.get('utm_medium')||'',
      utm_campaign:qp.get('utm_campaign')||'',
      entry:queryEntry||stored?.entry||'',
      seo_landing_path:stored?.landingPath||'',
      seo_landing_referrer:stored?.landingReferrer||''
    };
  };

  const clean=o=>Object.fromEntries(Object.entries(o).filter(([,v])=>v!==''&&v!=null));
  const buffer=payload=>{try{const items=JSON.parse(localStorage.getItem(KEY)||'[]');items.push(payload);localStorage.setItem(KEY,JSON.stringify(items.slice(-MAX_BUFFER)));}catch{}};

  // Internal campaign UTMs can reset a real Google Organic session to a fake
  // internal campaign. Preserve only the custom `entry` marker for the funnel.
  function sanitizeInternalAttributionLink(el){
    try{
      if(!el?.matches?.('a[href]'))return null;
      const url=new URL(el.href,location.href);
      if(url.origin!==location.origin)return null;
      const entry=url.searchParams.get('entry')||el.dataset.baoEntry||'';
      ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>url.searchParams.delete(k));
      if(entry)url.searchParams.set('entry',entry);
      el.href=url.pathname+(url.search||'')+(url.hash||'');
      return {entry,href:el.href};
    }catch{return null;}
  }

  // Normalize every SEO -> diagnosis link up front, including legacy nav links that
  // never received data-track. This also protects middle-click / open-in-new-tab.
  function prepareSeoDiagnosisLinks(){
    document.querySelectorAll('a[data-track="seo_diagnosis_cta"],a[href*="entry="]').forEach(el=>{
      try{
        const url=new URL(el.href,location.href);
        const pathSlug=location.pathname.split('/').filter(Boolean)[0]||'';
        const entry=url.searchParams.get('entry')||el.dataset.baoEntry||pathSlug;
        if(entry)el.dataset.baoEntry=entry;
        el.dataset.track='seo_diagnosis_cta';
        sanitizeInternalAttributionLink(el);
      }catch{}
    });
  }
  prepareSeoDiagnosisLinks();

  function track(name,props={},options={}){
    const ctx=clean(context());
    const eventProps=clean({...ctx,...props});
    const payload={event:name,event_time:new Date().toISOString(),...eventProps};
    buffer(payload);

    if(!options.skipGa){
      try{
        if(typeof window.gtag==='function'){
          const gaProps={...eventProps};
          if(typeof options.eventCallback==='function')gaProps.event_callback=options.eventCallback;
          if(options.eventTimeout)gaProps.event_timeout=options.eventTimeout;
          if(options.transportType)gaProps.transport_type=options.transportType;
          window.gtag('event',name,gaProps);
        }
      }catch{}
    }

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

  function rememberSeoCtaClick(entry,placement,target){
    try{sessionStorage.setItem(SEO_CTA_RECEIPT_KEY,JSON.stringify({entry,placement,target,sourcePath:location.pathname,time:Date.now()}));}catch{}
  }

  function readSeoCtaClick(){
    try{
      const raw=sessionStorage.getItem(SEO_CTA_RECEIPT_KEY);
      if(!raw)return null;
      const value=JSON.parse(raw);
      if(!value?.entry||!value?.time||Date.now()-value.time>SEO_ENTRY_TTL){sessionStorage.removeItem(SEO_CTA_RECEIPT_KEY);return null;}
      return value;
    }catch{return null;}
  }

  function trackSeoNavigation(e,el){
    const normalized=sanitizeInternalAttributionLink(el);
    const entry=el.dataset.baoEntry||normalized?.entry||location.pathname.split('/').filter(Boolean)[0]||'';
    if(entry)rememberSeoEntry(entry,location.pathname,document.referrer||'');

    const props={
      target:el.getAttribute('href')||'',
      placement:el.dataset.placement||'nav',
      entry,
      seo_landing_path:location.pathname
    };

    // Do not hold navigation open while gtag.js is still loading. A fast SEO visitor can
    // otherwise leave before the queued click is transmitted. Keep the source click in
    // our local buffer, persist a receipt, and confirm the GA4 event on the destination.
    rememberSeoCtaClick(entry,props.placement,props.target);
    track('seo_diagnosis_cta',{...props,delivery:'source-buffer'},{skipGa:true});
  }

  function trackSeoArrival(){
    if(!queryEntry)return;
    const key=`${queryEntry}|${location.pathname}|${location.hash||''}`;
    try{if(sessionStorage.getItem(SEO_CTA_ARRIVAL_KEY)===key)return;}catch{}
    const stored=readSeoEntry();
    const receipt=readSeoCtaClick();
    track('seo_diagnosis_cta',{
      target:location.pathname+location.search+location.hash,
      placement:receipt?.placement||'destination',
      entry:queryEntry,
      seo_landing_path:stored?.landingPath||receipt?.sourcePath||'',
      delivery:'destination-confirmed'
    });
    try{sessionStorage.setItem(SEO_CTA_ARRIVAL_KEY,key);}catch{}
  }

  window.BaoAnalytics={
    track,
    supportedEvents:[...SUPPORTED_EVENTS],
    exportBuffer:()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}},
    clearBuffer:()=>localStorage.removeItem(KEY)
  };

  // GA4 already receives the native page_view from gtag('config'). Keep this local
  // page_view for our debug buffer / optional analytics providers without duplicating GA4.
  track('page_view',{}, {skipGa:true});
  trackSeoArrival();

  const diagnosisTarget=document.querySelector('#diagnose');
  if(diagnosisTarget&&'IntersectionObserver' in window){
    let diagnosisSeen=false;
    const observer=new IntersectionObserver(entries=>{
      if(diagnosisSeen||!entries.some(x=>x.isIntersecting))return;
      diagnosisSeen=true;
      observer.disconnect();
      track('diagnosis_view',{placement:'diagnosis-stepper'});
      const entry=currentEntry();
      if(entry)track('seo_diagnosis_view',{entry,seo_landing_path:readSeoEntry()?.landingPath||''});
    },{threshold:.2});
    observer.observe(diagnosisTarget);
  }

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
      const entry=currentEntry();
      if(entry)track('seo_diagnosis_start',{entry});
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

    const seoTracked=e.target.closest?.('a[data-track="seo_diagnosis_cta"],a[data-bao-entry]');
    if(seoTracked){trackSeoNavigation(e,seoTracked);return;}

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
      const entry=currentEntry();
      if(entry)track('seo_diagnosis_complete',{entry,result_status:badge,result_title:title});
    };
    new MutationObserver(inspect).observe(result,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
  }
})();
