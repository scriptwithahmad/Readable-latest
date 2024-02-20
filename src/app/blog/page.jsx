"use client";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { format, render, cancel, register } from "timeago.js";

const Page = () => {
  const [filterByName, setFilterByName] = useState({
    keyword: "",
    page: 1,
  });

  const { data, isLoading, isError, refetch } = useQuery(
    ["blog", filterByName],
    async () => {
      var res = await axios.get(
        `/api/blogs?${queryString.stringify(filterByName)}`
      );
      return res.data.message.data;
    }
  );

  return (
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
                  <Link href={`/edit-blog/${v.slug}`}>Edit</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
