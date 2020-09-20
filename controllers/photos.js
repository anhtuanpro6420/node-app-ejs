const Photo = require('../models/Photo');

const search = async (req, res) => {
  const { title } = req.body;
  const photos = await Photo.find({ $text: { $search: `\"${title}\"` } });
  if (photos && photos.length) {
    return res.render('photos/list', {
      photos,
      title: 'Photo result',
      email: req.user.email,
    });
  }
  return res.redirect('/products');
};

const getDetail = async (req, res) => {
  const { photoId } = req.params;
  const photo = await Photo.findById(photoId);
  if (photo) {
    return res.render('photos/detail', {
      photo,
      title: 'Photo detail',
      email: req.user.email,
    });
  }
  return res.redirect('/photos/list');
};

module.exports = {
  search,
  getDetail,
};
