const database = require("../database/config");



// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(id, marca, modelo, hostName) {
  const query = `INSERT INTO dispositivo(marca, modelo, host_name) VALUES ('${marca}', '${modelo}', '${hostName}');`;
   return database.executar(query);
}
function vincularUsuario(id, idDispositivo) {
  const query = `INSERT INTO usuario_maquina VALUES (null, '${id}', '${idDispositivo}', NOW(), 1);`;
   return database.executar(query);
}
function listar(idUser) {
  const query = `SELECT usuario_maquina.id, dispositivo.id, marca, modelo, host_name, nome, sobrenome FROM usuario_maquina 
  INNER JOIN dispositivo on dispositivo.id = usuario_maquina.fk_dispositivo
  INNER JOIN usuario on usuario.id = usuario_maquina.fk_usuario
  WHERE ativo = 1 and fk_chefe = ${idUser} and data_hora <= now() order by data_hora desc;`;
   return database.executar(query);
}

function listarDispositivo(hostname){
  const query = `SELECT id FROM dispositivo WHERE host_name= '${hostname}'`;
  return database.executar(query);
}

function atualizarUpdate(idFuncionario){
  const query = `update usuario_maquina set ativo = 0 where fk_usuario = ${idFuncionario} and data_hora <= now();`;
  return database.executar(query);
}

function atualizarUpdate2(id){
  const query = `update usuario_maquina set ativo = 0 where fk_dispositivo = ${id} and data_hora <= now();`;
  return database.executar(query);
}

function atualizarDispositivo(idFuncionario, hostName){
   const query = `INSERT INTO usuario_maquina VALUES (null, ${idFuncionario}, (select id from dispositivo where host_name = '${hostName}'), NOW(), 1)`;
   return database.executar(query);
}

function deletarDispositivo(id){
  const query = `DELETE FROM dispositivo WHERE id = ${id}`;
  return database.executar(query);
}

module.exports = {
  cadastrar,
  vincularUsuario,
  listar,
  atualizarDispositivo,
  atualizarUpdate,
  atualizarUpdate2,
  listarDispositivo,
  deletarDispositivo
};