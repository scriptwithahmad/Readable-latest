import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  try {
    console.log("hey");

    const response = await fetch(
      "https://readable-blogging.vercel.app/api/category"
    );
    const data = await response.json();
    res.status(200).json(data);


    const cateName = data?.getcat?.map((v) => {
      console.log(v?.name);
    });

    res.status(200).json({
      success: true,
      message: cateName,
    });
  } catch (error) {
    console.log(error);
  }
}
