import userModel from "@/models/users";
import dbConnect from "@/config/dbConnect";
import blogsModel from "@/models/blogs";

export default async function handler(req, res) {
  dbConnect();

  try {
    const id = req.query.id;

    const singleUser = await userModel.findById(id, { password: false });

    if (!singleUser) {
      res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
      return;
    }

    const foundPosts = await blogsModel.find(
      {},
      { desc: 0, metaDesc: 0, subTitle: 0 }
    );
    // .populate("author", "fullName photo email");

    res.status(200).json({
      success: true,
      singleUser,
      foundPosts,
    });
  } catch (error) {
    console.log(error);
  }
}
