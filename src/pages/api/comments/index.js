import dbConnect from "@/config/dbConnect";
import commentModel from "@/models/comments";

export default async function handler(req, res) {
  dbConnect();

  try {
    if (req.method === "POST") {
      const { content, author, blogPost } = req.body;
      const comment = await commentModel.create({ content, author, blogPost });

      return res.status(201).json({
        success: true,
        data: comment,
      });
    } else if (req.method === "GET") {
      const blogPostId = req.query;

      const comments = await commentModel
        .find({ blogPost: blogPostId.blogPost })
        .populate("author", "fullName email photo createdAt")
        .populate("blogPost", "title category");

      return res.status(200).json({
        success: true,
        data: comments,
      });
    } else if (req.method === "DELETE") {
      try {
        const commentId = req.query.id;

        if (!commentId) {
          return res.status(400).json({
            success: false,
            message: "Comment ID is required for deletion",
          });
        }

        const delComment = await commentModel.findByIdAndDelete(commentId);

        if (!delComment) {
          return res.status(404).json({
            success: false,
            message: "Comment not found",
          });
        }

        res.status(200).json({
          success: true,
          message: "Comment Deleted Successfully!",
        });
      } catch (error) {
        console.log(error);
        res.status(200).json({
          success: false,
          error,
        });
      }
    } else {
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  po;
}
