/**
 * WebForge — Code Blocks Controller
 * Handles syntax highlighting (Highlight.js) and copy-to-clipboard.
 */

/**
 * Initializes Highlight.js on all code blocks
 */
export const initHighlighting = () => {
    // If Highlight.js is loaded via CDN
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('.code-block pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
};

/**
 * Initializes copy buttons on all code blocks
 */
export const initCopyButtons = () => {
    const copyBtns = document.querySelectorAll('.code-block-copy');
    copyBtns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const codeBlock = btn.closest('.code-block');
            const code = codeBlock.querySelector('code');

            if (!code) return;

            const text = code.textContent;

            // Use clipboard API
            try {
                await navigator.clipboard.writeText(text);
                showCopiedFeedback(btn);
            } catch {
                // Fallback
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

/**
 * Shows visual feedback after copying
 */
const showCopiedFeedback = (btn) => {
    const originalHTML = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado`;

    setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalHTML;
    }, 2000);
};

// Initialize on DOM ready and after components load
document.addEventListener('DOMContentLoaded', () => {
    initHighlighting();
    initCopyButtons();
});

document.addEventListener('components:loaded', () => {
    setTimeout(() => {
        initHighlighting();
        initCopyButtons();
    }, 100);
});

export default { initHighlighting, initCopyButtons };
