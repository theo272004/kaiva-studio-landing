(function () {
  'use strict';

  // Desactivar en dispositivos móviles/táctiles para evitar lag y bugs
  var esTactil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (esTactil) return;

  // ==========================================
  // 1. CURSOR PERSONALIZADO FLUIDO (LERP)
  // ==========================================
  var cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  var mouseX = 0, mouseY = 0; // Posición real del mouse
  var cursorX = 0, cursorY = 0; // Posición suavizada del cursor
  var lerpFactor = 0.15; // Velocidad de retraso (más bajo = más lento/suave)

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * lerpFactor;
    cursorY += (mouseY - cursorY) * lerpFactor;

    cursor.style.transform = 'translate3d(' + (cursorX - 8) + 'px, ' + (cursorY - 8) + 'px, 0)';
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states para el cursor interactivo
  var elementosHover = document.querySelectorAll('a, button, .btn, .lnk, summary');
  elementosHover.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', function () {
      cursor.classList.remove('cursor-hover');
    });
  });

  var tarjetasHover = document.querySelectorAll('.tarjeta, .paso');
  tarjetasHover.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.classList.add('cursor-card-hover');
    });
    el.addEventListener('mouseleave', function () {
      cursor.classList.remove('cursor-card-hover');
    });
  });


  // ==========================================
  // 2. EFECTO MAGNÉTICO EN BOTONES
  // ==========================================
  var botonesMagneticos = document.querySelectorAll('.btn, .logo, .nav-toggle');
  botonesMagneticos.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      // Calcular centro del botón
      var btnX = rect.left + rect.width / 2;
      var btnY = rect.top + rect.height / 2;

      // Distancia entre cursor y centro
      var distX = e.clientX - btnX;
      var distY = e.clientY - btnY;

      // Desplazar levemente el botón hacia el cursor (atracción del 25%)
      btn.style.transform = 'translate(' + (distX * 0.25) + 'px, ' + (distY * 0.25) + 'px)';
      if (btn.querySelector('span, svg, img')) {
        // Mover el contenido interno un poco más rápido para dar profundidad (efecto parallax)
        var contenido = btn.querySelector('span, svg, img');
        contenido.style.transform = 'translate(' + (distX * 0.08) + 'px, ' + (distY * 0.08) + 'px)';
      }
    });

    btn.addEventListener('mouseleave', function () {
      // Restaurar con animación fluida
      btn.style.transform = '';
      var contenido = btn.querySelector('span, svg, img');
      if (contenido) contenido.style.transform = '';
    });
  });


  // ==========================================
  // 3. EFECTO INCLINACIÓN 3D (TILT) EN TARJETAS
  // ==========================================
  var tarjetas = document.querySelectorAll('.tarjeta');
  tarjetas.forEach(function (tarjeta) {
    tarjeta.addEventListener('mousemove', function (e) {
      var rect = tarjeta.getBoundingClientRect();
      var x = e.clientX - rect.left; // Posición X dentro de la tarjeta
      var y = e.clientY - rect.top;  // Posición Y dentro de la tarjeta

      // Normalizar la posición de -0.5 a 0.5
      var normalX = (x / rect.width) - 0.5;
      var normalY = (y / rect.height) - 0.5;

      // Rotaciones en 3D
      var rotacionX = normalY * -12; // Máximo 12 grados de inclinación
      var rotacionY = normalX * 12;

      tarjeta.style.transform = 'perspective(1000px) rotateX(' + rotacionX + 'deg) rotateY(' + rotacionY + 'deg) scale3d(1.02, 1.02, 1.02)';
    });

    tarjeta.addEventListener('mouseleave', function () {
      tarjeta.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });


  // ==========================================
  // 4. ANIMACIÓN FLUIDA DE SCROLL PARA LA TIMELINE
  // ==========================================
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
