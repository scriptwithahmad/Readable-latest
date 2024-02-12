"use client";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
// import mongoose from "mongoose";

const Page = () => {
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);

  //   const userId = "65c8f4e6b170a4e621626fc2";
  //   const authorObjectId = mongoose.Types.ObjectId(userId);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subTitle: "",
    category: "",
    desc: "",
    metaDesc: "",
    metaDesc: "",
    author: "",
    featuredImage: {
      url: "",
      altText: "",
    },
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cloudinary States -----------------------/
  const [tempImage, setTempImage] = useState("");

  const uploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", tempImage);
      data.append("upload_preset", "blog-image");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
        {
          body: data,
          method: "POST",
        }
      );

      const jsonRes = await res.json();

      return jsonRes.secure_url;
    } catch (error) {
      alert("Something wrong! while Uplading images");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const imgUrl = tempImage
        ? await uploadImageToCloudinary()
        : formData.featuredImage.url;

      var submitionData = {
        ...formData,
        featuredImage: { ...formData.featuredImage, url: imgUrl },
      };
      var res = await axios.post(`/api/blog`, submitionData);

      console.log(res);

      if (res) {
        toast.success(res.data.message);
        toast.success("Blog Submitted 😎");
      }

      setIsError("");
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
      <Toaster />
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
                            value={formData.title}
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
                            value={formData.subTitle}
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
                            autoComplete="off"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                featuredImage: {
                                  ...formData.featuredImage,
                                  altText: e.target.value,
                                },
                              })
                            }
                            value={formData.featuredImage.altText}
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
                            value={formData.metaDesc}
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
                            // value={formData.author}
                            // value={authorObjectId}
                            placeholder="Enter Author ID"
                            className={`w-full mb-4 py-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                          ></input>
                          <i class="fa-solid fa-user"></i>
                        </div>
                      </div> */}
                    </div>

                    {/* Main Div -------------------------------------- */}
                    <div className=" grid grid-cols-1">
                      {/* Blog Category Here -------------------------- */}
                      <div className="sign_In_Input_Outer">
                        <label htmlFor="category">Blog Category</label>
                        <div className="sign_In_Input">
                          <select
                            id="category"
                            name="category"
                            onChange={changeHandler}
                            value={formData.category}
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

                    {/* Featured Image  -------------------------- */}

                    <div className="relative mb-6">
                      {/* Image Input */}
                      <div>
                        <input
                          type="file"
                          name="photo"
                          id="photo"
                          className="hidden"
                          onChange={(e) => {
                            setTempImage(e.target.files[0]);
                            setFormData({ ...formData, photo: "" });
                          }}
                        />

                        <label
                          className="group border border-dashed p-4 bg-blue-50/50 hover:bg-blue-50 rounded-md border-blue-600 overflow-hidden block"
                          htmlFor={tempImage ? "" : "photo"}
                        >
                          {tempImage || formData.featuredImage?.url ? (
                            <div>
                              <img
                                className="aspect-[3/2] mb-4 rounded-md w-full object-cover"
                                src={
                                  tempImage
                                    ? URL.createObjectURL(tempImage)
                                    : formData.featuredImage.url ||
                                      "/images/image.png"
                                }
                                alt="image here"
                              />

                              <div className="relative bg-white">
                                <input
                                  required
                                  id="alt"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      featuredImage: {
                                        ...formData.featuredImage,
                                        altText: e.target.value,
                                      },
                                    })
                                  }
                                  type="text"
                                  placeholder=""
                                  value={formData.featuredImage.altText}
                                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                <label
                                  className="absolute rounded-sm bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                  htmlFor="alt"
                                >
                                  Alt Text For Image SEO
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center text-sm items-center">
                              <div>
                                <i className="bx text-blue-600 text-4xl bx-cloud-upload"></i>
                              </div>
                              <div className="text-blue-600 ml-2">
                                Upload Featured Image
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Featured Image End =========== */}

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

export default Page;
