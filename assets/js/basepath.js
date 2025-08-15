
(async function(){
  // load config
  let cfg = { github_owner: null, github_repo: null, github_branch: 'main' };
  try{
    const r = await fetch('/data/config.json'); if(r.ok) cfg = await r.json();
  }catch(e){}
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  let base = '/';
  // If repo is user site (github pages root), base '/'
  // Otherwise, if first path segment matches repo name, treat as base
  if(parts.length && cfg.github_repo && parts[0] === cfg.github_repo){ base = '/' + parts[0] + '/'; }
  // Also allow when served under /<repo>/ by detecting index.html absence at root
  if(parts.length>0 && parts[0] !== cfg.github_repo && window.location.hostname.indexOf(cfg.github_owner.toLowerCase())!==-1 && !document.querySelector('link[rel=stylesheet]')){ base = '/'; }
  window.BASE_PATH = base;
  window.$u = (p) => {
    if(!p) return p;
    if(p.startsWith('http')||p.startsWith('data:')) return p;
    if(p.startsWith('/')) p = p.slice(1);
    return base + p;
  };
  window.CB_CONFIG = cfg;
})();
