const url = "http://localhost:3000/";

async function getPrestamos() {
  try {
    const body = document.querySelector(".event-body");
    const response = await axios.get(url);
    const datas = await response.data;
    datas.forEach((dato) => {
      return (body.innerHTML += renderEventRow(dato));
    });
    body.addEventListener("click", capturoEdit);
  } catch (error) {
    console.error(error);
  }
}

function renderEventRow(dato) {
  return `
    <div class="event-row selected">
     
      <div class="event-name">${dato.usuario}</div>
      <div class="event-description">${dato.libro}</div>
      <div class="event-capacity">${dato.fecha_devolucion}</div>
      <div class="event-actions">
        <button class="btn-edit action-btn" data-id="${dato.id_prestamo}">editar</button>
        <button class="btn-delete action-btn" data-id="${dato.id_prestamo}">eliminar</button>
      </div>
    </div>
  `;
}

getPrestamos();

async function capturoEdit(e) {
  const target = e.target;

  if (target.classList.contains("btn-edit")) {
    const id = target.dataset.id;
    console.log(id);
  }

  if (target.classList.contains("btn-delete")) {
    const id = target.dataset.id;
    console.log(id);
  }
}
