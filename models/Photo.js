const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
  id: {
    type: Number,
    required: true,
    trim: true,
  },
  albumId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
});

photoSchema.index({ title: 'text' }); // schema level

module.exports = mongoose.model('Photo', photoSchema);
