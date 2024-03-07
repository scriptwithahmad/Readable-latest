import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { format, render, cancel, register } from "timeago.js";
import RecentBlogs from "@/components/RecentBlogs";

const getSingleBlog = async (slug) => {
  const { data } = await axios.get(
    `https://readable-blogging.vercel.app/api/get-blogs/${slug}`
  );

  return data.singleBlog;
};

const page = async ({ params }) => {
  const blog = await getSingleBlog(params.slug);

  return (
    <>
      {/* Single Page Here ---------------------------------- */}
      <div className=" max-w-[800px] m-auto py-0 px-3 2xl:px-0 my-4">
        <h1 className=" text-2xl md:text-4xl  font-bold text-gray-800 leading-[1.2] my-2 lg:my-4">
          {blog?.title}
        </h1>

        {/* Author Here ---------------------------- */}
        <div className=" flex items-center gap-2 my-8">
          <div className=" h-12 w-12 rounded-full">
            <img
              alt="Image here"
              className=" h-full w-full object-cover rounded-full border border-gray-100"
              src={
                blog?.author?.photo ||
                "https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg"
              }
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-700 font-bold">
              {blog?.author?.fullName}
            </h3>
            <span className="text-xs text-gray-600">{blog.category}</span>
          </div>
        </div>

        <div className="w-full h-56 md:h-[500px] mt-8">
          <img
            alt="image here"
            src={blog.featuredImage.url}
            className=" w-full h-full object-cover"
          />
        </div>
        {/* Description ------------------------------ */}
        <div className=" my-8">
          <main
            dangerouslySetInnerHTML={{ __html: blog?.desc }}
            className="mt-2 text-gray-500 leading-[1.5]"
          ></main>
        </div>
      </div>

      {/* Recent Blogs -------------------------------------- */}
      <RecentBlogs />
    </>
  );
};

export default page;
