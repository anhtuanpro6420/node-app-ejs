const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/login", authController.renderLogin);

router.post("/login", authController.login);

module.exports = router;
