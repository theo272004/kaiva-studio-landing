/* Idioma del sitio: español o inglés en la MISMA URL.

   No hay páginas /en/ (regla de la casa: nada de URLs nuevas). El HTML sigue
   en español, que es lo que lee Google, y este archivo cambia el texto en el
   navegador de quien lo prefiere en inglés.

   Quién ve inglés:
   1. ?lang=en o ?lang=es en la dirección (queda guardado).
   2. Lo que la persona eligió antes con el botón EN/ES (localStorage).
   3. Si nunca eligió: el primer idioma de su navegador que sea español o
      inglés. Si no tiene ninguno de los dos (francés, alemán…), inglés.
   Los robots (Googlebot, Lighthouse, vistas previas) ven SIEMPRE español:
   Googlebot renderiza con el navegador en en-US y, sin esta excepción,
   indexaría el sitio en inglés.

   Cómo traduce: /assets/idioma-en.js define window.KV_EN, un diccionario
   «texto en español → texto en inglés». Las claves son el contenido de cada
   bloque de texto con las etiquetas sin atributos: «Escríbenos por
   <a>WhatsApp</a>». Al traducir se REUSAN los elementos originales (enlaces,
   iconos, listeners); solo cambia el texto. Si alguien edita un texto en
   español y no actualiza el diccionario, ese bloque se queda en español:
   no se rompe nada.

   Para sacar las claves de una página: abrirla y ejecutar
   __kvIdioma.extraer() en la consola. */
(function () {
  var d = document, h = d.documentElement;
  var BOT = /bot\b|bot\/|crawl|spider|slurp|lighthouse|inspectiontool|pagespeed|facebookexternalhit|whatsapp|preview/i;

  function leer() { try { return localStorage.getItem('kv-idioma'); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem('kv-idioma', v); } catch (e) {} }

  function elegir() {
    if (BOT.test(navigator.userAgent || '')) return 'es';
    var q = /[?&]lang=(en|es)(?:&|$)/.exec(location.search);
    if (q) { guardar(q[1]); return q[1]; }
    var s = leer();
    if (s === 'en' || s === 'es') return s;
    var ls = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'es'];
    for (var i = 0; i < ls.length; i++) {
      var l = String(ls[i]).toLowerCase().slice(0, 2);
      if (l === 'es') return 'es';
      if (l === 'en') return 'en';
    }
    return 'en';
  }

  var idioma = elegir();
  var script = d.currentScript;
  var version = script && /[?&]v=([^&]+)/.exec(script.src);
  version = version ? version[1] : '';

  /* ---------- Recorrido del DOM ---------- */
  var SALTAR = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, TEXTAREA: 1, svg: 1, SVG: 1, IFRAME: 1, CANVAS: 1, VIDEO: 1 };
  var EN_LINEA = { A: 1, ABBR: 1, B: 1, BDI: 1, BR: 1, CITE: 1, CODE: 1, DFN: 1, EM: 1, I: 1, IMG: 1, KBD: 1, MARK: 1, Q: 1, S: 1, SMALL: 1, SPAN: 1, STRONG: 1, SUB: 1, SUP: 1, TIME: 1, U: 1, WBR: 1, svg: 1, SVG: 1, PICTURE: 1 };
  var VACIOS = { BR: 1, IMG: 1, WBR: 1, INPUT: 1 };
  var ATRIBUTOS = ['placeholder', 'aria-label', 'title', 'alt', 'data-label', 'data-tip'];

  function limpio(t) { return t.replace(/[\s ]+/g, ' '); }
  function escapar(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tag(el) { return el.tagName.toLowerCase(); }

  function conTexto(el) { return /\S/.test((el.textContent || '').replace(/ /g, ' ')); }

  // Un elemento es «opaco» si no tiene texto propio (iconos, imágenes,
  // adornos): se mueve tal cual y no se mira por dentro.
  function opaco(el) { return SALTAR[el.tagName] || VACIOS[el.tagName] || !conTexto(el); }

  function soloEnLinea(el) {
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
      if (opaco(c) && (EN_LINEA[c.tagName] || c.tagName === 'svg')) continue;
      if (!EN_LINEA[c.tagName] || !soloEnLinea(c)) return false;
    }
    return true;
  }

  function serializar(el) {
    var s = '';
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) s += escapar(limpio(n.nodeValue));
      else if (n.nodeType === 1) {
        var t = tag(n);
        if (VACIOS[n.tagName]) s += '<' + t + '>';
        else if (opaco(n)) s += '<' + t + '></' + t + '>';
        else s += '<' + t + '>' + serializar(n) + '</' + t + '>';
      }
    }
    return s;
  }

  function clave(el) { return serializar(el).replace(/ {2,}/g, ' ').trim(); }

  // li > a con todo el texto dentro: la clave es el texto del enlace.
  function bajar(el) {
    for (;;) {
      var hijos = [], n;
      for (n = el.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3 && /\S/.test(n.nodeValue.replace(/ /g, ' '))) return el;
        if (n.nodeType === 1 && !opaco(n)) hijos.push(n);
        else if (n.nodeType === 1) return el;
      }
      if (hijos.length !== 1) return el;
      el = hijos[0];
    }
  }

  // Reconstruye el bloque con el texto en inglés reusando los elementos
  // originales: el k-ésimo <a> del inglés es el k-ésimo <a> del español.
  function reconstruir(el, html) {
    var tpl = d.createElement('template');
    tpl.innerHTML = html;
    var pozo = {};
    var todos = el.getElementsByTagName('*');
    for (var i = 0; i < todos.length; i++) {
      var t = tag(todos[i]);
      (pozo[t] = pozo[t] || []).push(todos[i]);
    }
    function armar(origen) {
      var frag = d.createDocumentFragment();
      for (var n = origen.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) { frag.appendChild(d.createTextNode(n.nodeValue)); continue; }
        if (n.nodeType !== 1) continue;
        var t = tag(n), viejo = pozo[t] && pozo[t].shift();
        if (!viejo) {
          viejo = d.createElement(t);
          for (var a = 0; a < n.attributes.length; a++) viejo.setAttribute(n.attributes[a].name, n.attributes[a].value);
        }
        if (VACIOS[viejo.tagName] || (opaco(viejo) && !conTexto(n))) { frag.appendChild(viejo); continue; }
        // Los hijos originales que se reusan se sacan antes de vaciarlo.
        var dentro = armar(n);
        while (viejo.firstChild) viejo.removeChild(viejo.firstChild);
        viejo.appendChild(dentro);
        frag.appendChild(viejo);
      }
      return frag;
    }
    var nuevo = armar(tpl.content);
    while (el.firstChild) el.removeChild(el.firstChild);
    el.appendChild(nuevo);
  }

  /* ---------- Traducir ---------- */
  var DIC = null, recoger = null;

  function buscar(k) {
    if (recoger) { if (k) recoger[k] = 1; return null; }
    var dic = DIC || window.KV_EN;
    var v = dic && dic[k];
    return v && v !== k ? v : null;
  }

  function atributos(el) {
    for (var i = 0; i < ATRIBUTOS.length; i++) {
      var a = el.getAttribute(ATRIBUTOS[i]);
      if (a && /\S/.test(a)) {
        var v = buscar(limpio(a).trim());
        if (v) el.setAttribute(ATRIBUTOS[i], v);
      }
    }
    if (el.tagName === 'INPUT' && /^(submit|button)$/i.test(el.type) && el.value) {
      var w = buscar(limpio(el.value).trim());
      if (w) el.value = w;
    }
  }

  function recorrer(el) {
    if (el.nodeType !== 1 || SALTAR[el.tagName] || el.getAttribute('data-idioma') === 'no') return;
    atributos(el);
    if (conTexto(el) && soloEnLinea(el)) {
      var b = bajar(el), k = clave(b), v = buscar(k);
      if (v) reconstruir(b, v);
      var dentro = b.getElementsByTagName('*');
      for (var i = 0; i < dentro.length; i++) atributos(dentro[i]);
      return;
    }
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 1) recorrer(n);
      else if (n.nodeType === 3 && /\S/.test(n.nodeValue.replace(/ /g, ' '))) {
        var t = limpio(n.nodeValue), w = buscar(t.trim());
        if (w) n.nodeValue = t.match(/^ */)[0] + w + t.match(/ *$/)[0];
      }
    }
  }

  function cabecera() {
    var t = buscar(limpio(d.title).trim());
    if (t) d.title = t;
    var metas = d.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]');
    for (var i = 0; i < metas.length; i++) {
      var v = buscar(limpio(metas[i].content).trim());
      if (v) metas[i].content = v;
    }
  }

  // Lo que los scripts de la página escriben después (avisos del formulario,
  // el banner de cookies, textos que rotan) se traduce al aparecer.
  var observador = null;
  function vigilar() {
    if (observador || !window.MutationObserver) return;
    observador = new MutationObserver(function (lista) {
      var vistos = [];
      for (var i = 0; i < lista.length; i++) {
        var x = lista[i].target;
        if (x.nodeType !== 1) x = x.parentNode;
        while (x && x.parentNode && x.parentNode.nodeType === 1 && EN_LINEA[x.tagName] && x.parentNode !== d.body) x = x.parentNode;
        if (x && x.nodeType === 1 && vistos.indexOf(x) < 0) vistos.push(x);
      }
      for (var j = 0; j < vistos.length; j++) if (d.contains(vistos[j])) recorrer(vistos[j]);
      observador.takeRecords();
    });
    observador.observe(d.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title'] });
  }

  /* ---------- Botón EN / ES ---------- */
  function botones() {
    var css = d.createElement('style');
    css.textContent =
      '.kv-lang{font:inherit;font-size:12px;font-weight:600;letter-spacing:.06em;line-height:1;color:inherit;background:none;' +
      'border:1px solid currentColor;border-radius:999px;padding:7px 10px;margin-right:8px;cursor:pointer;opacity:.75;transition:opacity .2s}' +
      '.kv-lang:hover,.kv-lang:focus-visible{opacity:1}' +
      '.float-nav ul .kv-lang{font-size:11px;padding:5px 8px;margin:0}' +
      '.mm-foot .kv-lang{font-size:14px;padding:12px 16px;margin:0 0 14px}' +
      '.kv-lang-pie{display:inline-block;margin-top:10px}';
    d.head.appendChild(css);
    var otro = idioma === 'en' ? 'es' : 'en';
    function boton() {
      var b = d.createElement('button');
      b.type = 'button';
      b.className = 'kv-lang';
      b.lang = otro;
      b.textContent = otro === 'en' ? 'EN' : 'ES';
      b.setAttribute('aria-label', otro === 'en' ? 'Read this page in English' : 'Ver esta página en español');
      b.setAttribute('data-idioma', 'no');
      b.addEventListener('click', function () {
        guardar(otro);
        if (window.gtag) try { window.gtag('event', 'cambio_idioma', { idioma: otro }); } catch (e) {}
        var u = location.href.replace(/([?&])lang=(en|es)(&|$)/, function (_, a, __, c) { return c ? a : ''; });
        if (u !== location.href) location.replace(u); else location.reload();
      });
      return b;
    }
    // Barra de arriba (junto a «Agendar llamada»), barra flotante (como un
    // enlace más: su cuadrícula no admite otra columna) y menú del celular.
    var lugares = d.querySelectorAll('.nav-end, .mm-foot');
    for (var i = 0; i < lugares.length; i++) {
      var ref = lugares[i].querySelector('.nav-cta, .btn, .circle');
      lugares[i].insertBefore(boton(), ref || lugares[i].firstChild);
    }
    var flotante = d.querySelector('.float-nav > ul');
    if (flotante) {
      var li = d.createElement('li');
      li.appendChild(boton());
      flotante.appendChild(li);
      lugares = d.querySelectorAll('.nav-end, .mm-foot, .float-nav');
    }
    if (!lugares.length) {
      var pie = d.querySelector('footer') || d.body;
      var b = boton(); b.classList.add('kv-lang-pie');
      pie.appendChild(b);
    }
  }

  /* ---------- Arranque ----------
     Hay que traducir ANTES de que corran los scripts de la página: varios
     parten los titulares en una <span> por palabra (para el efecto al pasar
     el mouse) y, si traducimos después, las palabras ya no cuadran. Por eso
     el diccionario se carga sin diferir y se traduce mientras el navegador
     lee el HTML: el navegador entrega las mutaciones pendientes justo antes
     de ejecutar cada <script> del cuerpo, y en ese momento se traduce todo
     lo que ya está completo por encima de él. */
  var hechos = typeof WeakSet === 'function' ? new WeakSet() : null;
  var parciales = hechos ? new WeakSet() : null;

  // Recorre lo que ya terminó de leerse antes del script s.
  function hasta(el, s) {
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
      if (c === s) return true;
      if (c.contains(s)) {
        if (c.tagName === 'P' || c.tagName === 'LI' || /^H[1-6]$/.test(c.tagName)) return true;
        if (parciales && !parciales.has(c)) { parciales.add(c); atributos(c); }
        return hasta(c, s);
      }
      if (hechos && hechos.has(c)) continue;
      recorrer(c);
      if (hechos) hechos.add(c);
    }
    return false;
  }

  // Al terminar la carga: lo que quedó después del último script, sin volver
  // a pasar por lo ya traducido (los scripts ya lo partieron en palabras).
  function resto(el) {
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
      if (hechos.has(c)) continue;
      if (parciales.has(c)) { resto(c); continue; }
      recorrer(c);
      hechos.add(c);
    }
  }

  var lectura = null;
  function leerMientrasCarga() {
    if (!window.MutationObserver) return;
    lectura = new MutationObserver(function (lista) {
      if (!d.body) return;
      for (var i = lista.length - 1; i >= 0; i--) {
        var a = lista[i].addedNodes;
        for (var j = a.length - 1; j >= 0; j--) {
          if (a[j].nodeName === 'SCRIPT' && d.body.contains(a[j])) { hasta(d.body, a[j]); return; }
        }
      }
    });
    lectura.observe(h, { childList: true, subtree: true });
  }

  function mostrar() { h.classList.remove('kv-en-espera'); }

  var recoger_fin = null, espia = null, dinamicas = {};
  var extrayendo = /[?&]kvextraer=1/.test(location.search);
  if (extrayendo) { recoger = {}; leerMientrasCarga(); }
  else if (idioma === 'en') {
    h.lang = 'en';
    h.classList.add('kv-en', 'kv-en-espera');
    d.write('<style>html.kv-en-espera body{opacity:0!important}</style>' +
      '<script src="/assets/idioma-en.js' + (version ? '?v=' + version : '') + '"><\/script>');
    setTimeout(mostrar, 3000);
    leerMientrasCarga();
  }

  function alCargar() {
    if (lectura) { lectura.takeRecords(); lectura.disconnect(); }
    if (extrayendo) {
      if (hechos) resto(d.body);
      recoger_fin = recoger; recoger = null;
      // Desde aquí, lo que escriban los scripts (banner de cookies, avisos).
      espia = new MutationObserver(function (l) {
        recoger = dinamicas;
        for (var i = 0; i < l.length; i++) {
          var x = l[i].target; if (x.nodeType !== 1) x = x.parentNode;
          if (x && x.nodeType === 1 && !x.closest('[data-idioma="no"]')) recorrer(x);
        }
        recoger = null;
      });
      espia.observe(d.body, { childList: true, subtree: true, characterData: true });
    }
    if (idioma === 'en' && !extrayendo) {
      DIC = window.KV_EN || {};
      cabecera();
      // Pasada completa: lo que los scripts diferidos (formulario, cookies)
      // metieron dentro de bloques ya traducidos. Lo ya traducido no vuelve
      // a cambiar porque su texto en inglés no es una clave.
      recorrer(d.body);
      vigilar();
      mostrar();
    }
    botones();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', alCargar);
  else alCargar();

  window.__kvIdioma = {
    idioma: idioma,
    // Con ?kvextraer=1 en la dirección: devuelve las claves de la página tal
    // como estaban ANTES de los scripts, y luego lo que los scripts escriban
    // durante ms milisegundos (avisos, textos que rotan).
    extraer: function (ms) {
      var bolsa = recoger_fin || {};
      bolsa[limpio(d.title).trim()] = 1;
      var metas = d.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"]');
      for (var i = 0; i < metas.length; i++) bolsa[limpio(metas[i].content).trim()] = 1;
      return new Promise(function (ok) {
        setTimeout(function () {
          if (espia) espia.disconnect();
          ok({ fijas: Object.keys(bolsa), dinamicas: Object.keys(dinamicas).filter(function (k) { return !bolsa[k]; }) });
        }, ms || 0);
      });
    }
  };
})();
