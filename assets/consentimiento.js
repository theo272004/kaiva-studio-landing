/* ===================================================================
   CONSENTIMIENTO DE COOKIES — Kaiva Studio
   ===================================================================

   Por qué existe este archivo
   ---------------------------
   Hasta hoy el sitio cargaba Google Analytics en las once páginas sin
   pedirle permiso a nadie. En Colombia eso no se puede: la Ley 1581 de
   2012, su Decreto 1377 de 2013 y la Resolución 32126 de 2022 de la SIC
   piden consentimiento PREVIO, EXPRESO E INFORMADO antes de tratar
   datos personales, y la SIC clasifica las cookies de terceros como
   tratamiento. "Previo" es la palabra que manda: el permiso va antes de
   que el identificador se cargue, no después.

   Decisión de fondo: aquí NO se usa el modo laxo de Consent Mode (dejar
   que gtag cargue y solo bloquear la cookie). El script de Google no se
   descarga hasta que la persona acepta. Es más estricto de lo que
   muchos hacen y más fácil de defender: sin aceptación, el navegador
   nunca habla con Google.

   Reglas del banner (las pide la SIC, no son gusto nuestro):
   · Un banner con solo "Aceptar" NO cumple. Rechazar tiene que costar
     lo mismo que aceptar: un clic, al mismo nivel, igual de visible.
   · Las necesarias no se piden porque sin ellas el sitio no funciona;
     las demás arrancan APAGADAS.
   · La elección se puede cambiar después (enlace en el footer).

   Por qué el CSS va dentro del JS
   -------------------------------
   El sitio no tiene una hoja común: la portada carga portada.css, las
   páginas legales legal.css y el monitor monitor.css. Si el estilo del
   banner viviera en una de ellas habría que cablearlo en cada página y
   se rompería en la que se olvide. Así es un solo archivo que se suelta
   y ya.

   Cómo se usa en una página nueva
   -------------------------------
   En el <head>, y en este orden:

     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag() { dataLayer.push(arguments); }
       gtag('consent', 'default', { ...todo denied... });
     </script>
     <script defer src="/assets/consentimiento.js"></script>

   El bloque inline tiene que ir antes porque define gtag() y fija los
   valores por defecto. Este archivo asume que ya existen.
   =================================================================== */

(function () {
  'use strict';

  var LLAVE = 'kv-consent';
  var VERSION = 1;
  var MEDICION = 'G-BD6VDCSQDC';

  /* Doce meses. El consentimiento no es para siempre: pasado el año se
     vuelve a preguntar. Es la práctica estándar y evita defender un
     "sí" que alguien dio hace tres años. */
  var VENCE_DIAS = 365;

  /* -----------------------------------------------------------------
     Estado guardado
     ----------------------------------------------------------------- */

  function leer() {
    try {
      var crudo = localStorage.getItem(LLAVE);
      if (!crudo) return null;
      var d = JSON.parse(crudo);
      if (!d || d.v !== VERSION || !d.fecha) return null;
      var dias = (Date.now() - d.fecha) / 86400000;
      if (dias > VENCE_DIAS) return null;
      return d;
    } catch (e) {
      /* Navegador con almacenamiento bloqueado (modo incógnito duro,
         iframe restringido). Se trata como "no ha decidido": se le
         pregunta otra vez y no se rastrea. */
      return null;
    }
  }

  function guardar(analitica, marketing) {
    var d = { v: VERSION, fecha: Date.now(), analitica: !!analitica, marketing: !!marketing };
    try { localStorage.setItem(LLAVE, JSON.stringify(d)); } catch (e) { }
    return d;
  }

  /* -----------------------------------------------------------------
     Aplicar la decisión
     ----------------------------------------------------------------- */

  var gtagCargado = false;

  function cargarGtag() {
    if (gtagCargado) return;
    gtagCargado = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEDICION;
    document.head.appendChild(s);
    /* El config va después del consent update (lo hace aplicar) para
       que la primera vista de página ya salga con permiso concedido y
       no se pierda. */
    window.gtag('js', new Date());
    window.gtag('config', MEDICION, { anonymize_ip: true });
  }

  function aplicar(d) {
    if (typeof window.gtag !== 'function') return;

    window.gtag('consent', 'update', {
      analytics_storage: d.analitica ? 'granted' : 'denied',
      ad_storage: d.marketing ? 'granted' : 'denied',
      ad_user_data: d.marketing ? 'granted' : 'denied',
      ad_personalization: d.marketing ? 'granted' : 'denied'
    });

    if (d.analitica || d.marketing) cargarGtag();

    /* Gancho para cuando entren pixeles de Meta o Google Ads: se
       escucha este evento en vez de tocar este archivo.
         window.addEventListener('kv-consent', function (e) {
           if (e.detail.marketing) { ...cargar el pixel... }
         }); */
    try {
      window.dispatchEvent(new CustomEvent('kv-consent', { detail: d }));
    } catch (e) { }
  }

  /* -----------------------------------------------------------------
     Estilos
     ----------------------------------------------------------------- */

  var CSS = [
    '.kvck{position:fixed;left:1rem;bottom:1rem;z-index:9990;width:min(27rem,calc(100vw - 2rem));',
    'background:#fff;color:#0f172a;border:1px solid rgba(15,23,42,.08);border-radius:24px;',
    'box-shadow:0 18px 50px rgba(15,23,42,.14),0 3px 10px rgba(15,23,42,.05);',
    "font-family:'Inter',system-ui,-apple-system,sans-serif;padding:1.4rem 1.4rem 1.25rem;",
    'opacity:0;transform:translateY(14px);transition:opacity .45s cubic-bezier(.2,.8,.2,1),transform .45s cubic-bezier(.2,.8,.2,1)}',
    '.kvck.kv-in{opacity:1;transform:none}',
    '.kvck h2{font-family:\'Inter Tight\',\'Inter\',system-ui,sans-serif;font-size:1.02rem;font-weight:700;',
    'letter-spacing:-.02em;margin:0 0 .45rem;display:flex;align-items:center;gap:.5rem}',
    '.kvck h2 svg{color:#8242f5;flex:none}',
    '.kvck p{font-size:.83rem;line-height:1.55;color:#475569;margin:0 0 1rem}',
    '.kvck a{color:#6a2fe0;text-decoration:underline;text-underline-offset:2px}',
    '.kvck-btns{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}',
    '.kvck-b{font:inherit;font-size:.82rem;font-weight:600;border-radius:99px;padding:.6rem 1.1rem;',
    'border:1px solid transparent;cursor:pointer;transition:transform .2s,background .2s,border-color .2s;flex:1 1 auto}',
    '.kvck-b:hover{transform:translateY(-1px)}',
    '.kvck-b:focus-visible{outline:2px solid #8242f5;outline-offset:2px}',
    '.kvck-si{background:#8242f5;color:#fff}',
    '.kvck-si:hover{background:#6a2fe0}',
    '.kvck-no{background:#fff;color:#0f172a;border-color:rgba(15,23,42,.14)}',
    '.kvck-no:hover{border-color:rgba(15,23,42,.3)}',
    '.kvck-cfg{background:none;border:none;color:#475569;font:inherit;font-size:.78rem;font-weight:500;',
    'text-decoration:underline;text-underline-offset:2px;cursor:pointer;padding:.4rem .2rem;flex:1 0 100%;text-align:center}',
    '.kvck-cfg:hover{color:#0f172a}',
    '.kvck-panel{display:none;margin:0 0 1rem;border-top:1px solid rgba(15,23,42,.08);padding-top:.9rem}',
    '.kvck.kv-abierto .kvck-panel{display:block}',
    '.kvck-fila{display:flex;gap:.75rem;align-items:flex-start;padding:.6rem 0}',
    '.kvck-fila+.kvck-fila{border-top:1px solid rgba(15,23,42,.05)}',
    '.kvck-fila b{display:block;font-size:.82rem;font-weight:600;margin-bottom:.15rem}',
    '.kvck-fila s{display:block;text-decoration:none;font-size:.75rem;line-height:1.45;color:#94a3b8}',
    '.kvck-sw{flex:none;margin-top:.15rem;position:relative;width:2.4rem;height:1.35rem}',
    '.kvck-sw input{position:absolute;inset:0;opacity:0;margin:0;cursor:pointer;width:100%;height:100%}',
    '.kvck-sw i{position:absolute;inset:0;border-radius:99px;background:rgba(15,23,42,.16);transition:background .22s;pointer-events:none}',
    '.kvck-sw i::after{content:"";position:absolute;top:.19rem;left:.19rem;width:.97rem;height:.97rem;',
    'border-radius:50%;background:#fff;transition:transform .22s;box-shadow:0 1px 3px rgba(15,23,42,.25)}',
    '.kvck-sw input:checked+i{background:#8242f5}',
    '.kvck-sw input:checked+i::after{transform:translateX(1.05rem)}',
    '.kvck-sw input:disabled+i{background:#8242f5;opacity:.35}',
    '.kvck-sw input:focus-visible+i{outline:2px solid #8242f5;outline-offset:2px}',
    '@media (max-width:560px){.kvck{left:.6rem;right:.6rem;bottom:.6rem;width:auto;padding:1.2rem 1.1rem 1.1rem;border-radius:20px}}',
    '@media (prefers-reduced-motion:reduce){.kvck{transition:none}.kvck-b{transition:none}}'
  ].join('');

  function inyectarCSS() {
    if (document.getElementById('kvck-css')) return;
    var st = document.createElement('style');
    st.id = 'kvck-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* -----------------------------------------------------------------
     El banner
     ----------------------------------------------------------------- */

  var caja = null;

  /* No es role="dialog" a propósito. Un diálogo modal atrapa el foco y
     tapa el sitio hasta que respondas, y eso en un banner de cookies es
     hostil y perjudica la conversión. Es una región complementaria: se
     puede seguir leyendo la página, pero no se rastrea a nadie hasta
     que decida. */
  function construir(previo) {
    inyectarCSS();

    caja = document.createElement('aside');
    caja.className = 'kvck';
    caja.setAttribute('role', 'region');
    caja.setAttribute('aria-label', 'Aviso de cookies');
    caja.innerHTML =
      '<h2><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10 ' +
      '4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/><path d="M8.5 9.5h.01M12 14h.01M16 12h.01M9 16h.01"/></svg>' +
      'Cookies</h2>' +
      '<p>Usamos cookies necesarias para que el sitio funcione. Las de análisis ' +
      'nos dicen qué páginas sirven y cuáles no — y solo se activan si tú lo autorizas. ' +
      'Puedes ver el detalle en la <a href="/cookies/">política de cookies</a>.</p>' +

      '<div class="kvck-panel">' +
      '  <div class="kvck-fila">' +
      '    <label class="kvck-sw"><input type="checkbox" checked disabled ' +
      '      aria-label="Cookies necesarias (siempre activas)"><i></i></label>' +
      '    <span><b>Necesarias</b><s>Mantienen tu preferencia de cookies y el envío de formularios. ' +
      'Sin ellas el sitio no funciona, así que no se pueden desactivar.</s></span>' +
      '  </div>' +
      '  <div class="kvck-fila">' +
      '    <label class="kvck-sw"><input type="checkbox" id="kvck-an"><i></i></label>' +
      '    <span><b>Análisis</b><s>Google Analytics, con la IP anonimizada. Para saber cuántas ' +
      'personas entran y por dónde se van.</s></span>' +
      '  </div>' +
      '  <div class="kvck-fila">' +
      '    <label class="kvck-sw"><input type="checkbox" id="kvck-mk"><i></i></label>' +
      '    <span><b>Marketing</b><s>Para medir campañas de pago. Hoy no hay ninguna activa; ' +
      'el interruptor queda listo para cuando la haya.</s></span>' +
      '  </div>' +
      '</div>' +

      '<div class="kvck-btns">' +
      '  <button type="button" class="kvck-b kvck-si" id="kvck-todo">Aceptar todo</button>' +
      '  <button type="button" class="kvck-b kvck-no" id="kvck-nada">Solo las necesarias</button>' +
      '  <button type="button" class="kvck-cfg" id="kvck-cfg" aria-expanded="false">Configurar</button>' +
      '</div>';

    document.body.appendChild(caja);

    var an = caja.querySelector('#kvck-an');
    var mk = caja.querySelector('#kvck-mk');
    var cfg = caja.querySelector('#kvck-cfg');

    /* Si viene a cambiar una decisión anterior, los interruptores
       arrancan donde los dejó y el panel ya abierto: no tiene sentido
       hacerle buscar "Configurar" a quien vino justo a eso. */
    if (previo) {
      an.checked = !!previo.analitica;
      mk.checked = !!previo.marketing;
      abrirPanel(cfg);
    }
    etiquetarBotones();

    cfg.addEventListener('click', function () {
      if (caja.classList.contains('kv-abierto')) {
        caja.classList.remove('kv-abierto');
        cfg.setAttribute('aria-expanded', 'false');
        cfg.textContent = 'Configurar';
      } else {
        abrirPanel(cfg);
      }
      etiquetarBotones();
    });

    caja.querySelector('#kvck-todo').addEventListener('click', function () {
      decidir(true, true);
    });

    caja.querySelector('#kvck-nada').addEventListener('click', function () {
      /* Con el panel abierto este botón guarda lo que la persona marcó,
         que es lo que espera. Cerrado, es el rechazo de un clic que
         pide la SIC. */
      if (caja.classList.contains('kv-abierto')) decidir(an.checked, mk.checked);
      else decidir(false, false);
    });

    requestAnimationFrame(function () { caja.classList.add('kv-in'); });
  }

  function abrirPanel(cfg) {
    caja.classList.add('kv-abierto');
    cfg.setAttribute('aria-expanded', 'true');
    cfg.textContent = 'Ocultar opciones';
  }

  function decidir(analitica, marketing) {
    aplicar(guardar(analitica, marketing));
    if (!caja) return;
    caja.classList.remove('kv-in');
    var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () {
      if (caja && caja.parentNode) caja.parentNode.removeChild(caja);
      caja = null;
    }, quieto ? 0 : 450);
  }

  /* Cuando el panel se abre para cambiar la decisión, el botón blanco
     pasa a decir "Guardar". Se ajusta al vuelo porque el texto depende
     de si el panel está abierto. */
  function etiquetarBotones() {
    if (!caja) return;
    var no = caja.querySelector('#kvck-nada');
    no.textContent = caja.classList.contains('kv-abierto') ? 'Guardar mi elección' : 'Solo las necesarias';
  }

  /* -----------------------------------------------------------------
     Arranque
     ----------------------------------------------------------------- */

  function iniciar() {
    var d = leer();
    if (d) {
      aplicar(d);
      return;
    }
    construir(null);
  }

  /* API pública. La usa el enlace "Preferencias de cookies" del footer
     para que se pueda cambiar de opinión, que también lo pide la ley. */
  window.kaivaCookies = {
    abrir: function () {
      if (caja) return;
      construir(leer());
    },
    estado: leer
  };

  /* Cualquier enlace con data-kv-cookies abre el panel. Se escucha en el
     documento en vez de amarrar cada enlace: así el footer no necesita
     saber que este archivo existe, y el href real (/cookies/) queda como
     respaldo si el JS no cargó. */
  document.addEventListener('click', function (e) {
    var enlace = e.target.closest ? e.target.closest('[data-kv-cookies]') : null;
    if (!enlace) return;
    e.preventDefault();
    window.kaivaCookies.abrir();
    if (caja) caja.scrollIntoView({ block: 'nearest' });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
