
const NAV=[
  {label:'Home',href:'/'},{label:'Ebooks',href:'/ebooks/index.html'},
  {label:'Techniques',href:'/techniques/index.html'},{label:'Tools',href:'/tools/index.html'},
  {label:'Gallery',href:'/gallery/index.html'},{label:'Blogs',href:'/blogs/index.html'},
  {label:'About',href:'/about/index.html'},{label:'Contact',href:'/contact/index.html'}
];
function pathActive(href){
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const target = href.replace('/index.html','/');
  return path===target || path.startsWith(target);
}
function mountNav(){
  const rootEl=document.documentElement;
  const theme=(localStorage.getItem('theme')||'dark');
  rootEl.setAttribute('data-theme',theme);
  const mount=document.getElementById('nav-mount');
  if(!mount) return;
  mount.innerHTML=`
  <div class="header">
   <div class="nav container">
     <div class="brand"><span class="badge"></span> cipher<b>bikram</b></div>
     <button class="hamb" id="hamb">☰</button>
     <div class="menu" id="menu">${NAV.map(n=>`<a href="${$u(n.href)}" class="${pathActive(n.href)?'active':''}">${n.label}</a>`).join('')}</div>
     <div class="right"><button class="theme-toggle" id="theme">🌓</button></div>
   </div>
  </div>`;
  document.getElementById('theme').addEventListener('click', ()=>{
    const t = rootEl.getAttribute('data-theme')==='dark' ? 'light':'dark';
    rootEl.setAttribute('data-theme', t); localStorage.setItem('theme', t);
  });
  const hamb=document.getElementById('hamb'), menu=document.getElementById('menu');
  if(hamb) hamb.addEventListener('click', ()=> menu.classList.toggle('open'));
}
function mountFooter(){
  const mount=document.getElementById('footer-mount'); if(!mount) return;
  const y=(new Date()).getFullYear();
  mount.innerHTML=`
  <div class="footer"><div class="inner">
    <div>© ${y} CipherBikram • Built for learners & DFIR</div>
    <div><a href="https://github.com/cipherbikramdey" target="_blank">GitHub</a> · <a href="${$u('manifest.json')}">PWA</a></div>
  </div></div>`;
}
function onReveal(){
  const els=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target);} });
  },{threshold:.12});
  els.forEach(el=>io.observe(el));
}
document.addEventListener('DOMContentLoaded',()=>{ mountNav(); mountFooter(); onReveal(); if('serviceWorker' in navigator){ navigator.serviceWorker.register($u('service-worker.js')).catch(()=>{});} });
export async function typeLines(el, lines, speed=26, pause=900){
  if(!el) return;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  while(true){
    for(const line of lines){
      el.textContent=''; for(const ch of line){ el.textContent+=ch; await sleep(speed); }
      await sleep(pause);
    }
  }
}
export async function safeJSON(url){
  try{ const r=await fetch($u(url),{cache:'no-store'}); if(!r.ok) throw 0; return await r.json(); }
  catch(e){ console.warn('JSON load failed', url, e); return []; }
}
export function openPreview(url){
  const ex=document.getElementById('modal'); if(ex) ex.remove();
  const m=document.createElement('div'); m.id='modal'; m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(2px);display:grid;place-items:center;z-index:80';
  m.innerHTML=`<div style="width:min(960px,94vw);height:min(80vh,760px);background:var(--surface);border:1px solid rgba(163,92,255,.35);border-radius:14px;box-shadow:var(--shadow);position:relative;overflow:hidden">
  <button id="closeModal" style="position:absolute;right:10px;top:10px;border:1px solid rgba(255,255,255,.15);background:transparent;color:inherit;border-radius:8px;padding:6px 10px">Close</button>
  <iframe src="${$u(url)}" style="width:100%;height:100%;border:0" loading="lazy"></iframe></div>`;
  document.body.appendChild(m); m.querySelector('#closeModal').addEventListener('click', ()=>m.remove());
}
