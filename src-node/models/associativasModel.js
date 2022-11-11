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

module.exports = { idsRelacionado };
