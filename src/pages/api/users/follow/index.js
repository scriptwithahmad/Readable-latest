import dbConnect from "@/config/dbConnect";
import User from "@/models/users";

export default async function handler(req, res) {
  dbConnect();

  try {
    const currentUser = req.body; // Assuming you have user information in request
    const userToFollow = await User.findById(req.query.id);

    const userWhoFollowed = await User.findById(req.query.currentUserID);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure currentUser.following is initialized as an array
    currentUser.following = currentUser.following || [];

    // Add currentUser to userToFollow's followers list
    userToFollow.followers.push(currentUser);

    userWhoFollowed.followers = userWhoFollowed.followers || [];

    // Add currentUser to userToFollow's followers list
    userWhoFollowed.following.push(userToFollow?._id);

    await userToFollow.save();
    await userWhoFollowed.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error?.message });
  }
}
