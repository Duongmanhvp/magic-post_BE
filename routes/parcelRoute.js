const express = require("express");
const router = express.Router();
const parcelController = require("../controllers/parcelController");

//[GET] get All Parcels
router.get("/getAll", parcelController.getAllParcels);

//[GET] get Parcel by Code
router.get("/getByCode", parcelController.getParcelByCode);

//[POST] create new Parcel
router.post("/createParcel", parcelController.createParcel);

//[POST] create new Parcel test
router.post("/createParcelTest", parcelController.createParcelTest);

module.exports = router;
