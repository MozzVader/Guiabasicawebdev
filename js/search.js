/**
 * WebForge — In-Page Search
 * Fetches a JSON index of all pages and provides instant search
 * with keyboard navigation. Search index is lazy-loaded on first
 * focus of the search input to avoid unnecessary network requests.
 */

let searchIndex = [];
let resultsContainer = null;
let activeIndex = -1;
let currentResults = [];
let indexLoaded = false;
let indexLoading = false;

/**
 * Determines the correct base path for the search index
 * depending on whether we're on the root page or a section page.
 */
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/sections/') || path.includes('/cheatsheets/')) return '../';
    if (path.endsWith('/') || path.endsWith('index.html')) return './';
    return './';
}

/**
 * Normalizes text for search: lowercase, remove accents, strip extra spaces.
 */
function normalize(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Scores a page against the query. Higher = better match.
 */
function scorePage(page, query) {
    const nQuery = normalize(query);
    const nTitle = normalize(page.title);
    const nDesc = normalize(page.description);
    const nHeadings = page.headings.map(h => normalize(h)).join(' ');
    const nCategory = normalize(page.category);
    const allText = `${nTitle} ${nDesc} ${nHeadings} ${nCategory}`;

    if (!allText.includes(nQuery)) return 0;

    let score = 0;

    // Title match (highest priority)
    if (nTitle.includes(nQuery)) {
        score += 100;
        // Exact title match
        if (nTitle === nQuery) score += 50;
        // Starts with query
        if (nTitle.startsWith(nQuery)) score += 30;
    }

    // Heading match
    for (const heading of page.headings) {
        const nHeading = normalize(heading);
        if (nHeading.includes(nQuery)) {
            score += 40;
            if (nHeading.startsWith(nQuery)) score += 15;
        }
    }

    // Category match
    if (nCategory === nQuery) score += 60;

    // Description match
    if (nDesc.includes(nQuery)) score += 20;

    // Frequency bonus (how many times query appears)
    const matches = allText.split(nQuery).length - 1;
    score += Math.min(matches * 5, 30);

    return score;
}

/**
 * Highlights matching text in a string with <mark> tags.
 */
function highlightMatch(text, query) {
    if (!query) return text;
    const nText = text.toLowerCase();
    const nQuery = normalize(query).toLowerCase();

    // Find the first occurrence of the query (accent-insensitive)
    const nTextPlain = normalize(text);
    const idx = nTextPlain.indexOf(nQuery);
    if (idx === -1) return text;

    // Map the index back to the original string
    let plainIdx = 0;
    let origStart = -1;
    let origEnd = -1;

    for (let i = 0; i < text.length && plainIdx < idx + nQuery.length; i++) {
        const charPlain = normalize(text[i]);
        if (plainIdx >= idx && plainIdx < idx + nQuery.length) {
            if (origStart === -1) origStart = i;
            origEnd = i + 1;
        }
        if (charPlain.length > 0) plainIdx++;
    }

    if (origStart === -1) return text;

    return text.substring(0, origStart) +
        '<mark>' + text.substring(origStart, origEnd) + '</mark>' +
        text.substring(origEnd);
}

/**
 * Creates the results dropdown container.
 */
function createResultsContainer(input) {
    const container = document.createElement('div');
    container.className = 'search-results';
    container.id = 'search-results';
    container.setAttribute('role', 'listbox');
    container.setAttribute('aria-label', 'Resultados de búsqueda');
    input.setAttribute('aria-haspopup', 'listbox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', 'search-results');
    input.setAttribute('aria-expanded', 'false');
    input.parentNode.appendChild(container);
    return container;
}

/**
 * Renders search results in the dropdown.
 */
function renderResults(results, query, input) {
    if (!resultsContainer) return;

    currentResults = results;
    activeIndex = -1;

    const hasResults = results.length > 0 && query && query.length >= 2;

    input.setAttribute('aria-expanded', String(hasResults));

    if (!query || query.length < 2 || results.length === 0) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('active');
        if (query && query.length >= 2 && results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-results-empty" role="presentation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                    No se encontraron resultados para "<strong>${escapeHtml(query)}</strong>"
                </div>`;
            resultsContainer.classList.add('active');
            input.setAttribute('aria-expanded', 'true');
        }
        return;
    }

    const basePath = getBasePath();
    const maxResults = Math.min(results.length, 8);

    let html = `<div class="search-results-header">${maxResults} resultado${maxResults > 1 ? 's' : ''}</div>`;

    for (let i = 0; i < maxResults; i++) {
        const page = results[i];
        const url = basePath + page.url;

        // Find the most relevant heading that matches
        let matchContext = '';
        if (query.length >= 2) {
            const matchingHeading = page.headings.find(h =>
                normalize(h).includes(normalize(query))
            );
            if (matchingHeading) {
                matchContext = highlightMatch(matchingHeading, query);
            }
        }

        // Category badge color
        const catColors = {
            'HTML': 'var(--accent-orange)',
            'CSS': 'var(--accent-blue)',
            'JavaScript': 'var(--accent-yellow)',
            'Git': 'var(--accent-red)',
            'SEO': 'var(--accent-green)',
            'Herramientas': 'var(--text-secondary)',
            'Recursos': 'var(--accent-purple)',
            'General': 'var(--text-secondary)',
        };
        const catColor = catColors[page.category] || 'var(--text-secondary)';

        html += `
            <a href="${url}" class="search-result-item${i === 0 ? '' : ''}" role="option" id="search-result-${i}" aria-selected="${i === 0 ? 'true' : 'false'}" data-index="${i}">
                <div class="search-result-content">
                    <div class="search-result-title">${highlightMatch(escapeHtml(page.title), query)}</div>
                    ${matchContext ? `<div class="search-result-context">${matchContext}</div>` : ''}
                </div>
                <span class="search-result-category" style="color: ${catColor}">${escapeHtml(page.category)}</span>
            </a>`;
    }

    resultsContainer.innerHTML = html;
    resultsContainer.classList.add('active');
    input.setAttribute('aria-expanded', 'true');
}

/**
 * Escapes HTML entities to prevent XSS.
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Navigates the active item in the results list.
 */
function updateActiveItem(direction) {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (items.length === 0) return;

    // Remove previous active
    if (activeIndex >= 0 && activeIndex < items.length) {
        items[activeIndex].classList.remove('active');
        items[activeIndex].setAttribute('aria-selected', 'false');
    }

    if (direction === 'down') {
        activeIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
    } else {
        activeIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
    }

    items[activeIndex].classList.add('active');
    items[activeIndex].setAttribute('aria-selected', 'true');
    items[activeIndex].scrollIntoView({ block: 'nearest' });
}

/**
 * Navigates to the currently active result.
 */
function navigateToActive() {
    if (activeIndex >= 0 && activeIndex < currentResults.length) {
        const basePath = getBasePath();
        window.location.href = basePath + currentResults[activeIndex].url;
    }
}

/**
 * Closes the search results dropdown.
 */
function closeResults(input) {
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('active');
    }
    if (input) {
        input.setAttribute('aria-expanded', 'false');
    }
    activeIndex = -1;
    currentResults = [];
}

/**
 * Loads the search index (lazy, only once)
 */
function loadSearchIndex() {
    if (indexLoaded || indexLoading) return;
    indexLoading = true;

    const basePath = getBasePath();
    fetch(basePath + 'data/search-index.json')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            searchIndex = data;
            indexLoaded = true;
        })
        .catch(err => {
            console.warn('WebForge: Failed to load search index:', err);
        })
        .finally(() => {
            indexLoading = false;
        });
}

/**
 * Performs the search with debouncing.
 */
let debounceTimer = null;
function performSearch(query, input) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (query.length < 2) {
            closeResults(input);
            return;
        }

        if (!indexLoaded) {
            // Index not loaded yet, try again shortly
            if (!indexLoading) loadSearchIndex();
            debounceTimer = setTimeout(() => performSearch(query, input), 200);
            return;
        }

        const scored = searchIndex
            .map(page => ({ page, score: scorePage(page, query) }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.page);

        renderResults(scored, query, input);
    }, 150);
}

/**
 * Initializes the search functionality.
 * Called after components are loaded (search input exists in DOM).
 */
export function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    // Create results container
    resultsContainer = createResultsContainer(input);

    // Input events
    input.addEventListener('input', (e) => {
        performSearch(e.target.value, input);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
        const hasResults = resultsContainer && resultsContainer.classList.contains('active');

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (hasResults) updateActiveItem('down');
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (hasResults) updateActiveItem('up');
                break;
            case 'Enter':
                e.preventDefault();
                if (hasResults && activeIndex >= 0) {
                    navigateToActive();
                }
                break;
            case 'Escape':
                e.preventDefault();
                closeResults(input);
                input.blur();
                break;
        }
    });

    // Focus: load index lazily + show results if there's a query
    input.addEventListener('focus', () => {
        loadSearchIndex();
        if (input.value.length >= 2 && indexLoaded) {
            performSearch(input.value, input);
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search')) {
            closeResults(input);
        }
    });

    // Close on scroll (main content)
    document.querySelector('.main-content')?.addEventListener('scroll', () => {
        closeResults(input);
    }, { passive: true });
}

export default initSearch;