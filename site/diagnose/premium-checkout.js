(()=>{
  const API_BASE='https://payment-gateway.chenlongqrr.workers.dev';
  const STORAGE_PREFIX='bao_purchase_v1:';
  const SELLABLE=new Set(['CORE LOGIC','CONFLICTED EVIDENCE','NEEDS MORE INFO']);
  const result=document.querySelector('#result');
  if(!result)return;

  if(!document.querySelector('#bao-premium-style')){
    const style=document.createElement('style');
    style.id='bao-premium-style';
    style.textContent=`
      .premiumLock{margin-top:20px;border:1px solid #d8d1c5;border-radius:16px;padding:20px;background:linear-gradient(180deg,#fffdf8,#faf7f0)}
      .premiumLock .premiumEyebrow{font:700 11px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#7b6d53;margin-bottom:8px}
      .premiumLock h3{margin:0 0 8px;font-size:21px;color:#2f3e2b}.premiumLock p{margin:0;color:#666b62;line-height:1.6}
      .premiumLock ul{margin:14px 0 0;padding-left:20px;color:#454a42;font-size:14px;line-height:1.65}
      .premiumPrice{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-top:18px;padding-top:16px;border-top:1px solid #e2ddd4;flex-wrap:wrap}
      .premiumPrice strong{font-size:24px;color:#252922}.premiumPrice small{display:block;color:#777;margin-top:2px}
      .premiumBuy{border:0;border-radius:11px;background:#566848;color:#fff;padding:13px 18px;font:700 14px Arial,sans-serif;cursor:pointer;min-width:210px}
      .premiumBuy:disabled{opacity:.65;cursor:wait}.premiumError{margin-top:10px;color:#a14c43;font-size:13px;line-height:1.5}
      .premiumFreeNote{margin-top:10px;font-size:12px;color:#777}
    `;
    document.head.appendChild(style);
  }

  function track(name,props={}){try{window.BaoAnalytics?.track?.(name,props);}catch{}}
  function makeDiagnosisId(){return `diag_${(crypto.randomUUID?.()||`${Date.now()}_${Math.random().toString(16).slice(2)}`).replaceAll('-','')}`;}
  function text(el,sel){return (el.querySelector(sel)?.textContent||'').trim();}

  function extractSnapshot(panel,testText){
    const ranks=[...panel.querySelectorAll('.rank')].map(el=>({
      title:text(el,'h3'),
      evidence:text(el,'p'),
      confidence:text(el,'.confidence')
    }));
    const answers=[...panel.querySelectorAll('.facts li')].map(el=>(el.textContent||'').trim()).filter(Boolean);
    const symptom=document.querySelector('.symptom.selected')?.dataset.key||'special_or_unknown';
    return {
      version:1,
      diagnosisId:makeDiagnosisId(),
      symptom,
      title:text(panel,'h2'),
      status:text(panel,'.badge'),
      answers,
      ranks,
      test:testText,
      warning:text(panel,'.warning'),
      createdAt:new Date().toISOString()
    };
  }

  async function startCheckout(snapshot,button,errorBox){
    button.disabled=true;
    const original=button.textContent;
    button.textContent='Opening secure checkout…';
    errorBox.textContent='';
    track('premium_checkout_start',{diagnosis_id:snapshot.diagnosisId,result_status:snapshot.status,result_title:snapshot.title});
    try{
      const res=await fetch(`${API_BASE}/checkout`,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({app:'bao-rescue',sku:'next-batch-fix',referenceId:snapshot.diagnosisId})
      });
      const body=await res.json().catch(()=>({}));
      if(!res.ok||!body.gatewayOrderId||!body.checkoutUrl||!body.accessToken){
        throw new Error(body.error||'checkout_unavailable');
      }
      const record={
        version:1,
        gatewayOrderId:body.gatewayOrderId,
        checkoutSessionId:body.checkoutSessionId||'',
        accessToken:body.accessToken,
        diagnosis:snapshot,
        createdAt:new Date().toISOString()
      };
      localStorage.setItem(`${STORAGE_PREFIX}${body.gatewayOrderId}`,JSON.stringify(record));
      localStorage.setItem('bao_last_purchase_v1',body.gatewayOrderId);
      track('premium_checkout_created',{gateway_order_id:body.gatewayOrderId,diagnosis_id:snapshot.diagnosisId});
      location.assign(body.checkoutUrl);
    }catch(err){
      console.error('Bao premium checkout failed',err);
      errorBox.textContent='We could not open checkout. Please try again, or contact support@serunio.com if the problem continues.';
      button.disabled=false;
      button.textContent=original;
      track('premium_checkout_error',{diagnosis_id:snapshot.diagnosisId,error:String(err?.message||err||'unknown')});
    }
  }

  function decorate(){
    const panel=result.querySelector('.panel');
    if(!panel||panel.dataset.premiumReady==='1')return;
    const status=text(panel,'.badge');
    if(!SELLABLE.has(status))return;
    const test=panel.querySelector('.test');
    const testText=(test?.querySelector('p')?.textContent||'').trim();
    if(!test||!testText)return;
    panel.dataset.premiumReady='1';
    const snapshot=extractSnapshot(panel,testText);
    test.innerHTML=`
      <div class="premiumLock">
        <div class="premiumEyebrow">Your exact next-batch experiment</div>
        <h3>Turn this diagnosis into one controlled cooking plan</h3>
        <p>Your free result shows the strongest cause family. The paid Next-Batch Fix gives you the exact one-variable test, what to keep unchanged, success criteria, and the next branch to test if it still fails.</p>
        <ul>
          <li>Most likely root cause + evidence</li>
          <li>Exactly one variable to change next</li>
          <li>What must stay unchanged for a clean comparison</li>
          <li>Clear success criteria for the next batch</li>
          <li>What to test next if the symptom remains</li>
        </ul>
        <div class="premiumPrice">
          <div><strong>$4.99 USD</strong><small>One-time purchase · no subscription</small></div>
          <button class="premiumBuy" type="button">Unlock My Next-Batch Fix →</button>
        </div>
        <div class="premiumError" aria-live="polite"></div>
        <div class="premiumFreeNote">Payment is processed by Waffo Pancake. The basic diagnosis above remains free.</div>
      </div>`;
    const btn=test.querySelector('.premiumBuy');
    const errorBox=test.querySelector('.premiumError');
    btn.addEventListener('click',()=>startCheckout(snapshot,btn,errorBox));
    track('premium_offer_view',{diagnosis_id:snapshot.diagnosisId,result_status:snapshot.status,result_title:snapshot.title});
  }

  new MutationObserver(decorate).observe(result,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
  decorate();
})();
