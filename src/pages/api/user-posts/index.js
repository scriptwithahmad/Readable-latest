import dbConnect from "@/config/dbConnect";
import usersModel from "@/models/users";
import blogsModel from "@/models/blogs";
import { JWTVerify } from "@/helpers/jwt";

export default async function handler(req, res) {
  dbConnect();

  try {
    var token = req.cookies.AccessToken;
    var id = (await JWTVerify(token)) || req.query.id;

    const users = await usersModel.findById(id);

    if (!users) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    var foundPosts = await blogsModel
      .find({ author: id }, { desc: 0, metaDesc: 0, subTitle: 0 })
      .populate("author", "fullName photo email");

    console.log(foundPosts);

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
