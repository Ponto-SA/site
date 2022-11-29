const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/JwtAuth");

const dispositivoController = require("../controllers/dispositivoController");

router.get("/", dispositivoController.testar);

router.post("/cadastrar", dispositivoController.cadastrar)
router.post("/vincularUsuario", dispositivoController.cadastrar)
router.post("/listar",jwtAuth, dispositivoController.listar);
router.post("/atualizarDispositivo", jwtAuth, dispositivoController.atualizarDispositivo);
router.post("/atualizarUpdate", jwtAuth, dispositivoController.atualizarUpdate);
router.post("/atualizarUpdate2", jwtAuth, dispositivoController.atualizarUpdate2);
router.post("/deletar", jwtAuth, dispositivoController.deletarDipositivo);


module.exports = router;