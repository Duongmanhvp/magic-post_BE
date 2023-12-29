const { add } = require("mathjs");
const {
  models: { Order, Parcel, Location },
} = require("../models/");
const { where } = require("sequelize");
const orderController = {
  // [GET] get All
  getAllOrders: async (req, res) => {
    try {
      const order = await Order.findAll();
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // [GET] get by ID
  getOrderByID: async (req, res) => {
    try {
      const order = await Order.findOne({
        where: { order_id: req.body.id },
      });
      if (!order) {
        res.status(400).json({
          msg: "Order_ID didn't exist!!!",
        });
      } else {
        res.status(200).json({
          msg: "Find successfully!!",
          order,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] get Status by ID
  getStatusOrderByID: async (req, res) => {
    try {
      const order = await Order.findOne({
        where: { order_id: req.body.id },
      });
      if (!order) {
        res.status(400).json({
          msg: "Order_ID didn't exist!!!",
        });
      } else {
        res.status(200).json({
          msg: "Find successfully!!",
          status: order.status,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] get All Order by Status
  getAllOrderByStatus: async (req, res) => {
    try {
      const order = await Order.findAll({
        where: { status: req.body.status },
      });
      if (!order) {
        res.status(400).json({
          msg: "No order!!!",
        });
      } else {
        res.status(200).json({
          msg: "Find successfully!!",
          order,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] get All Order by Location
  getAllOrderByReceivingLocation: async (req, res) => {
    try {
      console.log(1);
      const { location } = req.body;
      const orders = await Order.findAll({
        attributes: ["order_id", "order_date", "status"],
        include: [
          {
            model: Location,
            attributes: ["address"],
            where: { location_id: location },
          },
          {
            model: Parcel,
            attributes: ["parcel_code"],
          },
        ],
        where: {
          sending_location: location,
        },
      });

      return res.status(200).json({
        msg: "Find successfully!!",
        orders,
      });
    } catch (error) {
      console.log(6);
      res.status(500).json(error);
    }
  },

  //[POST] create new order
  createNewOrder: async (req, res) => {
    try {
      const { status, sendLoc, recLoc, code } = req.body;
      const time = new Date();
      const sendLocation = await Location.findOne({
        where: { address: sendLoc },
      });
      const receiveLocation = await Location.findOne({
        where: { address: recLoc },
      });
      const parcel = await Parcel.findOne({
        where: { parcel_code: code },
      });
      if (!parcel) {
        return res.status(400).json({
          msg: "Parcel code didn't exist!!",
        });
      } else {
        const newOrder = await Order.create({
          order_date: time,
          status: status,
          sending_location: sendLocation.location_id,
          receiving_location: receiveLocation.location_id,
          parcel_id: parcel.parcel_id,
        });
        return res.status(200).json({
          msg: "Create successfully!!",
          newOrder,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = orderController;
