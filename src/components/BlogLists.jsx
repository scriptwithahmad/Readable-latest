import Link from "next/link";
import BlogCard from "./BlogCard";
import { format } from "timeago.js";

// Fetch All Blogs
async function getData() {
  const res = await fetch(process.env.HOSTING_URL + "/api/get-blogs", {
    cache: "no-store",
  });

  return res.json();
}

// Fetch All Categories
async function getCategories() {
  const res = await fetch("https://readable-blogging.vercel.app/api/category");

  return res.json();
}

const BlogLists = async () => {
  const data = await getData();
  console.log(data);
  const total = data?.message?.count;
  const categories = await getCategories();

  // Function to calculate reading time based on number of words
  const calculateReadingTime = (desc) => {
    const words = desc.split(/\s+/).filter((word) => word !== "");
    const wordCount = words.length;
    const averageReadingSpeed = 500; // Adjust this value as needed
    const readingTime = Math.ceil(wordCount / averageReadingSpeed);
    return readingTime;
  };

  return (
    <>
      {/* seraching Tabs ------------------------------------------------- */}
      <div className="standardWidth px-3 2xl:px-0">
        <div className="my-8 flex lg:flex-row flex-col items-center justify-between gap-2 bg-[#f5f5f5] rounded-2xl md:rounded-full py-2 md:py-4 px-2 md:px-6 overflow-hidden">
          <div className="heroFilterSection flex items-center gap-1 md:gap-4 border-none md:border-r px-0 md:px-3 pt-3 md:pr-10 w-full lg:w-[75%] 2xl:overflow-x-visible overflow-x-auto pb-4">
            {categories?.getcat?.map((data, index) => {
              return (
                <button
                  key={index}
                  style={{
                    color: data?.name == "All" ? "#fff" : null,
                    background: data?.name == "All" ? "#2386FF" : null,
                    boxShadow: data?.name == "All" ? "globalShadow" : "none",
                  }}
                  className="hover:bg-[#eeeeee8c] text-slate-500 whitespace-nowrap px-2.5 md:px-6 rounded-full py-1.5 text-xs md:text-base"
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
          <div className="bg-white rounded-full px-4 my-2 py-1.5 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
            <input
              type="search"
              // name="keyword"
              // value={filterByName.keyword}
              // onChange={searchInputHanler}
              placeholder="eg: Blog, Category..."
              className="bg-transparent outline-none py-1 text-sm w-[180px]"
            />
          </div>
        </div>
      </div>

      <BlogCard />

      {/* BLog Card ends ------------------------------------------------- */}

      <div className="standardWidth px-3 2xl:px-0">
        <h1 className=" border-l-4 border-[#2386FF] pl-4 mt-24 mb-8 text-2xl font-semibold">
          Must Read Articles :
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Map Here ------ */}
          {data?.message?.data?.map((v, i) => {
            const readingTimes = calculateReadingTime(v.desc);
            return (
              <div key={i}>
                <Link href={`/blog/${v.slug}`}>
                  <div className="w-full h-[320px]">
                    <img
                      src={v?.featuredImage?.url}
                      alt={v?.featuredImage?.altText}
                      className=" h-full w-full object-cover"
                    ></img>
                  </div>
                </Link>
                <div className="border-b-4 pb-1 border-[#2386ff6d]">
                  <div className="flex gap-2 items-center justify-between mt-3 relative">
                    <div className="flex items-center gap-2 peer">
                      <img
                        src={v?.author?.photo}
                        alt="author image here"
                        className="h-6 w-6 rounded-full object-cover peer"
                      />
                      <h3 className="text-gray-700 text-sm">
                        {v?.author?.fullName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 justify-between text-xs text-gray-500">
                      <h3>{v?.category}</h3>
                      <span>--</span>
                      <h3 className="text-slate-500 text-xs">
                        {format(new Date(v.createdAt), "en_US")}
                      </h3>
                    </div>
                    {/* Hovered Main Div ------------------------ */}
                    <div className="globalShadow2 min-w-48 px-3 py-4 rounded-lg z-10 absolute top-4 left-4 opacity-0 hidden peer-hover:block peer-hover:opacity-100 peer-hover:text-red-500 peer-hover:bg-white transition-all">
                      <div className="mb-4 flex items-center gap-2">
                        <img
                          alt="img alt"
                          src={v?.author?.photo}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <h2 className="text-lg font-medium text-slate-700 whitespace-nowrap">
                          {v?.author?.fullName}
                        </h2>
                      </div>
                      <Link
                        href={`/profile/${v?.author?._id}`}
                        className="rounded text-center inline-block w-full bg-indigo-500 px-4 py-1 text-sm text-white hover:bg-indigo-600"
                      >
                        Profile
                      </Link>
                      <div className="mt-2">
                        <span className="text-xs text-slate-500">JOIN</span>
                        <h2 className="text-sm font-medium text-slate-700">
                          {format(new Date(v?.author?.createdAt), "en_US")}
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-between mt-3">
                
                  </div> */}
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
                    <div className="flex items-center justify-between my-4 text-sm">
                      <Link href={`/blog/${v.slug}`}>
                        <button className="flex items-center justify-center gap-2 text-gray-600 hover:text-indigo-700 transition-all">
                          Read More
                        </button>
                      </Link>
                      <p className="text-gray-600">{readingTimes} min read</p>
                    </div>
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
