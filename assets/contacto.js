/* ===================================================================
   FORMULARIO DE CONTACTO — Kaiva Studio (#mailForm, al pie de cada página)
   ===================================================================

   Antes vivía copiado dentro de cada página: 37 copias en seis versiones
   distintas. Solo la portada mandaba el contacto al panel (Kaiva OS); las
   otras 36 lo dejaban en la hoja de Google y en EmailJS, así que quien
   escribía desde un artículo del blog no aparecía en Hoy. Y el mensaje de
   "Listo" dependía solo de EmailJS: si EmailJS fallaba pero el panel lo
   había guardado, la persona veía un error y probablemente se iba.

   Ahora hay un solo archivo. Cada envío va al panel
   (diagnostico.kaivastudio.com/api/contacto.php), que guarda el contacto
   con su canal y manda los dos correos —la confirmación a quien escribió y
   el aviso al equipo— por el correo de Hostinger. Una copia va también a la
   hoja de Google. EmailJS queda solo de emergencia, si el panel no responde.
   Solo si fallan los dos se pide escribir por WhatsApp.

   También manda `generate_lead` a Analytics. La portada nueva lo había
   perdido (la vieja sí lo enviaba) y por eso Analytics marcaba cero
   conversiones aunque llegaran contactos. Ver la nota en eventos.js.

   La animación de enviado: el avión sale del botón, la píldora se vuelve
   un aviso con su check, y la nota amarilla recibe un sello de recibido.
   Con `prefers-reduced-motion` se cambia sin moverse.
   =================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('mailForm');
  if (!form) return;

  var CRM = 'https://diagnostico.kaivastudio.com/api/contacto.php';
  var HOJA_LEADS = 'https://script.google.com/macros/s/AKfycbwqEv37I6bl8g7xdZxrTHgMWswDPAGO6bDbHH70JgLFeqhfLwE0NrJEc_iGTnU-zwEZTA/exec';
  var EJS = { service: 'service_94uqq2e', template: 'template_brvipe9', key: '7bRjr4NU9L0Y5gDsy', endpoint: 'https://api.emailjs.com/api/v1.0/email/send' };
  var FALLO = 'No pudimos enviarlo. Escríbenos a info@kaivastudio.com o por WhatsApp al +57 302 413 7374.';

  var email = document.getElementById('email');
  var nota = document.getElementById('formNote');
  var casilla = document.getElementById('cPrivacy');
  var trampa = document.getElementById('cWebsite');
  var btn = form.querySelector('button[type="submit"]');
  var etiqueta = btn ? btn.textContent : 'Agendar llamada';
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- De dónde vino la visita, recordado durante la pestaña ---------- */
  var ss = null;
  try { ss = window.sessionStorage; } catch (e) {}
  function guardar(k, v) { try { if (ss && v) ss.setItem(k, v); } catch (e) {} }
  function leer(k) { try { return (ss && ss.getItem(k)) || ''; } catch (e) { return ''; } }
  try {
    var q = new URLSearchParams(location.search);
    var ref = document.referrer || '';
    if (q.get('utm_source')) {
      guardar('kv_utm_src', q.get('utm_source'));
      guardar('kv_utm_med', q.get('utm_medium'));
      guardar('kv_utm_camp', q.get('utm_campaign'));
    } else if (!leer('kv_utm_src') && ref && ref.indexOf('kaivastudio.com') === -1) {
      if (/linkedin\.com|lnkd\.in/.test(ref)) guardar('kv_utm_src', 'linkedin');
      else if (/instagram\.com/.test(ref)) guardar('kv_utm_src', 'instagram');
      else if (/behance\.net/.test(ref)) guardar('kv_utm_src', 'behance');
      else if (/google\./.test(ref)) guardar('kv_utm_src', 'google');
    }
  } catch (e) {}

  /* "desde la portada", "desde el artículo «…»": lo que lee quien recibe el aviso. */
  function desde() {
    var p = location.pathname.replace(/index\.html$/, '');
    if (p === '/') return 'la portada';
    if (p === '/agendar/') return 'la página de agendar llamada';
    if (p === '/blog/') return 'el blog';
    if (p === '/portfolio/') return 'el portafolio';
    if (p.indexOf('/blog/') === 0) {
      var h1 = document.querySelector('h1');
      return 'el artículo «' + ((h1 && h1.textContent.trim()) || document.title).slice(0, 120) + '»';
    }
    return (document.title || p).slice(0, 120);
  }

  /* ---------- Estilos de la animación (uno solo para las 37 páginas) ----------
     MOTION.md (2026-10-12), en corto: lo que sale (el campo) se va rápido y
     acelerando; lo que llega (el "Recibido") entra con la curva de llegada
     (.16,1,.3,1); el chulo es EL momento de deleite y es el único con rebote;
     el error es un "no" que se apaga, no un temblor parejo; y el sello cae y
     pega, como un sello de verdad: acelera hasta el papel y se frena en seco. */
  var css = [
    '.mail-form{position:relative}',
    '.mail-form .kv-ok{position:absolute;inset:6px;display:flex;align-items:center;justify-content:center;gap:10px;padding:0 14px;border-radius:999px;font-size:14.5px;font-weight:600;color:var(--ink,#080808);opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .32s cubic-bezier(.16,1,.3,1) .2s,transform .4s cubic-bezier(.16,1,.3,1) .2s}',
    '.mail-form .kv-ok svg{flex:none;width:26px;height:26px;transform:scale(.6);transition:transform .56s cubic-bezier(.16,1,.3,1) .3s}',
    '@supports (transition-timing-function:linear(0,1)){.mail-form .kv-ok svg{transition-timing-function:linear(0,.044,.149,.283,.424,.558,.677,.776,.856,.917,.961,.992,1.011,1.022,1.027,1.028,1.027,1.023,1.019,1.015,1.012,1.008,1.006,1.004,1)}}',
    '.mail-form.kv-enviado .kv-ok svg{transform:none}',
    '.mail-form .kv-ok circle{fill:#16a34a}',
    '.mail-form .kv-ok path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset .32s cubic-bezier(.16,1,.3,1) .55s}',
    '.mail-form.kv-enviado input,.mail-form.kv-enviado button{opacity:0;transition:opacity .2s cubic-bezier(.3,0,.8,.15);pointer-events:none}',
    '.mail-form button:active:not(:disabled){transform:scale(.97);transition-duration:.25s,.1s}',
    '.mail-form.kv-enviado .kv-ok{opacity:1;transform:none;pointer-events:auto}',
    '.mail-form.kv-enviado .kv-ok path{stroke-dashoffset:0}',
    '.mail-form.kv-enviado{transform:none!important}',
    '.kv-avion{position:fixed;z-index:9999;width:30px;height:30px;margin:-15px 0 0 -15px;pointer-events:none;color:#fff;filter:drop-shadow(0 6px 10px rgba(20,2,40,.45));animation:kvVuela 1s cubic-bezier(.5,0,.75,0) forwards}',
    '@keyframes kvVuela{0%{transform:translate(0,0) rotate(0) scale(1);opacity:1}25%{transform:translate(-18px,8px) rotate(-12deg) scale(1.05)}100%{transform:translate(260px,-320px) rotate(18deg) scale(.4);opacity:0}}',
    '.mail-form.kv-error{animation:kvNo .5s ease-out}',
    '@keyframes kvNo{15%{transform:translateX(-8px)}30%{transform:translateX(7px)}45%{transform:translateX(-5px)}60%{transform:translateX(3px)}75%{transform:translateX(-1.5px)}}',
    '.mail-form button.kv-enviando{position:relative;color:transparent!important}',
    '.mail-form button.kv-enviando::after{content:"";position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:kvGira .7s linear infinite}',
    '@keyframes kvGira{to{transform:rotate(360deg)}}',
    '.kv-sello{position:absolute;right:-14px;bottom:-12px;z-index:2;padding:6px 10px;border:2px solid #16a34a;border-radius:8px;background:rgba(255,255,255,.92);color:#15803d;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;transform:rotate(-12deg) scale(1.8);opacity:0;animation:kvSello .46s .6s forwards}',
    '@keyframes kvSello{0%{transform:rotate(-12deg) scale(1.8);opacity:0;animation-timing-function:cubic-bezier(.55,0,1,.45)}55%{transform:rotate(-12deg) scale(.95);opacity:1;animation-timing-function:cubic-bezier(.16,1,.3,1)}100%{transform:rotate(-12deg) scale(1);opacity:1}}',
    /* Los datos de la marca: se abren debajo de la píldora al empezar a escribir el correo. */
    '.kv-mas{display:none;width:min(460px,100%);gap:8px;text-align:left}',
    '.kv-mas.abierto{display:grid;animation:kvAbre .45s cubic-bezier(.16,1,.3,1)}',
    '@keyframes kvAbre{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}',
    '.kv-mas p{margin:0 0 2px;font-size:13px;font-weight:600;color:#fff;text-align:center}',
    '.kv-mas input{width:100%;height:44px;padding:0 18px;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#fff;font:inherit;font-size:14.5px;outline:none;transition:border-color .25s,background .25s}',
    '.kv-mas input::placeholder{color:rgba(255,255,255,.62)}',
    '.kv-mas input:focus{border-color:#fff;background:rgba(255,255,255,.14)}',
    '.kv-mas.listo{display:none}',
    '@media (prefers-reduced-motion:reduce){.kv-mas.abierto{animation:none}}',
    '@media (prefers-reduced-motion:reduce){.mail-form .kv-ok,.mail-form .kv-ok path,.mail-form .kv-ok svg,.mail-form.kv-enviado input,.mail-form.kv-enviado button{transition:none}.mail-form .kv-ok svg{transform:none}.kv-sello{animation:none;opacity:1;transform:rotate(-12deg)}.mail-form.kv-error{animation:none}}'
  ].join('');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- Datos de la marca ----------
     Para llegar a la llamada sabiendo con quién hablamos: a qué se dedica,
     su Instagram y su web. Viven en este archivo para no tocar las 37
     páginas, y se abren cuando la persona empieza a escribir su correo. */
  var mas = document.createElement('div');
  mas.className = 'kv-mas';
  mas.innerHTML = '<p>Cuéntanos de tu marca</p>' +
    '<label class="sr-only" for="kvTipo">¿A qué se dedica tu marca?</label><input id="kvTipo" type="text" maxlength="120" autocomplete="organization-title" placeholder="¿A qué se dedica? (ej.: agencia de viajes)">' +
    '<label class="sr-only" for="kvInsta">Instagram de la marca</label><input id="kvInsta" type="text" maxlength="120" autocomplete="off" placeholder="Instagram de la marca (@tumarca)">' +
    '<label class="sr-only" for="kvWeb">Página web, si tienen</label><input id="kvWeb" type="text" inputmode="url" maxlength="200" autocomplete="url" placeholder="Página web, si tienen (opcional)">';
  form.parentNode.insertBefore(mas, form.nextSibling);
  var tipo = document.getElementById('kvTipo');
  var insta = document.getElementById('kvInsta');
  var web = document.getElementById('kvWeb');
  function abrir() { if (!mas.classList.contains('abierto')) mas.classList.add('abierto'); }
  email.addEventListener('input', function () { if (email.value.trim()) abrir(); });
  /* Enter en los campos nuevos envía el formulario, igual que en el correo. */
  [tipo, insta, web].forEach(function (c) {
    c.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : btn.click(); } });
  });

  /* La primera llamada es gratis: se dice junto al formulario en todas las páginas. */
  if (nota && /^Te contestamos/.test(nota.textContent.trim())) {
    nota.textContent = 'La primera llamada es gratis. ' + nota.textContent.trim();
  }

  var ok = document.createElement('div');
  ok.className = 'kv-ok';
  ok.setAttribute('aria-hidden', 'true');
  ok.innerHTML = '<svg viewBox="0 0 26 26"><circle cx="13" cy="13" r="13"/><path d="M7.5 13.5l3.6 3.4 7.4-7.8"/></svg><span>¡Recibido! Te escribimos pronto.</span>';
  form.appendChild(ok);

  function despegar() {
    if (quieto || !btn) return;
    var r = btn.getBoundingClientRect();
    var a = document.createElement('div');
    a.className = 'kv-avion';
    a.style.left = (r.left + r.width / 2) + 'px';
    a.style.top = (r.top + r.height / 2) + 'px';
    a.innerHTML = '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M2.6 10.6 20.4 3.1c.9-.4 1.8.5 1.4 1.4l-7.5 17.8c-.4.9-1.7.9-2-.1l-2-6.3a1 1 0 0 0-.6-.6l-6.3-2c-1-.3-1-1.6-.1-2z"/></svg>';
    document.body.appendChild(a);
    setTimeout(function () { a.remove(); }, 1100);
  }

  function sellar() {
    var n = document.querySelector('#note .sticky');
    if (!n || n.querySelector('.kv-sello')) return;
    var s = document.createElement('span');
    s.className = 'kv-sello';
    s.textContent = '✓ Recibido';
    n.appendChild(s);
  }

  function listo() {
    despegar();
    form.classList.add('kv-enviado');
    mas.classList.add('listo');
    sellar();
    nota.textContent = 'Listo, recibimos tu correo. Te escribimos el mismo día o el siguiente, de lunes a viernes.';
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { form: 'contacto', pagina: location.pathname, canal: leer('kv_utm_src') || 'directo', plan: leer('kv_plan') });
    }
  }

  function fallo(texto) {
    nota.textContent = texto;
    if (!quieto) {
      form.classList.remove('kv-error');
      void form.offsetWidth; // reinicia la animación si falla dos veces
      form.classList.add('kv-error');
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!btn || btn.disabled || form.classList.contains('kv-enviado')) return;

    /* Un bot llenó el campo trampa: se finge el éxito y no se envía nada. */
    if (trampa && trampa.value) { listo(); return; }

    var v = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { fallo('Escribe un correo válido, por ejemplo nombre@tuempresa.com.'); email.focus(); return; }
    abrir();
    var vTipo = tipo.value.trim().slice(0, 120), vInsta = insta.value.trim().slice(0, 120), vWeb = web.value.trim().slice(0, 200);
    if (!vTipo) { fallo('Cuéntanos a qué se dedica tu marca.'); tipo.focus(); return; }
    if (!vInsta) { fallo('Escribe el Instagram de tu marca, por ejemplo @tumarca.'); insta.focus(); return; }
    if (casilla && !casilla.checked) { fallo('Marca la casilla de autorización para poder escribirte.'); casilla.focus(); return; }

    var autorizada = new Date().toISOString();
    var canal = leer('kv_utm_src') || 'directo';
    /* El plan que pulsó en Planes (eventos.js lo guarda en la pestaña) o el
       ?plan= de un enlace: así el contacto llega al panel diciendo qué quiere. */
    var plan = leer('kv_plan');
    try { plan = plan || new URLSearchParams(location.search).get('plan') || ''; } catch (er) {}
    plan = String(plan || '').slice(0, 80);
    var mensaje = 'Quiere agendar una llamada desde ' + desde() + '.' + (plan ? ' Le interesa: ' + plan + '.' : '') +
      ' Marca: ' + vTipo + '. Instagram: ' + vInsta + '. Web: ' + (vWeb || 'no tiene') + '.';
    btn.disabled = true;
    btn.classList.add('kv-enviando');
    btn.setAttribute('aria-label', 'Enviando');

    var json = function (url, cuerpo, tipo) {
      return fetch(url, { method: 'POST', headers: { 'Content-Type': tipo || 'application/json' }, body: JSON.stringify(cuerpo) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return true; });
    };

    /* Se cierra el envío con éxito o con el aviso de escribir por WhatsApp. */
    var cerrar = function (bien) {
      btn.classList.remove('kv-enviando');
      btn.removeAttribute('aria-label');
      if (bien) { listo(); return; }
      btn.disabled = false;
      btn.textContent = etiqueta;
      fallo(FALLO);
    };

    /* text/plain a propósito: así el navegador no pide el OPTIONS previo, que
       Apps Script no sabe responder. Es respaldo: su fallo no cuenta. */
    json(HOJA_LEADS, {
      nombre: '', correo: v, telefono: '', interes: 'Agendar llamada (' + canal + ')', mensaje: mensaje,
      origen: location.href, referente: document.referrer || 'directo', autorizacion: autorizada
    }, 'text/plain;charset=utf-8').catch(function () {});

    /* EL PANEL ES EL CAMINO. Guarda el contacto, le manda la confirmación a
       quien escribió y el aviso al equipo, los dos desde info@kaivastudio.com
       por Hostinger (firmados con la DKIM del dominio). EmailJS mandaba el
       aviso "desde info@" por sus propios servidores, fallaba el DMARC del
       dominio y llegaba a spam: ahora solo se usa si el panel no responde,
       para que el contacto no se pierda. */
    json(CRM, {
      email: v, origen: 'landing', pagina: location.href, mensaje: mensaje, autorizacion: autorizada,
      marca: vTipo, instagram: vInsta, web: vWeb,
      utm_source: canal, utm_medium: leer('kv_utm_med'), utm_campaign: leer('kv_utm_camp'),
      referente: document.referrer || 'directo'
    }).then(function () { cerrar(true); }, function () {
      json(EJS.endpoint, {
        service_id: EJS.service, template_id: EJS.template, user_id: EJS.key,
        template_params: {
          name: v.split('@')[0], email: v, message: mensaje + ' [Canal: ' + canal + ']', phone: 'No indicado',
          interest: 'Agendar llamada', subject: 'Nuevo contacto desde kaivastudio.com [' + canal + '] — Agendar llamada',
          time: new Date().toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }),
          page_url: location.href, privacy: 'Autorizada el ' + autorizada
        }
      }).then(function () { cerrar(true); }, function () { cerrar(false); });
    });
  });
})();
