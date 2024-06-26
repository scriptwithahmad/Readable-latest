import categoryModal from "@/models/category";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    const deleteCategory = await categoryModal.findByIdAndDelete(req.query.id);

    if (!deleteCategory) {
      res.status(404).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Category has been Deleted!",
    });
  } catch (error) {
    console.log(error);
  }
}
