/**
 * WebForge — Code Blocks Controller
 * Handles syntax highlighting (Highlight.js) and copy-to-clipboard.
 */

/**
 * Waits for Highlight.js to be available (CDN load), then initializes.
 * If already loaded, runs immediately. Otherwise retries for up to 3s.
 */
const waitForHljs = () => new Promise((resolve) => {
    if (typeof hljs !== 'undefined') {
        resolve();
        return;
    }

    let attempts = 0;
    const maxAttempts = 60; // 60 * 50ms = 3 seconds
    const interval = setInterval(() => {
        if (typeof hljs !== 'undefined') {
            clearInterval(interval);
            resolve();
        } else if (++attempts >= maxAttempts) {
            clearInterval(interval);
            console.warn('WebForge: Highlight.js failed to load from CDN');
            resolve();
        }
    }, 50);
});

/**
 * Initializes Highlight.js on all code blocks
 */
export const initHighlighting = async () => {
    await waitForHljs();

    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('.code-block pre code').forEach((block) => {
            if (!block.dataset.highlighted) {
                hljs.highlightElement(block);
                block.dataset.highlighted = 'true';
            }
        });
    }
};

/**
 * Shows visual and accessible feedback after copying
 */
const showCopiedFeedback = (btn) => {
    const originalHTML = btn.innerHTML;
    btn.classList.add('copied');
    btn.setAttribute('aria-label', 'Copiado');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado`;

    setTimeout(() => {
        btn.classList.remove('copied');
        btn.setAttribute('aria-label', 'Copiar código');
        btn.innerHTML = originalHTML;
    }, 2000);
};

/**
 * Initializes copy buttons on all code blocks
 */
export const initCopyButtons = () => {
    const copyBtns = document.querySelectorAll('.code-block-copy');
    copyBtns.forEach((btn) => {
        // Avoid double-binding
        if (btn.dataset.bound) return;
        btn.dataset.bound = 'true';

        btn.addEventListener('click', async () => {
            const codeBlock = btn.closest('.code-block');
            const code = codeBlock.querySelector('code');

            if (!code) return;

            const text = code.textContent;

            try {
                await navigator.clipboard.writeText(text);
                showCopiedFeedback(btn);
            } catch {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    showCopiedFeedback(btn);
                } catch {
                    console.warn('WebForge: Failed to copy code');
                } finally {
                    document.body.removeChild(textarea);
                }
            }
        });
    });
};

// Initialize only after components are loaded (no DOMContentLoaded double-init)
document.addEventListener('components:loaded', () => {
    // Small delay to ensure DOM is fully updated after component injection
    setTimeout(() => {
        initHighlighting();
        initCopyButtons();
    }, 100);
});

export default { initHighlighting, initCopyButtons };