"use client";
import axios from "axios";
import Link from "next/link";
import Ripple from "material-ripple-effects";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const LikePost = ({ blogID, postlikes, initialLikes, blog }) => {
  const ripple = new Ripple();
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(initialLikes);

  const [isLiked, setIsLiked] = useState(false);
  const userID = user?._id;

  const [postRemainsLiked, setPostRemainsLiked] = useState(false);

  useEffect(() => {
    const checkUserLikePost = () => {
      return blog.likedBy.includes(userID);
    };

    const result = checkUserLikePost();

    if (result) {
      setPostRemainsLiked(true);
    }
  }, [userID, blog]);

  const likeHandler = async () => {
    try {
      // Send a PATCH request to your API endpoint to like the patch
      const response = await axios.patch("/api/blogs", {
        postId: blogID,
        userId: userID,
      });

      if (response?.data?.success) {
        setIsLiked(true);
        setLikes(likes + 1);
      }
      toast.success(response.data.message);
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Toaster />
      {/* Actions, share, like and much more ----------- */}
      <div className="border-y py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              onClick={likeHandler}
              onMouseUp={(e) => ripple.create(e, "dark")}
              className={`bg-gray-50 rounded-full h-8 w-8 hover:bg-gray-100 ${
                isLiked && " scale-110 ping"
              }`}
            >
              <i
                className={`fa-solid fa-heart p-2 rounded-full cursor-pointer text-gray-400 ${
                  isLiked && "text-red-500 likeBtn"
                } ${postRemainsLiked && "text-red-500"}`}
              ></i>
            </div>

            <span className="text-gray-600">{postlikes}</span>
          </div>
          <Link href={"#comment"}>
            <i className="fa-solid fa-comment text-gray-400 cursor-pointer"></i>
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
