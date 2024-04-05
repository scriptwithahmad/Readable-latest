import blogsModel from "@/models/blogs";
import usersModel from "@/models/users";
import { JWTVerify } from "@/helpers/jwt";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    var token = req.cookies.AccessToken;
    var id = (await JWTVerify(token)) || req.query.id;

    const user = await usersModel.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    var foundPosts = await blogsModel
      .find({ author: id }, { desc: 0, metaDesc: 0 })
      .populate("author", "fullName email photo")
      .sort({ createdAt: -1 });

    if (!foundPosts) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      foundPosts,
    });
  } catch (error) {
    console.log(error);
  }
}
