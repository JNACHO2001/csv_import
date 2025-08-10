const url = "http://localhost:3000/";

async function getPrestamos() {
  try {
    const body = document.querySelector(".event-body");

    const response = await axios.get(url);
    const datas = await response.data;
    console.table(datas);
    datas.forEach((dato) => {
      body.innerHTML += renderEventRow(dato);
    });
  } catch (error) {
    console.error(error);
  }
}

function renderEventRow(dato) {
  return `
    <div class="event-row selected">
      <h3>event</h3>
      <div class="event-name">${dato.usuario}</div>
      <div class="event-description">${dato.libro}</div>
      <div class="event-capacity">${dato.fecha_devolucion}</div>
      <div class="event-actions">
        <button class="btn-edit action-btn" data-id="${event.id}">editar</button>
        <button class="btn-delete action-btn" data-id="${event.id}">eliminar</button>
      </div>
    </div>
  `;
}

getPrestamos();
