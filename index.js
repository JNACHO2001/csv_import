import express from "express";
import connection from "./bd/bd.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  try {
    const query = `
    SELECT usuarios.nombre AS usuario,
           libros.titulo AS libro,
           prestamos.fecha_devolucion
    FROM prestamos
    JOIN usuarios
      ON prestamos.id_usuario = usuarios.id_usuario
    JOIN libros
      ON libros.isbn = prestamos.isbn;
  `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).send("Error al obtener datos");
      }
      res.json(results);
    });
  } catch (error) {
    res.json({
      message: "existe un error " + error,
    });
  }
});

app.get("/prestamos/:id_prestamo", async (req, res) => {
  try {
    const id = req.params.id_prestamo;

    const query = `
    SELECT usuarios.nombre AS usuario,
           libros.titulo AS libro,
           prestamos.fecha_devolucion
    FROM prestamos
    JOIN usuarios
      ON prestamos.id_usuario = usuarios.id_usuario
    JOIN libros
      ON libros.isbn = prestamos.isbn   WHERE id_prestamo = ? ;
  `;

    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).send("Error al obtener datos");
      }
      if (results.length === 0) {
        return res.status(404).send("no lo encontre");
      }

      res.json(results[0]);
    });
  } catch (error) {
    res.json({
      message: "existe un error " + error,
    });
  }
});

app.post("/prestamos", async (req, res) => {
  try {
    const { id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion } =
      req.body;
    const sql =
      "INSERT INTO prestamos (id_estado,id_usuario,isbn,fecha_prestamo,fecha_devolucion) VALUES (?, ?, ?, ?, ?)";

    connection.query(
      sql,
      [id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion],
      (err, resultado) => {
        if (err) {
          console.log("error al insertar los datos" + err);

          return res
            .status(500)
            .json({ err: "Error inesperado en el servidor" });
        }
        res.json({ message: "Registro insertado correctamente", resultado });
      }
    );
  } catch (error) {
    console.log("Tengo un error:", error);
    res.status(500).json({ error: "Error inesperado en el servidor" });
  }
});

app.delete("/prestamos/:id_prestamo", async (req, res) => {
  try {
    const id = req.params.id_prestamo;
    const sql = " DELETE FROM  prestamos WHERE id_prestamo = ?";

    connection.query(sql, [id], (err, resultado) => {
      if (err) {
        console
          .log("no se elimino", err)
          .json({ err: "Error inesperado en el servidor" });
      }
      res.json({ message: "Registro eliminado correctamente", resultado });
    });
  } catch (error) {
    console.log("Tengo un error:", error);
    res.status(500).json({ error: "Error inesperado en el servidor" });
  }
});

app.put("/prestamos/:id_prestamo", async (req, res) => {
  try {
    const id = req.params.id_prestamo;
       console.log("datos",req.body)
    const { id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion } =
      req.body;
      console.log("datos",req.body)
   
    const sql = `UPDATE prestamos SET 
    id_estado = ?,id_usuario = ?,isbn = ?,fecha_prestamo = ?,fecha_devolucion = ?    
    WHERE id_prestamo = ? `;

    connection.query(
      sql,[id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion,id],
      
      async (err, resultado) => {
        if (err) {
          console.log("hay un error" + err);
          return res.status(500).json({ message: "se produjo un error" + err });
        }
        res.json({ message: " el usuario fue actualizado " + resultado });
      }
    );
  } catch (error) {
    console.log("Tengo un error:", error);
    res.status(500).json({ error: "Error inesperado en el servidor" });
  }
});


app.patch("prestamos/:id_prestamos", async (req,res)=> {

  try {
    
  } catch (error) {
    
  }



  
})

app.listen(3000, () => {
  console.log("servidor arriba  en http://localhost:3000");
});
