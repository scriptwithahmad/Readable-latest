import bcrypt from "bcrypt";
import usersModel from "@/models/users";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        if (!req.body.username) {
          res.status(400).json({
            success: false,
            message: "Username Required!",
          });
        }

        if (!req.body.password) {
          res.status(400).json({
            success: false,
            message: "Password Required!",
          });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await usersModel.create({
          ...req.body,
          password: hashedPassword,
        });
        res.status(201).json({
          success: true,
          message: user,
        });
      } catch (error) {
        // For duplicate Data Error Hnadle
        if (error.code === 11000) {
          return res.status(409).json({
            success: false,
            message: `${Object.keys(error.keyPattern)[0]} already in use!`,
          });
        }

        var errorMessage = error.message?.split(":")[2]?.trim();
        if (errorMessage) {
          return res.status(400).json({
            success: false,
            message: errorMessage,
          });
        }

        res.status(500).json({
          success: false,
          message: "Something Went Wrong!",
        });
      }

      break;
    case "GET":
      try {
        const user = await usersModel.find().populate("posts");
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

      break;

    default:
      break;
  }
}
