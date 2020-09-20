const Photo = require('../models/Photo');
const redisClient = require('../db/redis');

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
  const photoRedis = `photo:${photoId}`;
  let photo = null;
  redisClient.hgetall(photoRedis, async (err, photoCache) => {
    if (err) {
      throw err;
    }
    if (!photoCache) {
      photo = await Photo.findById(photoId).lean();
      const photoClone = {
        ...photo,
        _id: photo._id.toString(),
      };
      await redisClient.hmset(photoRedis, photoClone);
      await redisClient.expire(photoRedis, 86400);
    } else {
      photo = photoCache;
    }
    if (photo) {
      return res.render('photos/detail', {
        photo,
        title: 'Photo detail',
        email: req.user.email,
      });
    }
    return res.redirect('/photos/list');
  });
};

module.exports = {
  search,
  getDetail,
};
