const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const urlController = require("../controllers/urlController");

//Get ALL List
router.get("/getAllBlackPublic", urlController.getAllBlackPublic);
router.get("/getAllWhitePublic", urlController.getAllWhitePublic);
router.get("/getAll4MList", urlController.getAll4MList);

//Check exist in list
// router.post("/checkBlackPublic", urlController.checkBlackPublic);
// router.post("/checkWhitePublic", urlController.checkWhitePublic);
// router.post("/checkIn4MList", urlController.checkIn4MList);

//Create - Add to List
router.post("/createBlackList", auth, urlController.createBlackList); //? isChecked
router.post("/createWhiteList", auth, urlController.createWhiteList); //? isChecked

//Update exist list
// router.put("/updateBlackList", urlController.updateBlackList);
// router.put("/updateWhiteList", urlController.updateWhiteList);

//Soft Delete exist list
router.delete("/softDeleteBlack", auth, urlController.softDeleteBlack); //? isChecked
router.delete("/softDeleteWhite", auth, urlController.softDeleteWhite); //? isChecked

//Restore Trash
router.patch("/restoreBlack", auth, urlController.restoreBlack); //? isChecked
router.patch("/restoreWhite", auth, urlController.restoreWhite); //? isChecked

//Force Delete
router.delete("/realDeleteBlack", auth, urlController.realDeleteBlack); //? isChecked
router.delete("/realDeleteWhite", auth, urlController.realDeleteWhite); //? isChecked

//Get all trash
router.get("/getBlackTrash", auth, urlController.getBlackTrash); //? isChecked
router.get("/getWhiteTrash", auth, urlController.getWhiteTrash); //? isChecked

module.exports = router;
