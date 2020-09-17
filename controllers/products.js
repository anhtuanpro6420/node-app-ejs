const Product = require("../models/Product");

const getList = async (req, res) => {
  const products = await Product.find().populate("createdBy");
  return res.render("products/products", {
    title: "Product list",
    products,
    email: req.user.email,
  });
};

const add = async (req, res) => {
  const { name, amount, price } = req.body;
  const { file } = req;
  const { path } = file;
  const image = path.split("/").slice(1).join("/");
  const createdBy = req.user._id;
  const product = new Product({
    name,
    amount,
    price,
    image,
    createdBy,
  });
  console.log(product);
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
