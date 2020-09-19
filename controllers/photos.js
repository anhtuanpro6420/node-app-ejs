const Photo = require('../models/Photo');

const search = async (req, res) => {
  const { title } = req.body;
  const photos = await Photo.find({ $text: { $search: `\"${title}\"` } });
  if (photos && photos.length) {
    return res.render('photos/detail', {
      photos,
      title: 'Photo result',
      email: req.user.email,
    });
  }
  return res.redirect('/products');
};

module.exports = {
  search,
};
