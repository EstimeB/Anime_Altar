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
  postUser: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  comments: [
    {
      commentDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentUser: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
