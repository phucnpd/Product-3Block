const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.post("/virustotal/v3", apiController.virustotal);
router.post("/urlscan/v100", apiController.urlScan);
router.post("/googleSafe/v4", apiController.checkSafeGoogle);
router.get("/GetAllURLScan", apiController.GetAllURLScan);
//todo 18+ & cache
router.post("/is18Plus", apiController.is18Plus);
router.get("/getCache18", apiController.getCache18);
router.post("/postCache18", apiController.postCache18);

router.get("/getNotFound18", apiController.getNotFound18);
router.post("/postNotFound18", apiController.postNotFound18);
router.delete("/deleteNotFound18", apiController.deleteNotFound18);

//todo Message from user
router.get("/getMessage", apiController.getMessage);
router.post("/postMessage", apiController.postMessage);
router.post("/checkMessage", apiController.checkMessage);

module.exports = router;
