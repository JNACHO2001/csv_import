const url = "http://localhost:3000/";

let editando =null;

async function getPrestamos() {
  try {
    const body = document.querySelector(".event-body");
    body.innerHTML = "";
    const response = await axios.get(url);
    const datas = response.data;
    datas.forEach((dato) => {
      return (body.innerHTML += renderEventRow(dato));
    });
    body.addEventListener("click", capturoEdit);
  } catch (error) {
    console.error(error);
  }
}

async function eliminarPrestamo(id_prestamo) {
  try {
    await axios.delete(`${url}prestamos/${id_prestamo}`);
    console.log("Se eliminó el préstamo:", id_prestamo);
    await getPrestamos();
  } catch (error) {
    console.error("Hubo un error al eliminar el préstamo:", error);
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
async function capturoEdit(e) {
  const target = e.target;

  if (target.classList.contains("btn-edit")) {
    const id_prestamo = target.dataset.id;
   
    editarPrestamo(id_prestamo)
 
  }

  if (target.classList.contains("btn-delete")) {
    const id_prestamo = target.dataset.id;
    eliminarPrestamo(id_prestamo);
    getPrestamos();
  }
}

async function agregarPrestamo() {
  const submit = document.getElementById("formulario");

  if (submit) {
    submit.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id_estado = document.getElementById("id_estado").value;
      const id_usuario = document.getElementById("id_usuario").value;
      const isbn = document.getElementById("isbn").value;
      const fecha_prestamo = document.getElementById("fecha_prestamo").value;
      const fecha_devolucion =
        document.getElementById("fecha_devolucion").value;

      try {
        const response = await fetch(`${url}prestamos`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            id_estado,
            id_usuario,
            isbn,
            fecha_prestamo,
            fecha_devolucion,
          }),
        });

        if (response.ok) {
          alert("prestamo registrado");
          submit.reset();
          getPrestamos();

          return;
        }
        alert("no se registro nada ");
      } catch (error) {
        console.error("hay un error ", error);
      }
    });
  }
}

async function editarPrestamo(id_prestamo) {
  const respónse = await fetch(`${url}prestamos/${id_prestamo}`)
  const data=await  respónse.json()
  console.log(data)
  document.getElementById("id_estado").value = data.id_estado;
    document.getElementById("id_usuario").value = data.usuario;
    document.getElementById("isbn").value = data.isbn;
    document.getElementById("fecha_prestamo").value = data.fecha_prestamo;
    document.getElementById("fecha_devolucion").value = data.fecha_devolucion;
  

  
}



getPrestamos();
agregarPrestamo();

