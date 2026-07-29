/* ================= FECHAS DEL BLOG =================
   El HTML trae siempre la fecha completa dentro del <time>. Eso es lo que ven
   Google y quien navegue sin JavaScript, y es lo que queda si este archivo no
   carga: nunca una entrada sin fecha.

   Aquí solo se cambia por lo que se lee mejor mientras la entrada es reciente
   («ayer», «hace 3 días») y se deja de nuevo en fecha a partir del día once.
   Sin librerías y sin tocar el marcado: basta con que el <time> tenga su
   datetime en formato AAAA-MM-DD.

   Ojo con el huso horario: new Date('2026-07-28') se interpreta como
   medianoche UTC y en Colombia eso cae el día anterior, así que la fecha se
   arma a mano con año, mes y día para que sea medianoche local. */
(function () {
  var etiquetas = document.querySelectorAll('time[datetime]');
  if (!etiquetas.length) return;

  var DIA = 86400000;
  var hoy = new Date();
  hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

  etiquetas.forEach(function (el) {
    var partes = (el.getAttribute('datetime') || '').split('-');
    if (partes.length !== 3) return;

    var fecha = new Date(+partes[0], +partes[1] - 1, +partes[2]);
    if (isNaN(fecha)) return;

    var dias = Math.round((hoy - fecha) / DIA);
    if (dias < 0 || dias > 10) return;   // futuro o ya vieja: se queda la fecha

    /* La fecha completa pasa al title: sigue estando a un paso, sin ocupar
       sitio en la tarjeta. */
    if (!el.title) el.title = el.textContent.trim();

    el.textContent = dias === 0 ? 'hoy'
      : dias === 1 ? 'ayer'
        : 'hace ' + dias + ' días';
  });
})();
