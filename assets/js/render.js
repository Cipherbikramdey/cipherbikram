
// Ebooks list
async function loadEbooks(){
  const mount = document.getElementById('ebooks-grid');
  if(!mount) return;
  const items = await fetchJSON('../data/ebooks.json');
  mount.innerHTML = items.map(x => renderCard(x)).join('');
}

// Tools list
async function loadTools(){
  const mount = document.getElementById('tools-grid');
  if(!mount) return;
  const items = await fetchJSON('../data/tools.json');
  mount.innerHTML = items.map(x => renderCard(x)).join('');
}

// Techniques list
async function loadTechniques(){
  const mount = document.getElementById('techniques-grid');
  if(!mount) return;
  const items = await fetchJSON('../data/techniques.json');
  mount.innerHTML = items.map(x => `
    <div class="card">
      <div class="title">${x.title}</div>
      <div class="desc">${x.desc||''}</div>
      <div class="copy-row">
        <code class="code" style="flex:1">${x.command}</code>
        <button class="btn btn-ghost copy-btn" onclick="copyText('${x.command.replace(/'/g, "\'")}')">Copy</button>
      </div>
      <div class="notice">Difficulty: <span class="tag">${x.level||'N/A'}</span></div>
    </div>
  `).join('');
}

// Gallery list
async function loadGallery(){
  const mount = document.getElementById('gallery-grid');
  if(!mount) return;
  const items = await fetchJSON('../data/gallery.json');
  mount.innerHTML = items.map(x => `
    <a href="${x.href}" target="_blank" rel="noopener"><img src="${x.href}" alt="${x.title||''}"></a>
  `).join('');
}

// Blogs list
async function loadBlogs(){
  const mount = document.getElementById('blogs-grid');
  if(!mount) return;
  const items = await fetchJSON('../data/blogs.json');
  const cards = items.map(x => `
    <div class="card">
      <div class="title">${x.title}</div>
      <div class="desc">${x.desc||''}</div>
      <div class="notice">Date: <span class="tag">${x.date||''}</span> ${x.tags && x.tags.length? '&nbsp;Tags: ' + x.tags.map(t=>'<span class="tag">'+t+'</span>').join(' '): ''}</div>
      <div style="margin-top:10px">
        <a class="btn btn-primary" href="${x.href}">Read</a>
      </div>
    </div>
  `).join('');
  mount.innerHTML = cards;
}
