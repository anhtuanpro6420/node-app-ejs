const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Like", likeSchema);
