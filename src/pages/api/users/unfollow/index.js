import dbConnect from "@/config/dbConnect";
import User from "@/models/users";

export default async function handler(req, res) {
  dbConnect();

  try {
    const currentUser = req.body; // Assuming you have user information in request
    const userToUnfollow = await User.findById(req.query.id);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure currentUser.following is initialized as an array
    currentUser.following = currentUser.following || [];
    // Ensure userToUnfollow.followers is initialized as an array
    userToUnfollow.followers = userToUnfollow.followers || [];

    // Remove userToUnfollow from currentUser's following list
    currentUser.following = currentUser.following.filter(
      (user) => user._id.toString() !== userToUnfollow._id.toString()
    );

    // Remove currentUser from userToUnfollow's followers list
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (user) => user._id.toString() !== currentUser._id.toString()
    );

    await Promise.all([userToUnfollow.save()]);

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error?.message });
  }
}
