const database = require("../database/config");

function listAll(idUsuario){
    const query = `SELECT entrada, saida FROM ponto WHERE fk_usuario = ${idUsuario} ORDER BY id DESC`;
    return database.executar(query);
}


module.exports ={
    listAll

}