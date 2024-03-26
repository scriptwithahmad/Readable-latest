import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "User Name Required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "User Name Required"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "User Name Required"],
    },
    password: {
      type: String,
      required: [true, "Password Required!"],
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    skills: {
      type: Array,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: [true, "Is Admin Field is Required!"],
    },
    photo: {
      type: String,
      required: false,
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      required: false,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },

  { timestamps: true }
);

export default mongoose?.models?.users || mongoose?.model("users", userSchema);
