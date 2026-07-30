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

  /* Pegar aquí el identificador del proyecto de clarity.microsoft.com.
     Mientras esté vacío, este archivo no hace absolutamente nada: no
     carga scripts, no registra oyentes y no molesta. Se puede subir a
     producción sin el ID puesto.

     ⚠ AL PEGAR EL ID HAY QUE ACTUALIZAR /cookies/ EN EL MISMO COMMIT.
     Esa página declara una por una las cookies que instala el sitio, y
     desde el momento en que Clarity arranca instala dos más. Publicar
     una política que no las nombra es el mismo incumplimiento que
     teníamos con Analytics. Las filas a añadir a la tabla:

       _clck  · Microsoft Clarity (análisis) · Identifica el navegador
                entre visitas para unir la grabación de sesión · 1 año
       _clsk  · Microsoft Clarity (análisis) · Une las páginas de una
                misma visita en una sola grabación · 1 día

     Y donde dice "Lo único que instalamos es medición de uso" conviene
     mencionar que la medición incluye mapa de calor y grabación de
     sesión, porque no es lo mismo contar clics que grabar el recorrido
     y hay que decirlo. Clarity enmascara el texto que se escribe en los
     formularios por defecto — vale la pena dejarlo dicho también. */
  var PROYECTO = '';

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
