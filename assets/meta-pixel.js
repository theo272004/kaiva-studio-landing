/* ===================================================================
   PÍXEL DE META — Facebook e Instagram
   ===================================================================

   Qué hace
   --------
   Le avisa a Meta cada vez que alguien ve una página del sitio. Con eso
   el Administrador de eventos muestra visitas, se pueden armar públicos
   de quienes ya entraron y medir si una campaña de Facebook o Instagram
   trajo gente a la web. Sin el píxel, las campañas se miden a ciegas.

   El conjunto de datos se llama "redes" en el Administrador de eventos
   de Meta; el identificador sale de ahí (Conjuntos de datos → redes).

   Consentimiento
   --------------
   Es publicidad, así que va en la categoría de MARKETING, no en la de
   análisis: quien aceptó medir visitas no aceptó que Meta lo reconozca
   para anuncios. No se carga hasta que la persona enciende marketing.
   Igual que clarity.js, escucha el evento de consentimiento.js en vez
   de tocar ese archivo, y además consulta el estado guardado al
   arrancar por si el evento ya había salido (ver la nota de orden en
   clarity.js: el problema es el mismo).
   =================================================================== */

(function () {
  'use strict';

  /* Identificador del conjunto de datos en Meta.

     Si algún día se vacía, este archivo deja de hacer todo. Es la forma
     de apagar el píxel sin desconectar nada más.

     ⚠ SI SE CAMBIA O SE AÑADE OTRO MEDIDOR, ACTUALIZAR /cookies/ Y
     /privacidad/ EN EL MISMO COMMIT. `_fbp` ya está declarada en
     /cookies/ desde que se activó esto (2026-10-23). */
  var PIXEL = '1584231809684979';

  var cargado = false;

  function cargar() {
    // Solo el sitio de verdad: los servidores de prueba no cuentan como visitas.
    if (cargado || !PIXEL || !/(^|\.)kaivastudio\.com$/.test(location.hostname)) return;
    cargado = true;

    /* El fragmento oficial de Meta, dentro de una función para poder
       llamarlo en el momento en que se acepta, sin recargar. */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', PIXEL);
    window.fbq('track', 'PageView');
  }

  function evaluar(estado) {
    /* Solo la categoría de marketing. Análisis no alcanza. */
    if (estado && estado.marketing) cargar();
  }

  if (!PIXEL) return;

  /* 1. Por si la decisión se toma ahora, con el banner delante. */
  window.addEventListener('kv-consent', function (e) {
    evaluar(e.detail);
  });

  /* 2. Por si ya estaba decidida de antes y el evento salió antes de que
        este archivo existiera. */
  if (window.kaivaCookies && typeof window.kaivaCookies.estado === 'function') {
    evaluar(window.kaivaCookies.estado());
  }
})();
