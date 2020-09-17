module.exports.getList = async (req, res) => {
  // const products = await Product.find();
  const products = [
    {
      name: "Macbook",
      price: 35000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
    {
      name: "Iphone",
      price: 24000,
    },
  ];
  return res.render("products/products", {
    title: "Product list",
    products,
    email: req.user.email,
  });
};
