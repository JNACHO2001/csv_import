import fs from "fs";
import path from "path";
import csv from "csv-parser";
import connection from "../bd/bd.js";

function cargarUsuarios() {
  fs.createReadStream(path.join("../csv/usuarios.csv"))
    .pipe(csv({ separator: ";" }))
    .on("data", (fila) => {
      const { identificacion, nombre, correo, telefono } = fila;
      const sql = "INSERT INTO usuarios (identificacion,nombre,correo,telefono) VALUES (?, ?, ?, ?)";
      connection.query(sql, [identificacion, nombre, correo, telefono], (err) => {
        if (err) console.error("Error al insertar usuario:", err.message);
       
      });
    })
    .on("end", () => console.log("Importación de usuarios completada."));
}

function cargarLibros() {
  fs.createReadStream(path.join("../csv/libros.csv"))
    .pipe(csv({ separator: ";" }))
    .on("data", (row) => {
      const { isbn, titulo, año_de_publicacion, autor } = row;
      const sql = "INSERT INTO libros (isbn,titulo,año_de_publicacion,autor) VALUES (?, ?, ?, ?)";
      connection.query(sql, [isbn, titulo, año_de_publicacion, autor], (err) => {
        if (err) console.error("Error al insertar libro:", err.message);
      });
    })
    .on("end", () => console.log("Importación de libros completada."));
}

function cargarEstados() {
  fs.createReadStream(path.join("../csv/estados.csv"))
    .pipe(csv())
    .on("data", (row) => {
      const { estado } = row;
      const sql = "INSERT INTO estados (nombre) VALUES (?)";
      connection.query(sql, [estado], (err) => {
        if (err) console.error("Error al insertar estado:", err.message);
      });
    })
    .on("end", () => console.log("Importación de estados completada."));
}

function cargarPrestamos() {
  fs.createReadStream(path.join("../csv/prestamos.csv"))
    .pipe(csv())
    .on("data", (row) => {
      const { id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion } = row;
      const sql = "INSERT INTO prestamos (id_estado,id_usuario,isbn,fecha_prestamo,fecha_devolucion) VALUES (?, ?, ?, ?, ?)";
      connection.query(sql, [id_estado, id_usuario, isbn, fecha_prestamo, fecha_devolucion], (err) => {
        if (err) console.error("Error al insertar préstamo:", err.message);
      });
    })
    .on("end", () => console.log("Importación de préstamos completada."));
}

// Ejecutar todas las funciones
cargarUsuarios();
cargarLibros();
cargarEstados();

setTimeout(() => {
  cargarPrestamos();
},1000);



// Cerrar conexión después de un tiempo
setTimeout(() => {
  connection.end();
  console.log("*** Conexión cerrada ***");
}, 2000);
