/**
 * Sistema de ilustraciones estilo sketch/lápiz para el glosario
 * Genera SVG con efecto dibujado a mano
 */

// Mapeo de términos a categorías de ilustración
const categoriasIlustracion = {
    // MONTAÑA Y ELEVACIONES
    montana: ['montaña', 'monte', 'pico', 'cumbre', 'cima', 'cerro', 'altozano', 'otero', 'mogote', 'cueto', 'tuca', 'alcor', 'loma', 'lomba', 'mota', 'teso', 'tozal', 'altiplanicie', 'macizo', 'cordillera', 'sierra', 'cresta', 'cuchillar', 'somo', 'ceja', 'cacumen', 'cúspide', 'viso'],

    // AGUA Y RÍOS
    agua: ['río', 'arroyo', 'cascada', 'torrente', 'regato', 'regajo', 'venero', 'hontanar', 'manantial', 'ojo de agua', 'fuente', 'acequia', 'cacera', 'azud', 'presa', 'embalse', 'alberca', 'lavajo', 'charca', 'horcajo', 'caz', 'azaber', 'chorrera', 'estuario', 'albufera', 'estero'],

    // CAMINOS Y SENDEROS
    camino: ['camino', 'senda', 'sendero', 'vereda', 'trocha', 'atajo', 'derrota', 'derrotero', 'ruta', 'vía', 'calzada', 'carretera', 'autopista', 'autovía', 'calle', 'rúa', 'bulevar', 'avenida', 'carrera', 'carril', 'pista', 'ronda', 'travesía', 'asenderear'],

    // VALLES Y DEPRESIONES
    valle: ['valle', 'hondonada', 'hoya', 'hoyo', 'vaguada', 'canal', 'barranco', 'hoz', 'garganta', 'congosto', 'desfiladero', 'quebrada', 'cañón', 'dolina', 'torca', 'sima', 'hueco', 'artesa', 'conatillo'],

    // BOSQUES Y VEGETACIÓN
    bosque: ['bosque', 'selva', 'soto', 'luco', 'encinar', 'hayedo', 'pinar', 'robledal', 'robledo', 'abedular', 'acebeda', 'fresneda', 'jaral', 'retamar', 'piornal', 'tomillar', 'dehesa', 'monte', 'moheda', 'alijar', 'calvero'],

    // ROCAS Y PEÑAS
    roca: ['roca', 'peña', 'risco', 'peñasco', 'cancho', 'galayo', 'tolmo', 'tormo', 'berrocal', 'canchal', 'pedregal', 'cascajal', 'glera', 'lancha', 'laja', 'escollo', 'farallón', 'roquedo', 'roquedal'],

    // COSTA Y MAR
    costa: ['costa', 'bahía', 'golfo', 'cabo', 'punta', 'cala', 'ensenada', 'acantilado', 'playa', 'flecha litoral', 'freo', 'porís'],

    // CONSTRUCCIONES
    construccion: ['puente', 'viaducto', 'pasarela', 'tajea', 'acera', 'arcén', 'berma', 'atalaya', 'humilladero', 'hito', 'mojón', 'pértiga', 'aceña', 'batán', 'molino'],

    // TERRENOS Y LLANURAS
    terreno: ['terreno', 'campo', 'campiña', 'llanura', 'pampa', 'páramo', 'yermo', 'erial', 'raña', 'rastrojo', 'bancal', 'era', 'haza', 'tabla', 'ejido', 'campillo', 'nava', 'marjal'],

    // PASOS Y PUERTOS
    paso: ['puerto', 'collado', 'portillo', 'portachuelo', 'degollada', 'paso', 'desfiladero', 'angostura', 'colada', 'cordel', 'cañada', 'vereda', 'azagador'],

    // CUEVAS Y CAVIDADES
    cueva: ['cueva', 'algar', 'caverna', 'gruta', 'furna', 'sima', 'geoda', 'cava', 'boca', 'boquerón'],

    // NIEVE Y HIELO
    nieve: ['glaciar', 'helero', 'ventisquero', 'alud', 'nevero', 'ibón'],

    // REFUGIOS Y CONSTRUCCIONES RURALES
    refugio: ['aprisco', 'majada', 'borda', 'tinada', 'tenada', 'cobertizo', 'cabaña', 'choza'],

    // TERRENOS HÚMEDOS
    humedo: ['pantano', 'ciénaga', 'tremedal', 'trampal', 'tolla', 'paúl', 'marjal', 'atolladero', 'atascadero'],

    // LADERAS Y PENDIENTES
    ladera: ['ladera', 'falda', 'vertiente', 'cuesta', 'declive', 'escarpe', 'talud', 'ribazo', 'solana', 'umbría', 'llambria'],

    // VÍAS PECUARIAS
    pecuaria: ['cañada', 'cordel', 'colada', 'vereda', 'cabañero', 'galiana', 'descansadero', 'vía pecuaria', 'abrevadero', 'apartadero'],

    // TERRENOS ESPECIALES
    especial: ['karst', 'malpaís', 'morrena', 'fajana', 'braña', 'breña', 'gándara', 'salobral', 'berma', 'cingla']
};

// SVG Ilustraciones con estilo sketch/dibujado a lápiz
const ilustracionesSVG = {
    montana: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M10,80 L30,40 L50,20 L70,45 L90,80"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  filter="url(#sketch)"/>
            <path d="M30,40 L40,30 L50,20 L60,35"
                  fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6"
                  stroke-linecap="round" filter="url(#sketch)"/>
        </svg>
    `,

    agua: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2"/>
                </filter>
            </defs>
            <path d="M20,50 Q30,40 40,50 T60,50 T80,50"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <path d="M25,60 Q35,52 45,60 T65,60 T85,60"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <path d="M22,70 Q32,64 42,70 T62,70 T82,70"
                  fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"
                  stroke-linecap="round" filter="url(#sketch)"/>
        </svg>
    `,

    camino: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M10,70 Q30,50 50,45 T90,30"
                  fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" stroke-dasharray="none"
                  filter="url(#sketch)"/>
            <path d="M10,75 Q30,55 50,50 T90,35"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <circle cx="20" cy="72" r="1.5" fill="currentColor" opacity="0.4"/>
            <circle cx="40" cy="60" r="1.5" fill="currentColor" opacity="0.4"/>
            <circle cx="60" cy="52" r="1.5" fill="currentColor" opacity="0.4"/>
            <circle cx="80" cy="38" r="1.5" fill="currentColor" opacity="0.4"/>
        </svg>
    `,

    valle: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M10,30 L30,50 L50,70 L70,50 L90,30"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  filter="url(#sketch)"/>
            <path d="M10,35 L30,52 L50,68 L70,52 L90,35"
                  fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"
                  stroke-linecap="round" filter="url(#sketch)"/>
        </svg>
    `,

    bosque: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/>
                </filter>
            </defs>
            <g filter="url(#sketch)">
                <path d="M25,70 L25,40 M20,48 L30,48 M22,56 L28,56" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <circle cx="25" cy="38" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M50,70 L50,35 M45,43 L55,43 M47,53 L53,53" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="50" cy="32" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M75,70 L75,42 M70,50 L80,50 M72,58 L78,58" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <circle cx="75" cy="40" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>
            </g>
        </svg>
    `,

    roca: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
                </filter>
            </defs>
            <path d="M20,75 L30,35 L45,25 L60,30 L75,40 L85,75 Z"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linejoin="round" filter="url(#sketch)"/>
            <path d="M30,50 L40,40 L50,38"
                  stroke="currentColor" stroke-width="1" opacity="0.5" fill="none"
                  filter="url(#sketch)"/>
            <path d="M55,45 L65,50 L70,60"
                  stroke="currentColor" stroke-width="1" opacity="0.5" fill="none"
                  filter="url(#sketch)"/>
        </svg>
    `,

    costa: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2"/>
                </filter>
            </defs>
            <path d="M10,50 Q20,30 40,35 T70,40 T90,50"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <path d="M10,60 Q30,55 50,58 T90,60"
                  fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <path d="M15,65 Q25,63 35,65 M55,66 Q65,64 75,66"
                  fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"
                  stroke-linecap="round" filter="url(#sketch)"/>
        </svg>
    `,

    construccion: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M20,60 Q35,30 50,35 Q65,40 80,60"
                  fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <line x1="20" y1="60" x2="20" y2="75" stroke="currentColor" stroke-width="2.5" filter="url(#sketch)"/>
            <line x1="80" y1="60" x2="80" y2="75" stroke="currentColor" stroke-width="2.5" filter="url(#sketch)"/>
            <line x1="15" y1="75" x2="85" y2="75" stroke="currentColor" stroke-width="2" filter="url(#sketch)"/>
        </svg>
    `,

    terreno: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/>
                </filter>
            </defs>
            <line x1="10" y1="50" x2="90" y2="50"
                  stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <line x1="15" y1="60" x2="85" y2="60"
                  stroke="currentColor" stroke-width="1.5" opacity="0.6"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <line x1="20" y1="70" x2="80" y2="70"
                  stroke="currentColor" stroke-width="1.5" opacity="0.4"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <circle cx="30" cy="45" r="1.5" fill="currentColor" opacity="0.4"/>
            <circle cx="50" cy="43" r="1.5" fill="currentColor" opacity="0.4"/>
            <circle cx="70" cy="46" r="1.5" fill="currentColor" opacity="0.4"/>
        </svg>
    `,

    paso: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M10,75 L25,35 L40,45 L60,40 L75,30 L90,70"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  filter="url(#sketch)"/>
            <path d="M40,45 L45,60 L55,62 L60,40"
                  fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-dasharray="3,2" opacity="0.7"
                  stroke-linecap="round" filter="url(#sketch)"/>
        </svg>
    `,

    cueva: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M20,70 L20,40 Q20,25 35,25 L65,25 Q80,25 80,40 L80,70 Z"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linejoin="round" filter="url(#sketch)"/>
            <ellipse cx="50" cy="55" rx="18" ry="12"
                     fill="none" stroke="currentColor" stroke-width="2"
                     filter="url(#sketch)"/>
        </svg>
    `,

    nieve: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/>
                </filter>
            </defs>
            <g filter="url(#sketch)">
                <path d="M50,25 L50,75 M30,37 L70,63 M30,63 L70,37"
                      stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="50" cy="25" r="3" fill="currentColor"/>
                <circle cx="50" cy="75" r="3" fill="currentColor"/>
                <circle cx="30" cy="37" r="2.5" fill="currentColor"/>
                <circle cx="70" cy="37" r="2.5" fill="currentColor"/>
                <circle cx="30" cy="63" r="2.5" fill="currentColor"/>
                <circle cx="70" cy="63" r="2.5" fill="currentColor"/>
            </g>
        </svg>
    `,

    refugio: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M25,75 L25,45 L50,25 L75,45 L75,75 Z"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linejoin="round" filter="url(#sketch)"/>
            <path d="M20,45 L50,25 L80,45"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <rect x="42" y="55" width="16" height="20"
                  fill="none" stroke="currentColor" stroke-width="1.5"
                  filter="url(#sketch)"/>
        </svg>
    `,

    humedo: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8"/>
                </filter>
            </defs>
            <g filter="url(#sketch)">
                <path d="M20,55 Q25,45 30,55 T40,55" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M45,58 Q50,48 55,58 T65,58" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M70,60 Q75,50 80,60" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <ellipse cx="35" cy="68" rx="8" ry="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
                <ellipse cx="55" cy="70" rx="10" ry="5" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
                <ellipse cx="75" cy="72" rx="7" ry="3.5" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
            </g>
        </svg>
    `,

    ladera: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M10,80 L90,20"
                  fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <path d="M15,80 L85,25"
                  fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"
                  stroke-linecap="round" filter="url(#sketch)"/>
            <path d="M25,75 L35,65 M45,55 L55,45 M65,35 L75,25"
                  fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"
                  stroke-linecap="round" filter="url(#sketch)"/>
        </svg>
    `,

    pecuaria: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <path d="M15,70 Q35,50 55,55 T85,40"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-dasharray="5,3" stroke-linecap="round"
                  filter="url(#sketch)"/>
            <circle cx="25" cy="60" r="4" fill="none" stroke="currentColor" stroke-width="1.5" filter="url(#sketch)"/>
            <circle cx="55" cy="55" r="4" fill="none" stroke="currentColor" stroke-width="1.5" filter="url(#sketch)"/>
            <circle cx="75" cy="45" r="4" fill="none" stroke="currentColor" stroke-width="1.5" filter="url(#sketch)"/>
        </svg>
    `,

    especial: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sketch">
                    <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="4" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
                </filter>
            </defs>
            <g filter="url(#sketch)">
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M30,40 Q40,35 50,40 T70,35" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M35,55 Q45,50 55,55 T75,50" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M32,65 Q42,62 52,65 T72,62" fill="none" stroke="currentColor" stroke-width="1.5"/>
            </g>
        </svg>
    `
};

/**
 * Obtiene la categoría de ilustración para un término
 */
function obtenerCategoriaIlustracion(termino) {
    const terminoLower = termino.toLowerCase();

    for (const [categoria, terminos] of Object.entries(categoriasIlustracion)) {
        if (terminos.some(t => terminoLower.includes(t))) {
            return categoria;
        }
    }

    return 'especial'; // Categoría por defecto
}

/**
 * Normaliza el nombre del término para usarlo como nombre de archivo
 */
function normalizarNombreTermino(termino) {
    return termino.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/\s+/g, '-') // Espacios a guiones
        .replace(/[()]/g, ''); // Eliminar paréntesis
}

/**
 * Obtiene la ilustración para un término (PNG si existe, sino SVG)
 */
function obtenerIlustracion(termino) {
    const nombreArchivo = normalizarNombreTermino(termino);
    const rutaImagen = `assets/img/${nombreArchivo}.png`;

    // Intentar usar imagen PNG primero
    return `<img src="${rutaImagen}" alt="${termino}" onerror="this.style.display='none'; this.parentElement.innerHTML=\`${ilustracionesSVG[obtenerCategoriaIlustracion(termino)] || ilustracionesSVG.especial}\`" style="width: 100%; height: 100%; object-fit: contain;">`;
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        categoriasIlustracion,
        ilustracionesSVG,
        obtenerCategoriaIlustracion,
        obtenerIlustracion
    };
}
