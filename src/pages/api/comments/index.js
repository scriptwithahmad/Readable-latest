import dbConnect from "@/config/dbConnect";
import commentModel from "@/models/comments";

export default async function handler(req, res) {
  dbConnect();

  try {
    if (req.method === "POST") {

      
      // Create a new comment
      const { content, author, blogPost } = req.body;
      const comment = await commentModel.create({ content, author, blogPost });
      return res.status(201).json({ success: true, data: comment });

    } else if (req.method === "GET") {



      // Fetch comments for a specific blog post
      const blogPostId = req.query;
      // console.log(blogPostId.blogPost)

      const comments = await commentModel
        .find({ blogPost: blogPostId.blogPost })
        .populate("author", "fullName email photo createdAt")
        .populate("blogPost", "title category");
      return res.status(200).json({ success: true, data: comments });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
