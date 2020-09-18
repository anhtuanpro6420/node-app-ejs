const express = require("express");
const multer = require("multer");
const router = express.Router();
const productsController = require("../controllers/products");
const upload = multer({ dest: "public/uploads/" });

router.get("/", productsController.getList);

router.get("/add", (req, res) => {
  return res.render("products/add", {
    title: "Add new product",
    email: req.user.email,
  });
});

router.post("/add", upload.single("image"), productsController.add);

router.post("/like/:productId", productsController.like);

module.exports = router;
