const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const grayListController = require("../controllers/grayListController");

router.get("/getAll", grayListController.getAll);
// router.post("/createNew", auth, grayListController.createNew);

router.delete("/softDeleteOne", auth, grayListController.softDeleteOne); //? was checked
router.patch("/restoreGray", auth, grayListController.restoreGray); //? was checked
router.delete("/realDeleteGray", auth, grayListController.realDeleteGray); //? was checked
router.get("/getGrayTrash", auth, grayListController.getGrayTrash); //? was checked

//Admin confirm
router.post("/confirmOne", auth, grayListController.confirmOne); //? was checked

//Get Name User by Email
// router.get("/getName", grayListController.getName);
// router.post("/postName", grayListController.postName);

module.exports = router;
