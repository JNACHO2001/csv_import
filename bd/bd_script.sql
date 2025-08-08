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
isbn varchar(25) not null primary key ,
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


create table prestamos(
id_prestamo int auto_increment primary key,
id_estado int,
isbn varchar(25),
id_usuario int,
fecha_prestamo date,
fecha_devolucion date,
foreign key(id_estado) references estados(id_estado) on delete set  null on update cascade,
foreign key(isbn)  references libros(isbn) on delete set  null on update cascade ,
foreign key(id_usuario)  references usuarios(id_usuario) on delete set  null on update cascade  ,
creado timestamp default  current_timestamp,
actualiza timestamp default current_timestamp  on update current_timestamp
);

select *from estados;
truncate estados;



