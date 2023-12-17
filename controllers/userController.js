// const bcrypt = require("bcrypt");
const {
  models: { Account },
} = require("../models/");
const { where } = require("sequelize");

const userController = {
  // [POST] REGISTER
  register: async (req, res) => {
    const { acc_name, password } = req.body;
    const defaultRole = 1;
    try {
      // const salt = await bcrypt.genSalt(10);
      // const hashed = await bcrypt.hash(req.body.password, salt);

      //Check acc_name
      const checked_acc_name = await Account.findOne({ where: { acc_name } });
      if (checked_acc_name) {
        return res.status(400).json({
          msg: "Acc_name existed!!!",
        });
      } else {
        //Create account
        const newAccount = await Account.create({
          account_id: 4,
          acc_name: acc_name,
          password: password,
          roles: defaultRole,
        });
        return res.status(200).json({
          msg: "Register Account Success",
          acc_name: acc_name,
          password: password,
          roles: defaultRole,
        });
        // catch((err) => {
        //   res.status(500).json(err);
        // });
      }
      // res.status(200).json(account);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //[POST] LOGIN
  login: async (req, res) => {
    try {
      console.log(req.body);

      const { acc_name, password } = req.body;
      const user = await Account.findOne({
        where: { acc_name },
      });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Invalid acc_name. Pls try again." });
      }
      if (user.password != password) {
        return res
          .status(400)
          .json({ msg: "Invalid password. Pls try again." });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // [GET] all user
  getAllUsers: async (req, res) => {
    try {
      const user = await Account.findAll();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // [GET] Get User by ID
  getUserByID: async (req, res) => {
    try {
      // const id = req.body;
      console.log("1");
      const user = await Account.findOne({
        where: { account_id: req.body.id },
      });
      if (!user) {
        console.log("2");
        res.status(400).json({
          msg: "ID didn't exist!!!",
        });
      } else {
        console.log("3");
        res.status(200).json({
          msg: "Find successfully!!",
          user,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete User
  deleteUserByID: async (req, res) => {
    try {
      const user = await Account.findOne({
        where: { account_id: req.body.id },
      });
      if (!user) {
        return res.status(400).json({
          msg: "Id didn't exist!!!",
        });
      } else {
        const deletedUser = await user.destroy();
        return res.status(200).json({
          msg: "Deleted Successfully",
          deletedUser,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // TEST
  test: async (req, res) => {
    try {
      return res.status(200).json("ok");
    } catch (err) {
      return res.status(500).json("err");
    }
  },
};
module.exports = userController;
