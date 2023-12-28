const {
  models: { location, Parcel, Location },
} = require("../models/");
const { where } = require("sequelize");
const locationController = {
  // [GET] get All
  getAllLocations: async (req, res) => {
    try {
      const location = await Location.findAll();
      return res.status(200).json(location);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // [GET] get By Type
  getLocationByType: async (req, res) => {
    try {
      const location = await Location.findAll({
        where: { type: req.body.type },
      });
      if (!location) {
        res.status(400).json({
          msg: "location type didn't exist!!!",
        });
      } else {
        res.status(200).json({
          msg: "Find successfully!!",
          location,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = locationController;
