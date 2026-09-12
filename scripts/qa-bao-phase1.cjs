const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const must=(ok,msg)=>{if(!ok){console.error('FAIL',msg);process.exitCode=1}else console.log('PASS',msg)};

const analytics=read('site/analytics.js');
['page_view','symptom_select','diagnosis_start','question_answer','diagnosis_complete','diagnosis_back','diagnosis_restart','seo_diagnosis_cta'].forEach(e=>must(analytics.includes(`'${e}'`)||analytics.includes(`"${e}"`),`analytics event ${e}`));
must(analytics.includes('utm_source')&&analytics.includes('utm_campaign'),'analytics captures UTM attribution');
must(analytics.includes('BAO_ANALYTICS_ENDPOINT'),'analytics supports external beacon endpoint');
must(analytics.includes('G-GVD03YFR9C')&&analytics.includes('googletagmanager.com/gtag/js'),'analytics initializes GA4 for every landing page');
must(analytics.includes('yfjx2b9bn4')&&analytics.includes('clarity.ms/tag'),'analytics initializes Microsoft Clarity');
must(analytics.includes('bao_session_id:baoSessionId'),'custom session marker does not use GA4 reserved session_id');
must(!analytics.includes('session_id:sessionId'),'GA4 reserved session_id is not overridden');
must(!analytics.includes('window.dataLayer.push(payload)'),'custom events are not duplicated through raw dataLayer event pushes');
must(analytics.includes('sanitizeInternalAttributionLink'),'same-origin CTA attribution sanitizer exists');
must(analytics.includes("['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach"),'internal CTA strips campaign UTMs before navigation');

const home=read('site/index.html');
must(home.includes('./analytics.js'),'root diagnosis loads analytics layer');
must(home.includes('meta name="robots" content="index,follow'),'root diagnosis is indexable');
must(home.includes('rel="canonical" href="https://bao.serunio.com/"'),'root canonical uses production domain');
must(home.includes('property="og:title"')&&home.includes('property="og:image"'),'root has Open Graph metadata');

const pages=[
 ['site/bao-buns-collapse-after-steaming/index.html','Why did my bao collapse after steaming?','bao-buns-collapse-after-steaming',false],
 ['site/why-do-steamed-buns-wrinkle/index.html','Why are my steamed buns wrinkled?','why-do-steamed-buns-wrinkle',false],
 ['site/why-are-bao-buns-not-fluffy/index.html','Why are my bao buns dense and not fluffy?','why-are-bao-buns-not-fluffy',false],
 ['site/bao-buns-gummy-inside/index.html','Why are my bao buns gummy inside?','bao-buns-gummy-inside',true],
 ['site/bao-buns-not-smooth/index.html','Why aren&#x27;t my bao buns smooth?','bao-buns-not-smooth',true],
 ['site/bao-buns-not-rising/index.html','Why aren&#x27;t my bao buns rising?','bao-buns-not-rising',true],
 ['site/bao-buns-wet-after-steaming/index.html','Why are my bao buns wet after steaming?','bao-buns-wet-after-steaming',true],
 ['site/bao-buns-spread-sideways/index.html','Why do my bao buns spread sideways?','bao-buns-spread-sideways',true],
 ['site/bao-buns-crack-while-steaming/index.html','Why do my bao buns crack while steaming?','bao-buns-crack-while-steaming',true],
 ['site/bao-buns-hard-after-steaming/index.html','Why are my bao buns hard after steaming?','bao-buns-hard-after-steaming',true]
];

for(const [p,h1,slug,isNew] of pages){
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
}

const robots=read('site/robots.txt'),sitemap=read('site/sitemap.xml');
must(robots.includes('Sitemap: https://bao.serunio.com/sitemap.xml'),'robots points to production sitemap');
must(sitemap.includes('<loc>https://bao.serunio.com/</loc>'),'sitemap includes root diagnosis');
for(const [, ,slug] of pages)must(sitemap.includes(`https://bao.serunio.com/${slug}/`),`sitemap includes ${slug}`);
must(!sitemap.includes('dragonchencl.github.io'),'sitemap has no old GitHub Pages domain');
must(!sitemap.includes('REPLACE_WITH_'),'sitemap has no placeholder domain');

if(process.exitCode)process.exit(process.exitCode);
console.log(`PASS Phase 1 analytics + SEO QA (${pages.length} troubleshooting landing pages)`);
