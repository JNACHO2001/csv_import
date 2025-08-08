
// debemos descargar las librerias  para utilizar los import
import fs from "fs";
import path from "path";
// es una ruta relativa que es dinamica para win y linux
import csv from "csv-parser";
// esta libreria es la que nos hace al parceo  a objetos
import connection from "../bd/bd.js";
// la conexion para hacer los quieris


// creamos una funcion para almecenar toda la infomacion individual
function cargarUsuarios() {
  // aqui vamos a llarmar el csv y vamos a leer fila por fila 
  fs.createReadStream(path.join("../csv/usuarios.csv"))
  // a qui convertimos  cada fila de csv a objetos 
    .pipe(csv({ separator: ";" }))
    // este es un seprador para  los datos siguientes 
    .on("data", (fila) => {
      // traigo los datos ya convertidos a objetos 
      const { identificacion, nombre, correo, telefono } = fila;
      // hago destructuracion a los objetos para tomar esos valores 
      const sql = "INSERT INTO usuarios (identificacion,nombre,correo,telefono) VALUES (?, ?, ?, ?)";
      // creo la consulta que en este caso es inserta datos 
      connection.query(sql, [identificacion, nombre, correo, telefono], (err) => {
        // hago la insercion de datos a Mysql
        if (err) console.error("Error al insertar usuario:", err.message);
        // manejode error, si hay algun error en la consulta 
       
      });
    })
    // a qui le digo al que lee que el proceso termino ya no leas mas  deja de trabajar 
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

// cargo todas las funciones 
cargarUsuarios();
cargarLibros();
cargarEstados();
// esta funcion la utilizo con callback pòr que debo espèrar que las otras funciones,
// terminen el proceso de manera correcta 
setTimeout(() => {
  cargarPrestamos();
},1000);



// Cerrar conexión
setTimeout(() => {
  connection.end();
  console.log("*** Conexión cerrada ***");
}, 2000);
