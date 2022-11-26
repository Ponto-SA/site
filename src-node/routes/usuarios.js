const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/JwtAuth");

const usuarioController = require("../controllers/usuarioController");

router.get("/", usuarioController.testar);

router.post("/listar", usuarioController.listar);

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", usuarioController.cadastrar);

router.post("/autenticar", usuarioController.entrar);

router.post("/funcionarios", jwtAuth, usuarioController.listarFuncionarios);

router.post("/deletar", jwtAuth, usuarioController.delUser);

router.post(
  "/atualizarFuncionario",
  jwtAuth,
  usuarioController.atualizarFuncionario
);

router.post(
  "/cadastrarFuncionario",
  jwtAuth,
  usuarioController.cadastrarFuncionario
);



module.exports = router;
