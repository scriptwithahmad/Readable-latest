import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },

  { timestamps: true }
);

export default mongoose?.models?.users ||
  mongoose?.model("users", userSchema);
