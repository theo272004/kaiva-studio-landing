# El sistema de diseño de Kaiva

Esto no es una guía de estilo aspiracional: describe lo que hay en el código y
las reglas que impiden que vuelva a partirse. Si algo de aquí no coincide con
`assets/tokens.css`, manda el archivo y este documento está desactualizado.

Las verificaciones que lo sostienen se corren antes de publicar:

```bash
docker run --rm -v "$PWD":/w php:8.2-cli php /w/tool/src/verificar-css.php
```

```bash
docker run --rm -v "$PWD":/w php:8.2-cli php /w/tool/src/verificar-tokens.php
```

---

## 1. Por qué existe

El bloque `:root` llegó a estar escrito **cinco veces** — `portada.css`,
`pagina.css`, `monitor.css`, `legal.css` y el `<style>` del Panel Pro — y las
copias divergieron. No fue un problema estético: produjo **tres fallos de
render que estuvieron meses en producción**, los tres por el mismo mecanismo
(una `var()` escrita mirando otra hoja) y los tres invisibles, porque un token
que falta no da error: el navegador descarta la propiedad y la página sigue
pintando.

| Token | Efecto real |
|---|---|
| `--violet-hover` | El botón de enviar del chat de la FAQ **desaparecía** en hover: fondo `transparent`, icono blanco sobre blanco |
| `--epilogue` | El `<h1>` de la aplicación salía en Inter, no en Inter Tight |
| `var(--surface)` en `legal.css` | El menú móvil de privacidad, cookies y términos se abría **sin fondo**, transparente sobre el texto |

Hoy hay un solo archivo y un linter que falla si alguien declara un token
fuera de él.

---

## 2. Las seis reglas

1. **Solo `assets/tokens.css` declara tokens.** Cualquier `--token:` en un
   `:root` de otra hoja es un error de revisión. La excepción legítima son las
   variables **locales de un componente** (`--rot`, `--tx`, `--bezel`,
   `--rejilla`): viven en su propio selector, describen una geometría y no el
   sistema. El linter las distingue solo.
2. **Ningún `var()` de color lleva valor de reserva.** `var(--ink-faint,#94a3b8)`
   convierte un token ausente en un gris ya rechazado por contraste, y lo hace
   en silencio. Si el token falta, se quiere el fallo visible.
3. **El token base de un color de estado nunca es color de letra.** Para texto
   e iconos va siempre la variante `-ink`. Esta sola regla arregló los cuatro
   sitios donde las etiquetas de severidad estaban a 2,02:1.
4. **Las cuatro superficies importan el archivo.** El Panel Pro usa una copia
   servida desde su propio origen; `verificar-tokens.php` falla si diverge.
5. **Los valores con una medición detrás llevan su número en el comentario.**
   Si alguien los cambia, que sepa qué está tirando.
6. **Añadir un valor a una escala exige borrar otro** o justificar por escrito
   por qué la escala se queda corta.

### Y una séptima, de producto

**Ningún estado nuevo se da por terminado sin su caso vacío y su caso de error
escritos antes que el caso feliz.** Los dos P0 del Panel Pro eran exactamente
esto: pantallas que su único usuario nunca veía porque siempre tenía datos.

---

## 3. Las superficies

| | Landing | Monitor (gratis) | Panel Pro | en-cola / admin |
|---|---|---|---|---|
| Color, tipografía, espacio, foco, motion | sí | sí | sí | sí |
| Severidades (`.sev`) | sí (maqueta) | sí | sí | — |
| `--r-sm` / `--r-ui` / `--r-ui-lg` | — | sí | sí | sí |
| `--r-md` / `--r-lg` | sí | — | — | — |
| `--shadow-ui` / `-hover` / `-pop` | — | sí | sí | sí |
| `--shadow-sm` / `-md` / `-lg` | sí | — | — | — |
| `--ease-reveal` | sí | — | — | — |
| `--canvas` como suelo | — | sí | sí | sí |

**El Panel Pro sirve su propia copia de `tokens.css`.** Las fuentes sí pueden
venir de `kaivastudio.com` —una fuente que tarda solo retrasa el intercambio de
tipografía— pero **una hoja de estilos bloquea el pintado**, y enlazar la del
landing metería GitHub Pages en la ruta crítica de arranque del panel.

---

## 4. Color

La paleta y la tipografía de la marca se heredan tal cual: son sólidas y están
calibradas. Lo que se añadió son las **escalas**, que no existían.

### Superficie

```css
--bg      #ffffff   /* fondo de página — marketing */
--canvas  #f8fafc   /* suelo de aplicación — .panel, .app */
--surface #ffffff   /* tarjeta o panel elevado */
```

`--canvas` es el que faltaba, y explica un problema real: había tarjetas
blancas sobre tarjetas blancas sobre blanco, separadas solo por filetes del 5%
de alfa. **El suelo de la aplicación es gris; encima, la tarjeta blanca se lee
sola**, sin sombra ni borde.

### Tinta

```css
--ink       #0f172a   /* 17,85:1 */
--ink-soft  #475569   /*  7,58:1 */
--ink-faint #64748b   /*  4,76:1 — el más claro que pasa AA */
```

**`#94a3b8` está prohibido.** Da 2,56:1 y su nombre invitaba a usarlo para
adorno cuando en la práctica lo llevaba texto de verdad.

### Estado — tres roles por color

```css
--ok    #10b981   --ok-ink    #047857   --ok-soft    rgba(16,185,129,.08)
--warn  #f59e0b   --warn-ink  #b45309   --warn-soft  rgba(245,158,11,.08)
--bad   #ef4444   --bad-ink   #b91c1c   --bad-soft   rgba(239,68,68,.08)
```

`base` para rellenos, barras, puntos y bordes. **`-ink` siempre que sea letra o
icono pequeño.** `-soft` para fondos teñidos.

### Series de datos

Una gráfica con dos series necesita dos colores, y **eso no es un color de
estado**: aquí el color no dice "bien" ni "mal", dice "esta línea es Clics y
esta otra es Apariciones".

```css
--serie-1  var(--violet)   --serie-1-ink  var(--violet-ink)
--serie-2  #0ea5e9         --serie-2-ink  #0369a1
```

Sin este papel declarado, el cian del panel parecía un color suelto sin función
y estuvo a punto de borrarse en la auditoría. Sí la tiene.

---

## 5. Componentes compartidos

Viven en `tokens.css` y no en las hojas de superficie, porque **tienen que ser
idénticos en las cuatro** y el Panel Pro no puede importar `monitor.css`.
Duplicarlos es exactamente cómo empezó el problema.

### Severidad

Las **cinco** que calcula el backend, no tres. Antes `medio` y `bajo` se
pintaban con las mismas clases que `alto`, así que la priorización que el
producto sí calcula —y por la que ordena la lista— se borraba justo al
dibujarla.

| Nivel | Fondo | Texto | Contraste |
|---|---|---|---|
| `.sev--critico` | `--bad-soft` | `--bad-ink` | 5,83:1 |
| `.sev--alto` | `--warn-soft` | `--warn-ink` | 4,73:1 |
| `.sev--medio` | contorno | `--warn-ink` | 5,02:1 |
| `.sev--bajo` | contorno | `--ink-soft` | 7,58:1 |
| `.sev--ok` | `--ok-soft` | `--ok-ink` | 5,09:1 |

**Relleno frente a contorno, no solo matiz**: así el nivel sobrevive al
daltonismo y a la impresión en blanco y negro, que es donde un sistema de
solo-color falla. Las cifras están medidas en el navegador sobre la etiqueta ya
pintada, no calculadas a mano.

### Foco

Una sola regla sustituye a las trece que había repartidas. `:focus-visible` y
no `:focus`: el anillo aparece al navegar con teclado y no al hacer clic, que
es la razón por la que a los anillos de foco se les quitaba el estilo.

### Deshabilitado

Tres botones del producto se deshabilitaban por JS sin un solo estilo que lo
dijera: seguían levantándose en hover, invitando a un clic que no hacía nada.
**Todo `:hover` se condiciona con `:not(:disabled)`.**

### Micro-etiqueta

`.lbl` — había doce recetas de esto en el monitor y nueve en el Pro: la misma
etiqueta en mayúscula escrita veintiuna veces.

---

## 6. Escalas

**Tipografía** — siete pasos, en `rem` para que respete el tamaño de letra que
la persona configuró en su navegador.

```
--t-2xs 11px   micro-etiqueta, badges, severidades
--t-xs  12px   metadatos, ejes, pies de gráfica
--t-sm  13px   texto de apoyo, filas de tabla, menú
--t-base 15px  cuerpo
--t-md  16px   prosa larga
--t-lg  20px   título de pantalla
--t-xl  24px   cifra secundaria
--t-score      la cifra protagonista, en --display
```

Fuera de la escala, con su comentario en el sitio: la micro-tipografía de las
maquetas en miniatura (5–10,5 px), que se lee como dibujo y no como texto, y el
mínimo de 16 px en campos bajo `(pointer: coarse)` — por debajo, Safari en
iPhone hace zoom al enfocar.

**Espacio** — base 4 px, ocho pasos (`--s-1` … `--s-8`).

**Radios** — seis, cada uno con un papel que se puede decir en una frase.
`--r-ui` (10 px) y `--r-ui-lg` (12 px) están **medidos contra attio.com** el
2026-08-05; cambiarlos por 8/16 porque "queda más limpio" es tirar la única
medición que hay.

**Sombras** — dos familias con frontera clara. Las de aplicación llevan la
tinta azulada `(0,22,62)`: una sombra gris neutra sobre un suelo azulado se ve
sucia. **Desaparecen sin sustituto** las sombras teñidas de violeta: una sombra
del color de la marca es adorno, no profundidad.

**Movimiento** — cuatro curvas, tres duraciones (120 / 200 / 400 ms). Cero
`transition: all`. Cero animación `infinite` dentro de una vista de datos.
Bloque de `prefers-reduced-motion` obligatorio, **con
`animation-iteration-count: 1`**: sin esa línea, acortar la duración de una
animación infinita no la apaga, la **acelera**.

---

## 7. Vocabulario

Un término por cosa. Si una acción significa lo mismo, se llama igual en las
cuatro superficies.

| Se dice | No se dice |
|---|---|
| **analizar** / **análisis** | escanear, escaneo, auditar, auditoría, revisar |
| **índice** (0–100) | score, puntaje, puntuación, nota |
| **informe** | reporte, report |
| **medición** | corte, snapshot |
| **hallazgo** | issue, problema, error |
| **evidencia** | prueba, raw, dato crudo |
| **búsquedas** | keywords, palabras clave |
| **tráfico** | sesiones (en títulos) |
| **conectar** / **volver a conectar** | vincular, enlazar, autorizar |
| **quitar** | eliminar, borrar, remover |

Los **cuatro pilares** tienen nombre y subtítulo fijos, y salen de un solo
sitio:

| Pilar | Subtítulo | Peso |
|---|---|---|
| Visibilidad | ¿Te encuentran? | 20% |
| Imagen | ¿Te ves grande? | 25% |
| Confianza | ¿Inspiras seriedad? | 15% |
| Operación | ¿Estás ordenado? | 40% |

### Lo que el texto no puede hacer

- **No afirmar más de lo que se midió.** «No detectamos», nunca «no tienes».
- **NULL no es 0.** «No medido» y «medido y no hubo» son estados distintos y se
  escriben distinto. `render_check_row` acepta `null` justo por esto, y lo no
  medido **no entra** en el «3 de 4 revisiones en orden».
- **Ninguna cifra sin su evidencia** verificable al lado.
- **Ninguna cifra atribuida a una fuente que no la produjo.** La fila de
  velocidad decía «PageSpeed te da 80 de 100» imprimiendo el puntaje del pilar
  Imagen —once señales, de las que tres son de PageSpeed—. Google decía 40.
- **Ninguna barra de progreso que narre etapas que nadie mide.**

### Estados vacíos

Nunca «No hay datos». Siempre tres partes: **qué está vacío · por qué · cuál es
el siguiente paso**. Y «nunca conectaste» y «la conexión se cayó» no son el
mismo estado: decirle *conecta tu cuenta* a quien la conectó hace un año le
hace pensar que perdimos su configuración.

---

## 8. Cómo NO volver a romperlo

1. El linter en verde antes de publicar. Falla si una hoja invoca una `var()`
   que nadie declara, si un `var()` de color lleva reserva, si aparece un
   `:root` fuera del archivo canónico, o si una página se olvida de cargarlo.
2. **Subir el `?v=` de toda hoja que cambie.** Ya pasó una vez: el CSS de la
   portada cambió y su número de versión no.
3. `style` en línea **solo** para valores que calcula el servidor (alturas,
   anchos, `stroke-dashoffset`). Todo lo demás, clase.
4. Los nombres de pilar salen de un solo sitio.
5. Antes de dar por buena una pantalla nueva, compararla con las existentes:
   ¿parece del mismo producto?
