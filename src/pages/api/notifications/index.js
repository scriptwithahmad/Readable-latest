import blogsModel from "@/models/blogs";
import usersModel from "@/models/users";
import { JWTVerify } from "@/helpers/jwt";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    const { blogId } = req.query;

    const findBlog = await blogsModel.findById(blogId, {
      desc: 0,
      tags: 0,
      likedBy: 0,
      metaDesc: 0,
      subTitle: 0,
    });

    // var token = req.cookies.AccessToken || "";
    // var id = (await JWTVerify(token)) || req.query.id;

    // console.log(id);

    // const findUser = await usersModel.findById(id, { password: false });

    res.status(200).json({
      success: true,
      findBlog,
    });
  } catch (error) {
    console.log(error);
  }
}
