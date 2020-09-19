const Product = require('../models/Product');
const { likeHandler } = require('../helpers/Like');

const getList = async (req, res) => {
  const products = await Product.find().populate('createdBy');
  return res.render('products/products', {
    title: 'Product list',
    products,
    email: req.user.email,
  });
};

const add = async (req, res) => {
  const { name, amount, price } = req.body;
  const { file } = req;
  const { path } = file;
  const image = path.split('/').slice(1).join('/');
  const createdBy = req.user._id;
  const product = new Product({
    name,
    amount,
    price,
    image,
    createdBy,
  });
  try {
    await product.save();
    return res.redirect('/products');
  } catch (error) {
    if (error) {
      return res.redirect('/products/add');
    }
  }
};

const like = async (req, res) => {
  const { productId } = req.params;
  const currentUserId = req.user._id;
  try {
    const product = await Product.findById(productId).populate('likes');
    if (product) {
      likeHandler(product, currentUserId);
    }
    return res.redirect('/products');
  } catch (error) {
    if (error) {
      return res.redirect('error');
    }
  }
};

module.exports = {
  getList,
  add,
  like,
};
