const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  district: {
    type: String,
    trim: true,
    required: [true, 'Please choose the district']
  },
  newsTitle: {
    type: String,
    required: [true, 'Please add a News Title']
  },
  newsContent: {
    type: String,
    required: [true, 'Please add a News Content']
  },
  imageFile: {
    type: String,
    required: [true, 'Please upload an image']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', NewsSchema);