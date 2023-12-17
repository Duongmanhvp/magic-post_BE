const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/getAll", userController.getAllUsers);
router.get("/getByID", userController.getUserByID);
router.delete("/delete", userController.deleteUserByID);
router.get("/test", userController.test);

module.exports = router;
