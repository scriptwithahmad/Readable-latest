"use client";
import axios from "axios";
import { format } from "timeago.js";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Ripple from "material-ripple-effects";

const Comment = ({ blogID }) => {
  const { user } = useContext(AuthContext);

  const ripple = new Ripple();

  const [formData, setFormData] = useState({
    content: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogId = blogID;
      const userId = user?._id;
      var submitionData = {
        ...formData,
        author: userId,
        blogPost: blogId,
      };
      var res = await axios.post(`/api/comments`, submitionData);
      if (res?.data?.success) {
        toast.success("Comment Added Successfully 😎");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const [comments, setComments] = useState([]);
  const totalCommentNum = comments.length;

  const fetchCatgories = async () => {
    try {
      const blogId = blogID;
      const { data } = await axios.get(`/api/comments/?blogPost=${blogId}`);
      setComments(data?.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCatgories();
  }, []);

  const [height, setheight] = useState(false);

  return (
    <div className="max-w-[800px] m-auto">
      <Toaster />
      {/* Post New Comment Here ------------------ */}
      <form
        onSubmit={HandleSubmit}
        className="max-w-[800px] m-auto py-0 px-3 2xl:px-0 my-6 border-b pb-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-700">
            Top comments {"(" + totalCommentNum + ")"}
          </h2>
          <span
            onClick={() => setheight(!height)}
            className="px-3 py-1 rounded text-sm hover:underline cursor-pointer"
          >
            {height ? "Submit Comment" : "Write Comment"}
          </span>
        </div>
        <div
          className={`my-4 flex gap-2 md:gap-4 ${
            height
              ? "h-full opacity-100 transition-all"
              : " h-0 opacity-0 transition-all"
          }`}
        >
          <img
            alt="Image here"
            src={user?.photo || "/images/user.webp"}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="w-full flex gap-2 flex-col">
            <textarea
              rows="4"
              required
              cols="33"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleAddressChange}
              placeholder="Post Your Thought..."
              className="p-4 text-sm mb-2 rounded-md outline-none border focus:ring-2"
            ></textarea>
            <button
              type="submit"
              onMouseUp={(e) => ripple.create(e, "light")}
              className="w-fit px-4 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Post
            </button>
          </div>
        </div>
      </form>

      {/* Listed Comments Here ------------------ */}
      <div className={`py-0 px-3 transition-all 2xl:px-0 my-6 overflow-hidden`}>
        {comments?.map((v, i) => {
          return (
            <div key={i} className={`flex items-start  gap-4 my-4`}>
              <div className="w-10 h-10">
                <img
                  alt="Image here"
                  src={v?.author?.photo}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="border rounded-lg py-3 px-2 w-full relative">
                <div className="flex items-center gap-2 mb-1">
                  <div className="group">
                    <h2 className="text-slate-600 font-semibold hover:bg-slate-200 px-2 py-0.5 rounded-md hover:text-gray-700 cursor-pointer">
                      {v?.author?.fullName}
                    </h2>
                    {/* Hovered Main Div ------------------------ */}
                    <div className="globalShadow2 min-w-48 px-3 py-4 rounded-lg z-10 absolute top-10 left-2 opacity-0 hidden group-hover:block group-hover:opacity-100 group-hover:text-red-500 group-hover:bg-white transition-all">
                      <div class="mb-4 flex items-center gap-2">
                        <img
                          alt="img alt"
                          src={v?.author?.photo}
                          class="h-8 w-8 rounded-full object-cover"
                        />
                        <h2 class="text-lg font-medium text-slate-700 whitespace-nowrap">
                          {v?.author?.fullName}
                        </h2>
                      </div>
                      <Link
                        href={`/profile/${v?.author?._id}`}
                        className="rounded text-center inline-block w-full bg-indigo-500 px-4 py-1 text-sm text-white hover:bg-indigo-600"
                      >
                        Profile
                      </Link>
                      <div class="mt-2">
                        <span class="text-xs text-slate-500">JOIN</span>
                        <h2 class="text-sm font-medium text-slate-700">
                          {format(new Date(v?.author?.createdAt), "en_US")}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <span className="text-slate-500 text-xs">
                    {format(new Date(v.createdAt), "en_US")}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-[1.5] px-2">
                  {v?.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
