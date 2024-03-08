"use client";
import { useQuery } from "react-query";
import { Nunito } from "next/font/google";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { format, render, cancel, register } from "timeago.js";

const nunito = Nunito({
  subsets: ["latin"],
});

const Page = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading, isError, refetch } = useQuery(["blog"], async () => {
    var res = await axios.get(`/api/user-posts/?id=${user?._id}`);
    return res;
  });

  var userDetail = data?.data?.foundPosts;

  return (
    <>
      <div className=" grid lg:grid-cols-3 max-w-[1100px] m-auto grid-cols-1">
        <div className="bg-white globalShadow2 lg:col-span-1 rounded-lg px-8 py-8 flex flex-col items-center justify-center h-fit lg:mb-0 mb-5">
          <div className="w-36 h-36 rounded-full">
            <img
              alt="Image Here"
              className=" rounded-full w-full h-full object-cover"
              // src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1709627651/blog-image/5partner_hsrody.png"
              src={user?.photo}
            ></img>
          </div>

          <div className="flex items-center justify-center flex-col my-4">
            <h1
              className={`${nunito.className} mb-2 text-2xl font-bold text-slate-600`}
            >
              {user?.fullName}
            </h1>
            <p className="mb-5 px-4 text-xs py-1 bg-indigo-50 text-indigo-400 font-light w-fit rounded-lg">
              {user?.isAdmin ? "Admin" : "User"}
            </p>
            <button className="text-sm bg-indigo-400 text-white px-8 py-1.5 rounded hover:bg-indigo-500">
              Hire Me
            </button>
          </div>
          <div className="mt-4 w-full flex flex-col gap-5">
            <div className=" border rounded-full">
              <span className=" text-slate-500 text-xs block -translate-y-2 px-5 mb-1 bg-white w-fit">
                Username
              </span>
              <h2 className=" px-5 text-sm -translate-y-2 mb-2 text-slate-700">
                {user?.username}
              </h2>
            </div>
            <div className=" border rounded-full">
              <span className="text-slate-500 text-xs block -translate-y-2 px-5 mb-1 bg-white w-fit">
                Email
              </span>
              <h2 className=" px-5 text-sm -translate-y-2 mb-2 text-slate-700">
                {user?.email}
              </h2>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-lg lg:px-5 px-0">
          {/* Cards Here ------------------------- */}
          <div className=" grid grid-cols-2 gap-5">
            {/* Card 01 --------------------------- */}
            <div className=" bg-white p-4 rounded-lg globalShadow2">
              <div className=" flex items-center justify-between">
                <div>
                  <h2 className=" text-slate-700 text-sm">Products</h2>
                  <span className=" text-gray-600 font-semibold text-2xl">
                    23 +
                  </span>
                </div>
                <i className="fa-solid fa-chart-simple bg-cyan-200 text-cyan-700 p-4 rounded-md"></i>
              </div>
            </div>
            {/* Card 02 --------------------------- */}
            <div className=" bg-white p-4 rounded-lg globalShadow2">
              <div className=" flex items-center justify-between">
                <div>
                  <h2 className=" text-slate-700 text-sm">Blogs</h2>
                  <span className=" text-gray-600 font-semibold text-2xl">
                    12 +
                  </span>
                </div>
                <i className="fa-solid fa-box bg-green-200 text-green-700 p-4 rounded-md"></i>
              </div>
            </div>
          </div>
          {/* Bio Section ------------------------ */}
          <div className="bg-white px-5 py-6 rounded-lg my-5 globalShadow2">
            <h2 className="text-slate-700 font-semibold mb-2">Bio</h2>
            <p className=" text-slate-500 text-sm leading-[1.5]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              sint perspiciatis eveniet temporibus doloribus iste rerum itaque,
              odio a fugiat commodi.
            </p>
          </div>
          {/* Posts Section ----------------------- */}
          <div className="bg-white px-5 py-6 rounded-lg globalShadow2">
            <div className=" flex items-center gap-3 border-b-2 pb-2">
              <span className=" text-indigo-500 font-medium relative">
                Your Blogs
                <span className=" before:-bottom-[10px] before:left-0 before:absolute before:h-0.5 before:w-full before:bg-indigo-400 before:rounded-full"></span>
              </span>
              <span className="text-slate-500 relative">Users</span>
            </div>
            <div className=" py-6">
              <table className="text-sm w-full text-left text-gray-500">
                <tbody>
                  {userDetail?.map((v, i) => {
                    return (
                      <tr
                        key={i}
                        className="bg-white border-b pb-2 border-gray-100"
                      >
                        <td className="py-3">
                          <h2 className=" font-medium">
                            {format(new Date(v.createdAt), "en_US")}
                          </h2>
                        </td>
                        <td className="py-2 px-6">
                          <h2 className=" font-medium text-sm">{v?.title}</h2>
                        </td>
                        <td className="py-2">
                          <h2 className=" font-medium">{v?.category}</h2>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
