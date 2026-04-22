const mapeoCategorias = {
    "I-A": { titulo: "Inteligencia Artificial", pagina: "inteligencia-artificial.html" },
    "Matematica": { titulo: "Matemática", pagina: "matematica.html" },
    "Física": { titulo: "Física", pagina: "fisica.html" },
    "Herramientas": { titulo: "Herramientas", pagina: "herramientas.html" },
    "Programación": { titulo: "Programación", pagina: "programacion.html" },
};

// 🔥 CARGAR RECURSOS
async function cargarRecursos(categoria) {
  try {
    const categoriasResponse = await fetch("../scripts/categorias_completas.json");
    if (!categoriasResponse.ok) {
      throw new Error("Error al cargar categorias");
    }
    const categoriasData = await categoriasResponse.json();

    const container = document.getElementById("recursos-container");
    if (!container) return;

    // 🎨 fondo en sección
    const categoriaActual = categoriasData.find(cat => cat.nombre === categoria);
    if (categoriaActual?.fondo) {
      container.style.backgroundImage = `url(${categoriaActual.fondo})`;
      container.style.backgroundSize = "cover";
      container.style.backgroundPosition = "center";
    }

    const response = await fetch("../scripts/recursos.json");
    if (!response.ok) {
      throw new Error("Error al cargar recursos");
    }
    const resources = await response.json();

    const filtrados = categoria === 'Todos'
      ? resources
      : resources.filter(r => r.categorias.includes(categoria));

    container.innerHTML = "";

    filtrados.forEach(resource => {
      const card = crearCard(resource);
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

// 🧱 CREAR CARD
function crearCard(resource) {
    const divCardCont = document.createElement("div");
    divCardCont.classList.add("card-container");

    const divCard = document.createElement("div");
    divCard.classList.add("card");

    const nombre = resource.recomendado 
        ? `⭐ ${resource.nombre}` 
        : resource.nombre;

    divCard.innerHTML = `
        <h3 class="recurso-title">${nombre}</h3>
        <div class="recurso-descripcion">
            <p>${resource.descripcion}</p>

            <div class="recurso-boton">
                <a href="${resource.link}" target="_blank">Abrir Recurso</a>
            </div>

            <div class="categorias">
                ${resource.categorias.map(cat => `
                    <button class="categoria-boton" onclick="irACategoria('${cat}')">
                        ${mapeoCategorias[cat]?.titulo || cat}
                    </button>
                `).join("")}
            </div>
        </div>
    `;

    divCardCont.appendChild(divCard);
    return divCardCont;
}

// 🚀 NAVEGACIÓN CORRECTA
function irACategoria(categoria) {
    const paginaBase = mapeoCategorias[categoria]?.pagina || `${categoria.toLowerCase()}.html`;

    // 👇 SIEMPRE ir bien a /pages/
    let rutaFinal = paginaBase;

    if (!window.location.pathname.includes("/pages/")) {
        // desde index
        rutaFinal = `pages/${paginaBase}`;
    }

    window.location.href = rutaFinal;
}