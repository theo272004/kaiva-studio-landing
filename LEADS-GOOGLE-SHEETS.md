# Guardar los leads en Google Sheets

EmailJS solo **envía** correos: no guarda nada. Si un mensaje se pierde entre
mil correos de la bandeja, se perdió el contacto. Esto agrega una copia de cada
lead a una hoja de cálculo propia, gratis y sin límite de filas.

El correo sigue llegando igual. Esto se suma, no lo reemplaza.

## 1. Crear la hoja

1. Entra a [sheets.new](https://sheets.new) con la cuenta de Kaiva.
2. Ponle nombre, por ejemplo **Leads kaivastudio.com**.
3. En la primera fila escribe estos encabezados, uno por columna:

   | A | B | C | D | E | F | G | H |
   |---|---|---|---|---|---|---|---|
   | Fecha | Nombre | Correo | Teléfono | Interés | Mensaje | Página | Referente |

## 2. Pegar el script

En esa misma hoja: menú **Extensiones → Apps Script**. Borra lo que haya y pega
esto:

```javascript
function doPost(e) {
  var salida = ContentService.createTextOutput();
  salida.setMimeType(ContentService.MimeType.JSON);

  try {
    var d = JSON.parse(e.postData.contents);
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    hoja.appendRow([
      new Date(),
      d.nombre || '',
      d.correo || '',
      d.telefono || '',
      d.interes || '',
      d.mensaje || '',
      d.origen || '',
      d.referente || ''
    ]);

    salida.setContent(JSON.stringify({ ok: true }));
  } catch (err) {
    salida.setContent(JSON.stringify({ ok: false, error: String(err) }));
  }

  return salida;
}
```

Guarda con el ícono del disquete.

## 3. Desplegarlo como aplicación web

1. Botón azul **Implementar → Nueva implementación**.
2. En el engranaje ⚙ junto a «Seleccionar tipo», elige **Aplicación web**.
3. Configura así:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** **Cualquier usuario**

   > Este segundo campo es el que suele fallar. Si queda en «Solo yo», el
   > formulario no podrá escribir y los leads no llegan a la hoja.

4. **Implementar**. Google va a pedirte autorización: acepta. Si aparece
   «Google no ha verificado esta aplicación», entra en **Configuración
   avanzada → Ir a (nombre del proyecto)**. Es tu propio script, es seguro.
5. Copia la **URL de la aplicación web**. Termina en `/exec`.

## 4. Conectarla al sitio

En `index.html`, busca la línea:

```javascript
var HOJA_LEADS = '';
```

y pega la URL entre las comillas:

```javascript
var HOJA_LEADS = 'https://script.google.com/macros/s/AKfy.../exec';
```

Sube el cambio y listo. El siguiente mensaje que entre por el formulario
aparecerá como una fila nueva.

## 5. Comprobar que funciona

Llena el formulario en el sitio con datos de prueba y revisa la hoja. Debería
aparecer la fila en unos segundos.

Si no aparece:

- Revisa que el acceso quedó en **«Cualquier usuario»** (paso 3).
- En Apps Script, **Ver → Ejecuciones** muestra los intentos y sus errores.
- Cada vez que edites el script tienes que hacer **Implementar → Gestionar
  implementaciones → editar ✏ → Versión: Nueva versión**. Si no, sigue
  corriendo la versión vieja.

## Nota sobre privacidad

La hoja guarda datos personales de quienes te escriben (nombre, correo,
teléfono). En Colombia aplica la Ley 1581 de 2012 de protección de datos: no la
compartas con enlace público y limita el acceso a quien de verdad lo necesite.
Esto también es la razón por la que el sitio necesita una política de privacidad
real — hoy ese enlace del footer no lleva a ninguna parte.
