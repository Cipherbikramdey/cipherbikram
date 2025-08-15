
async function loadPartials(){
  const navMount = document.getElementById('nav-mount');
  const footMount = document.getElementById('footer-mount');
  try{
    const [nav, foot] = await Promise.all([
      fetch('/partials/nav.html').then(r=>r.text()),
      fetch('/partials/footer.html').then(r=>r.text())
    ]);
    if(navMount){ navMount.innerHTML = nav; highlightActive(); }
    if(footMount){ footMount.innerHTML = foot; }
  }catch(e){ console.error('Partial load error', e); }
}

function highlightActive(){
  const path = location.pathname.replace(/index\.html$/,''); // normalize
  document.querySelectorAll('.menu a[data-path]').forEach(a => {
    const base = a.getAttribute('data-path');
    if(path === base || path === base.replace(/\/$/,'')) a.classList.add('active');
  });
}

async function renderList(jsonPath, mountId){
  const mount = document.getElementById(mountId);
  if(!mount) return;
  try{
    const items = await fetch(jsonPath).then(r=>r.json());
    mount.innerHTML = items.map(x => `
      <div class="card">
        <div class="title">${x.title}</div>
        <div class="desc">${x.desc||''}</div>
        ${x.href ? `<a class="btn btn-primary" href="${x.href}" target="_blank">Open</a>`:''}
      </div>
    `).join('');
  }catch(e){
    mount.innerHTML = `<div class="card"><div class="title">Could not load ${jsonPath}</div></div>`;
  }
}

async function renderGallery(jsonPath, mountId){
  const mount = document.getElementById(mountId);
  if(!mount) return;
  try{
    const items = await fetch(jsonPath).then(r=>r.json());
    mount.innerHTML = `<div class="gallery">` + items.map(x => `
      <img src="${x.src}" alt="${x.alt||'image'}">
    `).join('') + `</div>`;
  }catch(e){
    mount.textContent = "Could not load gallery.";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials();
  // page renders
  renderList('/data/ebooks.json', 'ebooks-grid');
  renderList('/data/techniques.json', 'tech-grid');
  renderList('/data/tools.json', 'tools-grid');
  renderGallery('/data/gallery.json', 'gallery-grid');
});
