// const bcrypt = require("bcrypt");
const {
  models: { Account },
} = require("../models/");
const { where } = require("sequelize");

const userController = {
  //REGISTER
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
          account_id: 3,
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

  //LOGIN
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
