/* ===================================================================
   EVENTOS DE CONVERSIÓN — Kaiva Studio
   ===================================================================

   El sitio medía visitas y nada más. Saber que entraron 400 personas no
   sirve para decidir: lo que hay que saber es cuántas llegaron al
   diagnóstico, cuántas abrieron el chat y desde qué página. Eso es lo
   que este archivo manda a GA4.

   Cómo funciona
   -------------
   Todo por delegación en el documento, no enlace por enlace. Así el
   mismo archivo sirve en la portada, en las tres páginas de servicio,
   en el blog y en las que vengan después, sin tocar el marcado.

   Sobre el consentimiento
   -----------------------
   Aquí no se consulta si la persona aceptó cookies, y es a propósito.
   gtag() solo empuja al dataLayer; si nunca se concede permiso, el
   script de Google no se carga y la cola se queda quieta en memoria
   hasta que se cierre la pestaña. Nada viaja. Ver el encabezado de
   consentimiento.js.

   Eventos que manda
   -----------------
   · inicia_diagnostico  — clic hacia /monitor/ o /diagnostico/. Es el
                           evento que más importa: el lead magnet.
   · contacto_whatsapp   — clic en el enlace de WhatsApp.
   · contacto_correo     — clic en un mailto:.
   · abre_chat           — abre el asistente de la portada.
   · pregunta_chat       — escribe una pregunta (con el tema detectado y
                           si se entendió: sirve para saber qué le falta
                           al bot).
   · lista_espera_panel  — pide entrar a la lista del Panel Pro.
   · ve_trabajo          — abre el sitio de un cliente de la vitrina.
   · profundidad_lectura — 25/50/75/100% de la página, una vez cada uno.

   generate_lead (envío del formulario) NO está aquí: ya lo dispara el
   propio manejador del formulario en index.html, que es donde se sabe
   si el correo salió bien.
   =================================================================== */

(function () {
  'use strict';

  function mandar(nombre, datos) {
    if (typeof window.gtag !== 'function') return;
    datos = datos || {};
    /* La página siempre va en el evento. Sin esto no se puede saber si
       el diagnóstico se pide desde la portada o desde una página de
       servicio, que es justo lo que hay que comparar. */
    datos.pagina = location.pathname;
    window.gtag('event', nombre, datos);
  }

  /* Desde qué parte de la página se hizo clic. Sube por el DOM buscando
     una sección con id: es la pista más útil para saber qué bloque
     convierte y cuál está de adorno.

     El hero se llama "top" en el marcado (es el ancla del logo) y eso no
     dice nada en un informe, así que se traduce. Sin esta traducción los
     clics del hero salían como "sin-seccion", que es justo la zona que
     más importa medir. */
  function zona(el) {
    var s = el.closest ? el.closest('[id]') : null;
    while (s) {
      if (s.id === 'top') return 'hero';
      if (s.id) return s.id;
      s = s.parentElement && s.parentElement.closest ? s.parentElement.closest('[id]') : null;
    }
    return 'sin-seccion';
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a, button') : null;
    if (!a) return;

    var href = a.getAttribute('href') || '';
    var texto = (a.textContent || '').trim().slice(0, 60);

    if (href.indexOf('/monitor') === 0 || href.indexOf('/diagnostico') === 0) {
      mandar('inicia_diagnostico', { zona: zona(a), etiqueta: texto });
      return;
    }

    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
      mandar('contacto_whatsapp', { zona: zona(a) });
      return;
    }

    if (href.indexOf('mailto:') === 0) {
      mandar('contacto_correo', { zona: zona(a) });
      return;
    }

    /* Vitrina del hero: los enlaces salen al sitio del cliente. Saber
       cuáles se abren dice qué trabajo engancha más, y por eso vale la
       pena revisar el orden de la baraja con datos y no a ojo. */
    var ficha = a.closest ? a.closest('.sc-item') : null;
    if (ficha) {
      var pie = ficha.querySelector('.sc-caption');
      mandar('ve_trabajo', { cliente: pie ? pie.textContent.trim().slice(0, 60) : 'sin-nombre' });
      return;
    }

    if (a.id === 'faqFab') {
      /* El botón alterna abierto/cerrado y solo interesa la apertura.
         Ojo con el orden: el manejador del chat vive en un script inline
         de index.html, así que ya corrió y ya alternó la clase cuando
         este listener delegado recibe el clic. Por eso se cuenta cuando
         la ventana QUEDÓ abierta, no cuando estaba cerrada. */
      var v = document.getElementById('faqWindow');
      if (v && v.classList.contains('open')) mandar('abre_chat', {});
      return;
    }

    if (a.id === 'btnEsperaPanel' || /lista de espera/i.test(texto)) {
      mandar('lista_espera_panel', { zona: zona(a) });
    }
  });

  /* -----------------------------------------------------------------
     Preguntas al chat
     -----------------------------------------------------------------
     Interesa el tema que se detectó y, sobre todo, cuándo NO se detectó
     ninguno: cada "no entendí" es una respuesta que le falta al bot o
     una señal de que hay que pasar a un modelo de verdad. */
  /* Va en el documento y en FASE DE CAPTURA, no en el formulario. Tiene
     que ser así: el manejador del chat vive en un <script> inline al
     final del body, que se ejecuta durante el parseo, o sea antes que
     este archivo (que va con defer). Si escucháramos el submit en el
     formulario, el suyo correría primero, haría input.value = '' y aquí
     llegaría el campo vacío. La captura en un ancestro corre antes que
     cualquier escucha del elemento destino, así que se lee el texto
     todavía intacto. */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.id !== 'faqForm') return;
    var caja = document.getElementById('faqInput');
    var txt = caja ? caja.value.trim() : '';
    if (!txt) return;
    mandar('pregunta_chat', { texto: txt.slice(0, 100) });
  }, true);

  /* -----------------------------------------------------------------
     Profundidad de lectura
     -----------------------------------------------------------------
     GA4 ya trae scroll al 90%, pero con un solo umbral no se distingue
     "leyó el titular y se fue" de "llegó hasta los planes". En páginas
     largas como estas, saber dónde se cae es lo que dice qué sección
     recortar. */
  var hitos = [25, 50, 75, 100];
  var vistos = {};

  function medirScroll() {
    var alto = document.documentElement.scrollHeight - window.innerHeight;
    if (alto <= 0) return;
    var pct = (window.scrollY / alto) * 100;
    for (var i = 0; i < hitos.length; i++) {
      var h = hitos[i];
      if (pct >= h && !vistos[h]) {
        vistos[h] = true;
        mandar('profundidad_lectura', { porcentaje: h });
      }
    }
    if (vistos[100]) window.removeEventListener('scroll', frenado);
  }

  /* Sin freno esto corre cientos de veces por segundo al hacer scroll.
     El primer intento usaba requestAnimationFrame y estaba mal: rAF no
     corre cuando la pestaña no se está pintando, así que en una pestaña
     de fondo el medidor quedaba muerto en vez de solo dormido. Con marca
     de tiempo el comportamiento no depende de que el navegador pinte. */
  var CADA_MS = 150;
  var ultima = 0;

  function frenado() {
    var ahora = Date.now();
    if (ahora - ultima < CADA_MS) return;
    ultima = ahora;
    medirScroll();
  }

  window.addEventListener('scroll', frenado, { passive: true });

  /* Una medición al entrar. Hace falta para quien llega a un ancla
     (/#planes) o vuelve con el botón atrás y el navegador le restaura la
     posición: en esos casos nunca hay un primer scroll que disparar, y
     sin esto se perdería el hito que ya había alcanzado. */
  medirScroll();
})();
