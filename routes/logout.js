const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logout");

router.delete("/", logoutController.logout);

module.exports = router;
