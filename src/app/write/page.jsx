"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import mongoose from "mongoose";

const page = () => {
  const router = useRouter();
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);

//   const userId = "65c8f4e6b170a4e621626fc2";
//   const authorObjectId = mongoose.Types.ObjectId(userId);

  const [FormData, setFormData] = useState({
    title: "",
    slug: "",
    subTitle: "",
    category: "",
    desc: "",
    metaDesc: "",
    metaDesc: "",
    author: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const uplaod = await axios.post("/api/blog", FormData);

      console.log(uplaod);

      if (uplaod) {
        console.log(uplaod);
        toast.success("Submitted");
      }

      setFormData({
        title: "",
        slug: "",
        subTitle: "",
        category: "",
        desc: "",
        metaDesc: "",
        metaDesc: "",
        author: "",
      });

      setIsError("");
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        setIsError(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" px-[15px] pt-[50px] pb-[140px]">
        <div className="signIn_Outer_Div">
          <div className="sign_In_Shape">
            <img src="image/sign/man-3.png" alt="Image Here" className="man1" />
            <img src="image/sign/man-2.png" alt="Image Here" className="man2" />
            <img
              src="image/sign/circle.png"
              alt="Image Here"
              className="circle"
            />
            <img
              src="image/sign/zigzag.png"
              alt="Image Here"
              className="zigzag wavey"
            />
            <img src="image/sign/dot.png" alt="Image Here" className="dot" />
            <img
              src="image/sign/sign-up.png"
              alt="Image Here"
              className="sign_Up"
            />
            <img
              src="image/sign/flower.png"
              alt="Image Here"
              className="flower"
            />
          </div>
          <div className="sign_In_Inner">
            <div className="sign_In_Heading">
              <h2>English Test Prepartion Form</h2>
              <p>Sign Up Form For IELTS Online Prepartion</p>
            </div>
            <div className=" w-full  md:w-[90%] lg:w-[50%] ">
              <div className=" bg-white  p-[20px]   lg:p-[50px] enrollNow ">
                <div className="sign_In_Form">
                  <form onSubmit={HandleSubmit}>
                    <div className=" grid grid-cols-1">
                      {/* Blog Title -------------------------- */}
                      <div className="sign_In_Input_Outer">
                        <label htmlFor="title">Blog Title</label>
                        <div className="sign_In_Input">
                          <input
                            id="title"
                            name="title"
                            autoComplete="off"
                            value={FormData.title}
                            onChange={changeHandler}
                            placeholder="Enter Blog Title"
                            className={`w-full mb-4 py-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                          ></input>
                          <i className="fa-solid fa-signature"></i>
                        </div>
                      </div>
                      {/* Sub Title -------------------------- */}
                      <div className="sign_In_Input_Outer">
                        <label htmlFor="subTitle">Sub Title</label>
                        <div className="sign_In_Input">
                          <input
                            id="subTitle"
                            name="subTitle"
                            autoComplete="off"
                            onChange={changeHandler}
                            value={FormData.subTitle}
                            placeholder="Enter Sub Title"
                            className={`w-full mb-4 py-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                          ></input>
                          <i className="fa-solid fa-signature"></i>
                        </div>
                      </div>
                      {/* avatarAlt -------------------------- */}
                      <div className="sign_In_Input_Outer">
                        <label htmlFor="avatarAlt">Image Alt Text</label>
                        <div className="sign_In_Input">
                          <input
                            id="avatarAlt"
                            name="avatarAlt"
                            autoComplete="off"
                            onChange={changeHandler}
                            value={FormData.avatarAlt}
                            placeholder="Enter avatarAlt"
                            className={`w-full mb-4 py-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                          ></input>
                          <i className="fa-solid fa-signature"></i>
                        </div>
                      </div>
                    </div>
                    {/* Div -------------------------------------- */}
                    <div className=" grid grid-cols-1">
                      {/* Meta Description -------------------------- */}
                      <div className="sign_In_Input_Outer">
                        <label htmlFor="">Meta Description</label>
                        <div className="sign_In_Input">
                          <input
                            name="metaDesc"
                            autoComplete="off"
                            onChange={changeHandler}
                            value={FormData.metaDesc}
                            placeholder="Enter Meta Description"
                            className={`w-full mb-4 py-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                          ></input>
                          <i className="fa-solid fa-envelope"></i>
                        </div>
                      </div>
                      {/* Author ID Here -------------------------- */}
                      {/* <div className="sign_In_Input_Outer">
                        <label htmlFor="author">Author ID</label>
                        <div className="sign_In_Input">
                          <input
                            id="author"
                            // name="author"
                            autoComplete="off"
                            // onChange={changeHandler}
                            // value={FormData.author}
                            // value={authorObjectId}
                            placeholder="Enter Author ID"
                            className={`w-full mb-4 py-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                          ></input>
                          <i class="fa-solid fa-user"></i>
                        </div>
                      </div> */}
                    </div>

                    {/* Course Main Div -------------------------------------- */}
                    <div className=" grid grid-cols-1">
                      {/* Blog Category Here -------------------------- */}
                      <div className="sign_In_Input_Outer">
                        <label htmlFor="category">Blog Category</label>
                        <div className="sign_In_Input">
                          <select
                            id="category"
                            name="category"
                            onChange={changeHandler}
                            value={FormData.category}
                            className={`w-full mb-4 py-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                          >
                            <option value="">Select Blog Category</option>
                            <option value="News">News</option>
                            <option value="Education">Education</option>
                            <option value="Technology">Technology</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="signInSubmitBtn mt-7"
                    >
                      {loading ? "Uploading" : "Submit"}
                    </button>

                    <div className=" mt-4   flex items-center justify-center ">
                      <span className=" italic text-sm text-red-400">
                        {isError}
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
