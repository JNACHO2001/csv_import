import mysql from "mysql2";
// importamos a mysql para utilizar, la libreria descargar la libreria de mysql2

// creamos la conexion con mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "prueba",
});

// probamos la conexion a la base de datos

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err.message);
  } else {
    console.log("Base de datos conectada");
  }
});

// exportamos para utilizarla la conexion 
export default connection;
