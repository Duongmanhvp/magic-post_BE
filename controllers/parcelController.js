const moment = require("moment");
const { random } = require("mathjs");
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

  // [POST] create parcels
  createParcel: async (req, res) => {
    try {
      const { firstName, lastName, phone, address, date } = req.body;
      console.log(1);
      const checkedCustomer = await Customer.findOne({
        where: { phone: phone },
      });
      if (checkedCustomer) {
        console.log(2);
        const id = checkedCustomer.customer_id;
        console.log("id :", id);
        const code = parcelController.generateCode(15);
        const newParcel = await Parcel.create({
          record_date: date,
          customer_id: id,
          parcel_code: code,
        });
        return res.status(200).json({
          msg: "Create successfully!!",
          newParcel,
        });
      } else {
        console.log(3);
        const newCustomer = await Customer.create({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          address: address,
        });
        const id = newCustomer.customer_id;
        const code = parcelController.generateCode(15);
        const newParcel = await Parcel.create({
          customer_id: id,
          record_date: date,
          parcel_code: code,
        });
        return res.status(200).json({
          msg: "Create successfully!!",
          newParcel,
          newCustomer,
        });
      }
    } catch (error) {
      console.log(4);
      return res.status(500).json(error);
    }
  },

  // Generate parcel code
  generateCode(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(random() * charactersLength));
    }

    return result;
  },
  createParcelTest: async (req, res) => {
    try {
      console.log(1);
      //const time = moment().format("YYYY-MM-DD");
      console.log(12);
      const code = parcelController.generateCode(15);
      console.log(11);
      const newParcel = await Parcel.create({
        customer_id: "3",
        record_date: 2023 - 12 - 30,
        parcel_code: code,
      });
      return res.status(200).json({
        msg: "Create successfully!!",
        newParcel,
      });
    } catch (error) {
      console.log(4);
      return res.status(500).json(error);
    }
  },
};
module.exports = parcelController;
