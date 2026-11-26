# Guardar los leads en Google Sheets

Desde el 2026-11-25 el sitio **no** le escribe a la hoja de Google. El formulario (`assets/contacto.js`)
manda cada contacto solo al panel (`diagnostico.kaivastudio.com/api/contacto.php`), y es el panel el que
guarda el contacto, manda los correos y deja la copia en la hoja.

Antes la dirección del Apps Script estaba aquí, en el código público, y cualquiera podía escribir en la hoja.
La configuración de la hoja (el Apps Script y su clave) ahora está documentada en el repositorio del panel,
no en este.

EmailJS sigue como respaldo si el panel no responde. Su llave pública es pública por diseño; conviene tener
limitados sus dominios permitidos a `kaivastudio.com` en la cuenta de EmailJS.
