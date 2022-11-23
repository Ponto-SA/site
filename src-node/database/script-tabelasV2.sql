create database PontoSa;
use PontoSa;

CREATE TABLE empresa(
id int primary key auto_increment,
nome varchar(100),
cnpj char(18) UNIQUE,
status int
);

CREATE TABLE endereco(
id int primary key auto_increment,
rua varchar(100),
numero varchar(10),
bairro varchar(100),
cep varchar(9),
cidade varchar(45),
uf varchar(2)
);

CREATE TABLE usuario(
id int primary key auto_increment,
nome varchar(45),
sobrenome varchar(45),
email varchar(100) UNIQUE,
senha varchar(255),
status int,
fk_chefe int,
foreign key (fk_chefe)
references usuario(id)
);

CREATE TABLE nivel_acesso(
id int primary key auto_increment,
nome varchar(45) NOT NULL
);

INSERT INTO nivel_acesso VALUES 
(NULL, 'Colaborador'),
(NULL, 'Gestor'),
(NULL, 'Admin');

CREATE TABLE usuario_nivel_acesso(
id int primary key auto_increment,
fk_nivel int,
foreign key (fk_nivel)
references nivel_acesso(id),
fk_usuario int,
foreign key (fk_usuario)
references usuario(id),
data_hora datetime default current_timestamp
);

CREATE TABLE empresa_usuario(
id int primary key auto_increment,
fk_empresa int,
fk_endereco int,
fk_usuario int,
foreign key (fk_empresa)
references empresa(id),
foreign key (fk_endereco)
references endereco(id),
foreign key (fk_usuario)
references usuario(id)
);

CREATE TABLE ponto(
id int primary key auto_increment,
entrada datetime  default current_timestamp,
saida datetime  default current_timestamp,
fk_usuario int,
foreign key (fk_usuario)
references usuario(id)
);

CREATE TABLE dispositivo(
id int primary key auto_increment,
marca varchar(45),
modelo varchar(45),
host_name varchar(100),
sistema_operacional varchar(45),
tipo_processador varchar(255),
memoria_total decimal
);

CREATE TABLE disco(
id int primary key auto_increment,
modelo varchar(100),
numero_serial varchar(100),
tamanho int,
fk_dispositivo int,
foreign key (fk_dispositivo)
references dispositivo(id)
);

CREATE TABLE usuario_maquina(
id int primary key auto_increment,
fk_usuario int,
fk_dispositivo int,
data_hora datetime default current_timestamp,
ativo int,
foreign key (fk_dispositivo)
references dispositivo(id),
foreign key (fk_usuario)
references usuario(id)
);

CREATE TABLE executavel(
id int primary key auto_increment,
nome varchar(100),
medida decimal,
data_hora datetime default current_timestamp,
fk_dispositivo int,
foreign key (fk_dispositivo)
references dispositivo(id)
);

CREATE TABLE tipo_metrica(
id int primary key auto_increment,
nome_componente varchar(45),
tipo varchar(45),
metrica varchar(2)
);

CREATE TABLE historico(
id int primary key auto_increment,
fk_dispositivo int,
fk_tipo_metrica int,
foreign key (fk_dispositivo)
references dispositivo(id),
foreign key (fk_tipo_metrica)
references tipo_metrica(id),
registro decimal,
data_hora datetime default current_timestamp
);

insert into usuario values(null, 'Yohan', 'Torquato arcas Hudson', 'yohan.hudson@gmail.com', 'Camila@01', 1, null);

insert into dispositivo (id, marca, modelo, host_name, sistema_operacional) values(null, 'dell', 'gts 5', 'STFSAOC048646-L', 'Windown');

insert into usuario_maquina (id, fk_dispositivo, fk_usuario) values(null, 1, 1);

select * from dispositivo;
select * from tipo_metrica;
select * from historico;
select * from usuario;
select * from usuario_maquina;

INSERT INTO tipo_metrica VALUES (NULL, 'Processador', 'Uso', '%');
INSERT INTO tipo_metrica VALUES (NULL, 'Memoria', 'Uso', '%');
INSERT INTO tipo_metrica VALUES (NULL, 'Disco', 'Uso', '%');
INSERT INTO tipo_metrica VALUES (NULL, 'Temperatura', 'Total', '%');
INSERT INTO tipo_metrica VALUES (NULL, 'UsoMemoriaProcesso', '%');