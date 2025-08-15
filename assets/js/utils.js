
// Copy helper
function copyText(text){
  navigator.clipboard.writeText(text).then(()=>{
    alert('Copied to clipboard');
  }).catch(()=>{
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); alert('Copied to clipboard'); }catch(e){ alert('Copy failed'); }
    ta.remove();
  });
}

// Fetch JSON helper
async function fetchJSON(path){
  const res = await fetch(path);
  return await res.json();
}

// Render cards
function renderCard({title, desc, href, extraHTML=''}){
  return `
  <div class="card">
    <div class="title">${title}</div>
    <div class="desc">${desc||''}</div>
    <div class="actions">
      <a class="btn btn-primary" href="${href}" target="_blank" rel="noopener">Open</a>
      ${extraHTML}
    </div>
  </div>`;
}
