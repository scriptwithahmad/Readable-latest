import React from "react";
import { format, render, cancel, register } from "timeago.js";

async function getData() {
  const res = await fetch("https://readable-blog-eight.vercel.app/api/blog");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const BlogCards = async () => {
  const data = await getData();

  return (
    <>
      <main className="standardWidth px-3 lg:px-0">
        {/* Tabs --------- */}
        <div className="flex md:flex-row flex-col items-center justify-between gap-2 bg-[#FFFFFF] rounded-2xl md:rounded-full py-2 md:py-4 px-2 md:px-6 overflow-hidden">
          <div className="heroFilterSection flex items-center gap-1 md:gap-4 border-none md:border-r px-3 pt-3 md:pr-10 w-full overflow-x-auto pb-4">
            <button className="globalShadow bg-[#2386FF] px-2.5 md:px-6 rounded-full py-1.5 text-white text-xs md:text-base">
              All
            </button>
            <button className=" text-slate-600 px-2.5 md:px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c] text-xs md:text-base whitespace-nowrap">
              Development
            </button>
            <button className=" text-slate-600 px-2.5 md:px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c] text-xs md:text-base whitespace-nowrap">
              Digital Marketing
            </button>
            <button className=" text-slate-600 px-2.5 md:px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c] text-xs md:text-base whitespace-nowrap">
              Cloud And DevOps
            </button>
            <button className=" text-slate-600 px-2.5 md:px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c] text-xs md:text-base whitespace-nowrap">
              Technology
            </button>
            <button className=" text-slate-600 px-2.5 md:px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c] text-xs md:text-base whitespace-nowrap">
              Bussiness
            </button>
          </div>
          <div className="bg-gray-100 rounded-full px-4 my-2 py-1.5 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
            <input
              type="search"
              placeholder="Search"
              className=" bg-transparent outline-none py-1 text-sm w-[180px]"
            />
          </div>
        </div>
        {/* Cards Starts Here --------- */}
        <div className="px-3 lg:px-0">
          <h1 className="border-l-4 border-[#2386FF] pl-4 mt-16 mb-8 text-2xl font-semibold">
            Recent Posts:
          </h1>
          {data?.blogs?.slice(0, 1).map((v, i) => {
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
                <div className=" w-full md:w-1/2">
                  <div className=" border-b-2 lg:border-b-4 border-[#2386ffb8]">
                    <div className="flex items-center gap-2 text-sm lg:text-base">
                      <h3 className="  accentColor">{v?.category}</h3>
                      <pre className=" text-slate-500">.</pre>
                      <span className="text-slate-500 flex items-center gap-1">
                        <i className="fa-regular fa-clock lg:text-[15px]"></i>
                        {format(new Date(v.createdAt), "en_US")}
                      </span>
                    </div>
                    <div>
                      <h1 className="globalBlogCardText font-bold text-gray-800 leading-[1.2] my-2 lg:my-4">
                        {v?.title}
                      </h1>
                      <button className="btn flex items-center justify-center gap-2 mb-3 lg:mb-8 px-3 text-sm lg:test-base lg:px-5 py-1.5 lg:py-3">
                        Read More
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>

                  {/* sub Blogs 2nd ----------- */}
                  <div className=" mt-4 lg:mt-6 flex items-center justify-cente gap-4">
                    <div className=" w-36 md:w-48 lg:w-40">
                      <img
                        className=" h-full w-full object-cover"
                        src={data?.blogs[1]?.featuredImage?.url}
                        alt={data?.blogs[1]?.featuredImage?.altText}
                      ></img>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 lg:mb-2">
                        <h3 className="accentColor text-[11px] lg:text-sm">
                          {data?.blogs[1]?.category}
                        </h3>
                        <pre className=" text-slate-400  text-[11px] lg:text-sm">
                          -
                        </pre>
                        <span className="text-slate-500 flex items-center gap-1  text-[11px] lg:text-sm">
                          <i className="fa-regular fa-clock  text-[11px] lg:text-sm"></i>
                          {format(new Date(data?.blogs[1]?.createdAt), "en_US")}
                        </span>
                      </div>
                      <h1 className="line-clamp-2 text-slate-700 text-sm md:text-base lg:text-2xl font-semibold">
                        {data?.blogs[1]?.title}
                      </h1>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default BlogCards;
