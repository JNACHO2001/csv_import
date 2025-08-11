#  Conversión de CSV a MySQL y consumo de API HTTP

Este proyecto realiza el flujo completo desde la conversión de archivos CSV a objetos, su inserción en MySQL y el consumo de los endpoints mediante métodos HTTP.

---

##  Herramientas utilizadas

- **MySQL2** → Conexión y consultas a MySQL  
- **Axios** → Consumo de endpoints HTTP  
- **CSV-Parser** → Lectura y conversión de CSV a objetos  
- **CORS** → Permitir solicitudes entre dominios  
- **Path** → Manejo de rutas en Node.js  
- **Express** → Servidor backend

---

##  Pasos del desarrollo

1. **Instalación de librerías**  
   Descargar todas las dependencias necesarias para el proyecto.

2. **Creación de la conexión**  
   Configurar la conexión a la base de datos MySQL.

3. **Preparación de los archivos CSV**  
   - Normalizar los datos desde Excel u otra herramienta.  
   - Guardar los archivos como `.csv`.  
   - Crear el diagrama de modelo entidad-relación.  
   - Crear la base de datos y las tablas con sus respectivos campos.  
   - Organizar las relaciones y claves foráneas.  

4. **Conversión de CSV a objetos**  
   Convertir los datos de los archivos CSV en objetos JavaScript.

5. **Poblado de la base de datos**  
   Insertar los objetos en las tablas correspondientes de MySQL.

6. **Creación de endpoints**  
   Implementar el servidor en Express con rutas para las operaciones necesarias.

7. **Pruebas con Postman**  
   Verificar el correcto funcionamiento de los métodos HTTP: GET, POST, PUT y DELETE.

8. **Consumo desde el Frontend**  
   Utilizar Axios para consumir la API y renderizar los datos en la interfaz.

---

##  Flujo general del proyecto

**CSV** → **Objetos JavaScript** → **Base de datos MySQL** → **API REST (Express)** → **Frontend con Axios**
