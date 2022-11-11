const database = require("../database/config");

function cadastrar(nome, cnpj) {
  const query = `INSERT INTO empresa (nome, cnpj, status) VALUES ('${nome}', '${cnpj}', 0)`;
  return database.executar(query);
}

function listarEmpresa(dados, opcao) {
  switch (opcao) {
    case 1: {
      const query = `SELECT id FROM empresa WHERE id=${dados}`;
      return database.executar(query);
    }
    case 2: {
      const query = `SELECT id FROM empresa WHERE cnpj='${dados}'`;
      return database.executar(query);
    }
  }
}

function validEndereco(cep, numero) {
  const query = `SELECT id FROM endereco WHERE cep='${cep}' AND numero= '${numero}'`;
  return database.executar(query);
}

function cadastrarEndereco(rua, numero, bairro, cep, cidade, uf) {
  const query = `INSERT INTO endereco VALUES (null, '${rua}', '${numero}', '${bairro}', '${cep}', '${cidade}', '${uf}')`;
  return database.executar(query);
}

function relacionarDados(idUser, idEmpresa, idEndereco){
    const query = `INSERT INTO empresa_usuario(fk_usuario, fk_empresa, fk_endereco) VALUES(${idUser}, ${idEmpresa}, ${idEndereco})`;
    return database.executar(query);
}


module.exports = {
  cadastrar,
  listarEmpresa,
  cadastrarEndereco,
  validEndereco,
  relacionarDados
};
