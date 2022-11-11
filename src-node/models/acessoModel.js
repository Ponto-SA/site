const database = require("../database/config");

function inserirAcesso(idUser, idAcesso) {
    const query = `INSERT INTO usuario_nivel_acesso (fk_usuario, fk_nivel, data_hora) VALUES (${idUser}, ${idAcesso}, NOW())`;
    return database.executar(query);
}

module.exports = {
  inserirAcesso,
};
