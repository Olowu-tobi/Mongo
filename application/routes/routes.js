const express = require("express");
const router = express.Router();

// importing of controllers
const AuthController = require("../controllers/AuthController");

//  initializing controllers
const authController = new AuthController();

/**
 * Auth routes
 */
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
