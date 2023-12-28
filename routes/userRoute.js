const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
// [POST] login
router.post("/login", userController.login);

//[POST] register customer
router.post("/register", userController.register);

//[POST] register trans employee
router.post(
  "/registerTrans",
  authenticate.isAdminTransaction,
  userController.registerTrans
);

//[POST] register Warehouse employee
router.post(
  "/registerWH",
  authenticate.isAdminWarehouse,
  userController.registerWH
);

//[GET] get All users
router.get("/getAll", authenticate.isAdmin, userController.getAllUsers);

//[GET] get user by ID
router.get("/getByID", authenticate.isAdmin, userController.getUserByID);

//[GET] get user by Role
router.get("/getByRole", authenticate.isAdmin, userController.getUserByRole);

//[DELETE] delete User by ID
router.delete("/delete", authenticate.isAdmin, userController.deleteUserByID);

//[POST] LOG OUT
router.post("/logout", authenticate.isLogin, userController.logOut);

//[POST] REFRESH TOKEN
router.post("/refresh", userController.requestRefreshToken);

//[GET] TEST API
router.get("/test", userController.test);

module.exports = router;
