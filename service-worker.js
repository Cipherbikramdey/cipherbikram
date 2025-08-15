
const CACHE='cb-final-v1';
const CORE=['index.html','assets/css/style.css','assets/js/basepath.js','assets/js/main.js','ebooks/index.html','techniques/index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return; e.respondWith((async()=>{ const cached=await caches.match(e.request); if(cached) return cached; try{ const res=await fetch(e.request); const c=await caches.open(CACHE); if(new URL(e.request.url).origin===location.origin) c.put(e.request,res.clone()); return res;}catch{return caches.match('index.html');}})());});
