const database = require("../database/config");

// User nivel de acesso, empresa e endereço
function idsRelacionado(idUser) {
  const query = `
  SELECT EU.fk_empresa AS 'empresa', 
  EU.fk_endereco as 'endereco', 
  UNC.fk_nivel AS 'nivel_acesso' 
    FROM empresa_usuario AS EU
    JOIN usuario AS U ON EU.fk_usuario = U.id
    JOIN usuario_nivel_acesso AS UNC ON UNC.fk_usuario = U.id WHERE U.id = ${idUser};`;

  return database.executar(query);
}

function del_user_maquina(idDispositivo) {
  const query = `DELETE FROM usuario_maquina WHERE fk_dispositivo = ${idDispositivo}`;
  return database.executar(query);
}
function del_empresa_user(idUser) {
  const query = `DELETE FROM empresa_usuario WHERE fk_usuario = ${idUser}`;
  return database.executar(query);
}
function del_nivel_acesso(idUser) {
  const query = `DELETE FROM usuario_nivel_acesso WHERE fk_usuario = ${idUser}`;
  return database.executar(query);
}

module.exports = {
  idsRelacionado,
  del_user_maquina,
  del_empresa_user,
  del_nivel_acesso,
};
