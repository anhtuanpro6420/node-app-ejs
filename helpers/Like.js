const Like = require("../models/Like");

const getNewLikes = async (likes, currentUserId) => {
  const newLike = new Like({
    likedBy: currentUserId,
  });
  await newLike.save();
  return [...likes, newLike];
};

const likeHandler = async (product, currentUserId) => {
  const { likes } = product;
  let updateLikes = [];
  if (likes.length) {
    const hasLiked = likes.find(
      (like) => like.likedBy.toString() === currentUserId.toString()
    );
    if (hasLiked) {
      updateLikes = likes.filter(
        (like) => like.likedBy.toString() !== currentUserId.toString()
      );
    } else {
      updateLikes = await getNewLikes(likes, currentUserId);
    }
  } else {
    updateLikes = await getNewLikes(likes, currentUserId);
  }
  product.likes = updateLikes;
  await product.save();
};

module.exports = {
  likeHandler,
};
