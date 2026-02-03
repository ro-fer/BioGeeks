async function cargarRecursos() {
    try {
      // Fetch y procesamiento de recursos
      const response = await fetch("./scripts/paginas.json"); // Ruta relativa desde la raíz del servidor
      if (!response.ok) {
        throw new Error('Failed to fetch paginas.json');
      }
      const resources = await response.json();
  
      // Insertar cada recurso en el contenedor
      resources.forEach(resource => {
        insertCard(resource,'container-pag');
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async function cargarPAGES() {
    try {
      // Fetch y procesamiento de recursos
      const response = await fetch("./scripts/paginas-recursos.json"); // Ruta relativa desde la raíz del servidor
      if (!response.ok) {
        throw new Error('Failed to fetch paginas.json');
      }
      const resources = await response.json();
  
      // Insertar cada recurso en el contenedor
      resources.forEach(resource => {
        insertCard(resource,'container-recursos');
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  function createCard(resource) {
    const divCard = document.createElement('div');
    divCard.classList.add('container');
  
    const { nombre, link, descripcion, img } = resource;
    divCard.innerHTML = `
      <div class="img">
        <img src="${img}" alt="${nombre}" class="img-pag">
      </div>
      <div class="titulo">
            <h4><a href="${link}" class="link-pag">${nombre}</a></h4>
        </div>
        <div class="descripcion">
            <p>${descripcion}</p>
        </div>
    `;
  
    return divCard;
  }
  
  function insertCard(resource, containerId) {
    const container = document.getElementById(containerId);
    const card = createCard(resource);
    container.appendChild(card);
  }
  
  // Llamar a cargarRecursos cuando la página se haya cargado
  document.addEventListener('DOMContentLoaded', () => {
    cargarRecursos();
    cargarPAGES();
  });
