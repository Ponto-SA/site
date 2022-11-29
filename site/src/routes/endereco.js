const express = require('express');
const router = express.Router();
const jwtAuth = require("../controllers/JwtAuth");
const enderecoController = require("../controllers/enderecoController");

router.post("/novo", jwtAuth, enderecoController.novoEndereco);
router.post("/update", jwtAuth, enderecoController.updateEndereco);
router.post("/delete", jwtAuth, enderecoController.deletarEndereco);
router.post("/listUnico", jwtAuth, enderecoController.listUnicoEndereco);
router.post("/listAll", jwtAuth, enderecoController.listAll);


module.exports = router;