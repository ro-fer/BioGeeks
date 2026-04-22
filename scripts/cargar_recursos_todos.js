// Mapeo de categorías
const mapeoCategorias = {
    "I-A": { titulo: "Inteligencia Artificial", pagina: "inteligencia-artificial.html" },
    "Matematica": { titulo: "Matemática", pagina: "matematica.html" },
    "Física": { titulo: "Física", pagina: "fisica.html" },
    "Herramientas": { titulo: "Herramientas", pagina: "herramientas.html" },
    "Programación": { titulo: "Programación", pagina: "programacion.html" },
};

// Función principal
async function cargarTodos() {
    try {
        const categoriasData = await cargarJSON("../scripts/categorias_completas.json", "categorías");
        const recursosData = await cargarJSON("../scripts/recursos.json", "recursos");

        const container = document.getElementById("section-carousel");
        if (!container) throw new Error("No se encontró el contenedor 'section-carousel'");
        
        container.innerHTML = "";

        // ⭐ SECCIÓN RECOMENDADOS
        const recomendados = recursosData.filter(r => r.recomendado);

        if (recomendados.length > 0) {
            const seccionTop = document.createElement("div");
            seccionTop.classList.add("categoria-wrapper");

            const titulo = document.createElement("h2");
            titulo.classList.add("categoria-titulo");
            titulo.textContent = "⭐ Recomendados";
            seccionTop.appendChild(titulo);

            const divCategoria = document.createElement("div");
            divCategoria.classList.add("car-categoria");

            // 🎨 fondo dinámico desde categorías
            const fondoRecomendados = categoriasData.find(c => c.nombre === "Recomendados")?.fondo;
            if (fondoRecomendados) {
                divCategoria.style.backgroundImage = `url(${fondoRecomendados})`;
            }

            const track = document.createElement("div");
            track.classList.add("track");

            recomendados.forEach(r => {
                track.appendChild(crearCard(r));
            });

            divCategoria.appendChild(track);
            seccionTop.appendChild(divCategoria);
            container.appendChild(seccionTop);
        }

        // 📂 SECCIONES POR CATEGORÍA
        categoriasData.forEach(categoria => {
            if (
                categoria.nombre === "Todos" || 
                categoria.nombre === "Nuevo Recurso" ||
                categoria.nombre === "Recomendados"
            ) return;

            const section = crearSeccionCategoria(categoria, recursosData);
            container.appendChild(section);
        });

    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}

// Cargar JSON
async function cargarJSON(url, tipo) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al cargar ${tipo}: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al cargar ${tipo}:`, error);
        throw error;
    }
}

// Crear sección por categoría
function crearSeccionCategoria(categoria, recursosData) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("categoria-wrapper");

    const tituloVisible = mapeoCategorias[categoria.nombre]?.titulo || categoria.nombre;
    const titulo = document.createElement("h2");
    titulo.classList.add("categoria-titulo");
    titulo.textContent = tituloVisible;
    wrapper.appendChild(titulo);

    const divCategoria = document.createElement("div");
    divCategoria.classList.add("car-categoria");
    divCategoria.style.backgroundImage = `url(${categoria.fondo})`;

    const divTrack = document.createElement("div");
    divTrack.classList.add("track");

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

// Crear card
function crearCard(resource) {
    const divCardCont = document.createElement("div");
    divCardCont.classList.add("card-container");

    const divCard = document.createElement("div");
    divCard.classList.add("card");

    // ⭐ nombre con estrella si es recomendado
    const nombreConEstrella = resource.recomendado 
        ? `⭐ ${resource.nombre}` 
        : resource.nombre;

    divCard.innerHTML = `
        <h3 class="recurso-title">${nombreConEstrella}</h3>
        <div class="recurso-descripcion">
            <p>${resource.descripcion}</p>
            <div class="recurso-boton">
                <a href="${resource.link}" target="_blank">Abrir Recurso</a>
            </div>
            <div class="categorias">
                ${resource.categorias
                    .map(cat => `
                        <button class="categoria-boton" onclick="irACategoria('${cat}')">
                            ${mapeoCategorias[cat]?.titulo || cat}
                        </button>
                    `)
                    .join("")}
            </div>
        </div>
    `;

    divCardCont.appendChild(divCard);
    return divCardCont;
}

// Redirección
function irACategoria(categoria) {
    const pagina = mapeoCategorias[categoria]?.pagina || `${categoria.toLowerCase()}.html`;
    window.location.href = pagina;
}

// Init
document.addEventListener("DOMContentLoaded", cargarTodos);