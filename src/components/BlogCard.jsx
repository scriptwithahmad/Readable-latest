import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";
import { format } from "timeago.js";

const getBlogs = async () => {
  const { data } = await axios.get(
    "https://readable-blogging.vercel.app/api/get-blogs"
  );
  return data.message.data;
};

const BlogCard = async () => {
  const blogCard = await getBlogs();

  return (
    <>
      {/* BLog Card start here -------------------------------------------------- */}
      <Suspense fallback={<p>Loading...</p>}>
        <div className="px-3 2xl:px-0 standardWidth">
          <h1 className="border-l-4 border-[#2386FF] pl-4 mt-16 mb-8 text-2xl font-semibold">
            Recent Posts:
          </h1>
          {blogCard?.slice(0, 1).map((v, i) => {
            return (
              <section
                key={i}
                className=" flex md:flex-row flex-col items-center gap-5 lg:gap-12"
              >
                <div className="lg:w-1/2 lg:h-[450px]  h-[260px] w-full md:w-[300px]">
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className="h-full w-full object-cover"
                  ></img>
                </div>
                <div className=" w-full md:w-1/2 lineOfContent">
                  <div className="lineCreated border-b-2 lg:border-b-4 border-blue-200">
                    <div className="flex items-center gap-2">
                      <h3 className="  accentColor text-xs md:text-sm">
                        {v?.category}
                      </h3>
                      <pre className=" text-slate-400 text-xs md:text-sm">
                        -
                      </pre>
                      <span className="text-slate-500 flex items-center gap-1 text-xs md:text-sm">
                        <i className="fa-regular text-gray-400 fa-clock lg:text-[15px]"></i>
                        {format(new Date(v.createdAt), "en_US")}
                      </span>
                    </div>
                    <div>
                      <Link href={`/blog/${v.slug}`}>
                        <h1 className="globalBlogCardText hover:text-slate-800 cursor-pointer font-bold text-gray-700 leading-[1.2] mt-2 lg:my-4">
                          {v?.title}
                        </h1>
                      </Link>

                      <Link href={`/blog/${v.slug}`}>
                        <button className="btn flex items-center justify-center gap-2 my-4 px-4 py-1.5">
                          Read More
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className=" mt-4 lg:mt-6 flex items-center justify-cente gap-4">
                    <div className=" w-36 md:w-48 lg:w-40">
                      <img
                        className=" h-full w-full object-cover"
                        src={blogCard[1]?.featuredImage?.url}
                        alt={blogCard[1]?.featuredImage?.altText}
                      ></img>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 lg:mb-2">
                        <h3 className="accentColor text-[11px] lg:text-sm">
                          {blogCard[1]?.category}
                        </h3>
                        <pre className=" text-slate-400  text-[11px] lg:text-sm">
                          -
                        </pre>
                        <span className="text-slate-500 flex items-center gap-1  text-[11px] lg:text-sm">
                          <i className="fa-regular fa-clock  text-[11px] lg:text-sm"></i>
                          {format(new Date(blogCard[1]?.createdAt), "en_US")}
                        </span>
                      </div>
                      <Link href={`/blog/${blogCard[1].slug}`}>
                        <h1 className="line-clamp-2 text-slate-700 hover:text-slate-800 cursor-pointer text-sm md:text-base lg:text-2xl font-semibold">
                          {blogCard[1]?.title}
                        </h1>
                      </Link>
                      <Link href={`/blog/${blogCard[1].slug}`}>
                        <button className="btn flex items-center justify-center gap-1 md:text-sm text-xs my-2 px-3 py-1">
                          Read More
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </Suspense>
    </>
  );
};

export default BlogCard;
