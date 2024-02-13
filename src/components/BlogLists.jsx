import React from "react";
import { format, render, cancel, register } from "timeago.js";

async function getData() {
  const res = await fetch("https://readable-blog-eight.vercel.app/api/blog");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const BlogLists = async () => {
  const data = await getData();

  return (
    <>
      <div className="standardWidth px-3 lg:px-0">
        <h1 className=" border-l-4 border-[#2386FF] pl-4 mt-24 mb-8 text-2xl font-semibold">
          Must Read Articles :
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Map Here ------ */}
          {data?.blogs?.map((v, i) => {
            return (
              <div>
                <div className="w-full h-[320px]">
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className=" h-full w-full object-cover"
                  ></img>
                </div>
                <div className=" border-b-4 pb-1 border-[#2386ff6d]">
                  <div className="flex items-center justify-between mt-3">
                    <h3 className="accentColor text-sm">{v?.category}</h3>
                    <span className="text-slate-600 flex items-center gap-2 text-sm">
                      <i className="fa-regular fa-clock text-sm"></i>
                      {format(new Date(v.createdAt), "en_US")}
                    </span>
                  </div>
                  <div className="my-2">
                    <h1 className="text-2xl font-semibold text-gray-700 leading-[1.2] hover:text-[#146ad3] cursor-pointer">
                      {v?.title}
                    </h1>
                    <p className="text-sm mt-2 text-gray-500 line-clamp-2">
                      {v?.desc}
                    </p>
                    <button className="btn flex items-center justify-center gap-2 my-4 px-4 py-1.5">
                      Read More
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
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

export default BlogLists;
