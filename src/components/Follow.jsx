"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { format } from "timeago.js";
import Ripple from "material-ripple-effects";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

const Follow = ({ blog, userRealatedData }) => {
  const ripple = new Ripple();
  const { user } = useContext(AuthContext);

  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    let total = 0;
    userRealatedData?.foundPosts.forEach((post) => {
      total += post.likes;
    });

    setTotalLikes(total);
  }, [userRealatedData]);

  const blogUserID = blog?.author?._id;
  const [isFollowing, setIsFollowing] = useState(false);
  const postLength = userRealatedData?.foundPosts.length;
  const ifUserAndBlogUserSame = blogUserID == user?._id;

  useEffect(() => {
    setIsFollowing(blog?.author?.followers.includes(user?._id));
  }, [blog, user]);

  const followHandler = async () => {
    try {
      if (isFollowing) {
        return toast.error("You are already following this user.");
      }

      const response = await axios.post(
        `/api/users/follow?id=${blogUserID}&currentUserID=${user?._id}`,
        {
          _id: user?._id,
        }
      );
      toast.success(response?.data?.message);
      setIsFollowing(true); // Update state to indicate that the user is now following
    } catch (error) {
      console.error("Error following user:", error);
      toast.error("An error occurred while following the user.");
    }
  };

  const unfollowHandler = async () => {
    try {
      const response = await axios.post(
        `/api/users/unfollow?id=${blogUserID}`,
        {
          _id: user?._id,
        }
      );
      toast.success(response?.data?.message);
      setIsFollowing(false); // Update state to indicate that the user is now unfollowing
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("An error occurred while unfollowing the user.");
    }
  };

  return (
    <>
      <Toaster />
      {/* Related Posts For User and Follow Buton --------------------------- */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-[800px] m-auto px-3 md:px-0 border-b pb-8">
          <div className="flex justify-between items-start md:flex-row flex-col">
            <div>
              <Image
                width={400}
                height={400}
                priority="true"
                alt="image here"
                className="h-[70px] w-[70px] rounded-full object-cover mb-4"
                src={userRealatedData?.foundPosts[0]?.author?.photo}
              ></Image>
              <h1 className="text-gray-700 font-semibold text-lg mb-2">
                Written By {userRealatedData?.foundPosts[0]?.author?.fullName}
              </h1>
              <div className="flex items-center gap-3 my-2">
                <span className="text-sm text-gray-600 hover:underline cursor-pointer">
                  {postLength} Posts
                </span>
                <span className="text-sm text-gray-600 hover:underline cursor-pointer">
                  {totalLikes} + Likes
                </span>
                <span className="text-sm text-gray-600 hover:underline cursor-pointer">
                  {totalLikes} + Followers
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
                className="text-white bg-gray-600 px-4 py-1.5 rounded-full hover:bg-gray-700"
              >
                Profile
              </Link>
              {!ifUserAndBlogUserSame && (
                <button
                  onClick={isFollowing ? unfollowHandler : followHandler}
                  onMouseUp={(e) => ripple.create(e, "dark")}
                  className={`px-4 py-1.5 rounded-full ${
                    isFollowing
                      ? "border text-gray-500"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  } border-gray-400/60 text-gray-600 hover:border-gray-500/80 transition-all`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
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
                  <Image
                    width={800}
                    height={800}
                    priority="true"
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className="object-cover h-52 w-full"
                  ></Image>
                  <div className="flex gap-2 items-center justify-between my-3">
                    <div className="flex items-center gap-2">
                      <Image
                        width={500}
                        height={500}
                        alt="avatar"
                        priority="true"
                        src={v?.author?.photo}
                        className="w-6 h-6 rounded-full object-cover"
                      ></Image>
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
