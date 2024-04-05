"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const [newTags, setNewtags] = useState([]);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const res = await axios.get(`/api/get-blogs/${params.slug}`);

      setFormData(res?.data?.singleBlog);
    };

    fetchSingleBlog();
  }, []);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
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
      var res = await axios.put(`/api/get-blogs/${params.slug}`, submitionData);

      console.log(res.data.success);

      if (res.data.success) {
        toast.success("Blog Updated 😎");
      }
      setTimeout(() => {
        router.back();
        setTempImage("");
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
          featuredImage: {
            url: "",
            altText: "",
          },
        });
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsError("");
      if (error?.response?.data?.message) {
        setIsError(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Categories fetch Here -------------------------//
  const [categories, setCategories] = useState([]);

  const fetchCatgories = async () => {
    try {
      const { data } = await axios.get("/api/category");
      setCategories(data.getcat);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCatgories();
  }, []);

  // TAGS FUNCTIONS
  const [data, setdata] = useState();
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    e.preventDefault();
    var copy = newTags;
    copy.push(data);
    setTags(copy);
    setdata("");
  };

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      addTag(e);
    }
  };

  const handleDel = (i) => {
    const updatetags = [...newTags];
    updatetags.splice(i, 1);
    setNewtags(updatetags);
  };

  return (
    <>
      <Toaster />

      <div className="signIn_Outer_Div">
        <div className="sign_In_Inner">
          <div className="w-full md:w-[90%] lg:w-[80%] border-dotted border rounded-lg globalShadow3">
            <div className=" bg-white rounded-lg p-[20px] lg:p-[50px]">
              <h2 className=" text-green-500 font-semibold text-3xl mb-6">
                Update Blog
              </h2>
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
                  </div>

                  {/* TAGS Main Div -------------------------------------- */}
                  <div className="sign_In_Input_Outer">
                    <label htmlFor="tags">Blog Tags</label>
                    <div className="sign_In_Input">
                      <input
                        id="tags"
                        type="text"
                        value={formData.tags}
                        placeholder="Add Tags"
                        onKeyDown={handlekeydown}
                        onChange={(e) => setdata(e.target.value)}
                      />
                      {/* <input
                        type="text"
                        value={data}
                        placeholder="Add Tags"
                        onKeyDown={handlekeydown}
                        onChange={(e) => setdata(e.target.value)}
                        className={`w-full mb-4 border-none text-[14px] text-gray-500 bg-[#F5F6F8] placeholder:text-sm  rounded-md px-4 border-gray-300 focus:outline-none focus:border-indigo-500`}
                      /> */}
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    {newTags?.length >= 1 && (
                      <div className="border rounded-lg p-4 flex gap-3 flex-wrap overflow-hidden">
                        {newTags.map((v, i) => (
                          <div
                            key={i}
                            className="bg-indigo-50 px-5 py-1.5 flex items-center gap-2 rounded-full"
                          >
                            <h2 className="text-sm text-indigo-600">{v}</h2>
                            <i
                              className="fa-solid fa-x text-xs text-gray-500 hover:text-gray-600 cursor-pointer"
                              onClick={() => handleDel(i)}
                            ></i>
                          </div>
                        ))}
                      </div>
                    )}
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
                          {categories.map((category, index) => {
                            return (
                              <option key={index} value={category?.name}>
                                {category?.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Editor for Desription --------------------- */}
                  <div className=" mb-6">
                    <Editor
                      apiKey="z5f7ugf635wz96udas9dzbjlugsi9xxx6oxnnb6aw83hdkdk"
                      value={formData.desc}
                      onEditorChange={(content) =>
                        setFormData({ ...formData, desc: content })
                      }
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo blocks " +
                          "bullist numlist " +
                          "table image removeformat code fullscreen",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>

                  {/* Featured Image  -------------------------- */}
                  <div className="relative mb-6">
                    {/* Image Input */}
                    <div className=" relative">
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

                            <i
                              onClick={() =>
                                formData?.featuredImage
                                  ? setFormData({
                                      ...formData,
                                      featuredImage: null,
                                    })
                                  : setTempImage(null)
                              }
                              className="fa-regular fa-trash-can absolute top-8 right-8 text-red-500 bg-gray-50 shadow-2xl p-2 rounded-full"
                            ></i>

                            <div className="relative bg-white">
                              <input
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
                                value={formData.featuredImage?.altText}
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
    </>
  );
};

export default Page;
