const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");
router.get("/", testController.is18Plus);

module.exports = router;
