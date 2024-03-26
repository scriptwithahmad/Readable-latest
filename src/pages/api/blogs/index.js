import Blog from "@/models/blogs";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        // Create a new blog post
        var slug = req.body.title
          .trim()
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--/g, "-");

        const blog = await Blog.create({ ...req.body, slug });

        res.status(201).json({
          success: true,
          message: blog,
        });
      } catch (error) {
        // Handle errors
        if (error.code === 11000) {
          if (error.keyPattern.slug) {
            return res.status(409).json({
              success: false,
              message: "Title Already Exists!",
            });
          }
        }

        // Error Handle for Required Fields
        if (error.message.split(":")[2].split(",")[0].trim()) {
          var errMessage = error.message.split(":")[2].split(",")[0].trim();

          return res.status(400).json({
            success: false,
            message: errMessage,
          });
        }

        res.status(500).json({
          success: false,
          message: "Internal Server Error!",
        });
      }
      break;

    case "PATCH": // Add a PATCH method to handle liking a blog post
      try {
        const { postId, userId } = req.body;

        // Find the blog post by its ID
        const blog = await Blog.findById(postId);

        if (!blog) {
          return res
            .status(404)
            .json({ success: false, message: "Blog post not found" });
        }

        // Check if the user has already liked the post
        if (blog.likedBy.includes(userId)) {
          return res
            .status(400)
            .json({
              success: false,
              message: "You have already liked this post",
            });
        }

        // Update the blog post to increment likes and add userId to likedBy array
        blog.likes++;
        blog.likedBy.push(userId);
        await blog.save();

        res
          .status(200)
          .json({ success: true, message: "Post liked successfully", blog });
      } catch (error) {
        console.error("Error liking post:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
