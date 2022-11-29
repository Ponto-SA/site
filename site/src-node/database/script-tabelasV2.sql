CREATE TABLE empresa(
id INT IDENTITY(1,1) PRIMARY KEY,
nome varchar(100),
cnpj char(18) UNIQUE,
status int
);

CREATE TABLE endereco(
id INT IDENTITY(1,1) PRIMARY KEY,
rua varchar(100),
numero varchar(10),
bairro varchar(100),
cep varchar(9),
cidade varchar(45),
uf varchar(2)
);

CREATE TABLE usuario(
id INT IDENTITY(1,1) PRIMARY KEY,
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
id INT IDENTITY(1,1) PRIMARY KEY,
nome varchar(45) NOT NULL
);

INSERT INTO nivel_acesso (nome) VALUES 
('Colaborador'),
('Gestor'),
('Admin');

CREATE TABLE usuario_nivel_acesso(
id INT IDENTITY(1,1) PRIMARY KEY,
fk_nivel int,
foreign key (fk_nivel)
references nivel_acesso(id),
fk_usuario int,
foreign key (fk_usuario)
references usuario(id),
data_hora datetime default current_timestamp
);

CREATE TABLE empresa_usuario(
id INT IDENTITY(1,1) PRIMARY KEY,
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
id INT IDENTITY(1,1) PRIMARY KEY,
entrada datetime  default current_timestamp,
saida datetime  default current_timestamp,
fk_usuario int,
foreign key (fk_usuario)
references usuario(id)
);

CREATE TABLE dispositivo(
id INT IDENTITY(1,1) PRIMARY KEY,
marca varchar(45),
modelo varchar(45),
host_name varchar(100),
sistema_operacional varchar(45),
tipo_processador varchar(255),
memoria_total decimal
);

CREATE TABLE disco(
id INT IDENTITY(1,1) PRIMARY KEY,
modelo varchar(100),
numero_serial varchar(100),
tamanho int,
fk_dispositivo int,
foreign key (fk_dispositivo)
references dispositivo(id)
);

CREATE TABLE usuario_maquina(
id INT IDENTITY(1,1) PRIMARY KEY,
fk_usuario int,
fk_dispositivo int,
data_hora datetime default current_timestamp,
ativo int,
foreign key (fk_dispositivo)
references dispositivo(id),
foreign key (fk_usuario)
references usuario(id)
);

CREATE TABLE tipo_metrica(
id INT IDENTITY(1,1) PRIMARY KEY,
nome_componente varchar(45),
tipo varchar(45),
metrica varchar(2)
);

CREATE TABLE historico(
id INT IDENTITY(1,1) PRIMARY KEY,
fk_dispositivo int,
fk_tipo_metrica int,
foreign key (fk_dispositivo)
references dispositivo(id),
foreign key (fk_tipo_metrica)
references tipo_metrica(id),
registro decimal,
data_hora datetime default current_timestamp
);


INSERT INTO tipo_metrica (nome_componente, tipo, metrica) VALUES ('Processador', 'Uso', '%'),
('Memoria', 'Uso', '%'),
('Disco', 'Uso', '%'),
('Temperatura', 'Total', '%'),
('UsoMemoriaProcesso', 'Uso', '%'),
('Disco 2', 'Uso', '%');