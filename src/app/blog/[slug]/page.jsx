import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";
import { format } from "timeago.js";
import Comment from "@/components/Comment";
import RecentBlogs from "@/components/RecentBlogs";
import BlogListLoader from "@/components/BlogListLoader";
import RecentBlogLoader from "@/components/RecentBlogLoader";

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
  "orange",
  "purple",
  "green",
  "cyan",
];

const page = async ({ params }) => {
  const getUserRelatedPosts = async () => {
    const res = await fetch(
      `https://readable-blogging.vercel.app/api/user-posts/?id=${userID}`
    );

    return res.json();
  };

  const blog = await getSingleBlog(params.slug);
  const userID = blog?.author?._id;

  const userRealatedData = await getUserRelatedPosts();
  const postLength = userRealatedData?.foundPosts.length;

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

        {/* Actions, share, like and much more ----------- */}
        <div className="border-y py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <i className="fa-solid fa-hands-clapping text-gray-400"></i>
              <span className="text-gray-700">10</span>
            </div>
            <i id="comment" className="fa-solid fa-comment text-gray-400 cursor-pointer text-sm"></i>
          </div>
          <div>
          <i class="fa-solid fa-ellipsis text-gray-400 hover:text-gray-500 cursor-pointer"></i>
          </div>
        </div>

        <div className="w-full h-56 md:h-[500px] mt-8">
          <img
            alt="image here"
            src={blog.featuredImage.url}
            className=" w-full h-full object-cover"
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

      {/* Related Posts For User --------------------------- */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-[800px] m-auto px-3 md:px-0 border-b pb-8">
          <img
            alt="image here"
            className="h-[70px] w-[70px] rounded-full object-cover mb-4"
            src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1709715982/blog-image/download_yofegq.jpg"
          />
          <h1 className="text-gray-700 font-semibold text-lg mb-2">
            Written By {userRealatedData?.foundPosts[0]?.author?.fullName}
          </h1>
          <div className="flex items-center gap-3 my-2">
            <span className="text-sm text-gray-600 hover:underline cursor-pointer">
              {postLength} Posts
            </span>
            <span className="text-sm text-gray-600 hover:underline cursor-pointer">
              200 + Likes
            </span>
          </div>
          <p className=" text-sm text-gray-600 mb-6">
            {userRealatedData?.foundPosts[0]?.author?.bio}
          </p>
          <Link
            href={`/profile/${userID}`}
            className="text-white bg-gray-700 px-4 py-1.5 rounded-full hover:bg-gray-800"
          >
            Profile
          </Link>
        </div>
        <div className="max-w-[800px] m-auto px-3 md:px-0 py-6">
          <h1 className="text-gray-700 font-semibold">
            More from {userRealatedData?.foundPosts[0]?.author?.fullName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 border-b pb-4 mb-5">
            {userRealatedData?.foundPosts.slice(0, 4).map((v, i) => {
              return (
                <div key={i}>
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className="object-cover h-52 w-full"
                  />
                  <div className="flex gap-2 items-center justify-between my-3">
                    <div className="flex items-center gap-2">
                      <img
                        alt="avatar"
                        src={v?.author?.photo}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <h2 className="text-gray-600 text-sm font-semibold">
                        {v?.author?.fullName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 justify-between text-xs text-gray-500">
                      <h3>{v?.category}</h3>
                      <span>--</span>
                      <h3 className="text-slate-500 text-xs">
                        {format(new Date(v.createdAt), "en_US")}
                      </h3>
                    </div>
                  </div>
                  <Link href={`/blog/${v.slug}`}>
                    <h1 className="font-bold text-gray-700 line-clamp-1 hover:text-gray-800 cursor-pointer">
                      {v.title}
                    </h1>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-2 my-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat aut ipsa error nihil cumque.
                  </p>
                </div>
              );
            })}
          </div>
          <Link href={`/profile/${userID}`}>
            <button className="border px-5 py-2 rounded-full text-gray-500 text-sm hover:text-gray-600 hover:bg-gray-100">
              See all from {userRealatedData?.foundPosts[0]?.author?.fullName}
            </button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<h1>Loading......</h1>}>
        <Comment blogID={blog?._id} />
      </Suspense>

      {/* Recent Blogs -------------------------------------- */}
      <Suspense fallback={<RecentBlogLoader />}>
        <RecentBlogs />
      </Suspense>
    </>
  );
};

export default page;
