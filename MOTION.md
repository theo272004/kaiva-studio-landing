# El movimiento de Kaiva

Estudio pedido por Nicolás el 2026-10-12: "los principios, conocimientos y
consejos de los mejores animadores de motion graphics, y aplícalos en lo que
tengamos con JS". Como `DESIGN.md`, esto describe lo que hay en el código y
las reglas para que no vuelva a partirse. Si algo de aquí choca con
`assets/tokens.css`, manda el archivo.

---

## 1. Lo que dicen los que mejor animan

Parafraseado; cada idea lleva su fuente en la sección 5.

**El tiempo es la curva, no los keyframes.** Joey Korenman (School of Motion)
enseña a leer la pendiente de la curva como la velocidad: plano es quieto,
empinado es rápido. El *easy ease* simétrico es el punto de partida; lo
profesional es la curva **asimétrica**, que arranca decidida y frena largo.
Ben Marriott cuenta que lo que más lo hizo crecer fue dejar los plugins de
easing y dominar el editor de curvas.
→ En web: nada de `linear` para desplazar; `cubic-bezier(.16,1,.3,1)` recorre
casi todo el camino en el primer tercio y se asienta despacio.

**Corto, y salir más rápido que entrar.** NN/g: 100 ms para respuesta simple,
200–300 ms para cambios grandes, 400 ms solo para recorridos largos; lo común
es pecar de largo, y lo que sale debe tardar menos que lo que entra. Emil
Kowalski pone la UI por debajo de 300 ms. IBM Carbon escala la duración con el
tamaño y la distancia (70 ms un botón, 400 ms una expansión grande).

**Anticipación y squash, en dosis de interfaz.** El hover es la anticipación
(avisa que algo responde); el squash es `scale(.97)` al presionar. Kowalski:
nunca animar desde `scale(0)`, empezar desde 0,9 o más, y que el elemento nazca
del lugar donde se hizo clic.

**Escalonar para separar, solapar para unir.** Issara Willenskomer (UX in
Motion): si todo se mueve a la vez y a la misma velocidad, se lee como una sola
cosa; el desfase dice "relacionados pero distintos". Val Head: superponer los
grupos de acciones en vez de encadenarlos, y animar igual lo que es igual.

**Nada aparece de la nada.** De los 12 principios de Willenskomer, los que
más usa Kaiva: *transformation* (el botón que se vuelve check), *value change*
(números que cuentan), *masking*, *parenting*. Cada estado nace del anterior.

**El rebote es un condimento.** Korenman: en un rebote cada salto mide la mitad
del anterior, y un impacto seco se frena en seco. Apple (WWDC23) reduce los
resortes a duración y rebote, y avisa que un resorte sin rebote no tiene
*overshoot*. Josh Comeau los usa casi siempre sin rebote, y solo para
movimiento, nunca para color u opacidad. CSS `linear()` ya permite resortes
sin JS (Baseline desde diciembre de 2023).

**Una voz propia.** Carbon separa el movimiento *productivo* (todo el día) del
*expresivo* (momentos importantes y escasos). Buck trata su lenguaje de
movimiento como algo intencional y propio. Sarah Drasner: curvas de marca con
nombre, no copiar Material como identidad. Val Head: *"Match velocities, not
duration"*. Jorge R. Canedo Estrada (Buck, Giant Ant, Ordinary Folk): el
keyframe hecho a mano y subir siempre la vara.

**Rendimiento y accesibilidad.** Solo `transform` y `opacity` (web.dev); unos
10 ms de trabajo por cuadro; `will-change` como último recurso. Movimiento
reducido no es cero movimiento: se quitan desplazamientos, parallax, bucles y
sorpresas, y se quedan los fundidos cortos. Lo que dure más de 5 s se puede
pausar.

**Contadores.** Ease-out (`easeOutExpo` es el de CountUp.js) para que las
últimas cifras se lean; `tabular-nums` para que no tiemblen; la duración crece
con la magnitud; con movimiento reducido, el valor final de una vez.

---

## 2. El sistema de Kaiva

**Personalidad: calma segura.** Entra rápido y se asienta lento. Sale más
rápido de lo que entró. Casi nunca rebota. Un solo momento de deleite por
flujo, y ese sí rebota.

### Curvas (todas en `assets/tokens.css`)

| Token | Valor | Papel |
|---|---|---|
| `--ease-reveal` | `cubic-bezier(.16,1,.3,1)` | **La firma.** Todo lo que llega: tarjetas, pantallas, apariciones |
| `--ease-sale` | `cubic-bezier(.3,0,.8,.15)` | Todo lo que se va: acelera y desaparece. *Nuevo* |
| `--ease-resorte` | `linear(…)` pico 1,028 | El momento de deleite: abrir la Recap, el check. Solo `transform`. *Nuevo* |
| `--ease-ui` | `cubic-bezier(.2,0,0,1)` | Algo que ya está en pantalla cambia de estado |
| `--ease-press` | `cubic-bezier(.4,0,.2,1)` | `:active` |
| `--ease` | `cubic-bezier(.2,.8,.2,1)` | Marketing general (la del sitio) |

`linear` solo para lo continuo: el flujo de puntos del cable, un spinner.

### Duraciones

| ms | Para qué |
|---|---|
| 100 | `:active` → `scale(.97)` |
| 120–160 | hover de color y fondo (`--d-fast`) |
| 200–280 | salidas; cambios de estado (`--d-base`) |
| 400 | entradas de UI, diálogos (`--d-slow`) |
| 560 | pantallas de la Recap, el resorte |
| 700–1600 | **solo narrativa que se mira**: contadores por magnitud, el anillo |

En el panel, `--d-slow` (400 ms) sigue siendo el tope para un dato que se
espera para leer: esa regla de `tokens.css` no cambia. La Recap es la
excepción porque es una historia: ahí el usuario está mirando, no esperando.

### Reglas

- Salir ≈ 70 % de entrar, con `--ease-sale`.
- Escalonar 30–60 ms por elemento (lo narrativo, 55–80 ms), solapado, con tope
  de ~350 ms; más allá de 8 elementos, el resto entra en bloque.
- Entrar = opacidad + 12–24 px (+ `scale` desde .94 o más). Nunca `scale(0)`.
- Lo que viaja lejos, en arco; lo que cae, con gravedad.
- Un solo protagonista por pantalla.
- Movimiento reducido: sin desplazamientos, escalas, rebotes ni bucles; quedan
  los fundidos y los estados finales.

---

## 3. Dónde ya se aplicó (2026-10-12)

**Recap** (`tool/public/assets/recap.css`, `recap.js`)
- La pantalla vieja **sale** acelerando hacia el lado contrario al avance
  (280 ms) y la nueva llega del lado del avance (560 ms). Antes la vieja crecía
  hacia la cara del usuario y su contenido desaparecía de golpe.
- Abrir la Recap es el resorte; cerrarla, una salida de 260 ms.
- Al apretar, la tarjeta cede (`scale(.985)`, 100 ms) y vuelve con el resorte.
- Los números cuentan cuando ya se ven, duran según la magnitud (0,7–1,6 s),
  no tiemblan (`tabular-nums`) y se asientan al llegar. El anillo del índice
  comparte duración, retraso y curva con su número: antes el número acababa
  medio segundo antes que el trazo.
- Las burbujas suben en arco y desde .85; las barras crecen con el resorte y
  un escalonado de 55 ms; el confeti cae con gravedad y se mece.
- Solo `transform` y `opacity`: la barra de avance ya no anima `width`, el halo
  del logo anima la opacidad de una capa (y respira dos veces, no para
  siempre), y lo que entra ya no se desenfoca.

**Pantallas sueltas** (`tool/src/pantalla.php`: login, permiso de Claude,
conectar Google)
- Las dos piezas entran escalonadas y el cable se tiende entre ellas.
- Al conectar: anticipación (se inclinan una hacia la otra) y el check con el
  resorte, desde .6. Error: un "no" que se apaga.
- Al pulsar Permitir o Entrar, el flujo de puntos se acelera al instante: la
  respuesta no espera a la página siguiente.

**Panel** (`tool/public/assets/os.css`)
- Píldoras: hover en 160 ms (antes 400), `scale(.97)` al presionar, vuelta con
  resorte.
- Diálogos: entran con `--ease-reveal` y **salen** en 240 ms (antes se cerraban
  de golpe), con `@starting-style`.

**Sitio** (`assets/contacto.js`, las 38 páginas con formulario)
- El campo se va rápido; el "Recibido" llega con la curva de firma; el círculo
  del check es el único rebote; el trazo se dibuja en 320 ms.
- El error es un "no" que se apaga (8, 7, 5, 3, 1,5 px), no un temblor parejo.
- El sello cae acelerando, pega y se frena en seco (de 1,8 a .95 a 1), como un
  sello de verdad.

---

## 4. Lo que falta, y por qué no se tocó todavía

Inventario del 2026-10-12. Ninguno está roto a la vista; son deudas.

- **El sitio no usa los tokens de movimiento.** Cada página lleva su propio
  `<style>` en línea, copia del de la portada, con `--ease` y 30 duraciones
  distintas escritas a mano. Unificarlo es tocar 39 páginas: merece su propio
  trabajo, con capturas antes y después.
- **Propiedades que fuerzan reflujo**, en la portada: la caja de selección y el
  cursor de la demo de proceso (`left/top/width/height`), la altura de las
  preguntas frecuentes (WAAPI sobre `height`), el acordeón
  (`grid-template-rows`), el `padding` de los planes y la altura de las barras
  de servicios. En el panel, algunas barras animan `width` y `height`.
- **Filtros pesados**: el carrusel del hero y las ventanas del proceso animan
  `filter`; las manchas del fondo de la Recap derivan con `blur(60px)`.
- **`os.css` redefine `--ease-ui`** como `(.2,.8,.2,1)` dentro de `body.kv-os`:
  en el panel, la curva "seca" de aplicación es en realidad la de marketing.
  Parece deliberado (la piel 2026), pero conviene decidirlo.

### Checklist para cualquier animación nueva

1. ¿Qué comunica? Si no hay respuesta, se quita.
2. ¿Se verá cien veces al día? Entonces más corta o nada.
3. ¿Respuesta de UI por debajo de 300 ms?
4. ¿Llega con `--ease-reveal`, sale con `--ease-sale`, `linear` solo en bucles?
5. ¿La salida dura ~70 % de la entrada?
6. ¿Nace de algo? ¿Nunca desde `scale(0)`?
7. ¿Escalonado de 30–60 ms, solapado, con tope?
8. ¿Un solo protagonista y un solo rebote por flujo?
9. ¿Números con `tabular-nums`, ease-out, duración por magnitud?
10. ¿Solo `transform` y `opacity`?
11. ¿Se puede interrumpir sin saltos y nunca bloquea un clic?
12. ¿Con movimiento reducido queda un fundido o el estado final?
13. ¿Sin JS se ve todo?

---

## 5. Fuentes

- Issara Willenskomer, *UX in Motion*: https://uxmag.com/articles/creating-usability-with-motion-the-ux-in-motion-manifesto · https://toptal.com/designers/ux/motion-design-principles
- Los 12 principios de Disney en interfaz: https://ixdf.org/literature/article/ui-animation-how-to-apply-disney-s-12-principles-of-animation-to-ui-design · https://dribbble.com/stories/2020/07/27/disney-principles-of-animation-ui-interactions
- Joey Korenman, School of Motion: https://www.schoolofmotion.com/tutorials/intro-to-the-graph-editor-in-after-effects/
- Jorge R. Canedo Estrada: https://blog.motionarray.com/learn/motion-design/jorge-canedo-estrada-interview/
- Buck: https://weareplaygrounds.nl/?p=27597
- IBM Carbon: https://carbondesignsystem.com/elements/motion/overview/
- Material: https://api.flutter.dev/flutter/material/Durations-class.html · https://m2.material.io/design/motion/customization.html
- Apple, resortes (WWDC23): https://developer.apple.com/videos/play/wwdc2023/10158/
- NN/g, duración: https://www.nngroup.com/articles/animation-duration/
- Emil Kowalski: https://emilkowal.ski/ui/great-animations · https://emilkowal.ski/ui/7-practical-animation-tips · https://emilkowal.ski/ui/you-dont-need-animations
- Josh Comeau: https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/ · https://www.joshwcomeau.com/animation/linear-timing-function/
- `linear()`: https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear · https://linear-easing-generator.netlify.app/
- Val Head: https://noti.st/valhead/eNy3nY/slides
- Sarah Drasner: https://noti.st/sdras/QapmoT/present
- Rendimiento y accesibilidad: https://web.dev/articles/animations-guide · https://web.dev/articles/rendering-performance · https://web.dev/articles/prefers-reduced-motion · https://primer.style/accessibility/design-guidance/motion-and-animation
- Contadores: https://unpkg.com/countup.js@2.10.1/README.md
