import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Author Required!"],
    },
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.comments ||
  mongoose?.model("comments", commentSchema);
