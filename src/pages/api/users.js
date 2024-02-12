import User from "@/models/users";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(201).json({
          success: true,
          user,
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
        const user = await User.find();
        res.status(200).json({
          success: true,
          user,
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
