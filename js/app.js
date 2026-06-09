/**
 * WebForge — App Entry Point
 * Initializes all modules in the correct order.
 */

// Import modules — all self-registering modules must be imported
// so their event listeners get attached
import { loadCommonComponents } from './common-loader.js';
import { initTheme } from './theme-toggle.js';
import { initSidebar } from './sidebar.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initHighlighting, initCopyButtons } from './code-blocks.js';

/**
 * Bootstraps the application
 */
const bootstrap = async () => {
    // 1. Apply theme immediately (before render to prevent flash)
    initTheme();

    // 2. Load shared components (header, sidebar, footer)
    await loadCommonComponents();

    // 3. Other modules auto-initialize via 'components:loaded' event:
    //    - sidebar.js
    //    - scroll-animations.js
    //    - code-blocks.js
    //    - theme-toggle.js (re-binds after components load)
};

// Run bootstrap when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}
