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

   Eventos que manda (revisados el 2026-10-12 contra el sitio de hoy)
   -----------------
   La portada nueva (oct 2026) ya no tiene diagnóstico, chat, vitrina ni
   lista de espera, y medía exactamente eso: la mitad de los eventos
   apuntaba a elementos que no existen y lo que hoy importa no se medía.

   · cta_agendar         — clic en cualquier "Agendar llamada" / "Cuéntanos
                           tu proyecto". Lleva la ZONA (hero, nav, planes,
                           cierre…) y, si salió de una tarjeta de planes,
                           el PLAN y la situación del interruptor ("estoy
                           empezando" / "quiero crecer"). El plan además se
                           guarda en la pestaña y viaja con el contacto al
                           panel (contacto.js): llega diciendo qué quiere.
   · contacto_whatsapp   — clic en el enlace de WhatsApp.      [evento clave]
   · contacto_correo     — clic en un mailto:.                 [evento clave]
   · ve_portafolio       — clic hacia /portfolio/, con la categoría (#web…).
   · abre_servicio       — abre un servicio del acordeón: qué interesa.
   · interactua_demo     — juega con una demo de la portada (colores, letra,
                           periodo, pasos del proceso). Una vez por demo y
                           visita: es señal de interés, no un contador.
   · red_social          — sale a Instagram, LinkedIn o Behance.
   · conoce_equipo       — clic hacia /nosotros/.
   · profundidad_lectura — 25/50/75/100% de la página, una vez cada uno.

   generate_lead (envío del formulario) NO está aquí: lo dispara
   contacto.js cuando el panel confirma que el contacto quedó guardado,
   con el plan que traía. Es EL evento clave del sitio.
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
    /* El menú primero: el botón "Agendar llamada" de arriba vive dentro del
       hero en el marcado y se contaba como si fuera el del hero. */
    if (el.closest && el.closest('nav, .float-nav')) return 'menu';
    var nombres = { top: 'hero', inicio: 'hero', plans: 'planes', mmenu: 'menu-movil', note: 'contacto' };
    var s = el.parentElement && el.parentElement.closest ? el.parentElement.closest('[id]') : null;
    while (s) {
      if (s.id) return nombres[s.id] || s.id;
      s = s.parentElement && s.parentElement.closest ? s.parentElement.closest('[id]') : null;
    }
    return 'sin-seccion';
  }

  /* El plan de la tarjeta y la situación del interruptor de Planes. */
  function planDe(el) {
    var t = el.closest ? el.closest('[data-plan]') : null;
    if (!t) return null;
    var n = t.querySelector('.pname');
    var sw = document.getElementById('switch');
    return {
      plan: (n ? n.textContent.trim() : t.getAttribute('data-plan')).slice(0, 40),
      situacion: sw && sw.getAttribute('aria-checked') === 'true' ? 'quiere crecer' : 'está empezando'
    };
  }

  var demosVistas = {};

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a, button') : null;
    if (!a) return;

    var href = a.getAttribute('href') || '';
    var texto = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);

    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
      mandar('contacto_whatsapp', { zona: zona(a) });
      return;
    }
    if (href.indexOf('mailto:') === 0) {
      mandar('contacto_correo', { zona: zona(a) });
      return;
    }

    /* "Agendar llamada": desde dónde, y con qué plan en la cabeza. El plan se
       guarda en la pestaña aunque no haya permiso de cookies: no es medición,
       es para que el contacto que llegue al panel diga qué le interesa. */
    if (href.indexOf('/agendar') === 0) {
      var pl = planDe(a);
      if (pl) { try { sessionStorage.setItem('kv_plan', pl.plan + ' (' + pl.situacion + ')'); } catch (er) {} }
      mandar('cta_agendar', { zona: zona(a), etiqueta: texto, plan: pl ? pl.plan : '', situacion: pl ? pl.situacion : '' });
      return;
    }

    if (href.indexOf('/portfolio') === 0) {
      mandar('ve_portafolio', { zona: zona(a), categoria: (href.split('#')[1] || 'todo') });
      return;
    }
    if (href.indexOf('/nosotros') === 0) {
      mandar('conoce_equipo', { zona: zona(a) });
      return;
    }
    var red = /instagram\.com/.test(href) ? 'instagram' : /linkedin\.com/.test(href) ? 'linkedin' : /behance\.net/.test(href) ? 'behance' : '';
    if (red) {
      mandar('red_social', { red: red, zona: zona(a) });
      return;
    }

    if (a.classList && a.classList.contains('acc-btn')) {
      mandar('abre_servicio', { servicio: texto });
      return;
    }

    /* Las demos: cualquier botón dentro de servicios o proceso que no sea
       del acordeón. Una vez por demo (por zona) en cada visita. */
    if (a.tagName === 'BUTTON' && a.closest && a.closest('#servicios, #proceso')) {
      var caja = a.closest('#mw, #sw, #br, #steps, #display, #st, #as');
      var nombres = { mw: 'web', sw: 'software', br: 'marca', steps: 'proceso', display: 'proceso', st: 'proceso', as: 'proceso' };
      var demo = caja ? nombres[caja.id] : zona(a);
      if (!demosVistas[demo]) {
        demosVistas[demo] = true;
        mandar('interactua_demo', { demo: demo, control: texto || (a.className || '').slice(0, 30) });
      }
    }
  });

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
