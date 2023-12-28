const {
  models: { Parcel, Customer, Account },
} = require("../models/");
const { where } = require("sequelize");
const parcelController = {
  //[GET] get ALL
  getAllParcels: async (req, res) => {
    try {
      const parcel = await Parcel.findAll();
      return res.status(200).json(parcel);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //[GET] Get by CODE
  getParcelByCode: async (req, res) => {
    try {
      const parcel = await Parcel.findOne({
        where: { parcel_code: req.body.code },
      });
      const customer = await Customer.findOne({
        where: { customer_id: parcel.customer_id },
      });
      if (!parcel) {
        res.status(400).json({
          msg: "Parcel_code didn't exist!!!",
        });
      } else {
        res.status(200).json({
          msg: "Find successfully!!",
          parcel,
          customer,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = parcelController;
