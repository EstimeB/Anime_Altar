const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  postTitle: {
    type: String,
    required: true,
    trim: true,
  },
  postDescription: {
    type: String,
    required: 'You need to leave a post!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  comments: [
    {
      commentTitle: {
        type: String,
        required: true,
      },
      commentDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        required: true,
      },
    }
  ],
});

const Post = model('Post', postSchema);

module.exports = Post;
