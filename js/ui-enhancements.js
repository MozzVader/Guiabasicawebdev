/**
 * WebForge — UI Enhancements
 * Reading progress bar + Back to top button.
 */

// === Reading Progress Bar ===
const initProgressBar = () => {
    // Don't show on landing page
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
    // Don't show on landing page
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

// Initialize after components load (same as other modules)
document.addEventListener('components:loaded', () => {
    initProgressBar();
    initBackToTop();
});