# Reglas visuales y técnicas de Kaiva Studio

Todo lo que se decidió y se corrigió al construir kaivastudio.com, para aplicarlo
igual en otra web de Kaiva. Fuentes: el código publicado (`index.html`,
`portfolio/`, `blog/`, `nosotros/`, `agendar/`), el doc «Design System · Kaiva
Studio», el «Kit para crear el Design System», el «Brief de lenguaje» (solo su
parte visual) y los 720 commits del repositorio.

**Fuera de este documento, a propósito:** la voz, el tono, el vocabulario y los
textos. Se están redefiniendo con el curso de Insignia.

> Ojo: `DESIGN.md` y `assets/tokens.css` describen el sistema **viejo** (Inter,
> morado `#8242f5`, radios medidos contra Attio). Hoy solo los usa la herramienta
> de análisis (monitor y Panel Pro). La web actual define sus tokens dentro de
> cada página y usa Geist. Para una web nueva, manda este documento.

---

## 1. La idea en una línea

Kaiva se ve como Apple con acento morado: fondo casi blanco, negro profundo, un
solo morado de marca, mucho aire y las pantallas como protagonistas. La marca es
**clara**: los paneles negros y morados son acento, no un modo oscuro.

Principios:

1. **Aire antes que adorno.** Pocos elementos, una idea por bloque.
2. **Las pantallas son protagonistas.** Siempre que se pueda, un aparato o una captura real.
3. **Un solo morado.** Solo los de la paleta. Nunca brillos, neón ni resplandores de color.
4. **Títulos en dos tonos.** Primera parte en gris, remate en negro (o blanco sobre oscuro).
5. **Todo se puede tocar.** Lo que se toca se levanta, se enciende o se tambalea, con suavidad.
6. **Ningún texto termina con una palabra sola en su última línea.**
7. **Si una pieza nueva no se puede armar con lo que hay, primero se agrega al sistema y después se usa.**

---

## 2. Color

```css
:root{
  --ink:#080808;          /* texto principal, botones negros, panel del hero */
  --ink-2:#4E4E55;        /* párrafos y textos secundarios */
  --ink-3:#8C8C93;        /* SOLO la parte gris de los títulos y etiquetas */
  --paper:#FBFBFB;        /* fondo de página; letra sobre oscuro */
  --card:#FFFFFF;         /* tarjetas sobre fondo gris */
  --mist:#F0F0F2;         /* tarjetas y bloques grises */
  --line:#DADADE;         /* bordes finos y separadores */
  --violet:#36115F;       /* paneles grandes, tarjeta morada, fondo del cierre */
  --violet-text:#7A3FC9;  /* letra y detalles sobre claro, palabra destacada, selección */
  --violet-light:#A580D6; /* morado sobre oscuro, recuadros tipo Figma, carpetas, líneas de cifras */
  --violet-soft:#EAE2F4;  /* fondos de etiquetas y botones suaves */
  --acc:#4E1E86;          /* RELLENOS morados: botones «Más artículos», etiquetas de proyecto, ícono de Marca */
}
```

Colores de apoyo que ya existen (no inventar otros):

| Uso | Valor |
|---|---|
| `theme-color` de /agendar/ (barra del navegador) | `#4B247D` |
| Fondo de `html` detrás del cierre (lo que se ve al estirar en iPhone) | degradado `#07050B` → `#1C0A31` |
| Franja del Logofolio (único color ajeno, viene de esa presentación) | `#E03E85` |

Reglas:

- **El morado vivo `#7A3FC9` es para letra y líneas, nunca para fondos grandes.** Los rellenos morados van en `#4E1E86`; los paneles, en `#36115F`.
- **El gris `#8C8C93` nunca va en texto de lectura**: solo en la parte gris de títulos grandes y en etiquetas.
- Texto de lectura: `#080808` o `#4E4E55` sobre claro. `#7A3FC9` solo en letra de 13 px o más.
- Máximo **una palabra destacada en morado por pieza**.
- Selección de texto en morado.
- Degradados permitidos, y solo estos: negro → `#36115F` en paneles, y un resplandor radial desde abajo con `rgba(122,63,201)` a máximo 0.78 de opacidad. **El negro siempre arriba; el morado sube desde abajo.**
- Prohibido: otros morados o lilas, rosados, neón, sombras de color, `#7A3FC9` sobre `#36115F`, naranja, degradados de varios colores.
- Proporción: **pendiente de decidir** entre 60 % claro o negro / 30 % grises y aparatos / 10 % morado (Design System) y 70 % claro / 25 % negro / 5 % morado (Behance). En ambos casos: el morado se nota porque es poco.

Contrastes medidos:

| Fondo | Texto | Acento | Contraste |
|---|---|---|---|
| `#FBFBFB` | `#080808` | `#7A3FC9` | 19:1 · acento 5,9:1 |
| `#080808` | `#FBFBFB` | `#A580D6` | 19:1 · acento 6,4:1 |
| `#36115F` | `#FBFBFB` | `#A580D6` | 14:1 · acento 4,7:1 |
| `#F0F0F2` | `#080808` | `#7A3FC9` | 17:1 · acento 5,4:1 |

---

## 3. Tipografía

- **Geist** (400, 500, 600, 700) para todo y **Geist Mono** (400, 500) solo para etiquetas pequeñas en mayúsculas. Fuera de la web (Canva, Slides, PowerPoint): **Inter** con los mismos pesos.
- Cargar solo esas dos familias. En el portfolio se quitó Inter porque una sola diapositiva la usaba.
- Nada de cursivas decorativas. La serif cursiva solo vive en la maqueta del BrandBook.

| Estilo | Tamaño | Peso | Interletrado | Interlineado |
|---|---|---|---|---|
| H1 del hero | `clamp(2.6rem, 6.4vw, 5.1rem)` | 600 | −0.05em | 0.98 |
| H2 de sección | `clamp(2.1rem, 4.4vw, 3.3rem)` | 600 | −0.04em | 1.04 |
| H3 de tarjeta | 18–22 px | 600 | −0.03em | 1.1 |
| Párrafo destacado | 16–18 px | 400 | 0 | 1.6 |
| Párrafo | 14–16 px | 400 | 0 | 1.55 |
| Botón | 14.5 px (13–13.5 en barras) | 600 | −0.01em | 1 |
| Etiqueta mono | 10.5–11 px, mayúsculas | 500 | +0.14em | 1 |
| Artículo de blog | columna de 680 px, letra de 18 px | 400 | 0 | — |

Reglas de forma del texto (no de voz):

- **Títulos en dos tonos**: primera parte en `#8C8C93` sobre claro (blanco al 55 % sobre oscuro) y remate en negro o blanco. Cada parte con sentido sola: «Lo que / construimos», «De la idea / a tu web».
- **La parte gris del título se enciende en morado** al pasar el mouse (0.08 s) y se apaga despacio (1.1 s); con clic se queda encendida. Si el título tiene dos palabras grises («Páginas» y «web»), cada una se enciende por separado.
- Interletrado negativo solo en títulos, nunca en párrafos.
- Párrafos de 46 a 62 caracteres por línea.
- Mayúsculas completas solo en etiquetas.
- Etiqueta encima del título, en mayúsculas y con interpunto: «01 · HOME».
- Cifras: «2–3 semanas» con raya (–), no guion; «100 %» con espacio duro (`100&nbsp;%`) y `white-space:nowrap` para que el % nunca se separe del número.

### Ninguna palabra sola en la última línea

Va en el `<head>` de **todas** las páginas:

```css
p,li,dd,dt,figcaption,blockquote,small,label,summary,td,th{text-wrap:pretty}
/* y en la regla de cada título grande (H2 de sección, manifiesto): */
text-wrap:balance;
```

```html
<!-- Regla de la casa: ningún texto termina con una palabra sola en la última línea.
     El CSS ayuda con text-wrap:pretty y, por si el navegador no lo cumple,
     se pegan las dos últimas palabras con un espacio que no se parte. -->
<script>document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('p,li,dd,figcaption,blockquote,small,label,td,h1,h2,h3,.desc').forEach(function(e){var w=document.createTreeWalker(e,4),n,l=null;while(n=w.nextNode())if(n.nodeValue.trim())l=n;if(!l||e.textContent.trim().split(/\s+/).length<3)return;var o=l.nodeValue;l.nodeValue=o.replace(/ (\S+\s*)$/,' $1');if(e.scrollWidth>e.clientWidth+1)l.nodeValue=o})})</script>
```

Si aun así queda una palabra sola, se ajusta el corte o el texto. Se revisa en
1440, 1024, 390 y 360 px.

---

## 4. Logo e ícono

- **Logo:** «Kaiva Studio.» en dos líneas: «Kaiva» en negrita arriba, «Studio» en peso normal abajo, punto final en morado. Dibujado en Geist a 4× (1196 × 500) para que se vea nítido; pesa 13 KB.
- **Ícono:** K blanca sobre **cuadrado negro** redondeado, sin punto. (Se probó morado `#36115F` y la K morada sola; quedó el negro.)
- Tamaño mínimo: 32 px de alto el logo, 24 px el ícono. Área de respeto: la altura de la «K».
- Posición: arriba o abajo a la izquierda, alineado al margen.
- Prohibido: estirarlo, girarlo, cambiar el color del punto, sombra o contorno, cambiar el orden de «Kaiva» y «Studio», y poner el logo sobre `#7A3FC9`.
- En el menú, «Kaiva» y «Studio» del logo se encienden por separado al pasar el mouse.
- Favicon: `favicon.ico` (16, 32, 48) + PNG 64, 96, 192 + `apple-touch-icon` 180, **todos con `?v=`**. Si `/favicon.ico` no lleva versión, Chrome sigue mostrando el viejo. iOS rellena de negro lo transparente: el apple-touch-icon va con fondo.

---

## 5. Espacio, radios y sombras

| | Web |
|---|---|
| Escala de espacio | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 |
| Margen lateral de página | 16 px (`--gutter`) |
| Entre secciones | `clamp(100px, 12vw, 150px)` |
| Ancho de contenido | 1180 px (`--wrap`); texto de lectura 680 px |
| Retícula | 12 columnas, separación 16 px |
| Radio de paneles | 20 px (18 en celular; 0 en celular cuando van de borde a borde) |
| Radio de tarjetas | 22 px |
| Radio de imágenes | 14–18 px (16 en el blog) |
| Chips | 8 px |
| Botones, etiquetas y menú | píldora (999 px) |
| Separación en rejillas | 12–16 px; mosaico 6–8 px |

- El espacio separa; las líneas casi no se usan. Borde fino: 1 px `#DADADE`.
- Los paneles grandes ocupan todo el ancho menos el margen de 16 px.

Sombras: **siempre negras y difusas, nunca de color**, y solo al pasar el mouse, en los aparatos y en la nota adhesiva.

| Uso | Valor |
|---|---|
| Tarjeta al pasar el mouse | `0 22px 40px -26px rgba(8,8,8,.4)` |
| Pantallas y capturas | `0 30px 60px -28px rgba(0,0,0,.7)` |
| Nota adhesiva | larga, hacia abajo y a la derecha, difusa |
| Mac de escritorio | sombra en el piso |

---

## 6. Componentes

| Componente | Cómo es |
|---|---|
| Botón negro | Píldora de 48 px, fondo `#080808`, letra blanca 600. Acción principal sobre claro |
| Botón blanco | Igual, fondo `#FBFBFB` y letra negra. Acción principal sobre oscuro |
| Botón contorno | Borde de 1.5 px, sin fondo, con flecha →. Acción secundaria |
| Etiqueta (pill) | Píldora de 30 px: pastilla blanca con la palabra + texto al lado. Encima de cada título de hero |
| Etiqueta interruptor | La pastilla se desliza al otro lado y se vuelve morada; se tambalea (ver §7) |
| Menú flotante | Píldora de vidrio: logo · Inicio, Portfolio, Blog (centrados) · Agendar llamada. La página actual va en morado |
| Panel hero | Negro que se vuelve `#36115F` al bajar; el morado sube desde abajo |
| Cierre | Panel morado con nota adhesiva, título, campo de correo, WhatsApp y «Conoce quiénes somos» |
| Tarjeta gris | `#F0F0F2`, radio 22 px, se levanta 6 px al pasar |
| Tarjeta negra o morada | `#080808` o `#36115F` con letra blanca. **Una sola por sección** |
| Cifra | Número grande + unidad al lado + una frase + barra que se llena (línea en `#A580D6`) |
| Recuadro tipo Figma | Borde `#A580D6`, cuatro esquinas blancas, nombre de la capa arriba y medida abajo |
| Carpeta / archivo Mac | Carpeta lila (`#A580D6` / `#EAE2F4`) con miniatura, o documento con esquina doblada |
| Nota adhesiva | Papel blanco girado −4°, cinta translúcida, firma «— Kaiva Studio» en morado |
| Ficha de persona | Foto de fondo, «Kaiva Studio · Área», rol grande, palabra morada + descripción. Se presenta por rol («Código», «Diseño»), no por nombre |
| Campo de correo | Píldora blanca con el campo y el botón negro dentro |
| Casilla de autorización | Círculo que se llena de morado; la casilla al inicio de la primera línea |
| Preguntas frecuentes | `<details>` que se abre y cierra deslizándose, una a la vez; ícono en círculo; flecha morada en la abierta |

Estados: reposo → al pasar se levanta 2–6 px → al tocar se hunde (escala 0.98) →
foco de teclado con contorno morado de 2 px separado 3 px → deshabilitado al 40 %.

### Aparatos

| Aparato | Cómo es | Para qué |
|---|---|---|
| Laptop | Tapa negra con borde fino, base plateada más ancha, cámara arriba | Sitios web, servicios |
| Mac (monitor) | Marco plateado, pantalla negra, pie y sombra en el piso | Proceso: diseño → código → lanzamiento |
| Tablet | Marco negro grueso, esquinas de 30 px | Proyecto destacado |
| Celular | Marco negro de 40 px de radio, isla dinámica, hora 9:41, sin ícono de batería | Versión móvil |

---

## 7. Movimiento e interacción

Una curva para todo: `cubic-bezier(.2,.8,.2,1)`. Nada rebota.

| Efecto | Duración | Regla |
|---|---|---|
| Hover de botones y tarjetas | 0.35–0.4 s | Se levantan 2–6 px; nunca crecen más de 6 % |
| Aparición al bajar | 0.7–1 s | Suben 18 px y aparecen; una sola vez |
| Palabra que se enciende | 0.08 s / 1.1 s | Morado al pasar; se apaga despacio; con clic se queda |
| Tambaleo de la etiqueta | 0.7 s | −6° → +4.5° → 0 |
| Carpetas y archivos | 3.6 s ida y vuelta | Levitan 9 px con un balanceo de 1.5° |
| Panel negro → morado | según el scroll | El morado sube desde abajo |
| Cifras | 1.6 s | Cuentan al llegar, una tras otra (180 ms entre cartas), y **vuelven a contar al tocarlas**. Sin salto ni destello al terminar |
| Mosaico | 0.42 s entre cuadros | Uno o dos cuadros se blanquean y vuelven |
| Giro de proyectos | cada 4 s | Único elemento que rota solo; se detiene al pasar el mouse |

Componentes interactivos y su regla:

- **Etiqueta interruptor** (portada: Colombia / Estudio digital; Quiénes somos: Quiénes somos / Kaiva Studio). Se cambia tocando en cualquier parte, con un área de toque 12 px más grande que la etiqueta. En computador se tambalea al pasar el mouse; en celular, un toque blanco late sobre la segunda opción y se tambalea cada 1,8 s **hasta el primer toque**.
- **Carpetas de Estudio digital** (solo computador): salen de la etiqueta hacia los lados del título, siempre cerca de él, nunca en los bordes de la pantalla. En celular se reemplazan por un enlace pequeño y gris «Mirar portfolio →».
- **Recuadro tipo Figma**: computador, al pasar el mouse; celular, al tocar, una pieza a la vez, y se quita solo a los 2,6 s. Sin arrastre.
- **Giro de proyectos**: tres proyectos sin repetir, uno a cada lado. Capturas sin marco de tablet, con radio. En celular casi de borde a borde (`100vw - 20px`, proporción 1,6) y se pasa deslizando el dedo, una web por pasada.
- **Escritorio del portfolio**: con una ventana abierta, la rueda mueve solo lo de adentro y la página de atrás no se mueve. Clic en el fondo cierra. Varias ventanas se apilan en cascada, se arrastran desde la barra, la tocada pasa al frente y Esc cierra la de adelante. Las ventanas cortas se centran de alto.
- **Cursor propio**: avión de papel, solo con mouse; al hacer clic suelta cuatro rayos y desaparece un instante. Queda por encima del aviso de cookies. Dentro de la pantalla del portfolio, la flecha negra de la Mac.
- **Scroll suave** con la rueda del mouse (no en celular ni con movimiento reducido); los enlaces internos usan el mismo deslizamiento.

Reglas de movimiento:

- **Lo que alguien está leyendo no cambia solo.** Si hay barra de carga, se detiene y no desaparece. Solo rota lo decorativo (el giro).
- **Tocar lo que ya se está mostrando no lo reinicia.**
- **La web no se maneja sola**: nada de cursores de demostración en el hero. Quien toca es la persona.
- Sin rebotes exagerados ni animaciones que se repitan rápido.
- Todo respeta `prefers-reduced-motion`.
- En celular se quitan los efectos de mouse y las carpetas.
- Lo que se mueve con el scroll lo sigue con suavizado cuadro a cuadro, no a saltos.

---

## 8. Celular (700 px hacia abajo)

- **Paneles de borde a borde y hasta arriba**: el hero, el blog, Quiénes somos y el cierre llegan detrás del menú y tocan los dos bordes, sin margen ni esquinas.
- **/agendar/ es una sola pantalla sin scroll**: el morado lo ocupa todo.
- **Barras del navegador del color del panel**: `theme-color` con el color de arriba (`#080808`, o `#4B247D` en agendar) y el fondo de `html` con el color del cierre. Nunca se ve blanco detrás de la barra de abajo ni al estirar.
- **Todo lo que en computador se descubre con el mouse necesita un aviso en celular**: un toque que late, un tambaleo o un enlace pequeño.
- Lo que se toca responde: las cifras recuentan y el giro se desliza con el dedo, sin mover la página arriba o abajo.
- El cierre va centrado completo, incluida la autorización de datos. «Conoce quiénes somos» va separado del correo y del WhatsApp.
- Una sección no hereda el alto mínimo de pantalla completa: mide lo que ocupa su texto.
- Menú hamburguesa y plan recomendado primero.
- Campos de formulario con mínimo 16 px de letra (si no, Safari en iPhone hace zoom al enfocar).

| Pieza | En celular |
|---|---|
| Carpetas del portfolio | 106 px, tres columnas, abajo sobre el dock |
| Destacado del blog | Foto entera 16:10 con radio de 16 px; la tarjeta blanca sube 64 px sobre la foto y mide lo mismo |
| Tarjetas del blog | Foto a todo el ancho 16:9 y el texto debajo |
| Archivos de Quiénes somos | 64 px, a los lados de la etiqueta, sin subtítulo |
| Webs en vivo | Versión de escritorio reducida, en proporción 16:10 |
| Tablas de artículos | Tarjetas apiladas con el nombre de cada columna |

Cortes:

| Corte | Qué cambia |
|---|---|
| ≤ 1099 px | Carpetas y archivos más pequeños |
| ≤ 980 px | Menú hamburguesa; rejillas a una columna; plan recomendado primero |
| ≤ 700 px | Paneles a todo el ancho; sin carpetas ni efectos de mouse |

---

## 9. Imágenes

- Proyectos reales e ilustraciones propias. **Nada de fotos de banco ni personajes con derechos de autor.**
- Capturas recortadas desde arriba, nunca estiradas; con radio y sombra negra difusa.
- Ilustraciones (el café con el equipo, el gato del portfolio, las fichas): nunca se estiran, se recortan.
- Exportar al tamaño en que se ve o mayor (hasta 2×), en **WebP calidad 0.88–0.92**. Si se ve pixelada, se pide el original (el libro de Felinorte se rehízo desde el PDF).
- Miniaturas de carpetas y tarjetas: 320 × 200, no la imagen grande.
- Ancho y alto declarados; `loading="lazy"` salvo la primera visible, que va con prioridad alta.
- Texto alternativo: qué se ve y de quién es («Sitio web de CS Travel Group para empresas»). Nunca `alt` vacío en una imagen con contenido.
- Íconos de línea simple de 15–17 px, del color de la letra.
- **Sin datos privados de clientes**: nombres, teléfonos, correos y cifras de una propuesta van difuminados.

---

## 10. Técnica, SEO e indexación

- Web estática: HTML, CSS y JS sin librerías. Portada ~400 KB y portfolio ~660 KB en la primera carga.
- **Subir el `?v=` de todo archivo que cambie** (CSS, JS, imágenes, favicon, og:image). Las páginas piden al navegador revisar siempre si hay versión nueva.
- **Nunca `zoom` para achicar**: en iPhone no achica la letra. Se usa una escala propia (`--z`) o `transform` (así se arregló la nota adhesiva de /agendar/).
- **Vidrio (`backdrop-filter`) con medida**: máximo tres capas a la vez y difuminado de 14 px o menos. Lo repetido (las carpetas) lleva fondo semitransparente sin difuminado. Mientras algo cambia de tamaño, el vidrio se apaga.
- Un solo H1 por página; título de máximo 60 caracteres y descripción de máximo 155; canónica absoluta; datos estructurados; imagen al compartir de 1200 × 630 por página.
- **Página nueva = `sitemap.xml` + `llms.txt` + enlace desde alguna parte del sitio.** Robots `index, follow`.
- Direcciones viejas: redirigen con canónica + refresh inmediato, **sin noindex**, y no van en el mapa del sitio.
- **Todo botón de contacto lleva a `/agendar/`**, nunca a `#contacto` ni al final de la página. «Conoce quiénes somos» (en el pie de todas las páginas) → `/nosotros/`. «Mirar portfolio» → `/portfolio/`.
- El logo e «Inicio» llevan a `/#top`.

---

## 11. Errores que se corrigieron y la regla que dejan

### Diseño e interacción

| Error | Regla |
|---|---|
| Morados sueltos (lilas, `#652AA2`, morados con brillo) en carpetas, botones y cierres | Un morado de la paleta, nunca uno nuevo. Rellenos en `#4E1E86`, letra en `#7A3FC9` |
| Botones y etiquetas con brillo morado | Sin brillos ni sombras de color |
| Favicon morado y luego K morada sola; Google mostraba el viejo | K blanca sobre negro; `favicon.ico` con versión |
| Cursor de demostración en el hero | La web no se maneja sola |
| Las tarjetas de servicios cambiaban solas y la barra de carga desaparecía | Lo que se lee no cambia solo; la barra se detiene |
| Al tocar «Diseño» la ventana se cerraba y volvía a abrir | Tocar lo que ya se muestra no lo reinicia |
| Las cifras daban un salto y un destello al terminar | Cuentan y paran, sin efecto final |
| El % se separaba del número | `100&nbsp;%` con `nowrap`; si no cabe, la palabra pequeña baja entera |
| El número grande quedó del tamaño del texto por una regla general de `span` | Las reglas generales no pisan las de un componente: revisar la cifra después de tocar estilos de texto |
| Datos distintos en Quiénes somos y en la portada | Las cifras son las mismas en toda la web |
| Las piezas del hero se arrastraban y rebotaban | Sin arrastre; recuadros tenues solo al pasar o tocar |
| Línea blanca en el borde de las fotos | Revisar los bordes de las capturas con radio |
| Las carpetas se abrían lejos del título o en los bordes | Siempre cerca del título |
| La pantalla del portfolio crecía al bajar | Se quitó: la pantalla queda en su tamaño |
| La página de atrás se movía con una ventana abierta | Con una ventana abierta, la rueda es para lo de adentro |
| Dos vidrios encimados se pintaban con rayas en Chrome y Safari dejaba de pintarlos | Un solo vidrio; con ventanas abiertas, color sólido; sin vidrio mientras algo crece |
| Imágenes del brandbook estiradas a la proporción de las capturas | Cada imagen con su tamaño real; nunca se deforma |
| El carrusel de marca se desvanecía en blanco en los bordes | Sin fundido blanco |
| Al abrir otra página dentro de una web en vivo te sacaba de golpe | Aviso suave con «Volver al inicio» o «Ver el sitio completo» |
| LinkedIn salía «bloqueado» dentro de la pantalla | Lo que no se deja mostrar en otra web abre en pestaña nueva |
| La flecha de la Mac se dibujaba 60 px abajo del clic | SVG con `aspect-ratio:1/1`; la punta coincide con el clic |
| El cursor del Mac se ubicaba en % contando el marco | Posición en píxeles desde el borde interior |
| El cursor hacía clic a mitad de camino y en espacios vacíos | Espera a llegar y apunta al centro de un elemento concreto |
| La muestra de color usaba la clase de otro panel y saltaba a la esquina | Clases propias por componente; nada se reutiliza por nombre parecido |
| Un reemplazo de código borró el acordeón y la animación del Mac | Revisar el diff completo después de cada reemplazo grande |
| El panel de servicios cambiaba de alto al abrir otro ítem | Alto fijo en paneles con contenido que cambia |
| El plan recomendado cambiaba de tamaño al pasar de tarjeta | Las tarjetas de una fila tienen el mismo alto |

### Celular

| Error | Regla |
|---|---|
| Blanco detrás de la barra de abajo y al estirar | `theme-color` y fondo de `html` con el color del panel |
| La letra de la nota adhesiva se salía del papel en iPhone | Escala `--z` o `transform`, nunca `zoom` |
| Entre 701 y 980 px se ocultaba el menú sin mostrar la hamburguesa | Revisar cada corte: siempre hay una forma de navegar |
| La base de la laptop se salía del panel en tableta | Revisar 1024 px antes de publicar |
| El dock cortaba el ícono de LinkedIn | El dock deja solo lo que cabe |
| Carpetas que chocaban entre sí o tapaban el texto | 106 px, tres columnas, abajo sobre el dock |
| La web en vivo se veía estirada hacia abajo | Proporción 16:10 centrada |
| Hueco grande alrededor de una frase por heredar el alto de pantalla completa | En celular la sección mide lo que ocupa su texto |
| La etiqueta y las carpetas no tenían equivalente sin mouse | Todo lo de mouse lleva aviso de toque |
| La casilla de autorización partía el enlace en otra columna | Casilla al inicio de la primera línea, todo centrado |

### SEO y publicación

| Error | Regla |
|---|---|
| Google leía «ideaa», «encada», «Preguntasfrecuentes» | Espacio antes de cada `<br>` en los títulos |
| `sitemap.xml` inválido por un `<url>` sin cerrar | Validar el XML después de editarlo |
| Imágenes sin `alt` (Bing lo marcaba) | Toda imagen con contenido lleva `alt` |
| Redirecciones con noindex | Canónica + refresh inmediato, sin noindex |
| Páginas viejas que daban 404 y Bing aún mostraba | Toda dirección vieja redirige a una página del mismo tema |
| CSS cambiado sin cambiar su `?v=` | Subir la versión de todo lo que cambie |
| WhatsApp y Facebook mostraban la imagen vieja al compartir | og:image con nombre nuevo: cachean por dirección |
| Portada de 809 KB | Comprimir y diferir imágenes; miniaturas para tarjetas |
| La página no decía la búsqueda con más demanda | La frase clave principal va en texto visible, no solo en metadatos |

---

## 12. Lista de revisión antes de publicar

- [ ] Solo colores, letras y componentes de este sistema
- [ ] Títulos en dos tonos, con la parte gris que se enciende
- [ ] Como máximo una palabra en morado por pieza
- [ ] Ninguna línea termina con una palabra sola (script y CSS en el `<head>`)
- [ ] «100 %» y «2–3 semanas» bien escritos y sin partirse
- [ ] Logo en su esquina, con su área de respeto; favicon con versión
- [ ] Revisado en 1440, 1024, 390 y 360 px: nada se sale a lo ancho
- [ ] En celular: paneles de borde a borde, barras del navegador del color del panel y aviso de toque donde haya hover
- [ ] Lo que se lee no cambia solo; tocar lo abierto no lo reinicia
- [ ] Imágenes nítidas, sin estirar, en WebP con `alt`, ancho y alto
- [ ] Sin datos privados de clientes
- [ ] Botones de contacto a `/agendar/`
- [ ] `?v=` subido en todo lo que cambió
- [ ] Página nueva en `sitemap.xml` y `llms.txt`
- [ ] Revisado en vivo después de publicar

---

## 13. Pendiente de decidir

- Proporción de color: 60/30/10 o 70/25/5.
- Punto final en los títulos (hoy se mezcla).
- Radio de las uniones curvas en Behance: 64 px o 72 px a 1920.
- Si el fondo del escritorio del Mac (el collage con el calendario «August») es propio.
