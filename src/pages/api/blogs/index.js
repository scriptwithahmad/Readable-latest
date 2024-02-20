import blogsModal from "@/models/blogs";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      try {
        var match = {};

        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        if (req.query.keyword) {
          match.$or = [
            { title: new RegExp(req.query.keyword, "i") },
            { category: new RegExp(req.query.keyword, "i") },
          ];
        }

        const items = await blogsModal
          .find(match, {
            metaTitle: false,
            metaDesc: false,
          })
          .populate("author", "fullName email photo")
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
        const total = await blogsModal.find(match).count();

        var starting = total ? skip + 1 : 0;
        var ending =
          starting + limit - 1 > total ? total : starting + limit - 1;

        res.status(200).json({
          success: true,
          message: {
            data: items,
            count: total,
            starting,
            ending,
          },
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: "Something Went Wrong!",
        });
      }

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

    default:
      break;
  }
}
