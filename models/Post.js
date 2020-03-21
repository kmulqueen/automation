const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true
  },
  postContent: {
    type: String,
    required: true
  },
  postTags: {
    type: [String]
  },
  postLikes: {
    type: [Number]
  },
  postComments: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
