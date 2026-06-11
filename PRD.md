# PRD — WebForge

> **Documento de Requisitos del Producto (PRD)**
> Última actualización: 2026-06-11
> Estado: En desarrollo — Fase 8 (SEO & Extras)
> Repo: [GitHub](https://github.com/MozzVader/WebForge)

---

## 1. Visión del Proyecto

Un recurso web gratuito, open-source y bilingüe (español/inglés) que funciona simultáneamente como **guía de aprendizaje** y como **cheatsheet de referencia rápida** para desarrollo web frontend. El objetivo es ser el punto de partida para cualquier persona que quiera aprender o repasar los fundamentos de HTML, CSS y JavaScript, con contenido práctico, código funcional y un diseño que no sea aburrido.

### Principios rectores

- **Práctico sobre teórico**: Código funcional primero, explicación después.
- **Bello sobre funcional**: Si es útil pero feo, no sirve. El diseño es parte del contenido.
- **Accesible**: Mobile-first, contrastes adecuados, navegación clara.
- **Mantenible**: Código modular, archivos separados por sección, fácil de actualizar.
- **Open source**: Licencia permisiva, contribuciones bienvenidas.

---

## 2. Audiencia

| Perfil | Necesidad |
|--------|-----------|
| Estudiantes de programación | Aprender fundamentos web desde cero con ejemplos claros |
| Desarrolladores junior | Repasar conceptos y tener una referencia rápida |
| Desarrolladores senior de otros lenguajes | Transición rápida al ecosistema web |
| Diseñadores web | Entender mejor la parte técnica de sus diseños |
| Autores de contenido | Referenciar conceptos y snippets de código |

---

## 3. Stack Tecnológico

| Componente | Tecnología | Justificación |
|-----------|-----------|---------------|
| Estructura | HTML5 semántico | Base del proyecto, sin framework |
| Estilos | CSS3 + Custom Properties | Modular, themable, sin preprocesador (CSS nativo es suficiente hoy) |
| Interactividad | Vanilla JavaScript (ES6+) | Sin dependencias, rinde bien, se entiende el código |
| Fuentes | Google Fonts (Space Grotesk, Inter, JetBrains Mono) | CDN rápido, fuentes modernas |
| Iconos | Lucide Icons (CDN) | Modernos, consistentes, livianos |
| Syntax Highlighting | Prism.js o Highlight.js (CDN) | Colores de editor de código en los bloques |
| Hosting | GitHub Pages | Gratuito, CI/CD integrado, dominio custom |
| Control de versiones | Git + GitHub | Colaboración, issues, PRs |

### Dependencias externas (CDN)

- **Google Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (código)
- **Lucide Icons**: iconos SVG inline o vía CDN
- **Highlight.js**: syntax highlighting para bloques de código

### Lo que NO usamos

- React, Vue, Angular, Svelte ni ningún framework JS
- Bootstrap (solo se menciona como tema educativo, no como dependencia del proyecto)
- Preprocesadores CSS (SASS/LESS se cubren como contenido educativo, el proyecto usa CSS nativo)
- Build tools (Webpack, Vite, etc.)
- Backend / Base de datos (contenido 100% estático, sin Supabase por ahora)

---

## 4. Arquitectura del Proyecto

### 4.1 Estructura de Archivos

```
/
├── index.html                          # Landing page / Hero
│
├── sections/                           # Páginas por sección temática
│   ├── git-github.html                 # Git & GitHub
│   ├── html-basico.html                # HTML Básico
│   ├── html-semantico.html             # HTML Semántico
│   ├── html-formularios.html           # Formularios & Validación
│   ├── html-multimedia.html            # Multimedia & Gráficos
│   ├── html-accesibilidad.html         # Accesibilidad (a11y)
│   ├── css-basico.html                 # CSS Básico
│   ├── css-variables.html              # Variables CSS
│   ├── css-flexbox.html                # Flexbox
│   ├── css-grid.html                   # CSS Grid Layout
│   ├── css-responsive.html             # Responsive Design & Media Queries
│   ├── css-preprocesadores.html        # Preprocesadores (SASS / LESS / PostCSS)
│   ├── css-frameworks.html             # Frameworks CSS (Tailwind / Bootstrap 5)
│   ├── css-animaciones.html            # Animaciones & Transiciones
│   ├── css-maquetacion.html            # Maquetación Web & Convenciones
│   ├── js-basico.html                  # JS Básico
│   ├── js-moderno.html                 # ES6+ / Modern JS
│   ├── js-dom.html                     # DOM Manipulation
│   ├── js-eventos.html                 # Eventos & Event Handling
│   ├── js-asincronia.html              # Asincronía (Promises, async/await, fetch)
│   ├── js-almacenamiento.html         # Almacenamiento (localStorage, cookies)
│   ├── herramientas-workflow.html      # Herramientas & Workflow
│   ├── seo-performance.html           # SEO & Performance
│   └── recursos.html                  # Recursos externos (links, tutoriales, videos)
│
├── cheatsheets/                        # Cheatsheets (páginas dedicadas)
│   ├── html-cheatsheet.html
│   ├── css-cheatsheet.html
│   ├── js-cheatsheet.html
│   ├── git-cheatsheet.html
│   └── seo-cheatsheet.html
│
├── sitemap.xml                         # Sitemap para buscadores
├── robots.txt                          # Directivas para crawlers
│
├── css/
│   ├── variables.css                   # Custom properties: colores, fuentes, spacing, breakpoints
│   ├── reset.css                       # CSS Reset / Normalize
│   ├── base.css                        # Tipografía global, utilidades, scrollbar
│   ├── layout.css                      # Grid general: header, sidebar, main content
│   ├── components.css                  # Cards, botones, badges, code blocks, tabs, callouts
│   ├── code-blocks.css                 # Estilos específicos para bloques de código
│   ├── landing.css                     # Estilos exclusivos del Hero/Landing
│   ├── cheatsheet.css                  # Estilos específicos de las cheatsheets
│   ├── animations.css                  # Todas las animaciones y transiciones
│   └── responsive.css                   # Media queries (mobile-first)
│
├── js/
│   ├── app.js                          # Entry point: inicialización de módulos
│   ├── sidebar.js                      # Sidebar: toggle, acordeón, scroll spy
│   ├── code-blocks.js                  # Syntax highlighting (Highlight.js init), botón copiar
│   ├── search.js                       # Buscador in-page (filtrado de secciones)
│   ├── theme-toggle.js                 # Dark/Light theme switch
│   ├── scroll-animations.js            # Animaciones on-scroll (IntersectionObserver)
│   ├── common-loader.js               # Carga dinámica de header/sidebar/footer
│   └── utils.js                        # Helpers: debounce, throttle, etc.
│
├── assets/
│   ├── images/
│   │   ├── hero/                       # Imágenes del hero section
│   │   ├── og-image.png                # Open Graph image para compartir
│   │   └── favicon.svg                 # Favicon (SVG, moderno)
│   └── fonts/                          # Fallback local de fuentes (opcional)
│
├── PRD.md                              # Este documento
├── README.md                           # README público del repo
├── CONTRIBUTING.md                     # Guía para contribuir
├── LICENSE                             # Licencia del proyecto
└── .gitignore                          # Archivos ignorados por Git
```

### 4.2 Arquitectura de Navegación

**Enfoque: Multi-page site con componentes compartidos vía JS**

Dado que el contenido superará las 5000 líneas, usamos HTMLs separados por sección. El header, sidebar y footer se cargan dinámicamente con JavaScript (`fetch` + `innerHTML`) para evitar duplicar código.

```
┌──────────────────────────────────────────────────┐
│  HEADER (sticky): Logo │ Buscador │ Theme │ GH  │
├──────────┬───────────────────────────────────────┤
│          │                                       │
│  SIDEBAR │          MAIN CONTENT                 │
│  (fija)  │                                       │
│          │    Cada página sección tiene su       │
│  - Git   │    propio contenido con:               │
│  - HTML  │    - Explicaciones                     │
│  - CSS   │    - Bloques de código interactivos    │
│  - JS    │    - Ejemplos visuales                │
│  - SEO   │    - Tips & buenas prácticas         │
│  - Extras│                                       │
│          │                                       │
│  [active │                                       │
│   state  │                                       │
│   highlight]│                                     │
│          │                                       │
├──────────┴───────────────────────────────────────┤
│  FOOTER: Créditos │ Links │ Repo GitHub           │
└──────────────────────────────────────────────────┘
```

**Comportamiento responsive:**
- **Desktop (>1024px)**: Sidebar fija a la izquierda (280px), contenido ocupa el resto.
- **Tablet (768-1024px)**: Sidebar colapsable, se abre como overlay con hamburger menu.
- **Mobile (<768px)**: Sidebar oculta, hamburger menu en header, contenido full-width.

### 4.3 Componentes Compartidos (Cargados vía JS)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| Header | `components/header.html` | Barra sticky con logo, buscador, theme toggle, link GitHub |
| Sidebar | `components/sidebar.html` | Menú de navegación con acordeón y scroll spy |
| Footer | `components/footer.html` | Créditos, links útiles, repo link |

Estos fragmentos se cargan con `fetch()` en `common-loader.js` al cargar cada página.

---

## 5. Diseño Visual

### 5.1 Paleta de Colores

```css
/* === Tema Dark (default) === */
--bg-primary: #0d1117;         /* Fondo principal */
--bg-secondary: #161b22;       /* Sidebar, cards */
--bg-tertiary: #21262d;        /* Code blocks, elementos elevados */
--text-primary: #e6edf3;       /* Texto principal */
--text-secondary: #8b949e;      /* Texto secundario */
--text-muted: #484f58;         /* Texto muy sutil */

--accent-blue: #58a6ff;        /* Color principal de acento */
--accent-cyan: #39d2c0;        /* Acento secundario (neon) */
--accent-red: #ff6b6b;         /* Acento de alerta/destacado */
--accent-green: #3fb950;       /* Success, tags */
--accent-purple: #bc8cff;      /* Decorativo */

--border-color: #30363d;       /* Bordes */
--grid-color: rgba(88, 166, 255, 0.05); /* Grid sutil de fondo */

/* === Tema Light === */
--bg-primary: #ffffff;
--bg-secondary: #f6f8fa;
--bg-tertiary: #f0f2f5;
--text-primary: #1f2328;
--text-secondary: #656d76;
--text-muted: #b0b8c1;
/* Accent colors se mantienen pero con ligeras variaciones */
```

### 5.2 Tipografía

| Uso | Fuente | Peso | Tamaño |
|-----|--------|------|--------|
| H1 | Space Grotesk | 700 | 2.5rem (40px) |
| H2 | Space Grotesk | 600 | 2rem (32px) |
| H3 | Space Grotesk | 600 | 1.5rem (24px) |
| H4 | Space Grotesk | 500 | 1.25rem (20px) |
| Body | Inter | 400 | 1rem (16px) |
| Body bold | Inter | 600 | 1rem (16px) |
| Code | JetBrains Mono | 400 | 0.875rem (14px) |
| Code (headings inline) | JetBrains Mono | 600 | 0.875rem (14px) |

### 5.3 Syntax Highlighting (Bloques de Código)

Fondo oscuro para bloques de código con paleta tipo editor:

```css
--code-bg: #0d1117;
--code-keyword: #ff7b72;       /* if, function, const, return... */
--code-string: #a5d6ff;         /* "hola mundo", url()... */
--code-comment: #8b949e;        /* // comentario */
--code-function: #d2a8ff;       /* nombre de funciones */
--code-number: #79c0ff;         /* 42, 3.14, 0xFF... */
--code-tag: #7ee787;            /* <div>, <p>... */
--code-attribute: #79c0ff;       /* class=, id=... */
--code-operator: #ff7b72;       /* =, +, ===... */
--code-property: #79c0ff;       /* color, width, display... */
```

Características de los bloques de código:
- Números de línea (opcionales, toggleable)
- Botón "Copiar" en la esquina superior derecha
- Label del lenguaje en la esquina superior izquierda (HTML, CSS, JS, Git...)
- Scroll horizontal si el código es largo
- Tab activo "Código / Resultado" cuando sea posible

### 5.4 Grid Background

Un grid sutil de fondo que refuerza la estética tech:

```css
body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
        linear-gradient(var(--grid-color) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: -1;
}
```

### 5.5 Iconos

- **Lucide Icons** como librería principal (SVG sprite o CDN)
- Tamaño estándar: 20px para inline, 24px para standalone
- Uso: bullets de sidebar, badges de sección, botones, callouts

### 5.6 Animaciones

| Elemento | Animación | Trigger |
|----------|-----------|---------|
| Secciones del contenido | Fade-in + slide-up (30px) | Scroll into view (IntersectionObserver) |
| Sidebar items | Highlight slide | Scroll spy |
| Bloques de código | Fade-in | Scroll into view |
| Hero title | Typewriter o fade-in | Page load |
| Botón "Copiar" | Checkmark flash | Click |
| Theme toggle | Rotate icon + color transition | Click |
| Cards/Callouts | Hover lift (translateY -2px + shadow) | Hover |

Todas las animaciones respetan `prefers-reduced-motion`.

---

## 6. Contenido por Sección

### 6.1 Landing Page (`index.html`)

- Hero section con título, descripción breve y CTAs ("Explorar" / "Cheatsheets")
- Grid de secciones principales con iconos y descripciones cortas
- Créditos del creador / bio
- Links a recursos externos (a definir)

### 6.2 Git & GitHub (`sections/git-github.html`)

| Tema | Contenido |
|------|-----------|
| Conceptos básicos | Repo, commit, branch, merge, clone |
| Comandos esenciales | init, add, commit, push, pull, status, log, diff |
| Branching | branch, checkout, merge, rebase (conceptual) |
| GitHub | Repos, PRs, Issues, README, .gitignore |
| Flujo de trabajo | Git workflow básico, convenciones de commit |

### 6.3 HTML

#### HTML Básico (`sections/html-basico.html`)
- DOCTYPE, estructura de un documento
- Etiquetas esenciales: `<html>`, `<head>`, `<body>`, `<meta>`, `<title>`
- Texto: `<h1>`-`<h6>`, `<p>`, `<span>`, `<strong>`, `<em>`, `<br>`, `<hr>`
- Links: `<a>`, atributo href, target, rel
- Imágenes: `<img>`, alt, loading lazy, figure/figcaption
- Listas: `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`
- Tablas: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- Contenedores: `<div>`, `<span>`

#### HTML Semántico (`sections/html-semantico.html`)
- `<header>`, `<nav>`, `<main>`, `<footer>`
- `<article>`, `<section>`, `<aside>`
- `<figure>`, `<figcaption>`, `<details>`, `<summary>`
- `<time>`, `<mark>`, `<abbr>`
- Por qué importa: SEO, accesibilidad, legibilidad

#### Formularios & Validación (`sections/html-formularios.html`)
- Estructura de un form: `<form>`, action, method
- Tipos de input: text, email, password, number, date, range, checkbox, radio, file, color
- `<label>`, `<fieldset>`, `<legend>`, `<textarea>`, `<select>`
- Validación nativa: required, pattern, minlength, maxlength, min, max
- Atributos de accesibilidad: placeholder vs label, aria-describedby

#### Multimedia & Gráficos (`sections/html-multimedia.html`)
- `<video>`, `<audio>`, atributos controls, autoplay, poster
- `<picture>`, `<source>`, art direction, formatos (WebP, AVIF)
- `<canvas>` (introducción), contextos 2D
- `<svg>` inline: paths, basic shapes, viewBox
- `<iframe>`: YouTube, Google Maps

#### Accesibilidad a11y (`sections/html-accesibilidad.html`)
- Principios WCAG: perceptible, operable, comprensible, robusto
- `aria-*` attributes: role, aria-label, aria-labelledby, aria-hidden
- Contraste de colores, tamaños de fuente
- Navegación por teclado: tabindex, focus visible
- Screen readers: testing con NVDA/VoiceOver
- Herramientas: Lighthouse, axe DevTools

### 6.4 CSS

#### CSS Básico (`sections/css-basico.html`)
- Selectores: element, class, id, attribute, pseudo-class, pseudo-element
- Box Model: margin, padding, border, content-box vs border-box
- Specificity: cómo se calcula, tips para manejarla
- Display: block, inline, inline-block, none
- Position: static, relative, absolute, fixed, sticky
- Overflow: visible, hidden, scroll, auto
- Float y clear (histórico + casos de uso modernos)

#### Variables CSS (`sections/css-variables.html`)
- Custom properties: `--mi-variable`
- Uso con `var()`
- Fallbacks: `var(--color, #333)`
- Theming: dark/light con variables
- `@property`: registro de custom properties
- Variables dinámicas con JS

#### Flexbox (`sections/css-flexbox.html`)
- Container: display flex, flex-direction, justify-content, align-items, flex-wrap, gap
- Items: flex-grow, flex-shrink, flex-basis, align-self, order
- Patrones comunes: centering, navbar, card layout, footer sticky
- Playground interactivo (si es viable)

#### CSS Grid Layout (`sections/css-grid.html`)
- Container: grid-template-columns/rows, gap, grid-template-areas
- Items: grid-column, grid-row, span
- `fr` unit, `minmax()`, `auto-fill`, `auto-fit`
- Patrones comunes: page layout, masonry-like, gallery
- Grid vs Flexbox: cuándo usar cada uno

#### Responsive Design (`sections/css-responsive.html`)
- Media queries: sintaxis, breakpoints comunes
- Mobile-first approach
- Unidades relativas: rem, em, vw, vh, %
- `clamp()`: tipografía fluida
- Container queries (conceptual + soporte)
- Imágenes responsivas: `<picture>`, srcset
- @media (prefers-color-scheme), prefers-reduced-motion
- Breakpoints del proyecto: 768px, 1024px, 1280px

#### Preprocesadores (`sections/css-preprocesadores.html`)
- Qué son y por qué nacieron
- SASS: variables, nesting, mixins, functions, partials, @use, @forward
- LESS: comparación rápida con SASS
- PostCSS: el enfoque moderno de plugins
- ¿Vale la pena hoy? (CSS nativo vs preprocesadores)

#### Frameworks CSS (`sections/css-frameworks.html`)
- Qué son y cuándo usarlos
- Tailwind CSS: filosofía utility-first, configuración, responsive, dark mode
- Bootstrap 5: componentes, grid system, cuándo es útil
- Comparativa: Tailwind vs Bootstrap
- CSS puro vs Frameworks: ventajas y desventajas

#### Animaciones & Transiciones (`sections/css-animaciones.html`)
- Transiciones: `transition-property`, `duration`, `timing-function`, `delay`
- Animaciones con `@keyframes`: from/to, porcentajes
- `animation`: name, duration, iteration-count, direction, fill-mode
- `transform`: translate, rotate, scale, skew
- Performance: will-change, compositing, evitar layout thrashing
- Easing functions: ease, linear, cubic-bezier
- Animaciones modernas: View Transitions API (conceptual)

#### Maquetación Web (`sections/css-maquetacion.html`)
- Flujo de trabajo: diseño → maqueta → desarrollo
- Convención BEM: Block Element Modifier
- Diseño mobile-first
- Breakpoints strategy
- Componentes atómicos: atoms → molecules → organisms
- Herramientas: Figma a código, DevTools, grid overlays

### 6.5 JavaScript

#### JS Básico (`sections/js-basico.html`)
- Variables: `let`, `const`, `var` (y por qué evitarlo)
- Tipos de datos: string, number, boolean, null, undefined, object, symbol, bigint
- Operadores: aritméticos, comparación (=== vs ==), lógicos, ternario
- Condicionales: if/else, switch
- Loops: for, while, for...of, for...in
- Funciones: declaración, expresión, parámetros, return

#### ES6+ / Modern JS (`sections/js-moderno.html`)
- Arrow functions: `() => {}`, this binding
- Template literals: `` `Hola ${nombre}` ``
- Destructuring: objetos y arrays
- Spread & Rest: `...array`, `...obj`
- Default parameters
- Optional chaining: `obj?.prop`, `obj?.method?.()`
- Nullish coalescing: `??` vs `||`
- Modules: `import` / `export`
- Array methods: map, filter, reduce, find, some, every, includes
- Object methods: Object.keys, Object.values, Object.entries, Object.assign

#### DOM Manipulation (`sections/js-dom.html`)
- Qué es el DOM, árbol de nodos
- Selección: `getElementById`, `querySelector`, `querySelectorAll`
- Creación: `createElement`, `appendChild`, `insertBefore`, `removeChild`
- Modificación: textContent, innerHTML (y riesgos de XSS), classList, style
- Traversing: parentElement, children, nextSibling, closest
- Data attributes: `dataset`, `data-*`

#### Eventos & Event Handling (`sections/js-eventos.html`)
- `addEventListener`, `removeEventListener`
- Tipos de eventos: click, input, submit, keydown, scroll, resize, load, error
- Event object: target, currentTarget, preventDefault, stopPropagation
- Bubbling y capturing (fase de propagación)
- Event delegation: un listener para muchos elementos
- Custom events: `new CustomEvent`, dispatchEvent
- Keyboard events: key, code, which
- Throttle y debounce para eventos frecuentes

#### Asincronía (`sections/js-asincronia.html`)
- Callbacks: qué son, callback hell
- Promises: `new Promise`, then/catch/finally, Promise.all, Promise.race
- Async/Await: sintaxis, try/catch, loops con await
- Fetch API: GET, POST, PUT, DELETE, headers, JSON
- API REST: conceptos básicos, status codes
- Errores comunes y manejo de errores
- Patrones: loading states, error states

#### Almacenamiento (`sections/js-almacenamiento.html`)
- `localStorage`: setItem, getItem, removeItem, clear, JSON.stringify/parse
- `sessionStorage`: diferencias con localStorage
- Cookies: document.cookie, HttpOnly, Secure, SameSite
- IndexedDB: introducción (conceptual)
- Cuándo usar cada uno

### 6.6 SEO & Performance (`sections/seo-performance.html`)
- Meta tags esenciales: title, description, viewport, charset, robots, canonical
- Open Graph & Twitter Cards: og:title, og:description, og:image, twitter:card
- HTML Semántico y su impacto en SEO
- Structured data: JSON-LD (BlogPosting, FAQPage, BreadcrumbList)
- Core Web Vitals: LCP, INP (reemplazó FID), CLS
- Lazy loading: `loading="lazy"`, Intersection Observer
- Optimización de imágenes: formatos (WebP, AVIF), srcset, sizes, fetchpriority
- Lighthouse: cómo usarlo, métricas
- Sitemap.xml: estructura, loc, lastmod, changefreq, priority, sitemap index
- robots.txt: User-agent, Allow/Disallow, Sitemap directive
- Checklist SEO rápido

### 6.7 Herramientas & Workflow (`sections/herramientas-workflow.html`)
- VS Code: extensiones esenciales, settings recomendados
- Live Server: preview local
- DevTools: Console, Elements, Network, Sources, Lighthouse
- Prettier: formateo automático
- Emmet: abreviaciones de código
- Git GUI: GitHub Desktop, VS Code Git
- Browser compatibility: Can I Use, MDN
- Deploy: GitHub Pages, Netlify, Vercel

### 6.8 Recursos (`sections/recursos.html`) — *Próxima sección*
- Links a documentación oficial (MDN, W3C, web.dev)
- Tutoriales y cursos recomendados
- Canales de YouTube y creadores de contenido
- Herramientas online (validadores, generadores, playgrounds)
- Comunidades y foros
- Libros recomendados

---

## 7. Cheatsheets

Las cheatsheets son secciones dedicadas con formato de **referencia rápida**. Tienen su propio estilo visual: tablas compactas, sintaxis directa, sin explicación extensa.

### Formato de Cheatsheet

- Tablas con: Comando/Sintaxis | Descripción breve | Ejemplo
- Código mínimo, sin contexto extenso
- Badges por categoría (selector, propiedad, método, etc.)
- Botón para imprimir (CSS `@media print`)
- Posible exportación a PDF (generar después con otro tool)

### Cheatsheets planificadas

| Cheatsheet | Contenido cubierto |
|-----------|-------------------|
| HTML Cheatsheet | Todas las etiquetas, atributos globales, entidades, meta tags |
| CSS Cheatsheet | Selectores, propiedades por categoría, unidades, funciones |
| JS Cheatsheet | Métodos de string/array/object, operadores, sintaxis ES6+ |
| Git Cheatsheet | Comandos esenciales, workflow, aliases recomendados |
| SEO Cheatsheet | Meta tags, Open Graph, Core Web Vitals, sitemap, robots.txt, checklist |

---

## 8. Funcionalidades Interactivas

### 8.1 Buscador In-Page

- Barra de búsqueda en el header
- Filtra secciones en tiempo real (debounce 300ms)
- Muestra resultados con highlight del texto resaltado
- Busca en: títulos, descripciones, keywords de cada sección
- Implementación: índice simple en JS con `filter()`, sin backend

### 8.2 Scroll Spy

- IntersectionObserver detecta la sección visible
- Resalta el item correspondiente en el sidebar
- Funciona al scrollear y al hacer click en un link del sidebar

### 8.3 Theme Toggle

- Toggle dark/light en el header
- Persiste la preferencia en `localStorage`
- Dark es el tema por defecto; solo respeta preferencia explícita del usuario
- Transición suave con CSS transition en `background-color` y `color`

### 8.4 Botón Copiar Código

- En cada bloque de código
- Copia al clipboard con `navigator.clipboard.writeText()`
- Feedback visual: ícono cambia a checkmark por 2 segundos
- Texto del botón: "Copiar" → "¡Copiado!"

### 8.5 Sidebar Colapsable

- Desktop: sidebar siempre visible, pero puede colapsarse
- Tablet/Mobile: hamburger menu en header, sidebar como overlay
- Acordeón por categoría: HTML ▾, CSS ▾, JS ▾, etc.
- Indicador de sección activa

### 8.6 Animaciones on Scroll

- Todas las secciones/apartados se animan al entrar al viewport
- Fade-in + slide-up sutil (30px, 0.6s ease)
- Respeto a `prefers-reduced-motion`
- Thresholds ajustados para no activarse prematuramente

---

## 9. SEO & Meta del Proyecto

### Meta Tags principales

```html
<title>WebForge | Guía + Cheatsheet de Desarrollo Web</title>
<meta name="description" content="WebForge: guía completa y cheatsheet de referencia para desarrollo web: HTML, CSS, JavaScript, Git, SEO y más.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="UTF-8">
```

### Open Graph

```html
<meta property="og:title" content="WebForge — Compendio de Desarrollo Web">
<meta property="og:description" content="WebForge: tu guía y cheatsheet para desarrollo web frontend">
<meta property="og:image" content="/assets/images/og-image.png">
<meta property="og:type" content="website">
```

### Performance

- Fuentes: `font-display: swap`, preload de fuentes críticas
- Imágenes: lazy loading, formatos modernos
- CSS: split por página (no cargar todo el CSS en cada página)
- JS: módulos por funcionalidad, defer/async

---

## 10. Plan de Desarrollo (Fases)

### Fase 1: Cimentación ✅
- [x] Configurar estructura de archivos y carpetas
- [x] Crear `variables.css` con toda la paleta de colores y tipografía
- [x] Crear `reset.css` y `base.css`
- [x] Crear componentes compartidos: `header.html`, `sidebar.html`, `footer.html`
- [x] Implementar `common-loader.js` para carga de componentes
- [x] Crear `index.html` (landing page) con diseño base
- [x] Configurar GitHub Pages (si no está ya)
- [x] Crear README.md del repo

### Fase 2: Layout & Navegación ✅
- [x] Implementar `layout.css` (grid sidebar + main)
- [x] Implementar `sidebar.js` (toggle, acordeón, scroll spy)
- [x] Crear una página de sección como template (`sections/html-basico.html`)
- [x] Implementar responsive design (sidebar colapsable, hamburger menu)
- [x] Implementar `theme-toggle.js` (dark/light)
- [x] Crear `responsive.css` con breakpoints

### Fase 3: Componentes UI ✅
- [x] Implementar bloques de código con syntax highlighting
- [x] Implementar botón "Copiar código"
- [x] Crear sistema de callouts/tips/warnings/notes
- [x] Crear `components.css` completo
- [x] Implementar `code-blocks.css`
- [x] Implementar `animations.css` (on-scroll)
- [x] Implementar `scroll-animations.js`

### Fase 4: Contenido — Git & GitHub ✅
- [x] Escribir `sections/git-github.html`
- [x] Escribir `cheatsheets/git-cheatsheet.html`

### Fase 5: Contenido — HTML ✅
- [x] Escribir `sections/html-basico.html`
- [x] Escribir `sections/html-semantico.html`
- [x] Escribir `sections/html-formularios.html`
- [x] Escribir `sections/html-multimedia.html`
- [x] Escribir `sections/html-accesibilidad.html`
- [x] Escribir `cheatsheets/html-cheatsheet.html`

### Fase 6: Contenido — CSS ✅
- [x] Escribir `sections/css-basico.html`
- [x] Escribir `sections/css-variables.html`
- [x] Escribir `sections/css-flexbox.html`
- [x] Escribir `sections/css-grid.html`
- [x] Escribir `sections/css-responsive.html`
- [x] Escribir `sections/css-preprocesadores.html`
- [x] Escribir `sections/css-frameworks.html`
- [x] Escribir `sections/css-animaciones.html`
- [x] Escribir `sections/css-maquetacion.html`
- [x] Escribir `cheatsheets/css-cheatsheet.html`

### Fase 7: Contenido — JavaScript ✅
- [x] Escribir `sections/js-basico.html`
- [x] Escribir `sections/js-moderno.html`
- [x] Escribir `sections/js-dom.html`
- [x] Escribir `sections/js-eventos.html`
- [x] Escribir `sections/js-asincronia.html`
- [x] Escribir `sections/js-almacenamiento.html`
- [x] Escribir `cheatsheets/js-cheatsheet.html`

### Fase 8: Contenido — SEO & Extras ✅
- [x] Escribir `sections/seo-performance.html`
- [x] Escribir `cheatsheets/seo-cheatsheet.html`
- [x] Escribir `sections/herramientas-workflow.html`
- [x] Reorganizar menú: SEO como categoría propia, Extras con Herramientas + Recursos
- [x] Escribir `sections/recursos.html` (links, tutoriales, videos, comunidades)

### Fase 9: Funcionalidades Extra & Polish
- [x] Implementar buscador in-page (`search.js`)
- [x] Crear og-image.png
- [x] Crear favicon.svg
- [x] Revisión de SEO: meta tags, Open Graph, sitemap
- [x] Revisión de accesibilidad: contrastes, aria attributes, keyboard nav
- [x] Revisión de performance: Lighthouse audit
- [ ] Testing cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Testing responsive: mobile, tablet, desktop
- [x] Crear `CONTRIBUTING.md`

---

## 11. Convenciones del Código

### HTML
- Indentación: 4 espacios
- UTF-8 siempre
- Etiquetas y atributos en minúsculas
- Atributos en orden: class, id, data-*, src/href, alt, aria-*, role
- HTML semántico siempre
- Comments para secciones largas

### CSS
- Indentación: 4 espacios
- Custom properties para todo (colores, spacing, fuentes)
- Mobile-first para media queries
- Nombres de clase en kebab-case: `.mi-clase-visual`
- BEM opcional para componentes complejos
- Orden de propiedades: positioning → box model → visual → typography → misc

### JavaScript
- ES6+ estrictamente (const/let, arrow functions, template literals)
- `const` por defecto, `let` solo cuando la variable muta
- Nombres de funciones y variables en camelCase
- Funciones pequeñas y con un solo propósito
- Comments JSDoc para funciones públicas
- Event delegation cuando sea posible

---

## 12. Recursos & Referencias

- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript Info](https://javascript.info/)
- [Web.dev](https://web.dev/)
- [Flexbox Froggy](https://flexboxfroggy.com/)
- [Grid Garden](https://cssgridgarden.com/)
- [Lucide Icons](https://lucide.dev/)
- [Highlight.js](https://highlightjs.org/)

---

> **En progreso**: Fases 1-7 completadas. Fase 8 en curso (SEO & Extras). Próximo → Sección Recursos, luego Fase 9 (Polish).
