(() => {
  'use strict';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const current = location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  $$('.desktop-nav a').forEach(a => { if(a.getAttribute('href') === current || (current.startsWith('/docs/') && a.getAttribute('href')==='/docs/')) a.classList.add('active'); });
  const menu = $('.menu-toggle'), mobile = $('.mobile-nav');
  if(menu && mobile){
    const closeMenu = () => {mobile.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');};
    menu.addEventListener('click',()=>{const opening=mobile.hidden;mobile.hidden=!opening;menu.setAttribute('aria-expanded',String(opening));menu.setAttribute('aria-label',opening?'Close menu':'Open menu');});
    $$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
    window.addEventListener('resize',()=>{if(innerWidth>940)closeMenu();});
  }
  const savedTheme=(()=>{try{return localStorage.getItem('magnexis-theme')}catch{return null}})();
  if(savedTheme==='light')document.documentElement.setAttribute('data-theme','light');
  const theme=$('.theme-switch');
  if(theme)theme.addEventListener('click',()=>{const isLight=document.documentElement.getAttribute('data-theme')==='light';if(isLight)document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme','light');try{localStorage.setItem('magnexis-theme',isLight?'dark':'light')}catch{}});
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.06,rootMargin:'0px 0px -15px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
  }else{$$('.reveal').forEach(el=>el.classList.add('visible'))}
  const filterButtons=$$('.filter-btn');
  filterButtons.forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.filter;filterButtons.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});$$('.work-grid .project-card').forEach(card=>{card.hidden=filter!=='all' && card.dataset.category!==filter;});}));
  const docsSearch=$('#docs-search');
  if(docsSearch){docsSearch.addEventListener('input',()=>{const query=docsSearch.value.trim().toLowerCase();let visible=0;$$('.docs-index-card').forEach(card=>{const show=card.dataset.search.includes(query);card.hidden=!show;if(show)visible++;});const msg=$('.docs-no-results');if(msg)msg.hidden=visible!==0;});}
  const globalPages=[['Home','/','Company, engineering, and research'],['Capabilities','/capabilities/','Software engineering AI platforms security'],['Selected work','/work/','Portfolio projects APIHub agent studio repo dna devarch maps'],['Research','/research/','Noxsentra defensive security AI'],['Company','/company/','About Magnexis LLC Connecticut'],['Contact','/contact/','Inquiry email collaboration'],['Documentation','/docs/','Knowledge center documentation'],['Getting started','/docs/getting-started/','Overview resources'],['Open-source resources','/docs/open-source/','Github contributions'],['Security & disclosure','/docs/security/','Responsible vulnerability reporting'],['Working with Magnexis','/docs/collaboration/','Collaboration questions']];
  const overlay=$('.search-overlay'),searchInput=$('.global-search'),hits=$('.search-hits'),command=$('.command-trigger');
  let focusBefore=null;
  function renderHits(term=''){
    const q=term.toLowerCase().trim();const matches=globalPages.filter(row=>row.join(' ').toLowerCase().includes(q));
    hits.replaceChildren();
    if(!matches.length){const p=document.createElement('p');p.className='search-empty';p.textContent='No matching pages found.';hits.append(p);return;}
    matches.forEach(([name,path,desc])=>{const a=document.createElement('a');a.className='search-hit';a.href=path;const t=document.createElement('span');t.textContent=name;const ic=document.createElement('span');ic.textContent='↗';a.append(t,ic);hits.append(a);});
  }
  function openSearch(){focusBefore=document.activeElement;overlay.hidden=false;document.body.style.overflow='hidden';renderHits();searchInput.value='';searchInput.focus();}
  function closeSearch(){overlay.hidden=true;document.body.style.overflow='';if(focusBefore&&focusBefore.focus)focusBefore.focus();}
  if(command&&overlay&&searchInput){command.addEventListener('click',openSearch);searchInput.addEventListener('input',()=>renderHits(searchInput.value));overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch();});document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();overlay.hidden?openSearch():closeSearch();}if(e.key==='Escape'&&!overlay.hidden){closeSearch();}if(e.key==='Tab'&&!overlay.hidden){const f=$$('a[href],button,input:not([disabled])',overlay).filter(el=>!el.hidden);const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});}
})();
