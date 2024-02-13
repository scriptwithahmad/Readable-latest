import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required!"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is Required!"],
      unique: true,
      trim: true,
    },
    subTitle: {
      type: String,
      required: [true, "Sub Title is Required!"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is Required!"],
      trim: true,
    },
    desc: {
      type: String,
      // required: [true, "Description is Required!"],
      trim: true,
    },
    metaDesc: {
      type: String,
      required: [true, "Meta Description is Required!"],
      trim: true,
    },
    featuredImage: {
      url: {
        type: String,
      },
      altText: {
        type: String,
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.blogs || mongoose?.model("blogs", blogSchema);
