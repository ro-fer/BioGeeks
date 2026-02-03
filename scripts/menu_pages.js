document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const recursosBtn = document.getElementById('recursos-btn');
    const dropdown = document.getElementById('dropdown');

    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    recursosBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el evento de clic se propague al documento
        dropdown.classList.toggle('show-dropdown');
    });

    // Cierra el dropdown si se hace clic en cualquier otro lugar del documento
    document.addEventListener('click', function() {
        dropdown.classList.remove('show-dropdown');
    });

    // Evita que se cierre el dropdown al hacer clic en él
    dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

async function cargarContenidoExtra() {
    try {
        const response = await fetch("../scripts/categorias_pages.json");
        if (!response.ok) {
            throw new Error("Failed to fetch categorias.json");
        }
        const data = await response.json();
        agregarContenidoExtra(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function agregarContenidoExtra(data) {
    const dropdown = document.getElementById('dropdown');
    if (!dropdown) {
        console.error('No se encontró el contenedor principal para insertar el contenido adicional.');
        return;
    }

    let contenidoHTML = '';

    for (const categoria in data) {
        if (data.hasOwnProperty(categoria)) {
            if(categoria=='Todos' ){
                contenidoHTML += '<li class="dropdown-separator"></li>';
            }
            contenidoHTML += `<li><a class="dropdown-item" href="${data[categoria]}">${categoria}</a></li>`;
        }
    }
    
    dropdown.innerHTML = contenidoHTML;
}

// Llamar a la función para cargar y agregar el contenido adicional
cargarContenidoExtra();
