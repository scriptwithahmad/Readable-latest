"use client";
import axios from "axios";
import Link from "next/link";
import { format } from "timeago.js";
import Ripple from "material-ripple-effects";
import { Toaster, toast } from "react-hot-toast";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const Follow = ({ blog, userRealatedData }) => {
  const ripple = new Ripple();
  const { user } = useContext(AuthContext);

  const blogUserID = blog?.author?._id;
  const postLength = userRealatedData?.foundPosts.length;

  const [isFollow, setIsFollow] = useState(false);

  const userFollowExistsinDB = blog?.author?.followers.includes(user?._id);

  console.log(userFollowExistsinDB);

  const followHandler = async () => {
    try {
      const userFollowExistsinDB = blog?.author?.followers.includes(user?._id);

      if (userFollowExistsinDB) {
        return toast.error("your already follow this user");
      }

      // Send a PATCH request to your API endpoint to like the post
      const response = await axios.post(`/api/users/follow?id=${blogUserID}`, {
        _id: user?._id,
      });
      toast.success(response?.data?.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response);
    }
  };

  return (
    <>
      <Toaster />
      {/* Related Posts For User --------------------------- */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-[800px] m-auto px-3 md:px-0 border-b pb-8">
          <div className="flex justify-between items-start">
            <div>
              <img
                alt="image here"
                className="h-[70px] w-[70px] rounded-full object-cover mb-4"
                src={userRealatedData?.foundPosts[0]?.author?.photo}
              />
              <h1 className="text-gray-700 font-semibold text-lg mb-2">
                Written By {userRealatedData?.foundPosts[0]?.author?.fullName}
              </h1>
              <div className="flex items-center gap-3 my-2">
                <span className="text-sm text-gray-600 hover:underline cursor-pointer">
                  {postLength} Posts
                </span>
                <span className="text-sm text-gray-600 hover:underline cursor-pointer">
                  200 + Likes
                </span>
              </div>
              <p className=" text-sm text-gray-600 mb-6">
                {userRealatedData?.foundPosts[0]?.author?.bio}
              </p>
            </div>
            {/* Buttons -------------- */}
            <div className="flex items-center gap-4">
              <Link
                href={`/profile/${blog?.author?._id}`}
                onMouseUp={(e) => ripple.create(e, "dark")}
                className="text-white bg-gray-700 px-4 py-1.5 rounded-full hover:bg-gray-800"
              >
                Profile
              </Link>
              <button
                onClick={followHandler}
                onMouseUp={(e) => ripple.create(e, "dark")}
                className={`px-4 py-1.5 rounded-full ${
                  !userFollowExistsinDB
                    ? "bg-gray-700 text-white hover:bg-gray-500"
                    : "hover:bg-gray-50 ring-1 ring-blue-500 text-blue-500 hover:ring-2 hover:ring-blue-300"
                }`}
              >
                {userFollowExistsinDB ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[800px] m-auto px-3 md:px-0 py-6">
          <h1 className="text-gray-700 font-semibold">
            More from {userRealatedData?.foundPosts[0]?.author?.fullName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 border-b pb-4 mb-5">
            {userRealatedData?.foundPosts.slice(0, 4).map((v, i) => {
              return (
                <div key={i}>
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className="object-cover h-52 w-full"
                  />
                  <div className="flex gap-2 items-center justify-between my-3">
                    <div className="flex items-center gap-2">
                      <img
                        alt="avatar"
                        src={v?.author?.photo}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <h2 className="text-gray-600 text-sm font-semibold">
                        {v?.author?.fullName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 justify-between text-xs text-gray-500">
                      <h3>{v?.category}</h3>
                      <span>--</span>
                      <h3 className="text-slate-500 text-xs">
                        {format(new Date(v.createdAt), "en_US")}
                      </h3>
                    </div>
                  </div>
                  <Link href={`/blog/${v.slug}`}>
                    <h1 className="font-bold text-gray-700 line-clamp-1 hover:text-gray-800 cursor-pointer">
                      {v.title}
                    </h1>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-2 my-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat aut ipsa error nihil cumque.
                  </p>
                </div>
              );
            })}
          </div>
          <Link href={`/profile/${blog?.author?._id}`}>
            <button
              onMouseUp={(e) => ripple.create(e, "dark")}
              className="border px-5 py-2 rounded-full text-gray-500 text-sm hover:text-gray-600 hover:bg-gray-100"
            >
              See all from {userRealatedData?.foundPosts[0]?.author?.fullName}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Follow;
