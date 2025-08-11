import express from "express";
import connection from "./bd/bd.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  try {
    const query = `
    SELECT  prestamos.id_prestamo,usuarios.nombre AS usuario,
           libros.titulo AS libro,
           DATE_FORMAT(prestamos.fecha_devolucion, '%Y-%m-%d') AS fecha_devolucion
    FROM prestamos 
    JOIN usuarios
      ON prestamos.id_usuario = usuarios.id_usuario
    JOIN libros
      ON libros.isbn = prestamos.isbn 
      order by prestamos.id_prestamo DESC; 
 ;
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
   SELECT prestamos.id_usuario, libros.isbn, estados.nombre AS nombre_estado,
       DATE_FORMAT(prestamos.fecha_prestamo, '%Y-%m-%d') AS fecha_prestamo,
       DATE_FORMAT(prestamos.fecha_devolucion, '%Y-%m-%d') AS fecha_devolucion
FROM prestamos
JOIN estados ON estados.id_estado = prestamos.id_estado
JOIN libros ON libros.isbn = prestamos.isbn
WHERE id_prestamo = ?;

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
    const {
      nombre_estado,
      id_usuario,
      isbn,
      fecha_prestamo,
      fecha_devolucion,
    } = req.body;

    const sqlEstado = `select id_estado from  estados 
      where nombre = ? `;

    connection.query(sqlEstado, [nombre_estado], (err, resultEstado) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (resultEstado.length === 0) {
        return res.status(404).json({ error: "El estado no existe" });
      }

      console.log(resultEstado);

      const id_estado = resultEstado[0].id_estado;

      const sql = `
      INSERT INTO prestamos ( id_estado,id_usuario, isbn, fecha_prestamo,fecha_devolucion)

      VALUES (?, ?, ?, ? ,?)


      
    `;

      connection.query(
        sql,
        [id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion],
        (error, resultado) => {
          if (error) return res.status(500).json({ error: error.message });
          res.json({
            message: "Préstamo agregado correctamente",
            id_prestamo: resultado.insertId,
          });
        }
      );
    });
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
    const {
      nombre_estado,
      id_usuario,
      isbn,
      fecha_prestamo,
      fecha_devolucion,
    } = req.body;

    const sqlEstado = "SELECT id_estado FROM estados WHERE nombre = ?";
    connection.query(sqlEstado, [nombre_estado], (err, resultEstado) => {
      if (err)
        return res.status(500).json({ message: "Error al buscar estado" });
      if (resultEstado.length === 0)
        return res.status(404).json({ message: "Estado no encontrado" });

      const id_estado = resultEstado[0].id_estado;

      const updateSql = `
        UPDATE prestamos SET 
        id_estado = ?, id_usuario = ?, isbn = ?, fecha_prestamo = ?, fecha_devolucion = ?    
        WHERE id_prestamo = ?`;

      connection.query(
        updateSql,
        [id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion, id],
        (err, resultado) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al actualizar préstamo" });
          }
          res.json({
            message: "Préstamo actualizado correctamente",
            resultado,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Error inesperado en el servidor" });
  }
});

app.patch("/prestamos/:id_prestamo", async (req, res) => {
  try {
    const { fecha_prestamo, fecha_devolucion } = req.body;

    const id = req.params.id_prestamo;
    const sql = `
    UPDATE prestamos SET 
    fecha_prestamo = ?,fecha_devolucion = ?    
    WHERE id_prestamo = ? 
    `;

    connection.query(
      sql,
      [fecha_prestamo, fecha_devolucion, id],
      async (err, resultado) => {
        if (err) {
          console.log("no se pudo actualizar", err);
          return res
            .status(500)
            .json({ message: "no se pudo actulizar las fechas " });
        }
        res.json({ message: "se actualizaron los datos ", resultado });
      }
    );
  } catch (error) {
    console.log("Tengo un error:", error);
    res.status(500).json({ error: "Error inesperado en el servidor" });
  }
});

app.listen(3000, () => {
  console.log("servidor arriba  en http://localhost:3000");
});
