import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";
import { format } from "timeago.js";
import Comment from "@/components/Comment";
import RecentBlogs from "@/components/RecentBlogs";
import BlogListLoader from "@/components/BlogListLoader";
import RecentBlogLoader from "@/components/RecentBlogLoader";
import LikePost from "@/components/LikePost";
import Follow from "@/components/Follow";

const getSingleBlog = async (slug) => {
  const { data } = await axios.get(
    `https://readable-blogging.vercel.app/api/get-blogs/${slug}`
  );

  return data.singleBlog;
};

const colors = [
  "orange",
  "purple",
  "green",
  "red",
  "blue",
  "orange",
  "purple",
  "green",
  "cyan",
  "blue",
];

const page = async ({ params }) => {
  const getUserRelatedPosts = async () => {
    const res = await fetch(
      `https://readable-blogging.vercel.app/api/user-posts/?id=${userID}`
    );

    return res.json();
  };

  const blog = await getSingleBlog(params.slug);
  const blogID = blog?._id;
  const userID = blog?.author?._id;
  const postlikes = blog?.likes;
  const userRealatedData = await getUserRelatedPosts();

  // Function to calculate reading time based on number of words
  const calculateReadingTime = (content) => {
    const words = content.split(/\s+/).filter((word) => word !== "");
    const wordCount = words.length;
    const averageReadingSpeed = 500; // Adjust this value as needed
    const readingTime = Math.ceil(wordCount / averageReadingSpeed);
    return readingTime;
  };

  // Calculate reading time for the current blog post
  const readingTime = calculateReadingTime(blog?.desc);

  return (
    <>
      {/* Single Page Here ---------------------------------- */}
      <div className=" max-w-[800px] m-auto py-4 px-3 2xl:px-0 my-4 border-b pb-4">
        <h1 className=" text-3xl md:text-4xl  font-bold text-gray-800 leading-[1.2] my-2 lg:my-4">
          {blog?.title}
        </h1>
        {/* Tags here ----------- */}
        <div className="flex gap-x-3 gap-y-2 flex-wrap my-4 md:my-0">
          {blog?.tags?.map((tag, i) => (
            <div
              key={i}
              className={`md:px-3 md:py-1 px-2 py-1 rounded flex items-center hover:bg-purple-50 cursor-pointer `}
            >
              <span className={`text-${colors[i % colors.length]}-500 text-sm`}>
                #
              </span>
              <h2 className="text-sm">{tag}</h2>
            </div>
          ))}
        </div>

        {/* Author Here ---------------------------- */}
        <div className=" flex items-center gap-2 my-8">
          <div className="h-12 w-12 rounded-full hover:ring-[4px] hover:ring-gray-200 cursor-pointer">
            <Link href={`/profile/${userID}`}>
              <img
                alt="Image here"
                className="h-full w-full object-cover rounded-full border border-gray-100"
                src={
                  blog?.author?.photo ||
                  "https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg"
                }
              />
            </Link>
          </div>
          <div>
            <Link
              className="flex items-center gap-2"
              href={`/profile/${userID}`}
            >
              <h3 className="text-sm text-gray-800 font-medium">
                {blog?.author?.fullName}
              </h3>{" "}
              <span className="text-gray-500">·</span>
              <span className="text-xs text-gray-500">{blog.category}</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {format(new Date(blog.createdAt), "en_US")}
              </span>
              <span className="text-gray-500">·</span>
              <p className="text-xs text-gray-500">{readingTime} min read</p>
            </div>
          </div>
        </div>

        <LikePost blogID={blogID} postlikes={postlikes} />

        <div className="w-full h-56 md:h-[500px] mt-8">
          <img
            alt="image here"
            src={blog.featuredImage.url}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Description ------------------------------ */}
        <div className="my-8">
          <main
            dangerouslySetInnerHTML={{ __html: blog?.desc }}
            className="mt-2 text-gray-500 leading-[1.5]"
          ></main>
        </div>
      </div>

      {/* Follow Buton */}
      <Follow blog={blog} userRealatedData={userRealatedData} />

      <div id="comment">
        <Comment blogID={blog?._id} />
      </div>

      {/* Recent Blogs -------------------------------------- */}
      <Suspense fallback={<RecentBlogLoader />}>
        <RecentBlogs />
      </Suspense>
    </>
  );
};

export default page;
