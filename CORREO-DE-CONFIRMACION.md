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

4. En el **contenido**, algo así (ajústalo a tu voz):

   ```
   Hola {{name}},

   Gracias por escribirnos. Ya tenemos tu mensaje y lo estamos revisando.

   Te respondemos en menos de 24 horas hábiles con un camino claro para
   lo que necesitas.

   Esto fue lo que nos contaste:
   {{message}}

   Si quieres agregar algo, responde a este mismo correo.

   Un saludo,
   Kaiva Studio
   Barranquilla, Colombia
   info@kaivastudio.com
   kaivastudio.com
   ```

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

EmailJS gratis permite **200 correos al mes y 2 plantillas**. Con el acuse
activado, cada contacto gasta **2 envíos** en vez de 1 — o sea, unos 100
contactos mensuales. Y ya estarías usando las 2 plantillas disponibles.

Si el volumen crece, toca pasar a un plan pago o mover el envío a otro servicio.
Vale la pena revisar el consumo en el panel de EmailJS de vez en cuando: si se
agota la cuota, **los formularios dejan de enviar sin avisar**.
