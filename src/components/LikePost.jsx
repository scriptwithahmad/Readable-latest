"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const LikePost = ({ blogID, initialLikes, postlikes }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(initialLikes);

  const [isLiked, setIsLiked] = useState(false);
  const userID = user?._id;

  const likeHandler = async () => {
    try {
      // Send a PATCH request to your API endpoint to like the post
      const response = await axios.patch("/api/blogs", {
        postId: blogID,
        userId: userID,
      });
      // Update likes count and toggle isLiked state
      setLikes(likes + 1);
      setIsLiked(true);
      toast.success(response.data.message); // Show success message
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Toaster />
      {/* Actions, share, like and much more ----------- */}
      <div className="border-y py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <i
              onClick={likeHandler}
              disabled={isLiked}
              className={`fa-heart cursor-pointer active:scale-125 ${
                isLiked ? "text-gray-400 fa-regular" : "text-red-400 fa-solid"
              }`}
            ></i>

            <span className="text-gray-700">{postlikes}</span>
          </div>
          <Link href={"#comment"}>
            <i className="fa-solid fa-comment text-gray-400 cursor-pointer text-sm"></i>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <i className="fa-brands fa-linkedin-in text-gray-500 cursor-pointer hover:text-gray-600"></i>
          <i className="fa-brands fa-x-twitter text-gray-500 cursor-pointer hover:text-gray-600"></i>
          <i className="fa-brands fa-instagram text-gray-500 cursor-pointer hover:text-gray-600"></i>
          <i className="fa-solid fa-ellipsis text-gray-500 cursor-pointer hover:text-gray-600"></i>
        </div>
      </div>
    </>
  );
};

export default LikePost;
