create database biblioteca;
use biblioteca;
drop database  biblioteca;

create table  usuarios (

id_usuario int auto_increment primary key,
identificacion  varchar(250) not null unique,
nombre varchar(250),
correo varchar(250),
telefono varchar(250),
creado timestamp default  current_timestamp,
actualiza timestamp default current_timestamp  on update current_timestamp
);
describe usuarios;
truncate usuarios;
select * from  usuarios;

create table libros (
isbn varchar(50) not null primary key ,
titulo varchar(250)  ,
año_de_publicacion varchar(250),
autor varchar(250),
creado timestamp default  current_timestamp,
actualiza timestamp default current_timestamp  on update current_timestamp
);

describe libros;
truncate libros;
select * from  libros;

show databases;

create table estados(
id_estado int  auto_increment primary key,
nombre varchar(20) not null
);

select *from prestamos;
create table prestamos(
id_prestamo int auto_increment primary key,
id_estado int,
isbn varchar(50) ,
id_usuario int,
fecha_prestamo date,
fecha_devolucion date,
foreign key(id_estado) references estados(id_estado) on delete set  null on update cascade,
foreign key(isbn)  references libros(isbn) on delete set  null on update cascade ,
foreign key(id_usuario)  references usuarios(id_usuario) on delete set  null on update cascade  ,
creado timestamp default  current_timestamp,
actualiza timestamp default current_timestamp  on update current_timestamp
);

update prestamos 
set id_estado = 2
where id_prestamo =2;

UPDATE prestamos SET 
fecha_prestamo =  "2025-05-07" ,fecha_devolucion = "2025-09-07" 
WHERE id_prestamo = 4;
    
    
UPDATE prestamos SET 
id_estado = 2,id_usuario = 1,isbn = 978-1-84859-314-5,fecha_prestamo = "2025-08-09",fecha_devolucion =  "2025-08-15"  
WHERE id_prestamo = 4;






select  usuarios.nombre  as usuario,libros.titulo  as libro,  prestamos.fecha_devolucion
from prestamos
join  usuarios
on
prestamos.id_usuario=usuarios.id_usuario
join libros
on 
libros.isbn=prestamos.isbn
order by usuarios.nombre asc;

select *from estados;
truncate estados;

select  libros.isbn, estados.nombre,prestamos.id_usuario,prestamos.fecha_prestamo,prestamos.fecha_devolucion
 from estados
 join prestamos 
 on
 estados.id_estado=prestamos.id_estado
 join libros
 on 
 libros.isbn=prestamos.isbn ;









