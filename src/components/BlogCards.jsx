import Image from "next/image";
import React from "react";

const BlogCards = () => {
  return (
    <>
      <main className="standardWidth">
        {/* Tabs --------- */}
        <div className="flex items-center justify-between gap-2 bg-[#FFFFFF] rounded-full py-4 px-6">
          <div className=" flex items-center gap-4 border-r pr-10">
            <button className="globalShadow bg-[#2386FF] px-6 rounded-full py-1.5 text-white">
              All
            </button>
            <button className=" text-slate-600 px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c]">
              Development
            </button>
            <button className=" text-slate-600 px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c]">
              Digital Marketing
            </button>
            <button className=" text-slate-600 px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c]">
              Cloud And DevOps
            </button>
            <button className=" text-slate-600 px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c]">
              Technology
            </button>
            <button className=" text-slate-600 px-6 rounded-full py-1.5 hover:bg-[#eeeeee8c]">
              Bussiness
            </button>
          </div>
          <div className="bg-gray-100 rounded-full px-4 py-1.5 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
            <input
              type="search"
              placeholder="Search"
              className=" bg-transparent outline-none py-1 text-sm w-[180px]"
            />
          </div>
        </div>
        {/* Cards Starts Here --------- */}
        <div>
          <h1 className=" border-l-4 border-[#2386FF] pl-4 mt-16 mb-8 text-2xl font-semibold">
            Recent Posts:
          </h1>
          <section className=" flex items-center gap-12">
            <div className="w-1/2">
              <Image
                width={400}
                height={400}
                alt="Blog Image Here"
                src={"/images/blog1.png"}
                className=" h-full w-full object-cover"
              ></Image>
            </div>
            <div className="w-1/2">
              <div className=" border-b-4 border-[#2386ffb8]">
                <div className="flex items-center gap-2">
                  <h3 className="  accentColor">Development</h3>
                  <pre className=" text-slate-500">.</pre>
                  <span className="text-slate-600 flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[15px]"></i>2hr ago
                  </span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 leading-[1.2] my-4">
                    Important Features to look for in Web Development Services
                  </h1>
                  <button className="btn flex items-center justify-center gap-2 mb-8 px-5 py-3">
                    Read More
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              {/* sub Blogs 2nd ----------- */}
              <div className=" mt-6 flex items-center gap-4">
                <div className=" w-40">
                  <Image
                    width={300}
                    height={300}
                    alt="Blog Image Here"
                    src={"/images/blog2.png"}
                    className=" h-full w-full object-cover"
                  ></Image>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="  accentColor">Digital Marketing</h3>
                    <pre className=" text-slate-500">.</pre>
                    <span className="text-slate-600 flex items-center gap-1">
                      <i className="fa-regular fa-clock text-[15px]"></i>2hr ago
                    </span>
                  </div>
                  <h1 className=" text-slate-700 text-2xl font-semibold">
                    Digital Marketing in Pakistan: Who to Expect in 2024?
                  </h1>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default BlogCards;
