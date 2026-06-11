<div align="center">

# ⚡ WebForge

**Tu guía y cheatsheet de desarrollo web frontend.**

[![Live Demo](https://img.shields.io/badge/demo-live-58a6ff?style=flat-square&logo=github&logoColor=white)](https://webforge.mozzdev.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-3fb950?style=flat-square)](./LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vanilla](https://img.shields.io/badge/vanilla-0-dependencies-ff6b6b?style=flat-square)](https://webforge.mozzdev.com/)

</div>

---

## ¿Qué es WebForge?

WebForge es un recurso web open source que funciona simultáneamente como **guía de aprendizaje** y **cheatsheet de referencia rápida** para desarrollo web. Cubre HTML, CSS, JavaScript, Git, SEO y más.

Incluye **10 playgrounds interactivos** que permiten experimentar con cada concepto en vivo directamente en el navegador: Flexbox, Grid, animaciones, responsive, formularios, DOM, eventos, JavaScript básico, asincronía y multimedia.

### Temas cubiertos

- **Git & GitHub** — Control de versiones y colaboración
- **HTML** — Estructura, semántica, formularios, multimedia, accesibilidad
- **CSS** — Básico, Flexbox, Grid, responsive, animaciones, frameworks
- **JavaScript** — Básico, ES6+, DOM, eventos, asincronía, almacenamiento
- **Playgrounds** — 10 demos interactivos para experimentar con cada tema
- **SEO** — Meta tags, Open Graph, Core Web Vitals, sitemap, structured data
- **Extras** — Herramientas & Workflow, Recursos

## Tecnologías

- HTML5 semántico
- CSS3 con Custom Properties
- Vanilla JavaScript (ES6+)
- [Highlight.js](https://highlightjs.org/) para syntax highlighting
- Iconos SVG inline

## Estructura del proyecto

```
├── index.html              # Landing page
├── sections/               # 24 páginas de contenido por tema
├── cheatsheets/            # 5 cheatsheets de referencia rápida
├── demos/                  # 10 playgrounds interactivos
├── components/             # Componentes HTML compartidos (header, sidebar, footer)
├── css/                    # Estilos CSS modulares
├── js/                     # JavaScript modular
├── data/                   # Datos (índice de búsqueda)
├── assets/                 # Imágenes, fuentes
├── sitemap.xml             # Sitemap para buscadores
├── robots.txt              # Directivas para crawlers
├── PRD.md                  # Documento de Requisitos
└── README.md               # Este archivo
```

## Development

Abre `index.html` directamente en tu navegador, o usá un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con VS Code Live Server extension
# Click "Go Live" en la barra de estado
```

## Contribuir

Las contribuciones son bienvenidas. Leé el [PRD](./PRD.md) para entender la visión del proyecto y las convenciones de código.

1. Fork el repo
2. Creá una rama feature (`git checkout -b feature/nueva-seccion`)
3. Commiteá tus cambios (`git commit -m 'feat: agregar sección X'`)
4. Push a la rama (`git push origin feature/nueva-seccion`)
5. Abrí un Pull Request

## Licencia

[MIT](./LICENSE) — MozzVader

---

<div align="center">

**[Ver documento PRD completo](./PRD.md)** · **[Ver sitio en vivo](https://webforge.mozzdev.com/)**

</div>