// 🚀 Cargar categorías en el dropdown
async function cargarContenidoExtra() {
    try {
        const response = await fetch("https://ro-fer.github.io/BioGeeks/scripts/categorias_pages.json");
        if (!response.ok) {
            throw new Error("Error al cargar categorias.json");
        }

        const data = await response.json();
        agregarContenidoExtra(data);

    } catch (error) {
        console.error('Error:', error);
    }
}

// 🧠 Generar HTML del dropdown (RUTAS ARREGLADAS)
function agregarContenidoExtra(data) {
    const dropdown = document.getElementById('dropdown');
    if (!dropdown) return;

    let contenidoHTML = '';

    for (const categoria in data) {
        if (!data.hasOwnProperty(categoria)) continue;

        if (categoria === 'Todos') {
            contenidoHTML += '<li class="dropdown-separator"></li>';
        }

        // 🔥 CLAVE: extraer solo el nombre del archivo
        const nombrePagina = data[categoria].split("/").pop(); 
        // ejemplo → matematica.html

        let link = "";

        // 🔥 construir ruta correcta según dónde estás
        if (window.location.pathname.includes("/pages/")) {
            link = nombrePagina; // ya estoy en /pages/
        } else {
            link = `pages/${nombrePagina}`; // estoy en index
        }

        contenidoHTML += `
            <li>
                <a class="dropdown-item" href="${link}">
                    ${categoria}
                </a>
            </li>
        `;
    }

    dropdown.innerHTML = contenidoHTML;
}

// 🎯 INICIALIZACIÓN DEL MENÚ
document.addEventListener("DOMContentLoaded", function() {

    // Cargar contenido dinámico
    cargarContenidoExtra();

    const recursosBtn = document.getElementById('recursos-btn');
    const dropdown = document.getElementById('dropdown');

    if (!recursosBtn || !dropdown) return;

    // Toggle dropdown
    recursosBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown.classList.toggle('show-dropdown');
    });

    // Cerrar al hacer click afuera
    document.addEventListener('click', function() {
        dropdown.classList.remove('show-dropdown');
    });

    // Evitar que se cierre si hacés click dentro
    dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});