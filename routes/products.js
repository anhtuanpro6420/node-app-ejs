const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/", productsController.getList);

router.get("/add", (req, res) => {
  return res.render("products/add", {
    title: "Add new product",
    email: req.user.email,
  });
});

router.post("/add", productsController.add);

module.exports = router;
