// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authenticate = require("../middlewares/authenticate");
const {
  models: { Account },
} = require("../models/");
const { where } = require("sequelize");
let refreshTokens = [];

const userController = {
  // [POST] REGISTER
  register: async (req, res) => {
    const { name, password } = req.body;
    defaultRole = 5;
    try {
      //Check name
      const checked_name = await Account.findOne({ where: { name } });
      if (checked_name) {
        return res.status(400).json({
          msg: "name existed!!!",
        });
      } else {
        //Create account
        const newAccount = await Account.create({
          name: name,
          password: password,
          roles: defaultRole,
        });
        return res.status(200).json({
          msg: "Register Account Success",
          name: name,
          password: password,
          roles: defaultRole,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] REGISTER TRANSACTION
  registerTrans: async (req, res) => {
    const { name, password } = req.body;
    defaultRole = 2;
    try {
      //Check name
      const checked_name = await Account.findOne({ where: { name } });
      if (checked_name) {
        return res.status(400).json({
          msg: "name existed!!!",
        });
      } else {
        //Create account
        const newAccount = await Account.create({
          name: name,
          password: password,
          roles: defaultRole,
        });
        return res.status(200).json({
          msg: "Register Account Success",
          name: name,
          password: password,
          roles: defaultRole,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] REGISTER WAREHOUSR
  registerWH: async (req, res) => {
    const { name, password } = req.body;
    defaultRole = 4;
    try {
      //Check name
      const checked_name = await Account.findOne({ where: { name } });
      if (checked_name) {
        return res.status(400).json({
          msg: "name existed!!!",
        });
      } else {
        //Create account
        const newAccount = await Account.create({
          name: name,
          password: password,
          roles: defaultRole,
        });
        return res.status(200).json({
          msg: "Register Account Success",
          name: name,
          password: password,
          roles: defaultRole,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GENERATE TOKEN
  genAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.account_id,
        name: user.name,
        role: user.roles,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2h" }
    );
  },
  genRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.account_id,
        name: user.name,
        role: user.roles,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30d" }
    );
  },

  //[POST] LOGIN
  login: async (req, res) => {
    try {
      console.log(req.body);

      const { name, password } = req.body;
      const user = await Account.findOne({
        where: { name },
      });
      if (!user) {
        return res.status(400).json({ msg: "Invalid name. Pls try again." });
      } else if (user.password != password) {
        return res
          .status(400)
          .json({ msg: "Invalid password. Pls try again." });
      } else {
        const accessToken = userController.genAccessToken(user);
        const refreshToken = userController.genRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        return res.status(200).json({ user, accessToken });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // [POST] create new token
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = userController.genAccessToken(user);
      const newRefreshToken = userController.genRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        // refreshToken: newRefreshToken,
      });
    });
  },

  // [POST] log out
  logOut: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json("Sign out successfully!");
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

  // [GET] Get User by ID
  getUserByRole: async (req, res) => {
    try {
      const user = await Account.findAll({
        where: { roles: req.body.role },
      });
      if (!user) {
        res.status(400).json({
          msg: "No one!!!",
        });
      } else {
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
