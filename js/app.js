/**
 * Glosario de Odotoponimia - Main Application
 * Mobile-first responsive glossary with search and filter capabilities
 */

// ===================================================
// Application State
// ===================================================

const state = {
    terminos: [],
    terminosFiltrados: [],
    letraActiva: null,
    busquedaActual: '',
};

// ===================================================
// DOM Elements
// ===================================================

const DOM = {
    introText: document.getElementById('intro-text'),
    searchInput: document.getElementById('search-input'),
    clearSearch: document.getElementById('clear-search'),
    searchStats: document.getElementById('search-stats'),
    alphabetFilter: document.getElementById('alphabet-filter'),
    termsGrid: document.getElementById('terms-grid'),
    noResults: document.getElementById('no-results'),
    modal: document.getElementById('term-modal'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalClose: document.getElementById('modal-close'),
    modalIllustration: document.getElementById('modal-illustration'),
    modalLetter: document.getElementById('modal-letter'),
    modalTitle: document.getElementById('modal-title'),
    modalDefinition: document.getElementById('modal-definition'),
    totalTerms: document.getElementById('total-terms'),
    loading: document.getElementById('loading'),
};

// ===================================================
// Data Loading
// ===================================================

/**
 * Load glossary data from JSON file
 */
async function cargarGlosario() {
    try {
        const response = await fetch('data/glosario.json');
        if (!response.ok) throw new Error('Error al cargar el glosario');

        const data = await response.json();
        state.terminos = data.terminos;
        state.terminosFiltrados = data.terminos;

        // Display introduction
        DOM.introText.textContent = data.introduccion;

        // Initialize UI
        inicializarUI();
        renderizarTerminos(state.terminos);
        actualizarEstadisticas();

        // Hide loading
        setTimeout(() => {
            DOM.loading.classList.add('hidden');
        }, 300);
    } catch (error) {
        console.error('Error:', error);
        DOM.loading.innerHTML = `
            <div style="text-align: center; color: #d32f2f;">
                <h2>Error al cargar el glosario</h2>
                <p>Por favor, recarga la página</p>
            </div>
        `;
    }
}

// ===================================================
// UI Initialization
// ===================================================

/**
 * Initialize UI components
 */
function inicializarUI() {
    crearFiltroAlfabetico();
    configurarEventListeners();
}

/**
 * Create alphabet filter buttons
 */
function crearFiltroAlfabetico() {
    const letras = obtenerLetrasDisponibles();
    const todasLasLetras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const fragment = document.createDocumentFragment();

    // Add "Todas" button
    const btnTodas = crearBotonLetra('Todas', true);
    btnTodas.classList.add('active');
    fragment.appendChild(btnTodas);

    // Add letter buttons
    todasLasLetras.forEach(letra => {
        const disponible = letras.includes(letra);
        const btn = crearBotonLetra(letra, disponible);
        fragment.appendChild(btn);
    });

    DOM.alphabetFilter.appendChild(fragment);
}

/**
 * Create a letter filter button
 */
function crearBotonLetra(letra, disponible) {
    const btn = document.createElement('button');
    btn.className = 'alphabet-btn';
    btn.textContent = letra;
    btn.setAttribute('data-letra', letra);
    btn.setAttribute('aria-label', `Filtrar por letra ${letra}`);

    if (!disponible && letra !== 'Todas') {
        btn.classList.add('disabled');
        btn.disabled = true;
    } else {
        btn.addEventListener('click', () => filtrarPorLetra(letra));
    }

    return btn;
}

/**
 * Get available letters from terms
 */
function obtenerLetrasDisponibles() {
    const letras = new Set();
    state.terminos.forEach(termino => {
        letras.add(termino.letra.toUpperCase());
    });
    return Array.from(letras).sort();
}

// ===================================================
// Event Listeners
// ===================================================

/**
 * Configure all event listeners
 */
function configurarEventListeners() {
    // Search input
    DOM.searchInput.addEventListener('input', debounce(manejarBusqueda, 300));

    // Clear search button
    DOM.clearSearch.addEventListener('click', limpiarBusqueda);

    // Modal close events
    DOM.modalClose.addEventListener('click', cerrarModal);
    DOM.modalBackdrop.addEventListener('click', cerrarModal);

    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM.modal.classList.contains('active')) {
            cerrarModal();
        }
    });

    // Header scroll effect
    configurarScrollHeader();

    // Prevent body scroll when modal is open
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (DOM.modal.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });

    observer.observe(DOM.modal, { attributes: true });
}

/**
 * Configure header scroll effect
 */
function configurarScrollHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function actualizarHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(actualizarHeader);
            ticking = true;
        }
    });

    // Initial check
    actualizarHeader();
}

// ===================================================
// Search Functionality
// ===================================================

/**
 * Handle search input
 */
function manejarBusqueda(e) {
    const busqueda = e.target.value.trim().toLowerCase();
    state.busquedaActual = busqueda;

    // Show/hide clear button
    if (busqueda) {
        DOM.clearSearch.classList.add('active');
    } else {
        DOM.clearSearch.classList.remove('active');
    }

    // Filter terms
    filtrarTerminos();
}

/**
 * Clear search input
 */
function limpiarBusqueda() {
    DOM.searchInput.value = '';
    state.busquedaActual = '';
    DOM.clearSearch.classList.remove('active');
    filtrarTerminos();
    DOM.searchInput.focus();
}

/**
 * Filter terms based on search and letter
 */
function filtrarTerminos() {
    let terminosFiltrados = state.terminos;

    // Filter by letter
    if (state.letraActiva && state.letraActiva !== 'Todas') {
        terminosFiltrados = terminosFiltrados.filter(
            termino => termino.letra.toUpperCase() === state.letraActiva
        );
    }

    // Filter by search
    if (state.busquedaActual) {
        terminosFiltrados = terminosFiltrados.filter(termino => {
            const terminoLower = termino.termino.toLowerCase();
            const definicionLower = termino.definicion.toLowerCase();
            return terminoLower.includes(state.busquedaActual) ||
                   definicionLower.includes(state.busquedaActual);
        });
    }

    state.terminosFiltrados = terminosFiltrados;
    renderizarTerminos(terminosFiltrados);
    actualizarEstadisticas();
}

/**
 * Filter by letter
 */
function filtrarPorLetra(letra) {
    state.letraActiva = letra;

    // Update active button
    document.querySelectorAll('.alphabet-btn').forEach(btn => {
        if (btn.getAttribute('data-letra') === letra) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter terms
    filtrarTerminos();

    // Scroll to terms
    DOM.termsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===================================================
// Rendering
// ===================================================

/**
 * Render terms to the grid
 */
function renderizarTerminos(terminos) {
    DOM.termsGrid.innerHTML = '';

    if (terminos.length === 0) {
        DOM.noResults.style.display = 'block';
        return;
    }

    DOM.noResults.style.display = 'none';

    const fragment = document.createDocumentFragment();

    terminos.forEach((termino, index) => {
        const card = crearTarjetaTermino(termino, index);
        fragment.appendChild(card);
    });

    DOM.termsGrid.appendChild(fragment);
}

/**
 * Create a term card element
 */
function crearTarjetaTermino(termino, index) {
    const card = document.createElement('article');
    card.className = 'term-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Ver detalles de ${termino.termino}`);

    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.05}s`;

    // Get illustration URL for background
    const nombreArchivo = normalizarNombreTermino(termino.termino);
    const rutaImagen = `assets/img/${nombreArchivo}.png`;

    // Set background image using CSS custom property
    card.style.setProperty('--bg-image', `url('${rutaImagen}')`);

    // Get illustration for modal (keeps the current system)
    const ilustracion = obtenerIlustracion(termino.termino);

    card.innerHTML = `
        <div class="term-illustration">${ilustracion}</div>
        <div class="term-header">
            <span class="term-letter">${termino.letra}</span>
            <h3 class="term-title">${termino.termino}</h3>
        </div>
        <p class="term-definition">${termino.definicion}</p>
    `;

    // Click event
    card.addEventListener('click', () => abrirModal(termino));

    // Keyboard event
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            abrirModal(termino);
        }
    });

    return card;
}

/**
 * Normalize text for filenames (same as in ilustraciones.js)
 */
function normalizarNombreTermino(termino) {
    return termino.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '-') // Spaces to hyphens
        .replace(/[()]/g, ''); // Remove parentheses
}

/**
 * Update statistics display
 */
function actualizarEstadisticas() {
    const total = state.terminos.length;
    const mostrados = state.terminosFiltrados.length;

    DOM.totalTerms.textContent = total;

    if (state.busquedaActual || (state.letraActiva && state.letraActiva !== 'Todas')) {
        DOM.searchStats.textContent = `Mostrando ${mostrados} de ${total} términos`;
    } else {
        DOM.searchStats.textContent = `${total} términos disponibles`;
    }
}

// ===================================================
// Modal Functionality
// ===================================================

/**
 * Open modal with term details
 */
function abrirModal(termino) {
    // Set illustration
    const ilustracion = obtenerIlustracion(termino.termino);
    DOM.modalIllustration.innerHTML = ilustracion;

    // Set content
    DOM.modalLetter.textContent = termino.letra;
    DOM.modalTitle.textContent = termino.termino;
    DOM.modalDefinition.textContent = termino.definicion;

    DOM.modal.classList.add('active');
    DOM.modal.setAttribute('aria-hidden', 'false');

    // Focus on close button for accessibility
    setTimeout(() => {
        DOM.modalClose.focus();
    }, 100);
}

/**
 * Close modal
 */
function cerrarModal() {
    DOM.modal.classList.remove('active');
    DOM.modal.setAttribute('aria-hidden', 'true');
}

// ===================================================
// Utility Functions
// ===================================================

/**
 * Debounce function for search input
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Normalize text for search (remove accents)
 */
function normalizarTexto(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ===================================================
// Initialize Application
// ===================================================

// Load glossary when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarGlosario);
} else {
    cargarGlosario();
}

// Service Worker for offline support (optional for Netlify)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here if needed
    });
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        cargarGlosario,
        filtrarTerminos,
        abrirModal,
        cerrarModal,
    };
}
