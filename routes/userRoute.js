const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/getAll", authenticate.isAdmin, userController.getAllUsers);
router.get("/getByID", authenticate.isAdmin, userController.getUserByID);
router.delete("/delete", authenticate.isAdmin, userController.deleteUserByID);
router.get("/test", userController.test);
router.post("/logout", authenticate.isLogin, userController.logOut);
router.post("/refresh", userController.requestRefreshToken);

module.exports = router;
