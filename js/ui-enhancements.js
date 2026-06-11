/**
 * WebForge — UI Enhancements
 * Reading progress bar, back to top, "/" search shortcut, heading link copy, TOC FAB.
 */

// === Reading Progress Bar ===
const initProgressBar = () => {
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper?.classList.contains('landing-page')) return;

    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
};

// === Back to Top Button ===
const initBackToTop = () => {
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper?.classList.contains('landing-page')) return;

    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    btn.style.display = 'none';
    document.body.appendChild(btn);

    const showThreshold = 400;

    const toggleVisibility = () => {
        btn.style.display = window.scrollY > showThreshold ? 'flex' : 'none';
    };

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                toggleVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    toggleVisibility();
};

// === "/" Search Shortcut ===
const initSearchShortcut = () => {
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input, textarea, or contenteditable
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

        if (e.key === '/') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
};

// === Heading Link Copy ===
const initHeadingCopy = () => {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('.heading-anchor');
        if (!anchor) return;

        e.preventDefault();

        const href = anchor.getAttribute('href');
        if (!href) return;

        const url = window.location.origin + window.location.pathname + href;

        navigator.clipboard.writeText(url).then(() => {
            showCopyTooltip(anchor);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyTooltip(anchor);
        });
    });
};

const showCopyTooltip = (anchor) => {
    // Remove existing tooltip if any
    const existing = document.getElementById('copy-tooltip');
    if (existing) existing.remove();

    const tooltip = document.createElement('span');
    tooltip.id = 'copy-tooltip';
    tooltip.textContent = 'Link copiado';
    anchor.parentNode.style.position = 'relative';
    anchor.parentNode.appendChild(tooltip);

    // Remove after 1.5s
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 200);
    }, 1500);
};

// === TOC FAB (Table of Contents) ===
const initTocFab = () => {
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper?.classList.contains('landing-page')) return;
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const slugify = (text) => text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const getHeadingText = (el) => {
        const clone = el.cloneNode(true);
        const anchor = clone.querySelector('.heading-anchor');
        if (anchor) anchor.remove();
        return clone.textContent.trim();
    };

    // Collect all h2 and h3 headings with their IDs
    const headings = [];
    mainContent.querySelectorAll('h2, h3').forEach((el) => {
        const text = getHeadingText(el);
        if (!text) return;

        let id = el.id;
        if (!id) {
            // h2: reuse parent section ID if available
            const parentSection = el.closest('section[id]');
            if (parentSection && el.tagName === 'H2') {
                id = parentSection.id;
            } else {
                // h3 or orphaned h2: generate slug-based ID
                id = slugify(text);
                el.id = id;
                el.style.scrollMarginTop = 'calc(var(--header-height) + var(--space-6))';
            }
        }

        // Store TOC target ID on the element for the observer
        el.dataset.tocTarget = id;
        headings.push({ text, id, level: el.tagName === 'H2' ? 2 : 3, el });
    });

    // Don't show TOC on pages with fewer than 3 headings
    if (headings.length < 3) return;

    // --- Create FAB button ---
    const fab = document.createElement('button');
    fab.id = 'toc-fab';
    fab.setAttribute('aria-label', 'Tabla de contenidos');
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>';
    document.body.appendChild(fab);

    // --- Create drawer ---
    const drawer = document.createElement('aside');
    drawer.id = 'toc-drawer';
    drawer.setAttribute('aria-label', 'Tabla de contenidos');

    let listHTML = '';
    headings.forEach(h => {
        const h3Class = h.level === 3 ? ' toc-link--h3' : '';
        listHTML += '<a href="#' + h.id + '" class="toc-link' + h3Class + '" data-toc-id="' + h.id + '">' + h.text + '</a>';
    });

    drawer.innerHTML =
        '<div class="toc-drawer__header">' +
            '<span class="toc-drawer__title">\u00cdndice</span>' +
            '<button class="toc-drawer__close" aria-label="Cerrar \u00edndice">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
        '</div>' +
        '<nav class="toc-drawer__list">' + listHTML + '</nav>';
    document.body.appendChild(drawer);

    // --- Toggle logic ---
    let isOpen = false;

    const open = () => {
        isOpen = true;
        drawer.classList.add('is-open');
        fab.classList.add('is-active');
        fab.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
        isOpen = false;
        drawer.classList.remove('is-open');
        fab.classList.remove('is-active');
        fab.setAttribute('aria-expanded', 'false');
    };

    fab.addEventListener('click', () => isOpen ? close() : open());
    drawer.querySelector('.toc-drawer__close').addEventListener('click', close);

    // Click a heading link → smooth scroll + close drawer
    drawer.addEventListener('click', (e) => {
        const link = e.target.closest('.toc-link');
        if (!link) return;

        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        close();
    });

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) close();
    });

    // --- Active heading tracking (IntersectionObserver) ---
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 60;

    const setActiveLink = (id) => {
        drawer.querySelectorAll('.toc-link').forEach(link => {
            link.classList.toggle('is-active', link.dataset.tocId === id);
        });
        // Scroll active link into view within the drawer
        const activeLink = drawer.querySelector('.toc-link.is-active');
        if (activeLink) {
            activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.dataset.tocTarget);
            }
        });
    }, {
        rootMargin: '-' + (headerHeight + 20) + 'px 0px -70% 0px',
        threshold: 0
    });

    headings.forEach(h => observer.observe(h.el));
};

// === Page Transitions ===
const initPageTransitions = () => {
    const DURATION = 150; // ms — keep it snappy
    let isNavigating = false;

    // Fade out on internal link click
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;

        // Skip external links, anchors, and special links
        const href = link.getAttribute('href');
        if (!href ||
            href.startsWith('http') ||
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            link.target === '_blank' ||
            e.ctrlKey || e.metaKey || e.shiftKey) return;

        e.preventDefault();
        if (isNavigating) return;
        isNavigating = true;

        document.body.style.opacity = '0';
        document.body.style.transition = `opacity ${DURATION}ms ease`;

        setTimeout(() => {
            window.location.href = href;
        }, DURATION);
    });
};

// Initialize after components load
document.addEventListener('components:loaded', () => {
    initProgressBar();
    initBackToTop();
    initSearchShortcut();
    initHeadingCopy();
    initTocFab();
    initPageTransitions();
});