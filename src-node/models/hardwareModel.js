const database = require("../database/config");

function getCpuUsage(id) {
    const query = `SELECT * FROM historico WHERE fk_dispositivo = ${id} AND fk_tipo_metrica = 1
     ORDER BY historico.id DESC LIMIT 1;`;
    return database.executar(query);
  }

  function getRamUsage(id) {
    const query = `SELECT disp.id, disp.memoria_total, disco.tamanho, historico.registro, historico.data_hora
    FROM dispositivo AS disp
    JOIN disco ON disp.id = disco.fk_dispositivo 
    JOIN historico ON disp.id = historico.fk_dispositivo
    WHERE historico.fk_dispositivo = ${id} AND fk_tipo_metrica = 2
    ORDER BY historico.id DESC LIMIT 1;`;
    return database.executar(query);
  }

  function getRamProcUsage(id) {
    const query = `SELECT disp.id, disp.memoria_total, disco.tamanho, historico.registro, historico.data_hora
    FROM dispositivo AS disp
    JOIN disco ON disp.id = disco.fk_dispositivo 
    JOIN historico ON disp.id = historico.fk_dispositivo
    WHERE historico.fk_dispositivo = ${id} AND fk_tipo_metrica = 5
    ORDER BY historico.id DESC LIMIT 1;`;
    return database.executar(query);
  }

  function getCpuTemp(id) {
    const query = `SELECT * FROM historico WHERE fk_dispositivo = ${id} AND fk_tipo_metrica = 4
     ORDER BY historico.id DESC LIMIT 1;`;
    return database.executar(query);
  }
  
  function getDiscUsage(id) {
    const query = `SELECT disp.id, disp.memoria_total, disco.tamanho, historico.registro, historico.data_hora
    FROM dispositivo AS disp
    JOIN disco ON disp.id = disco.fk_dispositivo 
    JOIN historico ON disp.id = historico.fk_dispositivo
    WHERE historico.fk_dispositivo = ${id} AND historico.fk_tipo_metrica = 3
    ORDER BY historico.id DESC LIMIT 1;`;
    return database.executar(query);
  }
  
  function getDisc2Usage(id) {
    const query = `SELECT disp.id, disp.memoria_total, disco.tamanho, historico.registro, historico.data_hora
    FROM dispositivo AS disp
    JOIN disco ON disp.id = disco.fk_dispositivo 
    JOIN historico ON disp.id = historico.fk_dispositivo
    WHERE historico.fk_dispositivo = ${id} AND historico.fk_tipo_metrica = 6
    ORDER BY historico.id DESC LIMIT 1;`;
    return database.executar(query);
  }

  function getHistoricToday(id, today, metric){
    const query = `SELECT historico.fk_tipo_metrica, historico.registro, historico.data_hora
    FROM historico 
    WHERE data_hora LIKE '${today}%'
    AND historico.fk_dispositivo = ${id} 
    AND fk_tipo_metrica = ${metric};`;

    return database.executar(query);
  }

  function getHistoricWithGap(id, today, gap, metric){
    const query = `SELECT historico.fk_tipo_metrica, historico.registro, historico.data_hora
    FROM historico 
    WHERE data_hora BETWEEN '${gap} 00:00:01' AND '${today} 23:59:59'
    AND historico.fk_dispositivo = ${id} 
    AND fk_tipo_metrica = ${metric};`;

    return database.executar(query);
  }

module.exports = {
    getCpuUsage,
    getRamUsage,
    getRamProcUsage,
    getCpuTemp,
    getDiscUsage,
    getDisc2Usage,
    getHistoricToday,
    getHistoricWithGap
}