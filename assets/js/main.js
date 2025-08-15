// Load partials and set up site-wide features
async function loadPartials(){
  const navMount = document.getElementById('nav-mount');
  const footMount = document.getElementById('footer-mount');
  try{
    const [nav, foot] = await Promise.all([
      fetch('/partials/nav.html').then(r=>r.text()),
      fetch('/partials/footer.html').then(r=>r.text())
    ]);
    if(navMount){ navMount.innerHTML = nav; afterNavLoad(); }
    if(footMount){ footMount.innerHTML = foot; }
  }catch(e){ console.error('Partial load error', e); }
}

function afterNavLoad(){
  highlightActive();
  setupThemeToggle();
  setupSearchOverlay();
}

function highlightActive(){
  const path = location.pathname.replace(/index\.html$/,''); // normalize
  document.querySelectorAll('.menu a[data-path]').forEach(a => {
    const base = a.getAttribute('data-path');
    if(path === base || path === base.replace(/\/$/,'')) a.classList.add('active-link');
  });
}

// Theme toggle with localStorage
function setupThemeToggle(){
  const root = document.documentElement;
  const current = localStorage.getItem('theme') || 'dark';
  if(current === 'light'){ root.classList.add('light'); }
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  btn.onclick = () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  };
}

// Simple site-wide search across JSON datasets
async function setupSearchOverlay(){
  const btn = document.getElementById('searchBtn');
  if(!btn) return;
  // build overlay
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-panel container">
      <input id="searchInput" class="search-input" placeholder="Search ebooks, techniques, tools, blogs..." />
      <div id="searchResults" class="search-results"></div>
      <div class="notice">Press ESC to close.</div>
    </div>`;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('#searchInput');
  const results = overlay.querySelector('#searchResults');

  async function getIndex(){
    try{
      const [ebooks, tech, tools] = await Promise.all([
        fetch('/ebooks_list.json').then(r=>r.json()).catch(_=>[]),
        fetch('/data/techniques.json').then(r=>r.json()).catch(_=>[]),
        fetch('/data/tools.json').then(r=>r.json()).catch(_=>[])
      ]);
      // Normalize
      const e = ebooks.map(x=>({type:'ebook', title:x.title, href:x.href, desc:(x.size||'')+' '+(x.date||'')}));
      const t = tech.map(x=>({type:'technique', title:x.title, href:x.href||'#', desc:x.desc||''}));
      const tl = tools.map(x=>({type:'tool', title:x.title, href:x.href||'#', desc:x.desc||''}));
      return [...e, ...t, ...tl];
    }catch(e){ return []; }
  }
  let index = [];
  btn.onclick = async () => {
    if(index.length===0) index = await getIndex();
    overlay.classList.add('open');
    input.focus();
    input.value = '';
    results.innerHTML = '';
  };
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape') overlay.classList.remove('open');
  });
  input.addEventListener('input', e=>{
    const q = e.target.value.toLowerCase();
    const found = index.filter(i => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
    results.innerHTML = found.slice(0,50).map(i=>`
      <div class="item">
        <div class="title">[${i.type}] ${i.title}</div>
        <div class="desc">${i.desc}</div>
        <a class="btn" href="${i.href}" target="_blank">Open</a>
      </div>
    `).join('');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials();
});



// --- Reveal on scroll and small UX animations ---
(function(){
  function revealAll() {
    const items = document.querySelectorAll('.reveal');
    const height = window.innerHeight;
    const threshold = 0.85;
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top <= height*threshold) el.classList.add('visible');
    });
  }
  document.addEventListener('scroll', revealAll, {passive:true});
  window.addEventListener('resize', revealAll);
  document.addEventListener('DOMContentLoaded', () => {
    // small debounce initial run
    setTimeout(revealAll, 120);
    // pulse logo for attention
    const logo = document.querySelector('.logo');
    if(logo) logo.classList.add('pulse');
  });
})();
