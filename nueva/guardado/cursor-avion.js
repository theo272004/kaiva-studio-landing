// Cursor de avión de papel guardado (no está activo en la landing).
// Va dentro del IIFE principal: usa root (document.documentElement) y reduce.
  /* ---------- Cursor propio: avión de papel dibujado a mano + destello al hacer clic ---------- */
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    var plane=document.createElement('div');plane.className='cur-plane';
    plane.innerHTML='<svg viewBox="0 0 40 30"><defs>'+
      '<linearGradient id="curWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E2E2E8"/></linearGradient>'+
      '<linearGradient id="curFold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D6D6DD"/><stop offset="1" stop-color="#A4A4AF"/></linearGradient>'+
      '<linearGradient id="curRay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#BABAC4"/></linearGradient></defs>'+
      '<path fill="url(#curWing)" stroke="rgba(8,8,8,.5)" stroke-width="1.1" stroke-linejoin="round" d="M2 2L38 3L35 8.5L34.6 21L18.6 28.4Z"/>'+
      '<path fill="url(#curFold)" d="M27.6 13.4L31.6 9.6L33.9 17.6L34.6 21Z"/>'+
      '<path fill="none" stroke="rgba(8,8,8,.32)" stroke-width=".9" stroke-linejoin="round" d="M8.6 5.1L31.6 9.6L33.9 17.6M13.2 8.7L27.6 13.4L34.6 21"/>'+
      '<path fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity=".9" d="M4.5 3.4L34.5 4.2"/></svg>';
    document.body.appendChild(plane);
    root.classList.add('has-cursor');
    var hoverSel='a,button,.ci,.acc-btn,.mail-form,.app,[role="switch"],.toggle span,.mw-art,.mw-row div,.sw-kpi,.sw-row,.br-card,.br-icon,.br-post,.br-logo';
    var ray='M0 -7L-4.6 -23Q0 -24.8 4.6 -23Z';
    function burst(x,y){
      var d=document.createElement('div');d.className='cur-burst';
      d.style.transform='translate3d('+x+'px,'+y+'px,0)';
      d.innerHTML='<svg viewBox="0 0 64 64">'+[-68,-24,14,52].map(function(a){return '<path fill="url(#curRay)" stroke="rgba(8,8,8,.42)" stroke-width="1" stroke-linejoin="round" transform="translate(32 46) rotate('+a+')" d="'+ray+'"/>'}).join('')+'</svg>';
      document.body.appendChild(d);setTimeout(function(){d.remove()},700);
    }
    document.addEventListener('mousemove',function(e){
      plane.style.transform='translate3d('+e.clientX+'px,'+e.clientY+'px,0)';
      root.classList.add('cur-on');
      plane.classList.toggle('hover',!!(e.target.closest&&e.target.closest(hoverSel)));
    });
    document.addEventListener('mouseout',function(e){if(!e.relatedTarget)root.classList.remove('cur-on')});
    var goneT=null;
    document.addEventListener('mousedown',function(e){plane.classList.add('gone');if(!reduce)burst(e.clientX,e.clientY);clearTimeout(goneT);goneT=setTimeout(function(){plane.classList.remove('gone')},450)});
  }
