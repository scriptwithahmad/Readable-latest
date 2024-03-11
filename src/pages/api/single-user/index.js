import userModel from "@/models/users";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    const id = req.query.id;

    const singleUser = await userModel.findById(id, { password: false })

    if (!singleUser) {
      res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: singleUser,
    });
  } catch (error) {
    console.log(error);
  }
}
