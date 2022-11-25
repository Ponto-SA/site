const usuarioModel = require("../models/usuarioModel");
const empresaModel = require("../models/empresaModel");
const acessoModel = require("../models/acessoModel");
const associativaModel = require("../models/associativasModel");
const dispositivoModel = require("../models/dispositivoModel");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const assinature = "pontosa.com";

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

async function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  const id = req.body.idUsuario;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const hostName = req.body.hostName;

  // Faça as validações dos valores
  if (marca.length < 3) {
    res.status(400).send("Seu nome está invalido!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    dispositivoModel.cadastrar(id, marca, modelo, hostName).then((response) => {
      res.status(200).json(response);
      dispositivoModel.atualizarUpdate(id);
      dispositivoModel.vincularUsuario(id, response.insertId);
    });
  }
}

async function vincularUsuario(id, idDisp) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  const idUsuario = id;
  const idDispositivo = idDisp;

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  dispositivoModel.cadastrar(id, marca, modelo, hostName).then((response) => {
    idDispositivo = res.status(200).json(response.insertId);
  });
}

function listar(req, res) {
  const iduser = req.userId;

  dispositivoModel.listar(iduser).then((response) => {
    res.status(200).json(response);
  });
}

async function atualizarDispositivo(req, res) {
  const nivelAcesso = req.nivelAcesso;
  const idFuncionario = Number(req.body.idUsuario);
  const hostName = req.body.hostName;
  const id = Number(req.body.idDispositivo);

  if (nivelAcesso === 2) {
    const update = await dispositivoModel.atualizarUpdate(idFuncionario);
    const update2 = await dispositivoModel.atualizarUpdate2(id);
    const insert = await dispositivoModel.atualizarDispositivo(
      idFuncionario,
      hostName
    );
    res.json({ dados: [update, update2, insert] });
  }
}

function atualizarUpdate(req, res) {
  const nivelAcesso = req.nivelAcesso;
  const idFuncionario = Number(req.body.idUsuario);

  if (nivelAcesso === 2) {
    dispositivoModel
      .atualizar(idFuncionario)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.json(500).json(err);
      });
  } else {
    res.json(401).json({ mensagem: "Você não possuí acesso!" });
  }
}

function atualizarUpdate2(req, res) {
  const nivelAcesso = req.nivelAcesso;
  const idFuncionario = Number(req.body.idUsuario);

  if (nivelAcesso === 2) {
    dispositivoModel
      .atualizar(idFuncionario)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.json(500).json(err);
      });
  } else {
    res.json(401).json({ mensagem: "Você não possuí acesso!" });
  }
}

async function deletarDipositivo(req, res){

  const nivelAcesso = req.nivelAcesso;
  const hostaname = req.body.hostname;

  if(nivelAcesso === 2){

    const result = await dispositivoModel.listarDispositivo(hostaname);
    const idDispositivo = result[0].id;
    await associativaModel.del_user_maquina(idDispositivo);
    await dispositivoModel.deletarDispositivo(idDispositivo);

    res.json({
      mensagem: "Dispositivo deletado com sucesso!",
    })

  }else {
    res.status(401).json({
      mensagem: "Você não tem autorização."
    })
  }



}

module.exports = {
  testar,
  cadastrar,
  vincularUsuario,
  listar,
  atualizarDispositivo,
  atualizarUpdate,
  atualizarUpdate2,
  deletarDipositivo
};
