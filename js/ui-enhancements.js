/**
 * WebForge — UI Enhancements
 * Reading progress bar, back to top, "/" search shortcut, heading link copy.
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

// Initialize after components load
document.addEventListener('components:loaded', () => {
    initProgressBar();
    initBackToTop();
    initSearchShortcut();
    initHeadingCopy();
});