# WebForge ⚡

Tu guía y cheatsheet de desarrollo web frontend.

## ¿Qué es WebForge?

WebForge es un recurso web open source que funciona simultáneamente como **guía de aprendizaje** y **cheatsheet de referencia rápida** para desarrollo web. Cubre HTML, CSS, JavaScript, Git, SEO y más.

### Temas cubiertos

- **Git & GitHub** — Control de versiones y colaboración
- **HTML** — Estructura, semántica, formularios, multimedia, accesibilidad
- **CSS** — Básico, Flexbox, Grid, responsive, animaciones, frameworks
- **JavaScript** — Básico, ES6+, DOM, eventos, asincronía, almacenamiento
- **SEO** — Meta tags, Open Graph, Core Web Vitals, sitemap, structured data
- **Extras** — Herramientas & Workflow, Recursos (próximamente)

## Tecnologías

- HTML5 semántico
- CSS3 con Custom Properties
- Vanilla JavaScript (ES6+)
- [Highlight.js](https://highlightjs.org/) para syntax highlighting
- [Lucide Icons](https://lucide.dev/) para iconografía

## Estructura del proyecto

```
├── index.html              # Landing page
├── sections/               # Páginas de contenido por tema
├── cheatsheets/            # Cheatsheets de referencia rápida
├── components/             # Componentes HTML compartidos (header, sidebar, footer)
├── css/                    # Estilos CSS modulares
├── js/                     # JavaScript modular
├── assets/                 # Imágenes, fuentes
├── sitemap.xml             # Sitemap para buscadores
├── robots.txt              # Directivas para crawlers
├── PRD.md                  # Documento de Requisitos
└── README.md               # Este archivo
```

## Development

Abre `index.html` directamente en tu navegador, o usa un servidor local:

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

**[Ver documento PRD completo](./PRD.md)**
