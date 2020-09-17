const Product = require("../models/Product");

const getList = async (req, res) => {
  const products = await Product.find();
  return res.render("products/products", {
    title: "Product list",
    products,
    email: req.user.email,
  });
};

const add = async (req, res) => {
  const { name, amount, price } = req.body;
  const product = new Product({
    name,
    amount,
    price,
  });
  try {
    await product.save();
    return res.redirect("/products");
  } catch (error) {
    if (error) {
      return res.redirect("/products/add");
    }
  }
};

module.exports = {
  getList,
  add,
};
