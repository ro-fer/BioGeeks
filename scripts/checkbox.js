const form = document.querySelector('form');
const span_cb = document.getElementById('cb_validation');

form.addEventListener('submit', e => {
  const cb = document.querySelectorAll('#intereses label input:checked');
  if(cb.length < 1){
    span_cb.innerHTML = `Se requiere seleccionar al menos una opción...`;
    e.preventDefault( );
  }
})