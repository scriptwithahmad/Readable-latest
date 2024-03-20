import axios from "axios";
import Comment from "@/components/Comment";
import { Suspense } from "react";
import Link from "next/link";

// import RelatedUserPosts from "@/components/RelatedUserPosts";
// import RecentBlogs from "@/components/RecentBlogs";

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
  console.log(userRealatedData?.foundPosts);

  return (
    <>
      {/* Single Page Here ---------------------------------- */}
      <Suspense fallback={<h1>Loading......</h1>}>
        <div className=" max-w-[800px] m-auto py-4 px-3 2xl:px-0 my-4 border-b pb-4">
          <h1 className=" text-3xl md:text-4xl  font-bold text-gray-800 leading-[1.2] my-2 lg:my-4">
            {blog?.title}
          </h1>

          <div className="flex gap-x-3 gap-y-2 flex-wrap my-4 md:my-0">
            {blog?.tags?.map((tag, i) => (
              <div
                key={i}
                className={`px-3 py-1 rounded flex items-center hover:bg-purple-50 cursor-pointer `}
              >
                <span
                  className={`text-${colors[i % colors.length]}-500 text-sm`}
                >
                  #
                </span>
                <h2 className="text-sm">{tag}</h2>
              </div>
            ))}
          </div>

          {/* Author Here ---------------------------- */}
          <div className=" flex items-center gap-2 my-8">
            <div className=" h-12 w-12 rounded-full">
              <img
                alt="Image here"
                className="h-full w-full object-cover rounded-full border border-gray-100"
                src={
                  blog?.author?.photo ||
                  "https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg"
                }
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-700 font-bold">
                {blog?.author?.fullName}
              </h3>
              <span className="text-xs text-gray-600">{blog.category}</span>
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
          <div className=" my-8">
            <main
              dangerouslySetInnerHTML={{ __html: blog?.desc }}
              className="mt-2 text-gray-500 leading-[1.5]"
            ></main>
          </div>
        </div>
      </Suspense>

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aut
            ipsa error nihil cumque, a adipisci explicabo itaque id. Tenetur,
            maiores reprehenderit! Assumenda voluptates porro in accusantium
            atque pariatur libero?
          </p>
          <Link
            href={"#"}
            className="text-white bg-gray-700 px-4 py-1.5 rounded-full"
          >
            Profile
          </Link>
        </div>
        <div className="max-w-[800px] m-auto px-3 md:px-0 py-6">
          <h1 className="text-gray-700 font-semibold">
            More from fatfish and JavaScript in Plain English
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {userRealatedData?.foundPosts.map((v, i) => {
              return (
                <div key={i}>
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className="object-cover h-52 w-full"
                  />
                  <div className="flex gap-2 items-center my-3">
                    <img
                      src={v?.author?.photo}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h2 className="text-gray-600 text-sm font-semibold">
                      {v?.author?.fullName}
                    </h2>
                  </div>
                  <h2 className="font-semibold text-[18px] text-gray-700 line-clamp-2 hover:text-gray-800 cursor-pointer">
                    {v.title}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Comment blogID={blog?._id} />

      {/* Recent Blogs -------------------------------------- */}
      {/* <RecentBlogs /> */}
    </>
  );
};

export default page;
