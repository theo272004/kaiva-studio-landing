# Kaiva Studio — Sitio Web Público

Sitio estático oficial de [kaivastudio.com](https://kaivastudio.com/) desplegado en GitHub Pages.

## Estructura principal

- `index.html`: Portada principal, servicios, proceso y planes.
- `diseno-web/`, `portfolio/`, `nosotros/`, `agendar/`: Páginas comerciales y de estudio.
- `blog/`: Artículos técnicos, guías de mercado y SEO/GEO.
- `privacidad/`, `terminos/`, `cookies/`: Páginas legales y preferencias de consentimiento.
- `assets/`: Recursos multimedia, fuentes e integraciones compartidas (`consentimiento.js`, `contacto.js`, `eventos.js`, `clarity.js`).
- `scripts/verificar-sitio.mjs`: Validación automática de calidad, cumplimiento legal, SEO y enlaces antes de desplegar.

## Verificación local

Requiere Node.js 18+:

```bash
node scripts/verificar-sitio.mjs
```

## Despliegue

El workflow `.github/workflows/deploy.yml` ejecuta el gate de QA en cada Pull Request y cada push a `main`. Solo publica en GitHub Pages cuando la verificación pasa en verde, excluyendo archivos internos de documentación y scripts.
