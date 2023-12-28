const express = require("express");
const router = express.Router();
const parcelController = require("../controllers/parcelController");

//[GET] get All Parcels
router.get("/getAll", parcelController.getAllParcels);

//[GET] get Parcel by Code
router.get("/getByCode", parcelController.getParcelByCode);

module.exports = router;
