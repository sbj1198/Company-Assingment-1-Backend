const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
