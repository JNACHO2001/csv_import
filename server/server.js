// desdcargamos la libreria csv-parser para leer los datos en js
import fs from "fs";
import csv from "csv-parser";
// llamamos a la conexion y le agregamos el .js al final
import connection from "../bd/bd.js";
cargarUsuarios
cargarLibros();
// creamos una funcion
function cargarUsuarios() {
  // vamos a leer el archivo csv linea por linea
  fs.createReadStream("../csv/usuarios.csv")
    // convertimos  cada linea de csv  en objetos js   y separador para que identifique
    .pipe(csv({ separator: ";" }))
    //leemos los datos fila por fila
    .on("data", (fila) => {
      // extraemos los datos que estan en el csv
      const { identificacion, nombre, correo, telefono } = fila;
      const sql =
        // creamos la queries  de inertar los datos en la tabla
        "INSERT INTO usuarios (identificacion,nombre,correo,telefono) VALUES (?, ?, ?, ?)";
      //  llamamos a la conexion para que inserte los datos en las filas
      connection.query(
        sql,
        [identificacion, nombre, correo, telefono],
        (err) => {
          // controlamos los errores  que n de la base de datos
          if (err) console.error("erroe al insertar datos", err.message);
          else console.log("insertado " + nombre);
        }
      );
    })
    .on("end", () => {
      console.log(" Importación completada.");
      // le damos tiempo para la insercion y finalizamos la conexion

      setTimeout(() => {
        connection.end();
        console.log("*** conexion cerrada ***");
      }, 700);
    });
}

function cargarLibros() {
  fs.createReadStream("../csv/libros.csv")
    // convertimos  cada linea de csv  en objetos js   y separador para que identifique
    .pipe(csv())
    //leemos los datos fila por fila
    .on("data", (fila) => {
      // extraemos los datos que estan en el csv
      const { isbn, titulo, año_de_publicacion, autor } = fila;

      const sql =
        // creamos la queries  de inertar los datos en la tabla
        "INSERT INTO libros (isbn,titulo,año_de_publicacion,autor) VALUES ( ?,?,?,? )";
      //  llamamos a la conexion para que inserte los datos en las filas
      connection.query(sql, [isbn, titulo, año_de_publicacion, autor], (err) => {
        // controlamos los errores  que n de la base de datos
        if (err) console.error("erroe al insertar datos", err.message);
      });
    })
    .on("end", () => {
      console.log(" Importación completada.");

      // le damos tiempo para la insercion y finalizamos la conexion

      setTimeout(() => {
        connection.end();
        console.log("*** conexion cerrada ***");
      }, 700);
    });
}
