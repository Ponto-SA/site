const database = require("../database/config");

function inserirAcesso(idUser, idAcesso) {
    const query = `INSERT INTO usuario_nivel_acesso (fk_usuario, fk_nivel, data_hora) VALUES (${idUser}, ${idAcesso}, GETDATE())`;
    return database.executar(query);
}

function updateNivelAcesso(idUser, idAcesso){
  const query = `UPDATE usuario_nivel_acesso SET fk_nivel = ${idAcesso} WHERE fk_usuario = ${idUser}`;
  return database.executar(query);
}

module.exports = {
  inserirAcesso,
  updateNivelAcesso
};
