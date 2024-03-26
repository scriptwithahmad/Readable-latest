import dbConnect from "@/config/dbConnect";
import User from "@/models/users";

export default async function handler(req, res) {
  dbConnect();

  try {
    const currentUser = req.body; // Assuming you have user information in request
    const userToFollow = await User.findById(req.query.id);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure currentUser.following is initialized as an array
    currentUser.following = currentUser.following || [];
    // Ensure userToFollow.followers is initialized as an array
    userToFollow.followers = userToFollow.followers || [];

    // Add userToFollow to currentUser's following list
    currentUser.following.push(userToFollow);

    // Add currentUser to userToFollow's followers list
    userToFollow.followers.push(currentUser);
    await userToFollow.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error?.message });
  }
}
