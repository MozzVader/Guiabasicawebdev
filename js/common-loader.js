/**
 * WebForge — Common Component Loader
 * Fetches and injects shared header, sidebar, and footer into every page.
 */

const COMPONENTS = {
    header: { path: '../components/header.html', target: '#site-header' },
    sidebar: { path: '../components/sidebar.html', target: '#site-sidebar' },
    footer: { path: '../components/footer.html', target: '#site-footer' },
};

/**
 * Loads a single component by fetching its HTML and injecting it
 */
const loadComponent = async (name, isRoot = false) => {
    const config = COMPONENTS[name];
    if (!config) return;

    const target = document.querySelector(config.target);
    if (!target) return;

    try {
        const basePath = isRoot ? './' : '../';
        const response = await fetch(`${basePath}${config.path.replace('../', '')}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        target.innerHTML = html;
    } catch (error) {
        console.warn(`WebForge: Failed to load ${name} component:`, error);
    }
};

/**
 * Loads all shared components and initializes their JS modules
 */
export const loadCommonComponents = async () => {
    const isRoot = window.location.pathname.endsWith('/') ||
                   window.location.pathname.endsWith('index.html');

    // Load all components in parallel
    await Promise.all([
        loadComponent('header', isRoot),
        loadComponent('sidebar', isRoot),
        loadComponent('footer', isRoot),
    ]);

    // Dispatch custom event when components are ready
    document.dispatchEvent(new CustomEvent('components:loaded'));
};

export default loadCommonComponents;
