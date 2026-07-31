# Plan de contenido del blog — Kaiva Studio

Este archivo lo lee la tarea programada diaria (`blog-diario`) para saber qué
publicar cada día. No es contenido del sitio: es el backlog interno.

## Reglas fijas

- Un post nuevo cada día. Se alterna: **día impar del ciclo = guía
  localizada** (variante de país o de ciudad de una guía ya existente), **día
  par del ciclo = IA e innovación** (noticia, reporte o cambio relevante,
  investigado ese mismo día — nunca inventado).
- Toda cifra (precio, dato, estadística) se investiga con WebSearch antes de
  publicarse. Nunca se inventan números, ni para países ni para noticias de IA.
- Los posts de IA usan la etiqueta **"IA y tecnología"** (ya existe como chip
  de filtro en `/blog/index.html`). Los de precios usan **"Precios"**. Los de
  agencias por ciudad usan **"Cómo elegir"**.
- Cada post nuevo se vuelve el destacado de `/blog/index.html`; el destacado
  anterior baja a ser la primera tarjeta de la grilla.
- Reutilizar las imágenes existentes en `/assets/blog/` según el tema
  (`precios.webp`, `ia.webp`, `elegir.webp`, etc.) salvo que el usuario pida
  imágenes nuevas.
- Al publicar: actualizar `blog/index.html`, `sitemap.xml` y `llms.txt`
  (sección Recursos), luego `git add` **solo** de los archivos tocados para
  este post (nunca `git add -A` ni tocar otros cambios que ya estuvieran sin
  commitear en el repo), commit y push a `main`.
- Marcar la fila como `Publicado` con la fecha real al terminar, y añadir una
  fila nueva al final de la cola para que nunca se quede vacía.

## Cola de temas

| # | Fecha       | Tipo        | Tema                                                              | Etiqueta         | Estado     |
|---|-------------|-------------|--------------------------------------------------------------------|------------------|------------|
| 1 | 2026-07-30  | Localizado  | Cuánto cuesta una página web en **México**                        | Precios          | Publicado  |
| 2 | 2026-07-31  | IA          | Qué es un "agente de IA" y si tu negocio realmente necesita uno   | IA y tecnología  | Publicado  |
| 3 | pendiente   | Localizado  | Cuánto cuesta una página web en **Perú**                          | Precios          | Pendiente  |
| 4 | pendiente   | IA          | Modelos abiertos (Llama, DeepSeek, Qwen, Mistral): qué cambia para una pyme | IA y tecnología | Pendiente |
| 5 | pendiente   | Localizado  | Cuánto cuesta una página web en **Chile**                         | Precios          | Pendiente  |
| 6 | pendiente   | IA          | El "modo IA" y los AI Overviews de Google: qué significa para tu SEO | IA y tecnología | Pendiente |
| 7 | pendiente   | Localizado  | Cuánto cuesta una página web en **Argentina**                     | Precios          | Pendiente  |
| 8 | pendiente   | IA          | ChatGPT y la IA generativa como nuevo canal de descubrimiento de marca | IA y tecnología | Pendiente |
| 9 | pendiente   | Localizado  | Mejores agencias de diseño web en **Bogotá**                      | Cómo elegir      | Pendiente  |
| 10| pendiente   | IA          | Chatbots de IA para atención al cliente: costos reales y cuándo vale la pena | IA y tecnología | Pendiente |
| 11| pendiente   | Localizado  | Cuánto cuesta una página web en **Ecuador**                       | Precios          | Pendiente  |
| 12| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 13| pendiente   | Localizado  | Mejores agencias de diseño web en **Ciudad de México**            | Cómo elegir      | Pendiente  |
| 14| pendiente   | IA          | Búsqueda con IA en el propio sitio (RAG): qué es y si aplica a una pyme | IA y tecnología | Pendiente |
| 15| pendiente   | Localizado  | Cuánto cuesta una página web en **España**                        | Precios          | Pendiente  |
| 16| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 17| pendiente   | Localizado  | Mejores agencias de diseño web en **Lima**                        | Cómo elegir      | Pendiente  |
| 18| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 19| pendiente   | Localizado  | Cuánto cuesta una página web en **Costa Rica**                    | Precios          | Pendiente  |
| 20| pendiente   | IA          | Reporte/noticia relevante de la semana (investigar el día de publicación) | IA y tecnología | Pendiente |
| 21| pendiente   | Localizado  | Mejores agencias de diseño web en **Panamá**                      | Cómo elegir      | Pendiente  |

Cuando la cola llegue al final, seguir el mismo patrón: más países (Panamá,
Guatemala, República Dominicana, Uruguay...), más ciudades (Medellín,
Santiago, Buenos Aires, Guadalajara...), y noticias de IA investigadas al
momento — nunca dejar de alternar los dos tipos.
