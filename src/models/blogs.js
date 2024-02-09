import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.blogs || mongoose?.model("blogs", blogSchema);
