
async function loadEbooks(){
  const mount = document.getElementById('ebooks-grid');
  if(!mount) return;
  const items = await fetch('data/ebooks.json').then(r=>r.json());
  mount.innerHTML = items.map(x => `
    <div class="card">
      <div class="title">${x.title}</div>
      <div class="desc">${x.desc}</div>
      <a class="btn btn-primary" href="${x.href}" target="_blank">Open</a>
    </div>
  `).join('');
}
