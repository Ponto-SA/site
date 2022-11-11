const database = require("../database/config");

function validIsEmail(email) {
  const query = `SELECT id FROM usuario WHERE email = '${email}';`;
  return database.executar(query);
}

function entrar(email, senha) {
  const query = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';`;
  return database.executar(query);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(firstname, lastname, email, senha) {
  const query = `INSERT INTO usuario(nome, sobrenome, email, senha, status) VALUES ('${firstname}', '${lastname}', '${email}', '${senha}', 1);`;
  return database.executar(query);
}

function listarFuncionarios(idGestor) {
  const query = `SELECT N.id, N.nome, N.sobrenome, N.email, N.status FROM usuario AS G 
    JOIN usuario AS N ON N.fk_chefe = G.id 
    WHERE G.id = ${idGestor};`;
  return database.executar(query);
}

function atualizarFuncionario(idFuncionario, nome, email, senha, status, opcao){
  switch(opcao){
    case 1: {
      const query = `UPDATE usuario SET nome = '${nome}', email = '${email}', status = ${status} WHERE id = ${idFuncionario}`;
      return database.executar(query);
    }case 2: {
      const query = `UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}', status = ${status} WHERE id = ${idFuncionario}`;
      return database.executar(query);
    }
      
  }

}



module.exports = {
  entrar,
  cadastrar,
  validIsEmail,
  listarFuncionarios,
  atualizarFuncionario
};
