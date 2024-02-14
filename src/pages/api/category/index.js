import dbConnect from "@/config/dbConnect";
import categoryModal from "@/models/category";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const category = await categoryModal.create(req.body);
        res.status(201).json({
          success: true,
          category,
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
        const getcat = await categoryModal.find();
        const total = await categoryModal.find().count();
        res.status(200).json({
          success: true,
          total,
          getcat,
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
