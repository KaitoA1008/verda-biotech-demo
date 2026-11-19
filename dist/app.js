(() => {
  'use strict';
  const c = window.VERDA_CONTENT;
  const esc = value => String(value).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const lines = value => value.split('|').map(esc).join('<br> ');
  const mark = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 32C6 27 2 14 5 7c8-1 15 7 15 15C20 13 27 5 35 5c3 12-3 23-15 27Z" fill="currentColor"/><path d="M20 34V17" stroke="currentColor" stroke-width="2"/></svg>`;
  const icons = {
    drop: '<path d="M40 9C34 21 19 31 19 47a21 21 0 0 0 42 0C61 31 46 21 40 9Z"/><path d="M28 48c0 7 5 12 12 12"/>',
    layers: '<path d="m40 12 29 17-29 17L11 29 40 12Z"/><path d="m11 41 29 17 29-17M11 53l29 17 29-17"/>',
    sprout: '<path d="M40 70V39M40 48C19 49 9 35 11 18c20-1 32 13 29 30ZM40 38c-1-17 11-28 29-27 1 17-11 29-29 27Z"/>'
  };
  const icon = id => `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[id]}</svg>`;
  const nav = [['technology','Our science'],['approach','Our approach'],['folia','Folia'],['vision','Vision'],['team','Team'],['faq','FAQ']];
  document.title = c.title;
  document.querySelector('#site').innerHTML = `
    <div class="utility-bar"><div class="wrap"><span>A biotechnology concept, inspired by possibility</span><span>Nature · Science · Tomorrow</span></div></div>
    <header class="header">
      <div class="header-inner wrap">
        <a href="#home" class="wordmark" aria-label="Verda home">${mark}<span>${esc(c.brand)}</span></a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span class="menu-label">Menu</span><span class="hamburger" aria-hidden="true"></span></button>
        <nav id="primary-nav" aria-label="Main navigation">
          ${nav.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}
          <a class="button button-small" href="#contact">Let’s talk</a>
        </nav>
      </div>
    </header>
    <main id="main">
      <section class="hero" id="home" aria-labelledby="hero-title">
        <div class="hero-scenes" aria-hidden="true">${c.hero.scenes.map((s,i)=>`<img class="hero-scene ${i===0?'is-active':''}" src="assets/${esc(s.image)}" width="2000" height="1333" alt="" ${i===0?'fetchpriority="high"':''} data-scene-image="${i}">`).join('')}</div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="hero-content wrap">
          <div class="hero-copy">
            <p class="eyebrow">${esc(c.hero.eyebrow)}</p>
            <h1 id="hero-title" aria-label="${esc(c.hero.headline.replaceAll('|',' '))}">${c.hero.headline.split('|').map((line,i)=>`<span class="hero-line" aria-hidden="true"><span style="--line-delay:${i*120}ms">${esc(line)}</span></span>`).join('')}</h1>
            <p class="intro">${esc(c.hero.intro)}</p>
            <div class="hero-actions"><a class="button button-light" href="#technology">${esc(c.hero.cta)}</a><a class="text-link" href="#contact">${esc(c.hero.secondary)}</a></div>
          </div>
        </div>
        <div class="hero-bottom wrap"><span class="scene-caption">${esc(c.hero.scenes[0].caption)}</span><div class="scene-controls" role="group" aria-label="Hero imagery">${c.hero.scenes.map((s,i)=>`<button type="button" data-scene="${i}" aria-pressed="${i===0}" aria-label="Show ${esc(s.label.toLowerCase())} imagery"><span></span>${esc(s.label)}</button>`).join('')}<button class="motion-toggle" type="button" aria-pressed="false" aria-label="Pause animations"><span class="motion-icon" aria-hidden="true"></span><span class="motion-label">Pause</span></button></div></div>
      </section>

      <section class="section technology" id="technology" aria-labelledby="technology-title">
        <div class="wrap">
          <div class="section-heading reveal"><div><p class="eyebrow">${esc(c.technology.eyebrow)}</p><h2 id="technology-title">${lines(c.technology.title)}</h2></div><p>${esc(c.technology.intro)}</p></div>
          <div class="application-grid">${c.technology.applications.map(a=>`<article class="application reveal"><div class="application-art"><img src="assets/${esc(a.image)}" width="1200" height="800" loading="lazy" alt="${esc(a.alt)}"></div><p class="micro">${esc(a.tag)}</p><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p><a class="text-link" href="#contact">Explore a collaboration<span class="sr-only"> in ${esc(a.title)}</span></a></article>`).join('')}</div>
        </div>
      </section>

      <section class="section approach" id="approach" aria-labelledby="approach-title">
        <div class="wrap approach-grid">
          <div class="approach-image reveal"><img src="assets/growth.webp" loading="lazy" alt="A plant reaching into a bright, open space" width="1400" height="1051"><span class="image-note">A new perspective begins at the source</span></div>
          <div class="approach-copy reveal"><p class="eyebrow">${esc(c.challenge.eyebrow)}</p><h2 id="approach-title">${lines(c.challenge.title)}</h2><p class="lead">${esc(c.challenge.intro)}</p><div class="approach-point"><span class="point-symbol" aria-hidden="true">−</span><div><h3>${esc(c.challenge.problem.title)}</h3><p>${esc(c.challenge.problem.text)}</p></div></div><div class="approach-point"><span class="point-symbol" aria-hidden="true">+</span><div><h3>${esc(c.challenge.solution.title)}</h3><p>${esc(c.challenge.solution.text)}</p></div></div></div>
          <ol class="process reveal">${c.challenge.steps.map((s,i)=>`<li><span class="process-dot" aria-hidden="true">${icon(['sprout','drop','layers'][i])}</span><span>${esc(s)}</span></li>`).join('')}</ol>
        </div>
      </section>

      <section class="section product" id="folia" aria-labelledby="product-title">
        <div class="wrap product-grid">
          <div class="product-copy reveal"><p class="eyebrow">${esc(c.product.eyebrow)}</p><p class="product-name">${esc(c.product.name)}</p><h2 id="product-title">${lines(c.product.title)}</h2><p class="lead">${esc(c.product.intro)}</p><dl>${c.product.facts.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><a class="button" href="#contact">${esc(c.product.cta)}</a></div>
          <figure class="molecule-figure reveal"><div class="molecule-stage"><span class="stage-label">Folia / A research concept</span><div class="molecule-field" aria-hidden="true"></div><div class="molecule-orbit" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none"><ellipse cx="300" cy="300" rx="240" ry="164" stroke="currentColor" stroke-width="1"/><ellipse cx="300" cy="300" rx="218" ry="200" stroke="currentColor" stroke-width=".7" stroke-dasharray="2 10"/><circle cx="540" cy="300" r="5" fill="currentColor"/><circle cx="60" cy="300" r="3" fill="currentColor"/></svg></div><img class="molecule" src="assets/molecule.svg" width="600" height="600" loading="lazy" alt="Abstract amber and green molecular sculpture, an artistic illustration rather than a chemical structure"><span class="stage-bottom">Nature, seen in a different light</span></div><figcaption>${esc(c.product.note)}</figcaption></figure>
        </div>
      </section>

      <section class="vision" id="vision" aria-labelledby="vision-title">
        <img src="assets/leaf.webp" alt="" width="900" height="1350" loading="lazy" aria-hidden="true"><div class="vision-overlay"></div><div class="wrap vision-content reveal"><p class="eyebrow">${esc(c.vision.eyebrow)}</p><h2 id="vision-title">${lines(c.vision.title)}</h2><p>${esc(c.vision.text)}</p><a class="button button-light" href="#contact">${esc(c.vision.cta)}</a></div>
      </section>

      <section class="section team" id="team" aria-labelledby="team-title"><div class="wrap"><div class="section-heading reveal"><div><p class="eyebrow">${esc(c.team.eyebrow)}</p><h2 id="team-title">${lines(c.team.title)}</h2></div><div><p>${esc(c.team.intro)}</p><p class="concept-note">${esc(c.team.note)}</p></div></div><div class="team-grid">${c.team.people.map(p=>`<article class="person reveal"><img src="assets/${esc(p.image)}" width="400" height="440" alt="Illustrative portrait of fictional team member ${esc(p.name)}" loading="lazy"><p class="micro">${esc(p.role)}</p><h3>${esc(p.name)}</h3><p>${esc(p.bio)}</p></article>`).join('')}</div></div></section>

      <section class="section faq" id="faq" aria-labelledby="faq-title"><div class="wrap faq-grid"><div class="reveal"><p class="eyebrow">${esc(c.faq.eyebrow)}</p><h2 id="faq-title">${lines(c.faq.title)}</h2><p>Still curious?</p><a class="text-link" href="#contact">Let’s talk about it</a></div><div class="faq-list reveal">${c.faq.items.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${esc(q)}<span class="faq-icon" aria-hidden="true"></span></summary><div class="faq-answer"><p>${esc(a)}</p></div></details>`).join('')}</div></div></section>

      <section class="section contact" id="contact" aria-labelledby="contact-title"><div class="wrap contact-grid"><div class="reveal"><p class="eyebrow">${esc(c.contact.eyebrow)}</p><h2 id="contact-title">${lines(c.contact.title)}</h2><p class="lead">${esc(c.contact.intro)}</p><div class="contact-mark" aria-hidden="true">${mark}</div><p class="concept-note">A fictional brand with real possibilities for your website</p></div><form id="contact-form" novalidate class="reveal"><p class="form-note"><span class="demo-badge">Demo mode</span>${esc(c.contact.demo)}</p><div class="form-row"><div class="field"><label for="name">Your name <span aria-hidden="true">*</span></label><input id="name" name="name" autocomplete="name" required maxlength="100" aria-describedby="name-error"><span class="field-error" id="name-error"></span></div><div class="field"><label for="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" aria-describedby="email-error"><span class="field-error" id="email-error"></span></div></div><div class="field"><label for="company">Company <span class="optional">(optional)</span></label><input id="company" name="company" autocomplete="organization" maxlength="150"></div><div class="field"><label for="interest">I’m interested in</label><select id="interest" name="interest"><option>Research collaboration</option><option>Personal care</option><option>Materials & coatings</option><option>Agriculture</option><option>Something else</option></select></div><div class="field"><label for="message">Your message <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="4" required minlength="10" maxlength="3000" aria-describedby="message-error" placeholder="Tell us a little about your idea"></textarea><span class="field-error" id="message-error"></span></div><button class="button" type="submit">Try the demo form</button><p class="form-required">* Required fields · No data is transmitted</p><p id="form-status" role="status" aria-live="polite" tabindex="-1" hidden></p></form></div></section>
    </main>
    <footer><div class="wrap footer-top"><div class="footer-brand"><a href="#home" class="wordmark" aria-label="Verda home">${mark}<span>${esc(c.brand)}</span></a><p>A future grown from nature</p></div><div class="footer-links"><p>Explore the possibilities</p><a href="#technology">Our science</a><a href="#folia">Molecule spotlight</a><a href="#vision">Our vision</a></div><div class="footer-links"><p>Get to know us</p><a href="#approach">Our approach</a><a href="#team">Founders & advisors</a><a href="#faq">Your questions</a></div><div class="footer-links"><p>Start a conversation</p><a href="#contact">Contact us</a><a href="#home">Back to top</a><span>English</span></div></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Verda · Fictional brand concept</span><span>Design exploration · Not a commercial or medical offering</span></div></footer>`;

  const menu = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('#primary-nav');
  const closeMenu = (focus=false) => {
    menu.setAttribute('aria-expanded','false');
    primaryNav.classList.remove('is-open');
    menu.querySelector('.menu-label').textContent='Menu';
    if(focus) menu.focus();
  };
  menu.addEventListener('click',()=>{
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded',String(open));
    primaryNav.classList.toggle('is-open',open);
    menu.querySelector('.menu-label').textContent=open?'Close':'Menu';
  });
  primaryNav.addEventListener('click',e=>{if(e.target.closest('a')) closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu.getAttribute('aria-expanded')==='true')closeMenu(true);});
  document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
  matchMedia('(min-width: 1001px)').addEventListener('change',()=>closeMenu());

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const fields = ['name','email','message'].map(id=>document.getElementById(id));
  const validate = field => {
    let error='';
    if(!field.value.trim()) error = field.id==='name'?'Please enter your name':field.id==='email'?'Please enter your email address':'Please enter a message';
    else if(field.id==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) error='Enter a valid email address, such as you@example.com';
    else if(field.id==='message' && field.value.trim().length<10)error='Please write at least 10 characters';
    field.setAttribute('aria-invalid',String(Boolean(error)));
    document.getElementById(field.id+'-error').textContent=error;
    return !error;
  };
  fields.forEach(f=>{f.addEventListener('blur',()=>{if(f.value || f.getAttribute('aria-invalid')==='true')validate(f);});f.addEventListener('input',()=>{status.hidden=true;if(f.hasAttribute('aria-invalid'))validate(f);});});
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const results=fields.map(validate);
    status.hidden=false;
    if(results.includes(false)){
      status.className='status-error';
      status.textContent='Please check the highlighted fields — nothing has been sent';
      fields[results.indexOf(false)].focus();
      return;
    }
    status.className='status-success';
    status.textContent=c.contact.success;
    status.focus({preventScroll:true});
  });

  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const motionRoot=document.documentElement;
  const motionStages=[...document.querySelectorAll('.molecule-stage')];
  document.querySelectorAll('a[href="#home"]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();
    history.replaceState(null,'',location.pathname+location.search);
    window.scrollTo({top:0,behavior:motionRoot.classList.contains('motion-off')?'instant':'smooth'});
  }));
  const hero=document.querySelector('.hero');
  const scenes=[...document.querySelectorAll('.hero-scene')];
  const sceneButtons=[...document.querySelectorAll('[data-scene]')];
  const motionButton=document.querySelector('.motion-toggle');
  let activeScene=0, paused=false, heroVisible=true, sceneTimer;
  const showScene=index=>{
    activeScene=index;
    scenes.forEach((s,i)=>s.classList.toggle('is-active',i===index));
    sceneButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    document.querySelector('.scene-caption').textContent=c.hero.scenes[index].caption;
  };
  const syncMotion=()=>{
    clearInterval(sceneTimer);
    const off=paused || reducedMotion.matches;
    motionRoot.classList.toggle('motion-off',off);
    motionRoot.classList.toggle('motion-suspended',document.hidden);
    motionRoot.dataset.motion=reducedMotion.matches?'reduced':paused?'paused':'running';
    hero.classList.toggle('motion-paused',off);
    motionButton.disabled=reducedMotion.matches;
    motionButton.setAttribute('aria-pressed',String(off));
    motionButton.setAttribute('aria-label',reducedMotion.matches?'Animations disabled by your preference':paused?'Resume animations':'Pause animations');
    motionButton.querySelector('.motion-label').textContent=reducedMotion.matches?'Motion off':paused?'Play':'Pause';
    if(!off && !document.hidden && heroVisible)sceneTimer=setInterval(()=>showScene((activeScene+1)%scenes.length),8500);
  };
  sceneButtons.forEach((b,i)=>b.addEventListener('click',()=>{showScene(i);paused=true;syncMotion();}));
  motionButton.addEventListener('click',()=>{paused=!paused;syncMotion();});
  document.addEventListener('visibilitychange',syncMotion);
  reducedMotion.addEventListener('change',syncMotion);
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      heroVisible=entries[0].isIntersecting;
      hero.classList.toggle('motion-visible',heroVisible);
      syncMotion();
    },{threshold:0}).observe(hero);
    const stageObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('motion-visible',entry.isIntersecting)),{threshold:.12});
    motionStages.forEach(stage=>stageObserver.observe(stage));
  } else {
    hero.classList.add('motion-visible');
    motionStages.forEach(stage=>stage.classList.add('motion-visible'));
  }
  syncMotion();
  if(!reducedMotion.matches){
    hero.classList.add('has-intro');
    setTimeout(()=>hero.classList.remove('has-intro'),1800);
  }
  if('IntersectionObserver' in window && !reducedMotion.matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
    reducedMotion.addEventListener('change',e=>{if(e.matches){document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('visible'));observer.disconnect();}});
  }
  if('IntersectionObserver' in window){
    const activeObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){document.querySelectorAll('#primary-nav a').forEach(a=>{if(a.hash===`#${e.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
    }),{rootMargin:'-20% 0px -60% 0px'});
    document.querySelectorAll('main section[id]').forEach(s=>activeObserver.observe(s));
  }
})();
