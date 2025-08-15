
// Typing effect for hero
(function(){
  const lines = [
    '> Welcome to CipherBikram',
    '> Your gateway to hacking resources...',
    '> Type. Learn. Hack (ethically).'
  ];
  const el = document.getElementById('terminal-lines');
  if(!el) return;

  let i = 0;
  function typeLine(lineIdx){
    if(lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    const p = document.createElement('div');
    p.innerHTML = '<span class="prompt">$</span> ';

    const span = document.createElement('span');
    p.appendChild(span);
    el.appendChild(p);

    let j = 0;
    const tick = () => {
      if(j < line.length){
        span.textContent += line[j];
        j++;
        setTimeout(tick, 30 + Math.random()*40);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor'; cursor.textContent = ' ';
        p.appendChild(cursor);
        setTimeout(()=>{ cursor.remove(); typeLine(lineIdx+1); }, 600);
      }
    };
    tick();
  }
  typeLine(0);
})();

// Simple router highlight
(function(){
  const path = location.pathname.replace(/\/index.html$/, '/');
  document.querySelectorAll('.menu a').forEach(a=>{
    if(a.getAttribute('href') === '.'+path || a.getAttribute('href') === path || a.href === location.href){
      a.style.boxShadow = '0 0 14px rgba(187,0,255,0.35)';
    }
  });
})();
