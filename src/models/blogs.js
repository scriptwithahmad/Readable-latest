import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required!"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug Required!"],
      unique: true,
      trim: true,
    },
    subTitle: {
      type: String,
      required: [true, "Sub Title Required!"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category Required!"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Description Required!"],
      trim: true,
    },
    metaDesc: {
      type: String,
      required: [true, "Meta Description Required!"],
      trim: true,
    },
    featuredImage: {
      url: {
        type: String,
        required: [true, "Image Required!"],
      },
      altText: {
        type: String,
        required: [true, "Image Alternate Text Required!"],
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
