var express = require("express");
var router = express.Router();
const jwtAuth = require("../controllers/JwtAuth");

var hardwareController = require("../controllers/hardwareController");

router.post("/getCpuUsage", jwtAuth, hardwareController.getCpuUsage);

router.post("/getRamUsage", jwtAuth, hardwareController.getRamUsage);

router.post("/getRamProcUsage", jwtAuth, hardwareController.getRamProcUsage);

router.post("/getCpuTemp", jwtAuth, hardwareController.getCpuTemp);

router.post("/getDiscUsage", jwtAuth, hardwareController.getDiscUsage);

router.post("/getDisc2Usage", jwtAuth, hardwareController.getDisc2Usage);

router.post("/getHistoric", jwtAuth, hardwareController.getHistoric);

module.exports = router;