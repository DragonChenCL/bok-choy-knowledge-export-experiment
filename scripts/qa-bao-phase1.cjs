const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const must=(ok,msg)=>{if(!ok){console.error('FAIL',msg);process.exitCode=1}else console.log('PASS',msg)};

const analytics=read('site/analytics.js');
['page_view','symptom_select','diagnosis_start','question_answer','diagnosis_complete','diagnosis_back','diagnosis_restart','seo_diagnosis_cta','seo_diagnosis_start','seo_diagnosis_complete'].forEach(e=>must(analytics.includes(`'${e}'`)||analytics.includes(`"${e}"`),`analytics event ${e}`));
must(analytics.includes('utm_source')&&analytics.includes('utm_campaign'),'analytics captures UTM attribution');
must(analytics.includes('BAO_ANALYTICS_ENDPOINT'),'analytics supports external beacon endpoint');
must(analytics.includes('G-GVD03YFR9C')&&analytics.includes('googletagmanager.com/gtag/js'),'analytics initializes GA4 for every landing page');
must(analytics.includes("window.gtag('config',GA4_ID,{send_page_view:true})"),'GA4 uses native config-generated page view for session attribution');
must(analytics.includes("track('page_view',{}, {skipGa:true})"),'custom page view does not duplicate GA4 native page view');
must(analytics.includes('yfjx2b9bn4')&&analytics.includes('clarity.ms/tag'),'analytics initializes Microsoft Clarity');
must(analytics.includes('bao_session_id:baoSessionId'),'custom session marker does not use GA4 reserved session_id');
must(!analytics.includes('session_id:sessionId'),'GA4 reserved session_id is not overridden');
must(!analytics.includes('window.dataLayer.push(payload)'),'custom events are not duplicated through raw dataLayer event pushes');
must(analytics.includes("SEO_ENTRY_KEY='bao_seo_entry_v1'")&&analytics.includes('rememberSeoEntry'),'SEO entry attribution persists through diagnosis navigation');
must(analytics.includes('prepareSeoDiagnosisLinks'),'legacy SEO diagnosis links are normalized before click');
must(analytics.includes('sanitizeInternalAttributionLink'),'same-origin CTA attribution sanitizer exists');
must(analytics.includes("['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach"),'internal CTA strips campaign UTMs before navigation');
must(analytics.includes("SEO_CTA_RECEIPT_KEY='bao_seo_cta_receipt_v2'")&&analytics.includes("delivery:'destination-confirmed'"),'SEO CTA is confirmed on diagnosis arrival instead of relying on unload delivery');
must(analytics.includes("track('diagnosis_view'")&&analytics.includes("track('seo_diagnosis_view'"),'diagnosis visibility is measurable before symptom selection');
must(analytics.includes("track('seo_diagnosis_start'")&&analytics.includes("track('seo_diagnosis_complete'"),'SEO diagnosis funnel has explicit start and complete events');

const css=read('site/seo.css');
must(css.includes('.nav a{display:inline-flex')&&css.includes('background:var(--olive)'),'SEO top-nav diagnosis CTA is visually prominent');
must(css.includes('.section .cta{width:100%'),'SEO section CTA expands to a mobile tap target');

const home=read('site/index.html');
must(home.includes('./analytics.js'),'root diagnosis loads analytics layer');
must(home.includes('meta name="robots" content="index,follow'),'root diagnosis is indexable');
must(home.includes('rel="canonical" href="https://bao.serunio.com/"'),'root canonical uses production domain');
must(home.includes('property="og:title"')&&home.includes('property="og:image"'),'root has Open Graph metadata');

const pages=[
  ['site/bao-buns-collapse-after-steaming/index.html','Why did my bao collapse after steaming?','bao-buns-collapse-after-steaming',false,true],
  ['site/why-do-steamed-buns-wrinkle/index.html','Why are my steamed buns wrinkled?','why-do-steamed-buns-wrinkle',false,true],
  ['site/why-are-bao-buns-not-fluffy/index.html','Why are my bao buns dense and not fluffy?','why-are-bao-buns-not-fluffy',false,true],
  ['site/bao-buns-gummy-inside/index.html','Why are my bao buns gummy inside?','bao-buns-gummy-inside',true,false],
  ['site/bao-buns-not-smooth/index.html','Why aren&#x27;t my bao buns smooth?','bao-buns-not-smooth',true,false],
  ['site/bao-buns-not-rising/index.html','Why aren&#x27;t my bao buns rising?','bao-buns-not-rising',true,false],
  ['site/bao-buns-wet-after-steaming/index.html','Why are my bao buns wet after steaming?','bao-buns-wet-after-steaming',true,true],
  ['site/bao-buns-spread-sideways/index.html','Why do my bao buns spread sideways?','bao-buns-spread-sideways',true,true],
  ['site/bao-buns-crack-while-steaming/index.html','Why do my bao buns crack while steaming?','bao-buns-crack-while-steaming',true,false],
  ['site/bao-buns-hard-after-steaming/index.html','Why are my bao buns hard after steaming?','bao-buns-hard-after-steaming',true,false],
  ['site/bao-dough-too-sticky/index.html','Why is my bao dough too sticky?','bao-dough-too-sticky',true,true],
  ['site/bao-buns-stick-to-paper/index.html','Why do my bao buns stick to parchment paper?','bao-buns-stick-to-paper',true,true],
  ['site/bao-filling-leaking/index.html','Why is my bao filling leaking out?','bao-filling-leaking',true,true],
  ['site/bao-dough-tears-when-pleating/index.html','Why does my bao dough tear when pleating?','bao-dough-tears-when-pleating',true,true],
  ['site/bao-buns-yellow-after-steaming/index.html','Why do my bao buns turn yellow after steaming?','bao-buns-yellow-after-steaming',true,true],
  ['site/bao-buns-chewy-rubbery/index.html','Why are my bao buns chewy or rubbery?','bao-buns-chewy-rubbery',true,true],
  ['site/flour-for-bao-buns/index.html','What flour should you use for bao buns?','flour-for-bao-buns',true,false],
  ['site/bao-dough-recipe/index.html','A bao dough recipe you can actually troubleshoot','bao-dough-recipe',true,false],
  ['site/how-to-make-bao-buns/index.html','How to make bao buns without guessing at every step','how-to-make-bao-buns',true,false],
  ['site/how-to-steam-buns/index.html','How to steam buns so the last step does not ruin the batch','how-to-steam-buns',true,false],
  ['site/how-to-steam-buns-without-a-steamer/index.html','How to steam buns without a bamboo steamer','how-to-steam-buns-without-a-steamer',true,false],
  ['site/how-to-steam-bao-buns/index.html','How to steam bao buns — and how long to steam them','how-to-steam-bao-buns',true,false]
];

const geoPages=new Set([
  'flour-for-bao-buns','bao-dough-recipe','how-to-make-bao-buns',
  'how-to-steam-buns','how-to-steam-buns-without-a-steamer','how-to-steam-bao-buns'
]);

for(const [p,h1,slug,isNew,noInternalUtm] of pages){
  const html=read(p);
  must(html.includes(`<h1>${h1}</h1>`),`${slug} H1`);
  must(html.includes('meta name="robots" content="index,follow'),`${slug} indexable`);
  must(html.includes('rel="canonical"'),`${slug} canonical`);
  if(isNew)must(html.includes(`rel="canonical" href="https://bao.serunio.com/${slug}/"`),`${slug} production canonical`);
  must(html.includes('application/ld+json')&&html.includes('FAQPage'),`${slug} FAQ schema`);
  must(html.includes('seo_diagnosis_cta'),`${slug} diagnosis CTA`);
  must(html.includes('../analytics.js'),`${slug} analytics`);
  must(!html.includes('REPLACE_WITH_'),`${slug} has no placeholder URLs`);
  must(html.includes(`entry=${slug}`)||!isNew,`${slug} CTA keeps custom entry attribution`);
  if(isNew)must(html.includes('property="og:image"'),`${slug} Open Graph image`);
  if(geoPages.has(slug)){
    must(html.includes('data-geo="answer"'),`${slug} has extractable answer-first block`);
    must(html.includes('class="evidenceLine"'),`${slug} places evidence beside the direct answer`);
    must(html.includes('data-geo="limits"'),`${slug} states when advice may not apply`);
    must(html.includes('data-geo="entity"'),`${slug} has stable Bao Rescue entity description`);
    must(html.includes('data-geo="sources"'),`${slug} has explicit sources section`);
    must(html.includes('"citation":[')&&html.includes('"keywords":'),`${slug} Article schema exposes citations and topical keywords`);
    must(html.includes('https://bao.serunio.com/#organization'),`${slug} uses stable Organization entity id`);
  }
  if(noInternalUtm)must(!html.includes('utm_source=seo')&&!html.includes('utm_medium=organic'),`${slug} internal CTA does not overwrite source attribution`);
}

const legacySourcePages=[
  'site/why-do-steamed-buns-wrinkle/index.html',
  'site/why-are-bao-buns-not-fluffy/index.html'
];
for(const p of legacySourcePages){
  const html=read(p);
  must(!html.includes('dragonchencl.github.io/bok-choy-knowledge-export-experiment'),`${p} source canonical uses production domain`);
  must(!html.includes('../diagnose/'),`${p} has no legacy diagnose path`);
}
const collapse=read('site/bao-buns-collapse-after-steaming/index.html');
must(collapse.includes('Bao Buns Collapse After Steaming? 3 Causes to Check'),'collapse page keeps query-first CTR title');
must(collapse.includes('../bao-buns-spread-sideways/')&&collapse.includes('../bao-buns-wet-after-steaming/')&&collapse.includes('../bao-buns-not-rising/'),'collapse page links to adjacent troubleshooting branches');

const robots=read('site/robots.txt'),sitemap=read('site/sitemap.xml');
must(robots.includes('Sitemap: https://bao.serunio.com/sitemap.xml'),'robots points to production sitemap');
must(sitemap.includes('<loc>https://bao.serunio.com/</loc>'),'sitemap includes root diagnosis');
for(const [, ,slug] of pages)must(sitemap.includes(`https://bao.serunio.com/${slug}/`),`sitemap includes ${slug}`);
must(!sitemap.includes('dragonchencl.github.io'),'sitemap has no old GitHub Pages domain');
must(!sitemap.includes('REPLACE_WITH_'),'sitemap has no placeholder domain');

if(process.exitCode)process.exit(process.exitCode);
console.log(`PASS Phase 1 analytics + SEO QA (${pages.length} troubleshooting landing pages)`);
