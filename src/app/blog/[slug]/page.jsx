import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { format, render, cancel, register } from "timeago.js";

const getSingleBlog = async (slug) => {
  const { data } = await axios.get(
    `https://readable-latest-msbs.vercel.app/api/get-blogs/${slug}`
  );

  return data.singleBlog;
};

const getRecentBlogs = async () => {
  const { data } = await axios.get(
    "http://localhost:3000/api/get-blogs/?limit=3"
  );
  return data.message;
};

const page = async ({ params }) => {
  const blog = await getSingleBlog(params.slug);
  const recentBlog = await getRecentBlogs();

  return (
    <>
      {/* Single Page Here */}
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

      {/* Recent Blos ------------------------------------------------- */}
      <div className="max-w-[800px] m-auto px-3 2xl:px-0">
        <h1 className=" border-l-4 border-[#2386FF] pl-4 mt-24 mb-8 text-2xl font-semibold">
          Recent Articles :
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Map Here ------ */}
          {recentBlog.data?.map((v, i) => {
            return (
              <div key={i}>
                <div className="w-full h-[180px]">
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className=" h-full w-full object-cover"
                  ></img>
                </div>
                <div className="border-b-4 pb-1 border-[#2386ff6d]">
                  <div className="flex items-center justify-between mt-3">
                    <h3 className="accentColor text-xs">{v?.category}</h3>
                    <span className="text-slate-600 flex items-center gap-2 text-xs">
                      <i className="fa-regular fa-clock text-xs"></i>
                      {format(new Date(v.createdAt), "en_US")}
                    </span>
                  </div>
                  <div className="my-2">
                    <Link href={`/blog/${v.slug}`}>
                      <h1 className="text-2xl line-clamp-1 font-semibold text-gray-700 leading-[1.2] hover:text-[#146ad3] cursor-pointer">
                        {v?.title}
                      </h1>
                    </Link>
                    <main
                      dangerouslySetInnerHTML={{ __html: v?.desc }}
                      className="text-sm mt-2 text-gray-500 line-clamp-2"
                    ></main>
                    <Link href={`/blog/${v.slug}`}>
                      <button className="btn flex items-center justify-center gap-2 my-4 px-4 py-1.5">
                        Read More
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
