#  Conversión de CSV a MySQL y Consumo de API

Este proyecto convierte datos almacenados en archivos CSV a objetos JavaScript, los inserta en una base de datos MySQL y posteriormente expone esos datos a través de endpoints REST para ser consumidos desde un frontend.

---

##  **Tecnologías y Librerías Utilizadas**
- **MySQL2** – Conexión y consultas a la base de datos MySQL  
- **Axios** – Consumo de endpoints desde el frontend  
- **csv-parser** – Conversión de archivos CSV a objetos JavaScript  
- **CORS** – Permitir comunicación entre frontend y backend  
- **Path** – Manejo de rutas de archivos  
- **Express** – Creación de servidor y manejo de rutas HTTP  

---

##  **Pasos de Implementación**

### **1️ Instalación de Dependencias**
```bash
npm install mysql2 axios csv-parser cors path express
```

---

### **2️ Conexión a la Base de Datos**
- Configurar credenciales de conexión a MySQL.
- Crear base de datos y tablas necesarias.

---

### **3️ Preparación de Archivos CSV**
- Normalizar datos desde Excel u otra herramienta.
- Guardar como archivos `.csv`.
- Crear **diagrama entidad-relación**.
- Organizar tablas con **FOREIGN KEY** correctamente.

---

### **4️ Carga de Datos**
- Parsear CSV a objetos usando `csv-parser`.
- Insertar datos en la base de datos MySQL.

---

### **5️ Creación de Endpoints Backend**
- Montar servidor con **Express**.
- Implementar rutas para métodos HTTP:
  - **GET** – Obtener registros
  - **POST** – Agregar registros
  - **PUT** – Actualizar registros
  - **DELETE** – Eliminar registros
- Probar con **Postman**.

---

### **6️ Consumo desde el Frontend**
- Utilizar **Axios** para llamar a los endpoints.
- Renderizar datos en la interfaz.
- Implementar formularios para CRUD completo.

---

##  **Flujo del Proyecto**
1.  CSV  a  Objetos JS  a  MySQL  
2.  API REST (Express)  
3.  Frontend consume datos con Axios  

---

##  Ejemplo Visual (Diagrama Simplificado)
```
[ CSV ] → [ Node.js + csv-parser ] → [ MySQL ]
                                   ↓
                            [ API REST ]
                                   ↓
                            [ Frontend ]
```

---

##  Estado del Proyecto
🔹 CRUD funcional  
🔹 Base de datos poblada desde CSV  
🔹 Comunicación cliente-servidor establecida  
