import blogsModal from "@/models/blogs";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const blog = await blogsModal.create(req.body);
        res.status(201).json({
          success: true,
          blog,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error!",
        });
      }
      break;

    case "GET":
      try {
        const blogs = await blogsModal
          .find({})
          .populate("author", "name email");
        res.status(200).json({
          success: true,
          blogs,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error!",
        });
      }

    default:
      break;
  }
}
