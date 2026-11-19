/* Isolated local-site QA; never attaches to an existing browser session */
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const base='http://127.0.0.1:4180';
const output=path.join(__dirname,'screenshots');
const local=process.env.LOCALAPPDATA;
const candidates=['chromium_headless_shell-1248/chrome-headless-shell-win64/headless_shell.exe','chromium_headless_shell-1223/chrome-headless-shell-win64/headless_shell.exe','chromium-1223/chrome-win64/chrome.exe'].map(p=>path.join(local||'', 'ms-playwright',p));
const executablePath=process.env.QA_CHROMIUM || candidates.find(p=>fs.existsSync(p));
const report={url:base,checks:[],viewports:[],screenshots:[]};
const check=(name,condition)=>{assert.ok(condition,name);report.checks.push(name);};
let browser;
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[],failed=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
 page.on('request',r=>requests.push({url:r.url(),method:r.method()}));
 await page.goto(base,{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 await page.locator('img').evaluateAll(async imgs=>{imgs.forEach(i=>i.loading='eager');await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));});
 check('Eight required sections',await page.locator('main > section').count()===8);
 check('One page headline',await page.locator('h1').count()===1);
 check('Animated headline retains one readable accessible name',await page.locator('h1').getAttribute('aria-label')==='A future shaped by nature and science');
 check('All image assets loaded',await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete && i.naturalWidth>0)));
 const links=await page.locator('a').evaluateAll(as=>as.map(a=>({href:a.getAttribute('href'),text:a.textContent.trim()})));
 for(const a of links){
  check(`Valid anchor: ${a.text}`,Boolean(a.href && a.href.startsWith('#') && await page.locator(a.href).count()===1));
 }
 check('No trailing periods on headings or UI actions',await page.locator('h1,h2,h3,button,label,summary,.text-link').evaluateAll(nodes=>nodes.every(n=>!n.textContent.trim().endsWith('.'))));
 check('Reduced motion disables hero transitions',await page.locator('.hero-scene').first().evaluate(e=>getComputedStyle(e).transitionDuration)==='0s');
 check('Reduced motion disables automatic imagery',await page.locator('.motion-toggle').isDisabled());
 check('Reduced motion puts all decorative motion in static mode',await page.locator('html').getAttribute('data-motion')==='reduced' && await page.locator('.molecule').evaluate(e=>getComputedStyle(e).animationName)==='none');
 check('Reduced motion disables smooth scrolling',await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior)==='auto');
 for(const [width,height] of [[1920,970],[1920,800],[1366,650],[812,375],[375,667],[320,568]]){
  await page.setViewportSize({width,height});
  await page.goto(base,{waitUntil:'networkidle'});
  check(`Hero controls fit ${width}x${height}`,await page.locator('.scene-controls button').evaluateAll(buttons=>buttons.filter(b=>getComputedStyle(b).display!=='none').every(b=>{const r=b.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight+1&&r.left>=0&&r.right<=document.documentElement.clientWidth+1;})));
  check(`Hero content clears controls at ${width}x${height}`,await page.evaluate(()=>document.querySelector('.hero-copy').getBoundingClientRect().bottom<=document.querySelector('.hero-bottom').getBoundingClientRect().top-8));
 }
 for(const width of [1440,1024,768,375,320]){
  await page.setViewportSize({width,height:width<500?812:1000});
  await page.goto(base,{waitUntil:'networkidle'});
  const metrics=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0 && (r.left < -1 || r.right > innerWidth+1);}).map(e=>e.className).filter(Boolean)}));
  report.viewports.push({width,...metrics});
  check(`No horizontal overflow at ${width}px`,metrics.document<=width && metrics.body<=width);
  check(`Molecule illustration stays square at ${width}px`,await page.locator('.molecule').evaluate(e=>{const r=e.getBoundingClientRect();return Math.abs(r.width-r.height)<2;}));
  if(width===1440||width===375){
   await page.locator('img').evaluateAll(async imgs=>{imgs.forEach(i=>i.loading='eager');await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));});
   await page.screenshot({path:path.join(output,`desktop-${width}.png`),fullPage:true});
   await page.screenshot({path:path.join(output,`hero-${width}.png`)});
   report.screenshots.push(`desktop-${width}.png`,`hero-${width}.png`);
  }
 }
 await page.setViewportSize({width:375,height:812});
 await page.goto(base,{waitUntil:'networkidle'});
 const menu=page.locator('.menu-toggle');
 check('Mobile menu closed initially',await menu.getAttribute('aria-expanded')==='false' && !await page.locator('#primary-nav').isVisible());
 await menu.click();
 check('Mobile menu opens',await page.locator('#primary-nav').isVisible() && await menu.getAttribute('aria-expanded')==='true');
 await page.screenshot({path:path.join(output,'mobile-menu.png')});
 await page.keyboard.press('Escape');
 check('Escape closes mobile menu and restores focus',await menu.getAttribute('aria-expanded')==='false' && await menu.evaluate(e=>e===document.activeElement));
 await menu.click();
 await page.getByRole('navigation').getByRole('link',{name:'Our science',exact:true}).click();
 check('Mobile navigation reaches science and closes',new URL(page.url()).hash==='#technology' && await menu.getAttribute('aria-expanded')==='false');
 await menu.click();
 await page.getByRole('navigation').getByRole('link',{name:'Let’s talk',exact:true}).click();
 check('Mobile contact CTA works',new URL(page.url()).hash==='#contact');
 for(const detail of await page.locator('details').all()){
  const summary=detail.locator('summary');
  const initial=await detail.getAttribute('open')!==null;
  await summary.focus();await page.keyboard.press('Enter');
  check('FAQ keyboard toggles: '+await summary.innerText(),(await detail.getAttribute('open')!==null)!==initial);
  await page.keyboard.press('Enter');
 }
 await page.locator('#contact').scrollIntoViewIfNeeded();
 await page.getByRole('button',{name:'Try the demo form',exact:true}).click();
 check('Empty form shows three inline errors',await page.locator('[aria-invalid=true]').count()===3);
 check('Invalid form focuses name field',await page.locator('#name').evaluate(e=>e===document.activeElement));
 await page.locator('#name').fill('   ');
 await page.locator('#email').fill('wrong@');
 await page.locator('#message').fill('short');
 await page.getByRole('button',{name:'Try the demo form',exact:true}).click();
 check('Whitespace, malformed email and short message rejected',await page.locator('[aria-invalid=true]').count()===3);
 await page.screenshot({path:path.join(output,'mobile-validation.png'),fullPage:false});
 await page.locator('#name').fill('Alex Demo');
 await page.locator('#email').fill('alex@example.com');
 await page.locator('#message').fill('A fictional research collaboration for the local demo');
 const requestCount=requests.length;
 await page.getByRole('button',{name:'Try the demo form',exact:true}).click();
 check('Valid form explicitly confirms nothing was sent',await page.locator('#form-status').innerText()==='Demo complete — your form passed validation; no message was sent or saved');
 check('Form submission makes no network request',requests.length===requestCount);
 check('Form has no remaining validation errors',await page.locator('[aria-invalid=true]').count()===0);
 await page.screenshot({path:path.join(output,'mobile-form-success.png')});
 check('No form content persisted',await page.evaluate(()=>!localStorage.length && !sessionStorage.length && !document.cookie));
 await page.reload({waitUntil:'networkidle'});
 check('Form resets after reload',await page.locator('#name').inputValue()==='');
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base,{waitUntil:'networkidle'});
 for(const [label,id] of [['Our science','technology'],['Our approach','approach'],['Folia','folia'],['Vision','vision'],['Team','team'],['FAQ','faq'],['Let’s talk','contact']]){
  await page.getByRole('navigation').getByRole('link',{name:label,exact:true}).click();
  const top=await page.locator('#'+id).evaluate(e=>e.getBoundingClientRect().top);
  check(`Desktop navigation ${label}`,new URL(page.url()).hash==='#'+id && top>=64 && top<100);
 }
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(base,{waitUntil:'networkidle'});
 for(const section of await page.locator('main > section').all()){await section.scrollIntoViewIfNeeded();}
 await page.waitForTimeout(800);
 check('Scroll reveals become visible',await page.locator('.will-reveal').evaluateAll(es=>es.every(e=>e.classList.contains('visible'))));
 await page.locator('body').press('Control+Home');
 check('Standard mode enables motion control',await page.locator('.motion-toggle').isEnabled());
 await page.locator('.motion-toggle').click();
 check('Pause control stops automatic imagery',await page.locator('.hero').evaluate(e=>e.classList.contains('motion-paused')));
 check('Pause control stops all decorative loops',await page.locator('html').getAttribute('data-motion')==='paused' && await page.locator('.molecule').evaluate(e=>getComputedStyle(e).animationPlayState)==='paused');
 check('Hero imagery cannot scroll inside its clipped frame',await page.locator('.hero').evaluate(e=>e.scrollTop===0 && e.scrollHeight<=e.clientHeight+1));
 await page.locator('[data-scene="1"]').click();
 check('Manual hero image selection works',await page.locator('[data-scene="1"]').getAttribute('aria-pressed')==='true' && await page.locator('[data-scene-image="1"]').evaluate(e=>e.classList.contains('is-active')));
 await page.locator('.motion-toggle').click();
 check('Motion can resume after manual image selection',await page.locator('.hero').evaluate(e=>!e.classList.contains('motion-paused')));
 await page.locator('#folia').scrollIntoViewIfNeeded();
 await page.waitForTimeout(900);
 check('Molecule animation runs in its viewport',await page.locator('.molecule').evaluate(e=>getComputedStyle(e).animationPlayState)==='running');
 check('Hero drift pauses out of view',await page.locator('.hero-scene.is-active').evaluate(e=>getComputedStyle(e).animationPlayState)==='paused');
 check('No JavaScript errors',errors.length===0);
 check('No failed asset responses',failed.length===0);
 check('Only local network resources used',requests.every(r=>r.url.startsWith(base)));
 report.result='PASS';report.errors=errors;report.failedAssets=failed;
 fs.writeFileSync(path.join(__dirname,'qa-report.json'),JSON.stringify(report,null,2));
 await browser.close();
 console.log(JSON.stringify({result:report.result,checks:report.checks.length,viewports:report.viewports,screenshots:report.screenshots},null,2));
})().catch(async e=>{console.error(e);if(browser)await browser.close();process.exitCode=1;});
