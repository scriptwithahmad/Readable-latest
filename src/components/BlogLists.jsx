"use client";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useQuery } from "react-query";
import { format, render, cancel, register } from "timeago.js";
import axios from "axios";
import Link from "next/link";
import BlogCard from "./BlogCard";

const BlogLists = () => {
  const [filterByName, setFilterByName] = useState({
    keyword: "",
    page: 1,
  });

  const { data, isLoading, isError, refetch } = useQuery(
    ["blog", filterByName],
    async () => {
      var res = await axios.get(
        `https://readable-latest-msbs.vercel.app/api/get-blogs?${queryString.stringify(
          filterByName
        )}`
      );
      return res.data.message.data;
    }
  );

  // Category Map Fucntion and Stats Start here -----------
  const [categoryData, setCategoryData] = useState([]);
  const total = categoryData?.length;

  const fetchBlogCategory = async () => {
    var res = await axios.get("/api/category");
    setCategoryData(res.data.getcat);
    return res.data.getcat;
  };

  useEffect(() => {
    fetchBlogCategory();
  }, []);

  // Input Hadler For Searching by Name ------------------------------------------/
  const searchInputHanler = (e) => {
    const { name, value } = e.target;
    setFilterByName({ ...filterByName, page: 1, [name]: value });
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle key press events
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      refetch();
      setScrollPosition(600);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }, [scrollPosition]);

  return (
    <>
      {/* seraching Tabs ------------------------------------------------- */}
      <div className="standardWidth px-3 2xl:px-0">
        <div className="my-8 flex lg:flex-row flex-col items-center justify-between gap-2 bg-[#FFFFFF] rounded-2xl md:rounded-full py-2 md:py-4 px-2 md:px-6 overflow-hidden">
          <div className="heroFilterSection flex items-center gap-1 md:gap-4 border-none md:border-r px-3 pt-3 md:pr-10 w-full lg:w-[70%] 2xl:overflow-x-visible overflow-x-auto pb-4">
            {categoryData?.map((data, index) => {
              return (
                <button
                  key={index}
                  style={{
                    color: data?.name == "All" ? "#fff" : null,
                    background: data?.name == "All" ? "#2386FF" : null,
                    boxShadow: data?.name == "All" ? "globalShadow" : "none",
                  }}
                  className={` hover:bg-[#eeeeee8c] text-slate-500 whitespace-nowrap px-2.5 md:px-6 rounded-full py-1.5 text-xs md:text-base`}
                >
                  {data?.name == "All" ? (
                    <div className="flex items-center gap-1">
                      <h2>{data?.name}</h2>
                      <span className=" h-5 w-5 flex items-center justify-center  bg-white text-xs text-blue-500 rounded-full">
                        {total}
                      </span>
                    </div>
                  ) : (
                    data?.name
                  )}
                </button>
              );
            })}
          </div>
          <div className="bg-gray-100 rounded-full px-4 my-2 py-1.5 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
            <input
              type="search"
              name="keyword"
              value={filterByName.keyword}
              onChange={searchInputHanler}
              onKeyDown={handleKeyPress}
              placeholder="eg: Blog, Category..."
              className="bg-transparent outline-none py-1 text-sm w-[180px]"
            />
          </div>
        </div>
      </div>

      {/* <BlogCard /> */}

      {/* BLog Card ends ------------------------------------------------- */}

      <div className="standardWidth px-3 2xl:px-0">
        <h1 className=" border-l-4 border-[#2386FF] pl-4 mt-24 mb-8 text-2xl font-semibold">
          Must Read Articles :
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Map Here ------ */}
          {data?.map((v, i) => {
            return (
              <div key={i}>
                <div className="w-full h-[320px]">
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className=" h-full w-full object-cover"
                  ></img>
                </div>
                <div className="border-b-4 pb-1 border-[#2386ff6d]">
                  <div className="flex items-center justify-between mt-3">
                    <h3 className="accentColor text-sm">{v?.category}</h3>
                    <span className="text-slate-600 flex items-center gap-2 text-sm">
                      <i className="fa-regular fa-clock text-sm"></i>
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

export default BlogLists;
