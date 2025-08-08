create database biblioteca;
use biblioteca;

create table  usuarios (

id_usuarios int auto_increment primary key,
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
isbn varchar(250) not null primary key ,
titulo varchar(250)  ,
año_de_publicacion varchar(250),
autor varchar(250),
creado timestamp default  current_timestamp,
actualiza timestamp default current_timestamp  on update current_timestamp
);
drop  table libros;
describe libros;
truncate libros;
select * from  libros;








