(function () {
  'use strict';

  /* Aquí vivían el cursor personalizado que seguía al mouse, el efecto
     magnético de botones y logo, y la inclinación 3D de las tarjetas al
     pasar el mouse. Se quitaron: eran "estilo Cuberto", una línea de
     interacción distinta a la del resto del sitio (que solo usa el fade-up
     por scroll), y quedaban como ruido sobre el contenido real.
     Se queda únicamente el resaltado de la línea de tiempo, que reacciona
     al scroll, no al mouse. */

  if ('IntersectionObserver' in window) {
    var observadorPasos = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('paso-activo');
        }
      });
    }, { threshold: 0.15 });

    var pasos = document.querySelectorAll('.paso');
    pasos.forEach(function (paso) {
      observadorPasos.observe(paso);
    });
  }

})();
