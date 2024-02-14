import blogsModal from "@/models/blogs";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        var slug = req.body.title
          .trim()
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--/g, "-");

        const blog = await blogsModal.create({ ...req.body, slug });

        res.status(201).json({
          success: true,
          message: blog,
        });
      } catch (error) {
        if (error.code === 11000) {
          if (error.keyPattern.slug) {
            return res.status(409).json({
              success: false,
              message: "Title Already Exists!",
            });
          }
        }

        // Error Handle for Required Fields
        if (error.message?.split(":")[2]?.split(",")[0]?.trim()) {
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

    case "GET":
      try {
        var match = {};

        if (req.query.keyword) {
          match.$or = [
            { title: new RegExp(req.query.keyword, "i") },
            { category: new RegExp(req.query.keyword, "i") },
          ];
        }

        const blogs = await blogsModal
          .find(match, {
            subTitle: false,
            metaDesc: false,
          })
          .sort({ createdAt: -1 });

        const total = await blogsModal.find(match).count();

        // .populate("author");
        res.status(200).json({
          success: true,
          total,
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
