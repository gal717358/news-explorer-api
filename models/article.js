const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  source: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'url is not valid',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'url is not valid',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
