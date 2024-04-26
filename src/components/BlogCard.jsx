import Link from "next/link";
import { Suspense } from "react";
import { format } from "timeago.js";

async function getData() {
  const res = await fetch("https://readable-blogging.vercel.app/api/get-blogs");

  return res.json();
}

const BlogCard = async () => {
  const blogCard = await getData();

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
      {/* BLog Card start here -------------------------------------------------- */}
      <div className="px-3 2xl:px-0 standardWidth">
        <h1 className="border-l-4 border-[#2386FF] pl-4 mt-16 mb-8 text-2xl font-semibold">
          Recent Posts:
        </h1>
        {blogCard?.message?.data?.slice(0, 1).map((v, i) => {
          const readingTimes = calculateReadingTime(v.desc);
          return (
            <section
              key={i}
              className=" flex md:flex-row flex-col items-center gap-5 lg:gap-12"
            >
              <div className="lg:w-1/2 lg:h-[450px] h-[260px] w-full md:w-[300px]">
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
                    <i className=" text-slate-400 not-italic text-lg">✦</i>
                    <span className="text-slate-500 flex items-center gap-1 text-xs md:text-sm">
                      <i className="fa-regular text-gray-400 fa-clock lg:text-[15px]"></i>
                      {format(new Date(v.createdAt), "en_US")}
                    </span>
                    <p className="text-gray-500 text-sm">
                      - {readingTimes} min read
                    </p>
                  </div>
                  <div>
                    <Link href={`/blog/${v.slug}`}>
                      <h1 className="globalBlogCardText overflow-hidden line-clamp-2 hover:text-slate-800 cursor-pointer font-bold text-gray-700 leading-[1.2] mt-2 lg:my-4">
                        {v?.title} aksiek kasdfi sfak
                      </h1>
                    </Link>

                    <Link href={`/blog/${v.slug}`}>
                      <button className="btn flex items-center justify-center gap-2 my-6 px-4 py-1.5">
                        Read More
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className=" mt-4 lg:mt-6 flex items-center justify-cente gap-4">
                  <div className=" w-36 md:w-48 lg:w-96 lg:h-32 h-20">
                    <img
                      className="h-full w-full object-cover"
                      src={blogCard?.message?.data[1]?.featuredImage?.url}
                      alt={blogCard?.message?.data[1]?.featuredImage?.altText}
                    ></img>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 lg:mb-2">
                      <h3 className="accentColor text-[11px] lg:text-sm">
                        {blogCard?.message?.data[1]?.category}
                      </h3>
                      <i className=" text-slate-400 not-italic text-lg">✦</i>
                      <span className="text-slate-500 flex items-center gap-1  text-[11px] lg:text-sm">
                        <i className="fa-regular fa-clock  text-[11px] lg:text-sm"></i>
                        {format(
                          new Date(blogCard?.message?.data[1]?.createdAt),
                          "en_US"
                        )}
                      </span>
                    </div>
                    <Link href={`/blog/${blogCard?.message?.data[1].slug}`}>
                      <h1 className="line-clamp-2 text-slate-700 hover:text-slate-800 cursor-pointer text-sm md:text-base lg:text-2xl font-semibold">
                        {blogCard?.message?.data[1].title}
                      </h1>
                    </Link>
                    <Link href={`/blog/${blogCard?.message?.data[1].slug}`}>
                      <button className="md:text-sm text-xs my-2 py-1 text-gray-500 hover:text-gray-700">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default BlogCard;
