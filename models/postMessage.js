const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
    readTime: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postSchema);

module.exports = PostMessage;
