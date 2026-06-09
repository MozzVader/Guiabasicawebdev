/**
 * WebForge — Scroll Animations
 * Animates elements into view using IntersectionObserver.
 */

/**
 * Initializes scroll-triggered animations
 */
export const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    elements.forEach((el) => observer.observe(el));
};

// Initialize on DOM ready and after components load
document.addEventListener('DOMContentLoaded', initScrollAnimations);
document.addEventListener('components:loaded', () => {
    // Re-init in case new elements were loaded with components
    setTimeout(initScrollAnimations, 100);
});

export default initScrollAnimations;
