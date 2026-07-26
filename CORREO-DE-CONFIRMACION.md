# Correo de confirmación para quien escribe

Hoy, cuando alguien llena el formulario, **el correo llega solo a Kaiva**. La
persona ve el mensaje de «recibido» en pantalla pero no recibe nada en su
bandeja. Esto agrega un acuse de recibo automático.

Vale la pena: confirma que el mensaje sí salió, deja tu correo en su bandeja
—así puede responderte directo— y da imagen de empresa que responde.

## 1. Crear la segunda plantilla en EmailJS

1. Entra a [dashboard.emailjs.com](https://dashboard.emailjs.com/admin/templates)
   con la cuenta de Kaiva.
2. **Create New Template**.
3. Lo más importante está en la pestaña **Settings** del template:

   | Campo | Qué poner |
   |---|---|
   | **To Email** | `{{email}}` ← **esto es lo crítico** |
   | **From Name** | `Kaiva Studio` |
   | **Reply To** | `info@kaivastudio.com` |
   | **Subject** | `Recibimos tu mensaje, {{name}}` |

   > Si dejas **To Email** con tu propia dirección, el acuse te llegará a ti en
   > vez de al cliente. Es el error típico.

4. En el **contenido**, esto:

   ```
   Hola {{name}},

   Recibimos tu mensaje. Te respondemos en menos de 24 horas hábiles, y
   te contesta una persona: no hay respuestas automáticas después de esta.

   Esto fue lo que nos contaste:
   {{message}}

   Mientras tanto, si quieres adelantar algo: en kaivastudio.com/monitor
   puedes analizar tu sitio gratis y ver su Índice de Salud Digital. Toma
   menos de un minuto, no pide registro, y nos sirve para llegar a la
   conversación sabiendo de qué hablamos.

   Si quieres agregar algo, responde a este mismo correo.

   Un saludo,
   Kaiva Studio
   Barranquilla, Colombia
   info@kaivastudio.com · wa.me/573024137374
   ```

   Tres cosas que hace este texto y el anterior no:

   - **Promete que responde un humano.** Quien recibe un acuse automático
     asume que le van a seguir llegando robots. Decir lo contrario baja la
     guardia.
   - **Le da algo que hacer mientras espera.** El diagnóstico gratis
     convierte una espera muerta en un prospecto que llega a la llamada ya
     sabiendo qué tiene roto — y eso acorta la venta.
   - **Deja el WhatsApp.** Quien escribió por formulario y tiene urgencia
     no debería tener que buscar cómo contactarte.

5. **Save**. Copia el ID de la plantilla — se ve como `template_xxxxxxx`.

## 2. Conectarla al sitio

En `index.html`, busca:

```javascript
plantillaAcuse: ''
```

y pega el ID:

```javascript
plantillaAcuse: 'template_xxxxxxx'
```

Sube el cambio. El siguiente mensaje que entre generará dos correos: el tuyo con
los datos del lead, y el del cliente confirmando.

## 3. Probar

Llena el formulario con **tu propio correo** y revisa que lleguen los dos. Mira
también la carpeta de spam la primera vez.

## Ojo con el límite del plan gratis

EmailJS gratis permite **200 correos al mes y 2 plantillas**.

Sobre las plantillas vamos bien: el formulario de contacto y la lista de espera
de la herramienta comparten `template_brvipe9`, así que hoy solo se usa **una**.
El acuse sería la segunda y todavía cabe.

Sobre el volumen sí hay que mirar: con el acuse activo cada contacto gasta
**2 envíos** en vez de 1, o sea unos **100 contactos mensuales**. Suficiente por
ahora, pero conviene revisar el consumo en el panel de vez en cuando: si se
agota la cuota, **los formularios dejan de enviar sin avisar a nadie**.

Cuando el volumen apriete, la salida natural no es pagar EmailJS sino mover el
envío al backend propio — el mismo servidor donde va a vivir la herramienta ya
puede mandar correo sin límite de terceros.
