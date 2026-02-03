async function cargarRecursos(categoria) {
  try {
    // Cargar datos de categorías
    const categoriasResponse = await fetch("../scripts/categorias_pages.json");
    if (!categoriasResponse.ok) {
      throw new Error("Failed to fetch categorias.json");
    }
    const categoriasData = await categoriasResponse.json();

    // Cargar datos de recursos
    const response = await fetch("../scripts/recursos.json");
    if (!response.ok) {
      throw new Error('Failed to fetch recursos.json');
    }
    const resources = await response.json();

    // Filtrar recursos por categoría
    const filteredResources = categoria === 'Todos'
      ? resources
      : resources.filter((resource) =>
          resource.categorias.includes(categoria)
        );

    // Crear e insertar tarjetas de recursos
    const container = document.getElementById("recursos-container");
    container.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos elementos
    filteredResources.forEach((resource) => {
      const card = createCard(resource, categoriasData);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function createCard(resource, categoriasData) {
  const divCard = document.createElement('div');
  divCard.classList.add('recurso');
  
  const { nombre, link, descripcion, categorias } = resource;

  // Generar HTML de categorías
  let categoriasHTML = categorias.map(categoria => {
    const categoriaLink = categoriasData[categoria];
    return categoriaLink
      ? `<div class="categoria"><a href="${categoriaLink}" ">${categoria}</a></div>`
      : `<div class="categoria">${categoria}</div>`;
  }).join("");

  divCard.innerHTML = `
    <h3 class="recurso-title">${nombre}</h3>
    <div class="recurso-descripcion">
      ${descripcion}
      <div class="recurso-boton">
        <a href="${link}" target="_blank">Sitio Recurso</a>
      </div>
      <div class="categorias">
        ${categoriasHTML}
      </div>
    </div>
  `;

  return divCard;
}

// Función para manejar el clic en "Agregar Archivo"
function agregarArchivo() {
  alert('Funcionalidad de agregar archivo en desarrollo.');
}

// Manejo del menú desplegable
document.addEventListener("DOMContentLoaded", function() {
  const recursosBtn = document.getElementById('recursos-btn');
  const dropdown = document.getElementById('dropdown');

  recursosBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target) && dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  });
});

// Llamar a la función para cargar y agregar el contenido adicional
cargarContenidoExtra();
