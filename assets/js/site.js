
// Theme and menu script
(function(){
  const root = document.documentElement;
  const themeToggle = () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
  };
  // init theme
  const saved = localStorage.getItem('site-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', saved);

  // wire up toggle button
  document.addEventListener('click', function(e){
    if (e.target.closest && e.target.closest('[data-toggle="theme"]')) {
      themeToggle();
    }
    if (e.target.closest && e.target.closest('[data-toggle="menu"]')){
      document.body.classList.toggle('menu-open');
      const links = document.querySelector('.nav-links');
      if (links) links.style.display = (links.style.display === 'flex') ? 'none' : 'flex';
    }
  });

  // smooth scrolling for anchor links
  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });

  // lazy loading images with intersection observer fallback handled by loading="lazy" attribute already
})();
