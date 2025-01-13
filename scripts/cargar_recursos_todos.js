// Mapeo de categorías: nombre en recursos.json -> título visible y nombre de la página
const mapeoCategorias = {
    "I-A": { titulo: "Inteligencia Artificial", pagina: "inteligencia-artificial.html" },
    "Matematica": { titulo: "Matemática", pagina: "matematica.html" },
    "Física": { titulo: "Física", pagina: "fisica.html" },
    "Programación": { titulo: "Programación", pagina: "programacion.html" },
    // Agrega más categorías según sea necesario
};

// Función principal para cargar todas las categorías y recursos
async function cargarTodos() {
    try {
        // Cargar datos de categorías y recursos
        const categoriasData = await cargarJSON("../scripts/categorias_completas.json", "categorías");
        const recursosData = await cargarJSON("../scripts/recursos.json", "recursos");

        // Obtener el contenedor del carrusel
        const container = document.getElementById("section-carousel");
        if (!container) throw new Error("No se encontró el contenedor 'section-carousel'");
        
        container.innerHTML = ""; // Limpiar contenido previo

        // Crear secciones para cada categoría
        categoriasData.forEach(categoria => {
            if (categoria.nombre === "Todos" || categoria.nombre === "Nuevo Recurso") return;

            const section = crearSeccionCategoria(categoria, recursosData);
            container.appendChild(section);
        });

    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}

// Función para cargar un archivo JSON y manejar errores
async function cargarJSON(url, tipo) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al cargar ${tipo}: ${response.status} ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al cargar el archivo ${tipo}:`, error);
        throw error;
    }
}

// Función para crear una sección por categoría
function crearSeccionCategoria(categoria, recursosData) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("categoria-wrapper");

    // Crear título de la categoría
    const tituloVisible = mapeoCategorias[categoria.nombre]?.titulo || categoria.nombre;
    const titulo = document.createElement("h2");
    titulo.classList.add("categoria-titulo");
    titulo.textContent = tituloVisible;
    wrapper.appendChild(titulo);

    // Crear contenedor con fondo
    const divCategoria = document.createElement("div");
    divCategoria.classList.add("car-categoria");
    divCategoria.style.backgroundImage = `url(${categoria.fondo})`;

    // Crear contenedor de recursos (track)
    const divTrack = document.createElement("div");
    divTrack.classList.add("track");

    // Filtrar y agregar recursos de la categoría
    const recursosFiltrados = recursosData.filter(resource => 
        resource.categorias.some(cat => cat === categoria.nombre)
    );

    if (recursosFiltrados.length === 0) {
        divTrack.innerHTML = `<p>No hay recursos disponibles en esta categoría.</p>`;
    } else {
        recursosFiltrados.forEach(resource => {
            const card = crearCard(resource);
            divTrack.appendChild(card);
        });
    }

    divCategoria.appendChild(divTrack);
    wrapper.appendChild(divCategoria);

    return wrapper;
}

// Función para crear una tarjeta de recurso
function crearCard(resource) {
    const divCardCont = document.createElement("div");
    divCardCont.classList.add("card-container");

    const divCard = document.createElement("div");
    divCard.classList.add("card");

    // Crear contenido de la tarjeta
    divCard.innerHTML = `
        <h3 class="recurso-title">${resource.nombre}</h3>
        <div class="recurso-descripcion">
            <p>${resource.descripcion}</p>
            <div class="recurso-boton">
                <a href="${resource.link}" target="_blank">Abrir Recurso</a>
            </div>
            <div class="categorias">
                ${resource.categorias
                    .map(
                        cat => `
                            <button class="categoria-boton" 
                                    onclick="irACategoria('${cat}')">
                                    ${mapeoCategorias[cat]?.titulo || cat}
                            </button>`
                    )
                    .join("")}
            </div>
        </div>
    `;

    divCardCont.appendChild(divCard);
    return divCardCont;
}

// Función para redirigir a la página de la categoría
function irACategoria(categoria) {
    const baseUrl = ""; // Ajusta según tu estructura de directorios
    const pagina = mapeoCategorias[categoria]?.pagina || encodeURIComponent(categoria.toLowerCase() + ".html");
    const categoriaUrl = `${baseUrl}${pagina}`;
    window.location.href = categoriaUrl;
}

// Iniciar la carga al cargar la página
document.addEventListener("DOMContentLoaded", cargarTodos);
