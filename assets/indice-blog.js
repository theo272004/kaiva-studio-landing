/* ===================================================================
   ÍNDICE LATERAL DE LOS ARTÍCULOS — Kaiva Studio
   ===================================================================

   Los artículos del blog son largos (ocho o diez secciones, diez minutos
   de lectura). Quien llega desde Google casi nunca quiere el artículo
   entero: quiere el trozo que responde su pregunta. Sin un índice, esa
   persona tiene que rodar la rueda buscando a ojo, y muchas se van antes
   de encontrarlo.

   Se construye solo, leyendo los <h2> del artículo
   -----------------------------------------------
   Nada de escribir el índice a mano en cada archivo: son seis artículos
   hoy y uno nuevo cada semana, y un índice escrito a mano se
   desincroniza en cuanto alguien renombra un título. Aquí se leen los
   <h2> que ya existen, se les pone id si no lo tienen y se arma la lista.
   Un artículo nuevo lo hereda sin tocar nada.

   Los ids se derivan del texto del título (no son "seccion-1", "seccion-2")
   para que el enlace que alguien copie y comparta siga significando algo
   dentro de un año, y para que no se rompa al insertar una sección en
   medio.

   Decisiones de diseño
   --------------------
   · Solo aparece en pantallas anchas. En móvil, un índice pegajoso se
     come el alto de la pantalla justo cuando menos sobra; ahí el gesto
     natural es rodar y ya.
   · Solo si hay 3 secciones o más. Con dos, el índice estorba más de lo
     que ayuda.
   · La sección en la que vas se resalta sola. Es lo que convierte el
     índice en una brújula (dónde estoy) y no solo en un menú (a dónde
     puedo ir).
   =================================================================== */

(function () {
  'use strict';

  var MINIMO_SECCIONES = 3;

  var articulo = document.querySelector('.articulo');
  if (!articulo) return;

  var titulos = [].slice.call(articulo.querySelectorAll('h2'));
  if (titulos.length < MINIMO_SECCIONES) return;

  /* --- Ids legibles a partir del texto -------------------------------- */

  function aSlug(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // quita tildes
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);
  }

  var usados = {};
  titulos.forEach(function (h) {
    if (h.id) { usados[h.id] = true; return; }
    var base = aSlug(h.textContent || '') || 'seccion';
    var slug = base;
    var n = 2;
    /* Dos secciones pueden llamarse igual ("Qué hacer", por ejemplo) y
       dos ids repetidos romperían el salto: el navegador iría siempre al
       primero. */
    while (usados[slug]) { slug = base + '-' + n; n++; }
    usados[slug] = true;
    h.id = slug;
  });

  /* --- Construcción --------------------------------------------------- */

  var nav = document.createElement('nav');
  nav.className = 'indice';
  nav.setAttribute('aria-label', 'Secciones de este artículo');

  var titulo = document.createElement('p');
  titulo.className = 'indice-tit';
  titulo.textContent = 'En este artículo';
  nav.appendChild(titulo);

  var lista = document.createElement('ul');
  var enlaces = titulos.map(function (h) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + h.id;
    /* El texto del <h2> puede traer <span>, puntos de color y demás; se
       usa solo el texto plano y se recorta, porque un índice con
       renglones de cuatro líneas deja de ser escaneable. */
    a.textContent = (h.textContent || '').replace(/\s+/g, ' ').trim();
    li.appendChild(a);
    lista.appendChild(li);
    return a;
  });
  nav.appendChild(lista);

  /* El índice va como hermano del artículo dentro del mismo .wrap, y el
     CSS convierte ese contenedor en dos columnas. Se marca con una clase
     en vez de tocar el HTML de los seis artículos. */
  var contenedor = articulo.parentNode;
  contenedor.classList.add('con-indice');
  contenedor.appendChild(nav);

  /* --- Dónde estoy ---------------------------------------------------- */

  function marcar(id) {
    enlaces.forEach(function (a) {
      var activo = a.getAttribute('href') === '#' + id;
      a.classList.toggle('activo', activo);
      /* aria-current además de la clase: quien navega con lector de
         pantalla también merece saber en qué sección va. */
      if (activo) { a.setAttribute('aria-current', 'true'); }
      else { a.removeAttribute('aria-current'); }
    });
  }

  if ('IntersectionObserver' in window) {
    var visibles = {};

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        visibles[e.target.id] = e.isIntersecting;
      });

      /* Se resalta la PRIMERA sección visible en orden del documento, no
         la última que disparó el evento: al rodar hacia arriba los
         eventos llegan en orden inverso y el resaltado saltaría hacia
         atrás de forma errática. */
      for (var i = 0; i < titulos.length; i++) {
        if (visibles[titulos[i].id]) { marcar(titulos[i].id); return; }
      }
    }, {
      /* La banda de detección va en el tercio superior de la pantalla:
         una sección "es la actual" cuando su título está arriba, no
         cuando asoma por abajo. */
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    });

    titulos.forEach(function (h) { obs.observe(h); });
  }

  /* Si alguien llega con un ancla en la URL, esa es la sección activa
     desde el primer momento. */
  if (location.hash) {
    var inicial = document.getElementById(location.hash.slice(1));
    if (inicial) marcar(inicial.id);
  }
})();
