import blogsModal from "@/models/blogs";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    var match = {};

    const page = req.query.page || 1;
    const limit = req.query.limit || 6;
    const skip = (page - 1) * limit;

    if (req.query.keyword) {
      match.$or = [
        { title: new RegExp(req.query.keyword, "i") },
        { category: new RegExp(req.query.keyword, "i") },
      ];
    }

    const items = await blogsModal
      .find(match, {
        metaTitle: 0,
        metaDesc: 0,
      })
      .populate("author", "fullName email photo")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    const total = await blogsModal.find(match).count();

    var starting = total ? skip + 1 : 0;
    var ending = starting + limit - 1 > total ? total : starting + limit - 1;

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
      message: "Something Went Wrong!!!",
    });
  }
}
