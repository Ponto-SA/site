const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/JwtAuth");
const pontoController = require("../controllers/pontoController");

router.post("/listAll", jwtAuth, pontoController.listAll);

module.exports = router;