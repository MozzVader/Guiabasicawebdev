/**
 * WebForge — Theme Toggle
 * Manages dark/light theme switching with localStorage persistence.
 */

const THEME_KEY = 'webforge-theme';

/**
 * Gets the initial theme based on localStorage or system preference
 * @returns {'dark' | 'light'}
 */
const getInitialTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;

    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }

    return 'dark';
};

/**
 * Applies theme to document
 * @param {'dark' | 'light'} theme
 * @param {boolean} animate - Whether to add transition animation
 */
export const applyTheme = (theme, animate = false) => {
    if (animate) {
        document.body.classList.add('theme-transitioning');
        setTimeout(() => document.body.classList.remove('theme-transitioning'), 350);
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update toggle icon
    const icon = document.querySelector('.theme-toggle-icon');
    if (icon) {
        icon.classList.toggle('rotate');
        // Swap icon: sun for dark theme, moon for light theme
        if (theme === 'light') {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
        } else {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
        }
    }
};

/**
 * Toggles between dark and light themes
 */
export const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
};

/**
 * Initializes theme on page load (no animation)
 */
export const initTheme = () => {
    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);

    // Set initial icon
    const icon = document.querySelector('.theme-toggle-icon');
    if (icon) {
        if (theme === 'light') {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
        }
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light', true);
        }
    });
};

/**
 * Binds click event to the theme toggle button (after components load)
 */
const bindThemeToggle = () => {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
};

// Bind after components are loaded
document.addEventListener('components:loaded', bindThemeToggle);

export default initTheme;
