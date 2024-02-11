import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
    },
  },
  
  { timestamps: true }
);

export default mongoose?.models?.users || mongoose?.model("users", userSchema);
