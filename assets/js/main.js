
// Requires basepath.js loaded earlier
async function loadPartial(path){
  try{
    const r = await fetch(path); if(!r.ok) return '';
    return await r.text();
  }catch(e){ return ''; }
}

const NAV_ITEMS = [
  {label:'Home', href:'index.html'},
  {label:'Ebooks', href:'ebooks/index.html'},
  {label:'Techniques', href:'techniques/index.html'},
  {label:'Tools', href:'tools/index.html'},
  {label:'Gallery', href:'gallery/index.html'},
  {label:'Blogs', href:'blogs/index.html'},
  {label:'About', href:'about/index.html'},
  {label:'Contact', href:'contact/index.html'}
];

function isActive(href){
  const cur = location.pathname.replace(/\/index\.html$/, '/');
  const target = new URL($u(href), location.href).pathname;
  return cur === target || cur.startsWith(target);
}

async function mountShell(){
  const headerHtml = await loadPartial($u('partials/header.html'));
  const footerHtml = await loadPartial($u('partials/footer.html'));
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if(navMount) navMount.innerHTML = headerHtml;
  if(footerMount) footerMount.innerHTML = footerHtml;
  // build menu
  const menu = document.getElementById('menu');
  if(menu){
    menu.innerHTML = NAV_ITEMS.map(n=>`<a href="${$u(n.href)}" ${isActive(n.href)?'class="active"':''}>${n.label}</a>`).join('');
  }
  // hamburger
  const hamb = document.getElementById('hamb');
  if(hamb && menu) hamb.addEventListener('click',()=>menu.classList.toggle('open'));
  // theme toggle
  const root = document.documentElement;
  const saved = localStorage.getItem('cb-theme') || 'dark';
  root.setAttribute('data-theme', saved);
  const tbtn = document.getElementById('themeToggle');
  if(tbtn) tbtn.addEventListener('click', ()=>{
    const cur = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', cur);
    localStorage.setItem('cb-theme', cur);
  });
  // ensure back to home on subpages
  if(!document.querySelector('.back-home')){
    const container = document.querySelector('.container');
    if(container && location.pathname !== $u('index.html')){
      const a = document.createElement('a'); a.href = $u('index.html'); a.className='btn back-home'; a.textContent='← Back Home';
      container.prepend(a);
    }
  }
}

function onReveal(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
  },{threshold:0.12});
  els.forEach(el=>io.observe(el));
}

// safe fetch JSON via base path
async function safeJSON(url){
  try{
    const r = await fetch($u(url), {cache:'no-store'}); if(!r.ok) throw 0; return await r.json();
  }catch(e){
    console.warn('safeJSON failed', url, e);
    return [];
  }
}

// GitHub API scan helpers (unauthenticated, public repo)
async function fetchRepoPath(path){
  try{
    const cfg = window.CB_CONFIG || {};
    const owner = cfg.github_owner;
    const repo = cfg.github_repo;
    const branch = cfg.github_branch || 'main';
    if(!owner || !repo) return [];
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const r = await fetch(api);
    if(!r.ok) return [];
    const data = await r.json();
    // filter files
    return data;
  }catch(e){ console.warn('GitHub API fetch failed', e); return []; }
}

// Auto populate ebooks listing by reading ebooks_list.json if exists, else GitHub API
async function loadEbooks(gridId){
  const grid = document.getElementById(gridId);
  if(!grid) return;
  let list = await safeJSON('ebooks_list.json');
  if(!list || !list.length){
    // fallback to GitHub API listing of /ebooks
    const files = await fetchRepoPath('ebooks');
    list = files.filter(f=>f.type==='file' && f.name.toLowerCase().endsWith('.pdf')).map(f=>{
      return { title: f.name.replace(/[-_]/g,' ').replace(/\.pdf$/i,''), href: $u('ebooks/'+f.name), thumb: $u('thumbnails/'+f.name.replace(/\.pdf$/i,'.jpg')) };
    });
  }
  if(!list.length){ grid.innerHTML = '<div class="notice">No ebooks yet. Add PDFs to /ebooks/ and push.</div>'; return; }
  grid.innerHTML = '';
  list.forEach(item=>{
    const c = document.createElement('div'); c.className='card reveal';
    const thumb = item.thumb && item.thumb.length ? $u(item.thumb) : $u('assets/img/pdf-placeholder.jpg');
    c.innerHTML = `<div class="thumb-wrap"><img class="thumb-img" src="${thumb}" loading="lazy" alt="${item.title}"></div>
      <div class="title">${item.title}</div><div class="desc">${item.desc||''}</div>
      <div style="margin-top:8px"><a class="btn" href="${item.href.startsWith('http')?item.href:$u(item.href)}" target="_blank">View</a></div>`;
    grid.appendChild(c);
  });
}

// Auto populate techniques by reading data/techniques.json or GitHub API for /techniques
async function loadTechniques(gridId){
  const grid = document.getElementById(gridId);
  if(!grid) return;
  let list = await safeJSON('data/techniques.json');
  if(!list || !list.length){
    // try listing files in /techniques folder via GitHub API and render filenames
    const files = await fetchRepoPath('techniques');
    list = files.filter(f=>f.type==='file').map(f=>({ title: f.name.replace(/[-_]/g,' ').replace(/\.[^/.]+$/,''), desc:'', href:$u('techniques/'+f.name) }));
  }
  if(!list.length){ grid.innerHTML = '<div class="notice">No techniques yet. Add files to /techniques/ and push.</div>'; return; }
  grid.innerHTML = '';
  list.forEach(t=>{
    const c = document.createElement('div'); c.className='card reveal';
    c.innerHTML = `<div class="title">${t.title}</div><div class="desc">${t.desc||''}</div>`;
    grid.appendChild(c);
  });
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await mountShell();
  onReveal();
  // auto load common lists if present
  loadEbooks('ebooks-grid').catch(()=>{});
  loadTechniques('tech-grid').catch(()=>{});
  // register service worker
  if('serviceWorker' in navigator){ navigator.serviceWorker.register($u('service-worker.js')).catch(()=>{}); }
});
