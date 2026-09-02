# Plan de contenido del blog — Kaiva Studio

Este archivo lo lee la tarea programada diaria (`blog-diario`) para saber qué
publicar cada día. No es contenido del sitio: es el backlog interno.

## Reglas fijas

- Un post nuevo cada día. Se rota entre **tres tipos**, en este orden fijo:
  **guía localizada** (variante de país o de ciudad de una guía ya existente)
  → **IA e innovación** (noticia, reporte o cambio relevante, investigado ese
  mismo día — nunca inventado) → **marketing, SEO y autoridad de marca**
  (concepto, cambio de algoritmo o práctica que le sirve a una pyme, también
  investigado el día de publicación) → y vuelve a empezar por localizada.
  Antes de agosto de 2026 la rotación era de dos tipos; la cola ya está
  reordenada en tercios a partir de la fila 11.
- Toda cifra (precio, dato, estadística) se investiga con WebSearch antes de
  publicarse. Nunca se inventan números, ni para países, ni para noticias de
  IA, ni para los posts de marketing/SEO.
- Los posts de IA usan la etiqueta **"IA y tecnología"** (ya existe como chip
  de filtro en `/blog/index.html`). Los de precios usan **"Precios"**. Los de
  agencias por ciudad usan **"Cómo elegir"**. Los de marketing, SEO y
  autoridad de marca usan **"Marketing y SEO"** (chip nuevo, agregado el 30
  de agosto de 2026 junto con esta categoría).
- Cada post nuevo se vuelve el destacado de `/blog/index.html`; el destacado
  anterior baja a ser la primera tarjeta de la grilla.
- Reutilizar las imágenes existentes en `/assets/blog/` según el tema
  (`precios.webp`, `ia.webp`, `elegir.webp`, etc.) salvo que el usuario pida
  imágenes nuevas. Los posts de **Marketing y SEO** reutilizan
  `visibilidad.webp` (o `local.webp` si el tema es de posicionamiento local),
  porque no hay foto propia para la categoría todavía.
- Al publicar: actualizar `blog/index.html`, `sitemap.xml` y `llms.txt`
  (sección Recursos), luego `git add` **solo** de los archivos tocados para
  este post (nunca `git add -A` ni tocar otros cambios que ya estuvieran sin
  commitear en el repo), commit y push a `main`.
- **Comprobar que se publicó de verdad antes de marcar la fila.** El
  2026-08-30 aparecieron seis artículos marcados `Publicado` que respondían
  404: el push llevaba días fallando contra candados huérfanos en `.git` y la
  tarea marcaba la fila igual. Dos comprobaciones, en este orden:
  `git rev-list --left-right --count origin/main...HEAD` tiene que dar `0  0`,
  y `curl -s -o /dev/null -w '%{http_code}' https://kaivastudio.com/blog/<slug>/`
  tiene que dar `200` (GitHub Pages tarda cerca de un minuto).
- Marcar la fila como `Publicado` con la fecha real **solo si la URL respondió
  200**; si no, se queda en `Pendiente`. Una cola que miente es peor que una
  cola atrasada, porque nadie vuelve a mirar lo que ya dice «hecho». Y añadir
  una fila nueva al final de la cola para que nunca se quede vacía.
- **Cada post lleva su `.cta-lectura`** en el primer tercio, justo antes de un
  `<h2>`, con `utm_content=<slug>`. El bloque está descrito en `pagina.css`;
  se copia de cualquier post ya publicado y se adapta su primera frase al
  tema. La llamada del pie (`.cierre`) se queda donde está.
- **Cada post necesita al menos un dato propio.** Ver la sección siguiente.

## De dónde salen los temas, y qué hace distinto a un post

Las trece primeras entradas de la cola se eligieron a mano. A partir de aquí
la cola se alimenta de la demanda que Search Console ya registra, y ningún
post se publica sin una cifra que hayamos producido nosotros. Las dos cosas
las gobierna el motor de contenido, que vive fuera de este repositorio
público porque incluye datos de clientes:

    .claude/skills/motor-de-contenido/

- `SKILL.md` — el ciclo entero, de elegir el tema a medir el resultado.
- `oportunidades.mjs` — lee un export de Search Console y devuelve los temas
  donde el sitio ya aparece y no captura nada. **Una búsqueda, una URL**: si
  el tema ya tiene post, se mejora ese y no se escribe otro.
- `CASOS.md` — la biblioteca de casos. Es la respuesta a la regla de «sin
  anécdotas de clientes inventadas»: no se inventan, se documentan.
- `avisar.mjs` — aviso por IndexNow a Bing y compañía después de publicar.
  Google no lo usa; para Google sigue siendo el sitemap.
- `MEDICIONES.md` — la línea de partida de cada post, para poder responder a
  los treinta días si sirvió.

## Voz y estilo

Los primeros ocho posts salieron todos con el mismo molde: entrada en segunda
persona con un supuesto («si buscaste esto en Google…»), subtítulos que eran
etiquetas, una tabla, un recuadro `.nota` y un «En resumen» con viñetas al
final. Cada uno por separado se lee bien; los ocho juntos se leen como el mismo
documento repetido, y eso es lo que hace que un blog se sienta genérico. Estas
reglas existen para romper el molde.

- **Prohibido el andamiaje.** Nada de «en este artículo veremos», «a
  continuación explicaremos», «en conclusión», «en resumen». Si el texto
  necesita anunciar lo que va a hacer, es que todavía no lo está haciendo.
- **Nada de secciones «En resumen» con viñetas.** El cierre es un párrafo (o
  tres) que dice algo, no un repaso de lo ya dicho. Termina con la idea más
  incómoda o más útil del artículo, no con un índice.
- **Los subtítulos afirman, no etiquetan.** «Nadie te está cobrando por
  páginas» en vez de «Qué se está pagando realmente». Un subtítulo debería
  poder leerse solo y seguir diciendo algo.
- **Cada post entra por un lado distinto.** Rotar la forma de abrir: una
  escena, un dato que choca, una frase que alguien dice de verdad, una
  contradicción, una pregunta que el lector ya se hizo. Si el post anterior
  abrió con «tú hiciste X», este no.
- **Opinión con costo.** El texto tiene que decir al menos una cosa que a una
  agencia le convendría callar. Es lo que separa un blog de un folleto.
- **Concreto sobre abstracto.** «Una valla en la Circunvalar» rinde más que «un
  medio publicitario». Nombres, cifras, lugares, plazos.
- **Ritmo.** Párrafos de dos a cuatro líneas. Frases cortas después de una
  larga. Se lee en celular.
- **Sin testimonios ni anécdotas de clientes inventadas.** Nunca. Si hace falta
  un ejemplo real y no lo hay, se usa un hecho verificable o se deja fuera.
- **Tabla y recuadro `.nota` son opcionales, no obligatorios.** Como máximo una
  tabla por post, y solo cuando de verdad haya datos que comparar.
- **Comillas angulares (« »), nunca rectas.**

### Regla especial para los posts localizados

Las variantes por país o ciudad **no pueden ser el mismo artículo con los
números cambiados**. Cuando salieron Colombia y México, el segundo era una
copia con find-and-replace: mismos subtítulos, mismos párrafos, misma entrada.
Además de aburrido, es exactamente lo que Google llama contenido a escala.

Cada variante nueva necesita: **entrada propia**, **subtítulos propios** y
**al menos un tema que solo aplique en ese país** (en México fue el CFDI; en
Perú, Chile o Argentina será otra cosa). Las cifras y la estructura de fondo sí
se comparten — la redacción, no.

## Cola de temas

| # | Fecha       | Tipo        | Tema                                                              | Etiqueta         | Estado     |
|---|-------------|-------------|--------------------------------------------------------------------|------------------|------------|
| 1 | 2026-07-30  | Localizado  | Cuánto cuesta una página web en **México**                        | Precios          | Publicado  |
| 2 | 2026-07-31  | IA          | Qué es un "agente de IA" y si tu negocio realmente necesita uno   | IA y tecnología  | Publicado  |
| 3 | 2026-08-01  | Localizado  | Cuánto cuesta una página web en **Perú**                          | Precios          | Publicado  |
| 4 | 2026-08-02  | IA          | Modelos abiertos (Llama, DeepSeek, Qwen, Mistral): qué cambia para una pyme | IA y tecnología | Publicado (actualizado 2026-08-08) |
| 4b| 2026-08-08  | IA          | El token bajó 99% y la factura subió: costo por tarea vs precio por token | IA y tecnología | Publicado |
| 4c| 2026-08-08  | IA          | ChatGPT gratis e ilimitado (GPT-5.6 Luna): qué cambia para tu negocio | IA y tecnología | Publicado |
| 4d| 2026-08-16  | IA          | Qwen3.8-27B: correr IA local en tu propio PC, y cuándo sale a cuenta | IA y tecnología | Publicado |
| 5 | 2026-08-22  | Localizado  | Cuánto cuesta una página web en **Chile**                         | Precios          | Publicado  |
| 6 | 2026-08-23  | IA          | El "modo IA" y los AI Overviews de Google: qué significa para tu SEO | IA y tecnología | Publicado |
| 7 | 2026-08-24  | Localizado  | Cuánto cuesta una página web en **Argentina**                     | Precios          | Publicado  |
| 8 | 2026-08-25  | IA          | ChatGPT y la IA generativa como nuevo canal de descubrimiento de marca | IA y tecnología | Publicado |
| 9 | 2026-08-26  | Localizado  | Mejores agencias de diseño web en **Bogotá**                      | Cómo elegir      | Publicado  |
| 10| 2026-08-30  | IA          | Chatbots de IA para atención al cliente: costos reales y cuándo vale la pena | IA y tecnología | Publicado |
| 11| 2026-08-31  | Localizado  | Cuánto cuesta una página web en **Ecuador**                       | Precios          | Publicado  |
| 12| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 13| pendiente   | Marketing   | Qué es la autoridad de dominio y por qué un "Domain Rating alto" no es lo mismo que vender más | Marketing y SEO | Pendiente |
| 14| pendiente   | Localizado  | Mejores agencias de diseño web en **Ciudad de México**            | Cómo elegir      | Pendiente  |
| 15| pendiente   | IA          | Búsqueda con IA en el propio sitio (RAG): qué es y si aplica a una pyme | IA y tecnología | Pendiente |
| 16| pendiente   | Marketing   | Por qué comprar backlinks ya casi no funciona, y qué hace Google en 2026 para detectarlos | Marketing y SEO | Pendiente |
| 17| pendiente   | Localizado  | Cuánto cuesta una página web en **España**                        | Precios          | Pendiente  |
| 18| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 19| pendiente   | Marketing   | E-E-A-T: cómo demuestra una pyme sin años de trayectoria que tiene experiencia y confianza | Marketing y SEO | Pendiente |
| 20| pendiente   | Localizado  | Mejores agencias de diseño web en **Lima**                        | Cómo elegir      | Pendiente  |
| 21| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 22| pendiente   | Marketing   | Reseñas de Google: cuántas necesitas, qué tan rápido responder, y el efecto real en el ranking local | Marketing y SEO | Pendiente |
| 23| pendiente   | Localizado  | Cuánto cuesta una página web en **Costa Rica**                    | Precios          | Pendiente  |
| 24| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 25| pendiente   | Marketing   | Marca vs. rendimiento: por qué construir marca importa más cuando todos compiten con anuncios de IA | Marketing y SEO | Pendiente |
| 26| pendiente   | Localizado  | Mejores agencias de diseño web en **Panamá**                      | Cómo elegir      | Pendiente  |
| 27| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 28| pendiente   | Marketing   | Cómo medir la autoridad de marca sin pagar una herramienta enterprise (menciones, búsquedas de marca, share of voice) | Marketing y SEO | Pendiente |
| 29| pendiente   | Localizado  | Mejores agencias de diseño web en **Medellín**                    | Cómo elegir      | Pendiente  |
| 30| pendiente   | IA          | Cuándo un negocio sí necesita su propio modelo: privacidad, datos regulados y volumen | IA y tecnología | Pendiente |
| 31| pendiente   | Marketing   | Cambiar de nombre o de dominio sin perder el SEO: la guía de redirecciones que casi nadie hace bien | Marketing y SEO | Pendiente |
| 32| pendiente   | Localizado  | Mejores agencias de diseño web en **Santiago**                    | Cómo elegir      | Pendiente  |
| 33| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 34| pendiente   | Marketing   | Redes sociales y SEO: ¿las señales sociales posicionan, o es un mito que no muere?  | Marketing y SEO | Pendiente |
| 35| pendiente   | Localizado  | Mejores agencias de diseño web en **Cali**                        | Cómo elegir      | Pendiente  |
| 36| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 37| pendiente   | Marketing   | Core Web Vitals en 2026: qué mide Google hoy y cuánto pesa de verdad en el ranking | Marketing y SEO | Pendiente |
| 38| pendiente   | Localizado  | Cuánto cuesta una página web en **Panamá**                        | Precios          | Pendiente  |
| 39| pendiente   | Marketing   | Contenido genérico y "Helpful Content": por qué Google penaliza el blog que "suena a blog de nadie" | Marketing y SEO | Pendiente |
| 40| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |

Cuando la cola llegue al final, seguir el mismo patrón de tercios: más países
(Guatemala, República Dominicana, Uruguay...), más ciudades (Buenos Aires,
Guadalajara, Quito...), noticias de IA investigadas al momento, y más temas
de marketing/SEO/autoridad de marca (por ejemplo: schema markup y datos
estructurados, el efecto real de las estrellas de reseña en el CTR, cómo
funciona hoy PageRank internamente, o el email marketing como canal que
Google e IA no pueden tocar) — nunca dejar de rotar los tres tipos.
