/* ============================================================================
   LA LUZ DEL MOUSE (2026-10-27). La misma de la pantalla de entrada de Kaiva OS
   (kaiva-diagnostico: public/assets/kp-luz.js), con sus mismos números: un
   resplandor morado oscuro que sigue al mouse con un poco de retraso y deja un
   rastro que se va apagando. Nace apagado, se enciende con el movimiento y,
   quieto, se desvanece solo.
   Aquí vive dentro del bloque negro de arriba (.hero), detrás del texto. Reemplaza
   al avión de papel, que se movía con JavaScript y se quedaba atrás o pegado:
   el cursor ahora es el de Kaiva, nativo (en el CSS de cada página).
   Liviano: lienzo a media resolución, un solo requestAnimationFrame que se
   detiene cuando no queda luz o el bloque no está a la vista. No corre en
   pantallas táctiles ni con «movimiento reducido».
   ============================================================================ */
(function () {
  var zona = document.querySelector('.hero');
  if (!zona || !window.matchMedia) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var estilo = document.createElement('style');
  estilo.textContent =
    '.luz-lienzo,.luz-grano{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;border-radius:inherit}' +
    '.luz-lienzo{filter:blur(28px)}' +
    '.luz-grano{background-repeat:repeat;mix-blend-mode:overlay}';
  document.head.appendChild(estilo);

  var lienzo = document.createElement('canvas');
  lienzo.className = 'luz-lienzo';
  lienzo.setAttribute('aria-hidden', 'true');
  zona.appendChild(lienzo);
  // Tramado invisible: varía ±1 tono, no se ve como grano; solo deshace los
  // escalones del morado oscuro. Sobre el negro, «overlay» no cambia nada.
  var ruido = document.createElement('canvas');
  ruido.width = ruido.height = 160;
  var gr0 = ruido.getContext('2d'), img = gr0.createImageData(160, 160);
  for (var i = 0; i < img.data.length; i += 4) {
    var v = 128 + Math.round((Math.random() - 0.5) * 10);
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  gr0.putImageData(img, 0, 0);
  var grano = document.createElement('div');
  grano.className = 'luz-grano';
  grano.setAttribute('aria-hidden', 'true');
  grano.style.backgroundImage = 'url(' + ruido.toDataURL() + ')';
  zona.appendChild(grano);

  var g = lienzo.getContext('2d');
  var ESC = 0.5;                 // el lienzo va a media resolución
  var w = 0, h = 0;
  function medir () {
    w = Math.ceil(zona.clientWidth * ESC); h = Math.ceil(zona.clientHeight * ESC);
    lienzo.width = w; lienzo.height = h;
  }
  medir();
  if (window.ResizeObserver) new ResizeObserver(medir).observe(zona);
  else addEventListener('resize', medir);

  // Solo trabaja mientras el bloque se ve.
  var visible = true;
  if (window.IntersectionObserver) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(zona);

  var raton = null, meta = null, pos = null, energia = 0, corriendo = false, ultimo = 0;

  addEventListener('pointermove', function (e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    var antes = raton;
    raton = { x: e.clientX, y: e.clientY };
    // Cuanto más se mueve, más se enciende; sube despacio, nunca de golpe.
    if (antes) energia = Math.min(1, energia + Math.min(Math.hypot(raton.x - antes.x, raton.y - antes.y) * ESC, 40) / 260);
    ultimo = performance.now();
    if (!corriendo && visible) { corriendo = true; requestAnimationFrame(cuadro); }
  }, { passive: true });
  document.addEventListener('mouseleave', function () { ultimo = 0; });

  function mancha (x, y, r, a) {
    var gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(54, 17, 95, ' + a + ')');          // #36115F, el más hondo
    gr.addColorStop(0.45, 'rgba(78, 30, 134, ' + (a * 0.55) + ')'); // #4E1E86
    gr.addColorStop(1, 'rgba(78, 30, 134, 0)');
    g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }

  function cuadro (t) {
    // El rastro: lo de antes se borra un poco en cada cuadro.
    g.globalCompositeOperation = 'destination-out';
    g.fillStyle = 'rgba(0, 0, 0, 0.05)';
    g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = 'source-over';

    if (raton) {
      // El mouse, medido desde la esquina del bloque (sigue bien al hacer scroll).
      var caja = zona.getBoundingClientRect();
      var x = (raton.x - caja.left) * ESC, y = (raton.y - caja.top) * ESC;
      if (!meta) { meta = { x: x, y: y }; pos = { x: x, y: y }; }
      meta.x = x; meta.y = y;
      // La luz va detrás del mouse, con un poco de retraso.
      pos.x += (meta.x - pos.x) * 0.09;
      pos.y += (meta.y - pos.y) * 0.09;
      // Quieta (o fuera de la ventana) se va apagando.
      if (t - ultimo > 120) energia *= 0.965;
      if (energia > 0.004) mancha(pos.x, pos.y, 120 + 50 * energia, 0.085 * energia);
    }

    // Se detiene cuando ya no queda nada encendido o el bloque salió de la vista.
    if (visible && (energia > 0.004 || t - ultimo < 2500)) requestAnimationFrame(cuadro);
    else { corriendo = false; g.clearRect(0, 0, w, h); }
  }
})();
