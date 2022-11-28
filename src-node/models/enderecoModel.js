const database = require("../database/config");


function listarUnicoIdEndereco(cep){
    const query = `SELECT id FROM endereco WHERE cep = '${cep}'`;
    return database.executar(query);
}

function listarUnicoEndereco(cep){
    const query = `SELECT * FROM endereco WHERE cep = '${cep}'`;
    return database.executar(query);
}

function listarAll(idEmpresa){
    const query = `
    SELECT distinct EA.fk_empresa AS 'id_empresa', E.rua, E.numero, E.bairro, E.cep, E.cidade, E.uf 
    FROM empresa_usuario AS EA 
    JOIN endereco AS E ON EA.fk_endereco = E.id 
    WHERE fk_empresa = ${idEmpresa};
    `;
    return database.executar(query);
}

function novoEndereco(rua, numero, bairro, cep, cidade, uf) {
  const query = `INSERT INTO endereco (rua, numero, bairro, cep, cidade, uf) VALUES ('${rua}', '${numero}', '${bairro}', '${cep}', '${cidade}', '${uf}')`;
  return database.executar(query);
}

function updateEndereco(idEndereco, rua, numero, bairro, cep, cidade, uf){
    const query = `UPDATE endereco SET rua = '${rua}', numero = '${numero}', 
    bairro = '${bairro}', cep = '${cep}', cidade = '${cidade}', uf = '${uf}' WHERE id= ${idEndereco}`;
    return database.executar(query);
}


function deleteEndereco(idEndereco){
    const query = `DELETE FROM endereco WHERE id=${idEndereco}`;
    return database.executar(query);
}


module.exports = {
    listarUnicoIdEndereco,
    listarUnicoEndereco,
    listarAll,
    novoEndereco,
    updateEndereco,
    deleteEndereco
}



