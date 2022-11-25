var usuarioModel = require("../models/hardwareModel");

function getCpuUsage(req, res) {
  const id = req.userId;
  const idDispositivoFunc = req.body.idDispositivo;
  
  if (idDispositivoFunc == 0) {
    usuarioModel.getCpuUsage(id)
      .then(function (resultado) {
        console.log(resultado)
        if (resultado.length > 0) {
          
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      }).catch(
        function (erro) {
          console.log(erro);
          console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  } else {
    usuarioModel.getCpuUsage(idDispositivoFunc)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      }).catch(
        function (erro) {
          console.log(erro);
          console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function getRamUsage(req, res) {
  const id = req.userId;
  const idDispositivoFunc = req.body.idDispositivo;

  if (idDispositivoFunc == 0) {
    usuarioModel.getRamUsage(id)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }else{
    usuarioModel.getRamUsage(idDispositivoFunc)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }
}

function getRamProcUsage(req, res) {
  const id = req.userId;
  const idDispositivoFunc = req.body.idDispositivo;
  
  if(idDispositivoFunc == 0){
    usuarioModel.getRamProcUsage(id)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  } else {
    usuarioModel.getRamProcUsage(idDispositivoFunc)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }
}

function getCpuTemp(req, res) {
  const id = req.userId;
  const idDispositivoFunc = req.body.idDispositivo;
  if(idDispositivoFunc == 0){
    usuarioModel.getCpuTemp(id)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }else{
    usuarioModel.getCpuTemp(idDispositivoFunc)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }
}

function getDiscUsage(req, res) {
  const id = req.userId;
  const idDispositivoFunc = req.body.idDispositivo;
  if(idDispositivoFunc == 0){
    usuarioModel.getDiscUsage(id)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }else{
    usuarioModel.getDiscUsage(idDispositivoFunc)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }
}

function getDisc2Usage(req, res) {
  const id = req.userId;
  const idDispositivoFunc = req.body.idDispositivo;
  if(idDispositivoFunc == 0){
    usuarioModel.getDisc2Usage(id)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }else{
    usuarioModel.getDisc2Usage(idDispositivoFunc)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
  }
}

function getHistoric(req, res) {
  if (req.body.historicParams[0].gap != 0) {
    console.log(req.body.historicParams)
    const today = req.body.historicParams[0].today;
    const gap = req.body.historicParams[0].gap;
    const metric = req.body.historicParams[0].tipo_metrica;
    const id = req.body.idDispositivo;

    usuarioModel.getHistoricWithGap(id, today, gap, metric)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      }).catch(
        function (erro) {
          console.log(erro);
          console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  } else {
    const today = req.body.historicParams[0].today;
    const id = req.body.idDispositivo;
    const metric = req.body.historicParams[0].tipo_metrica;

    usuarioModel.getHistoricToday(id, today, metric)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      }).catch(
        function (erro) {
          console.log(erro);
          console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  getCpuUsage,
  getRamUsage,
  getRamProcUsage,
  getCpuTemp,
  getDiscUsage,
  getDisc2Usage,
  getHistoric,
}