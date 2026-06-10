/**
 * WebForge — Sidebar Controller
 * Handles sidebar toggle, accordion, hamburger menu, and overlay.
 */

/**
 * Initializes sidebar functionality after components are loaded
 */
export const initSidebar = () => {
    const sidebar = document.querySelector('.site-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const hamburger = document.querySelector('.hamburger-btn');
    const pageWrapper = document.querySelector('.page-wrapper');

    if (!sidebar) return; // Landing page has no sidebar

    // === Hamburger Toggle (mobile/tablet) ===
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = sidebar.classList.contains('open');
            sidebar.classList.toggle('open');
            if (overlay) {
                overlay.classList.toggle('active', !isOpen);
                overlay.setAttribute('aria-hidden', String(isOpen));
            }
            document.body.style.overflow = isOpen ? '' : 'hidden';
            hamburger.setAttribute('aria-expanded', String(!isOpen));
        });
    }

    // === Overlay Close (mouse + keyboard) ===
    if (overlay) {
        overlay.setAttribute('tabindex', '-1');
        overlay.setAttribute('aria-hidden', 'true');

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (hamburger) {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        };

        overlay.addEventListener('click', closeSidebar);
        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
                e.preventDefault();
                closeSidebar();
            }
        });
    }

    // === Accordion Categories (keyboard accessible) ===
    const categoryHeaders = sidebar.querySelectorAll('.sidebar-category-header');
    categoryHeaders.forEach((header) => {
        const linksContainer = header.nextElementSibling;
        const isCollapsed = header.parentElement.classList.contains('collapsed');
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', String(!isCollapsed));
        header.setAttribute('aria-controls', linksContainer?.id || '');

        const toggle = () => {
            header.parentElement.classList.toggle('collapsed');
            const nowCollapsed = header.parentElement.classList.contains('collapsed');
            header.setAttribute('aria-expanded', String(!nowCollapsed));
        };

        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // === Highlight active link based on current page ===
    highlightActiveLink();

    // === Scroll spy (only on section pages) ===
    if (pageWrapper && !pageWrapper.classList.contains('landing-page')) {
        initScrollSpy();
    }
};

/**
 * Highlights the sidebar link matching the current page URL
 */
const highlightActiveLink = () => {
    const links = document.querySelectorAll('.sidebar-link');
    const currentPath = window.location.pathname;

    links.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (!href) return;

        // Match the end of the path
        if (currentPath.endsWith(href) ||
            currentPath.endsWith(href.replace('../', ''))) {
            link.classList.add('active');
            // Expand parent category
            const category = link.closest('.sidebar-category');
            if (category) category.classList.remove('collapsed');
        }
    });
};

/**
 * Scroll spy: highlights sidebar sub-section links based on scroll position
 */
const initScrollSpy = () => {
    const subSections = document.querySelectorAll('.sub-section[id]');
    if (subSections.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    // Update active states for sub-section links
                    document.querySelectorAll('.sidebar-sublink').forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        {
            rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 60}px 0px -70% 0px`,
            threshold: 0,
        }
    );

    subSections.forEach((section) => observer.observe(section));
};

// Initialize after components are loaded
document.addEventListener('components:loaded', initSidebar);

export default initSidebar;