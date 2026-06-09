/**
 * WebForge — Utility Functions
 */

/**
 * Debounce: delays function execution until after a pause in calls
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms (default 300)
 */
export const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
};

/**
 * Throttle: limits function execution to at most once per interval
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Minimum interval in ms (default 200)
 */
export const throttle = (fn, limit = 200) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Copies text to clipboard with fallback for older browsers
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            return true;
        } catch {
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
};

/**
 * Gets the base path for the project (handles both root and subfolder deployments)
 * @returns {string} Base path ending with /
 */
export const getBasePath = () => {
    const base = document.querySelector('base');
    if (base && base.href) {
        return base.href;
    }
    // For GitHub Pages in a subfolder: /repo-name/
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    // If we're in sections/ or cheatsheets/, go up one level
    if (segments[0] === 'sections' || segments[0] === 'cheatsheets') {
        return '../';
    }
    return './';
};

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector
 * @param {number} offset - Extra offset from top (default 80px)
 */
export const smoothScrollTo = (selector, offset = 80) => {
    const el = document.querySelector(selector);
    if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
};

/**
 * Formats a keyboard shortcut for display
 * @param {string} key - Key combination (e.g., "ctrl+k")
 * @returns {string} Formatted string
 */
export const formatShortcut = (key) => {
    const parts = key.split('+');
    return parts
        .map((p) => {
            if (p === 'ctrl' || p === 'cmd') {
                return navigator.platform.includes('Mac') ? '\u2318' : 'Ctrl';
            }
            if (p === 'shift') return '\u21E7';
            if (p === 'alt') return 'Alt';
            return p.toUpperCase();
        })
        .join('');
};
