"use client";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
import queryString from "query-string";
import { Toaster, toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { format, render, cancel, register } from "timeago.js";

const tableHeader = [
  { lable: "Name", align: "left" },
  { lable: "Author", align: "left" },
  { lable: "Category", align: "left" },
  { lable: "Actions", align: "center" },
];

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filterByName, setFilterByName] = useState({
    keyword: "",
    page: 1,
  });

  const { data, isLoading, isError, refetch } = useQuery(
    ["blog", filterByName],
    async () => {
      var res = await axios.get(
        `/api/get-blogs?${queryString.stringify(filterByName)}`
      );
      return res.data.message.data;
    }
  );

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

  // delete Product by Slug ------------------------------------------------------/
  const delPost = async (slug) => {
    try {
      console.log(slug);
      if (window.confirm("Do you wnat to Delete this Product") === true) {
        const res = await fetch(`/api/get-blogs/${slug}`, {
          method: "DELETE",
        });
        if (
          toast.success("Product Deleted Successfully!", {
            duration: 1000,
          })
        ) {
          refetch();
          window.location.reload();
        } else {
          toast.error("Something went Wrong");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Toaster />
      {/* TABLE STARTED ---------------------------------------------------------------------------  */}
      <div className="border-dotted globalShadow3 rounded-2xl overflow-x-auto">
        <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row w-full">
          <h2 className="text-2xl font-semibold">
            All <span className="text-indigo-600">Blogs</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="">
                <input
                  type="search"
                  name="keyword"
                  value={filterByName.keyword}
                  onChange={searchInputHanler}
                  onKeyDown={handleKeyPress}
                  placeholder="eg: Blog, Category..."
                  className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] lg:w-[12vw] w-[45vw] rounded-full focus:ring-2 transition-colors focus:outline-none focus:text-gray-400 placeholder:text-gray-400"
                />
                <span>
                  {loading ? (
                    <i className="fa-solid fa-spinner absolute top-[30%] right-3 text-xs text-gray-500 dashboardSearchSlide"></i>
                  ) : null}{" "}
                </span>
              </div>
              <i
                title="Add Product"
                className="absolute top-1/2 -translate-y-1/2 right-3 border-l pl-2 cursor-pointer text-gray-400 hover:text-gray-500 bx bx-search-alt-2"
              ></i>
            </div>
            <div className=" bg-blue-500 h-8 w-8 flex items-center justify-center rounded-full hover:bg-blue-600">
              <Link
                title="Add Product"
                href="/dashboard/write"
                className="text-white"
              >
                <i className="fa-solid fa-plus"></i>
              </Link>
            </div>
          </div>
        </div>
        <table className="text-sm w-full min-w-[1000px] text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              {tableHeader.map((value, index) => {
                return (
                  <th
                    scope="col"
                    key={index}
                    className={`px-6 py-3 text-${value.align}`}
                  >
                    {value.lable}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* new with react query */}
            {isLoading
              ? [1, 2, 3, 4, 5].map((v, i) => {
                  return (
                    <tr key={i}>
                      {tableHeader.map((value, index) => {
                        return (
                          <th
                            scope="col"
                            key={index}
                            className={`px-6 py-3 text-transparent border rounded-md animate-pulse bg-white/50 text-${value.align}`}
                          >
                            {value.lable}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })
              : data?.map((v, i) => {
                  return (
                    <tr key={i} className="bg-white border-b border-gray-100">
                      <td
                        scope="row"
                        className="px-6 flex items-center py-2 font-medium text-gray-600"
                      >
                        <div className=" flex items-center">
                          <div className="w-12 h-12 mr-3 border border-gray-100 rounded-full overflow-hidden">
                            <img
                              alt="Image Here"
                              src={v.featuredImage?.url}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <h2 className=" text-gray-600 leading-[1.5] line-clamp-1">
                              {v.title}
                            </h2>
                            <span className=" text-xs text-gray-500 font-light">
                              {format(new Date(v.createdAt), "en_US")}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className=" flex items-center">
                          <div className="w-8 h-8 mr-3 border border-gray-100 rounded-full overflow-hidden">
                            <img
                              alt="Image Here"
                              src={v.author?.photo}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <h2 className=" text-gray-600 leading-[1.5] line-clamp-1">
                              {v.author.fullName}
                            </h2>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2"> {v.category} </td>
                      <td className="px-6 py-2 text-lg text-center">
                        <Link href={`/blog/${v.slug}`}>
                          <i
                            title="View"
                            className="fa fa-solid fa-eye px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                          ></i>
                        </Link>
                        <Link href={`/dashboard/blogs/edit-blog/${v.slug}`}>
                          <i
                            title="Edit"
                            className="fa-solid fa-pen-to-square px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                          ></i>
                        </Link>
                        <i
                          title="Delete"
                          onClick={() => delPost(v.slug)}
                          className="fa fa-solid fa-trash px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-red-400 text-sm"
                        ></i>
                      </td>
                    </tr>
                  );
                })}

            {/* old table  */}
          </tbody>
        </table>
        {/* <div className=" flex items-center justify-end pr-10 gap-5 w-full py-5 border-b border-gray-100 bg-gray-50">
          <span className=" whitespace-nowrap flex items-center justify-center text-sm text-slate-500">
            {productData?.page} of {productData?.ending} to{" "}
            {productData?.TotalProducts}
          </span>
          <div className="flex border gap-4 px-4 py-1 rounded-full">
            <button disabled={productData?.starting == 1}>
              <i
                onClick={() => {
                  setFilterByName({
                    ...filterByName,
                    page: filterByName.page - 1,
                  });
                }}
                className={`fa-solid fa-angle-left p-1 text-orange-600 text-xs border-r pr-4 ${
                  productData?.starting == 1
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>
            </button>

            <button
              disabled={productData?.ending >= productData?.TotalProducts}
            >
              <i
                onClick={() => {
                  setFilterByName({
                    ...filterByName,
                    page: filterByName.page + 1,
                  });
                }}
                className={`fa-solid fa-angle-right text-orange-600 text-xs p-1 ${
                  productData?.ending >= productData?.TotalProducts
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Page;
