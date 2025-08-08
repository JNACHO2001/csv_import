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



