/* ===================================================================
   MAPA DE CALOR — Microsoft Clarity
   ===================================================================

   Qué hace y por qué no lo hace Analytics
   ---------------------------------------
   GA4 cuenta eventos: cuánta gente entró, qué botón tocó, hasta dónde
   bajó. Lo que no dice es DÓNDE se detiene la vista, qué se intenta
   tocar y no es un enlace, y en qué párrafo exacto la persona se va.
   Clarity graba la sesión y arma el mapa de calor, que es justo lo que
   hacía falta para decidir qué sección de la portada recortar.

   Es gratis y sin límite de sesiones. La cuenta se abre en
   clarity.microsoft.com; el identificador del proyecto sale al crearlo,
   en el código de instalación que muestra (es la cadena corta del final
   de la URL del script, tipo "abc123xyz").

   Consentimiento
   --------------
   Clarity graba movimiento del mouse y clics, así que es tratamiento de
   datos igual que Analytics: NO se carga hasta que la persona acepta la
   categoría de análisis. No se toca este archivo para eso — se escucha
   el evento que emite consentimiento.js.

   Sobre el orden de carga
   -----------------------
   Los scripts con defer corren en el orden del HTML, y consentimiento.js
   va antes que este. Para quien ya había aceptado en una visita previa,
   ese archivo dispara "kv-consent" durante su propio arranque, o sea
   ANTES de que aquí se registre el oyente: el evento se perdería y el
   mapa de calor no cargaría nunca para los visitantes recurrentes, que
   son justo los que más interesa observar. Por eso aquí se hacen las dos
   cosas — escuchar el evento Y consultar el estado guardado al arrancar.
   Cargar dos veces no es problema: `cargado` lo impide.
   =================================================================== */

(function () {
  'use strict';

  /* Identificador del proyecto en clarity.microsoft.com.

     Si algún día se vacía, este archivo deja de hacer todo: no carga
     scripts ni registra oyentes. Es la forma de apagar el mapa de calor
     sin desconectar nada más.

     ⚠ SI SE CAMBIA O SE AÑADE OTRO MEDIDOR, ACTUALIZAR /cookies/ EN EL
     MISMO COMMIT. Esa página declara una por una las cookies que instala
     el sitio; `_clck` y `_clsk` ya están declaradas ahí desde que se
     activó esto. Publicar una política que no nombre lo que se instala
     es el mismo incumplimiento que teníamos con Analytics. */
  var PROYECTO = 'xusybv5gwd';

  var cargado = false;

  function cargar() {
    if (cargado || !PROYECTO) return;
    cargado = true;

    /* Este es el fragmento oficial de Clarity, con una diferencia: el
       de ellos se ejecuta solo al cargar la página. Aquí va dentro de
       una función para poder llamarlo en el momento en que se acepta,
       sin obligar a recargar. */
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', PROYECTO);
  }

  function evaluar(estado) {
    /* Solo la categoría de análisis. Marketing no alcanza: son permisos
       distintos y la persona pudo haber aceptado uno y no el otro. */
    if (estado && estado.analitica) cargar();
  }

  if (!PROYECTO) return;

  /* 1. Por si la decisión se toma ahora, con el banner delante. */
  window.addEventListener('kv-consent', function (e) {
    evaluar(e.detail);
  });

  /* 2. Por si ya estaba decidida de antes y el evento salió antes de que
        este archivo existiera. Ver la nota del encabezado. */
  if (window.kaivaCookies && typeof window.kaivaCookies.estado === 'function') {
    evaluar(window.kaivaCookies.estado());
  }
})();
