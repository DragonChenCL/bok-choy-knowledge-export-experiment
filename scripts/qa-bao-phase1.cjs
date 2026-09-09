const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const must=(ok,msg)=>{if(!ok){console.error('FAIL',msg);process.exitCode=1}else console.log('PASS',msg)};
const analytics=read('site/analytics.js');
['page_view','symptom_select','diagnosis_start','question_answer','diagnosis_complete','diagnosis_back','diagnosis_restart','seo_diagnosis_cta'].forEach(e=>must(analytics.includes(`'${e}'`)||analytics.includes(`"${e}"`),`analytics event ${e}`));
must(analytics.includes('utm_source')&&analytics.includes('utm_campaign'),'analytics captures UTM attribution');
must(analytics.includes('BAO_ANALYTICS_ENDPOINT'),'analytics supports external beacon endpoint');
const home=read('site/index.html');
must(home.includes('./analytics.js'),'root diagnosis loads analytics layer');
must(home.includes('meta name="robots" content="index,follow'),'root diagnosis is indexable');
must(home.includes('rel="canonical" href="https://bao.serunio.com/"'),'root canonical uses production domain');
must(home.includes('property="og:title"')&&home.includes('property="og:image"'),'root has Open Graph metadata');
const pages=[
 ['site/bao-buns-collapse-after-steaming/index.html','Why did my bao collapse after steaming?','bao-buns-collapse-after-steaming'],
 ['site/why-do-steamed-buns-wrinkle/index.html','Why are my steamed buns wrinkled?','why-do-steamed-buns-wrinkle'],
 ['site/why-are-bao-buns-not-fluffy/index.html','Why are my bao buns dense and not fluffy?','why-are-bao-buns-not-fluffy']
];
for(const [p,h1,slug] of pages){ const html=read(p); must(html.includes(`<h1>${h1}</h1>`),`${slug} H1`); must(html.includes('meta name="robots" content="index,follow'),`${slug} indexable`); must(html.includes('rel="canonical"'),`${slug} canonical`); must(html.includes('application/ld+json')&&html.includes('FAQPage'),`${slug} FAQ schema`); must(html.includes('seo_diagnosis_cta'),`${slug} diagnosis CTA`); must(html.includes('../analytics.js'),`${slug} analytics`); must(!html.includes('REPLACE_WITH_'),`${slug} has no placeholder URLs`); }
const robots=read('site/robots.txt'),sitemap=read('site/sitemap.xml');
must(robots.includes('Sitemap: https://bao.serunio.com/sitemap.xml'),'robots points to production sitemap');
must(sitemap.includes('<loc>https://bao.serunio.com/</loc>'),'sitemap includes root diagnosis');
for(const [, ,slug] of pages)must(sitemap.includes(`https://bao.serunio.com/${slug}/`),`sitemap includes ${slug}`);
must(!sitemap.includes('dragonchencl.github.io'),'sitemap has no old GitHub Pages domain');
must(!sitemap.includes('REPLACE_WITH_'),'sitemap has no placeholder domain');
if(process.exitCode)process.exit(process.exitCode);
console.log('PASS Phase 1 analytics + SEO QA');
