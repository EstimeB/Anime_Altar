const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema({
  postTitle: {
    type: String,
    required: "You must have a title!",
    minlength: 1,
    maxlength: 28,
    trim: true,
  },
  postDescription: {
    type: String,
    required: "You need to leave a post!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      commentDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
