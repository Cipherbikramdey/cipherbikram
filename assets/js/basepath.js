
(function(){
  var path = window.location.pathname;
  var parts = path.split('/').filter(Boolean);
  var base = '/';
  if(parts.length && parts[0] && !(parts.length===1 && /index\.html?$/.test(parts[0]))){
    base = '/' + parts[0] + '/';
  }
  if(window.__BASE_OVERRIDE__) base = window.__BASE_OVERRIDE__;
  window.BASE_PATH = base;
  window.$u = (p)=> (p.startsWith('http')||p.startsWith('data:')) ? p : (base + p.replace(/^\//,''));
})();
