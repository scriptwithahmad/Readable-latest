import axios from "axios";
import { Nunito } from "next/font/google";
import { format } from "timeago.js";

const nunito = Nunito({
  subsets: ["latin"],
});

const Page = async ({ params }) => {
  const getSingleUser = async () => {
    const { data } = await axios.get(
      `https://readable-blogging.vercel.app/api/single-user?id=${params?.slug}`
    );
    return data;
  };

  // const userDetail = await getUserProfile();
  const userDetail = await getSingleUser();

  const userPostsNum = userDetail?.foundPosts.length;

  return (
    <>
      {/* Backgorund Image */}
      <div className="h-36">
        <img
          alt="profile main Image"
          className="h-full w-full object-cover object-top"
          src="https://static.vecteezy.com/system/resources/previews/020/882/557/original/landscape-mountains-sunrise-background-landscape-illustration-with-orange-gradient-color-vector.jpg"
        />
      </div>

      <div className="bg-[#fff] border border-dotted globalShadow3 -translate-y-12 rounded-lg max-w-[1100px] lg:m-auto mx-4">
        <div className="flex items-center justify-center">
          <img
            alt="user profile"
            className="w-32 h-32 object-cover border-[8px] border-[#FAB85C] rounded-full -translate-y-12"
            src={
              userDetail?.singleUser?.photo ||
              "https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1320336%2Fc601d462-6b3a-47ac-b0ae-889c5fc913d1.png"
            }
          />
        </div>
        <div className="flex items-center justify-center flex-col px-8 -translate-y-4">
          <h1
            className={`${nunito.className} mb-2 text-2xl font-bold text-slate-700`}
          >
            {userDetail?.singleUser?.fullName}
          </h1>
          <p className="text-center my-2 text-sm leading-6 text-slate-500">
            {userDetail?.singleUser?.bio}
          </p>
          <div className="flex items-center md:flex-row flex-col gap-2 md:gap-4 p-4 w-full justify-center">
            {userDetail?.singleUser?.location ? (
              <div className="flex items-center gap-2 text-slate-700">
                <i className="fa-solid fa-location-dot text-sm text-slate-500"></i>
                <h2 className=" text-sm">{userDetail?.singleUser?.location}</h2>
              </div>
            ) : null}
            <div className="flex items-center gap-2 text-slate-700">
              <i className="fa-solid fa-location-dot text-sm text-slate-500"></i>
              <h2 className="text-sm">{userDetail?.singleUser?.email}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Post div */}
      <div className="grid lg:grid-cols-3 md:grid-cols-3 max-w-[1100px] lg:m-auto mx-4 gap-5 -translate-y-7">
        <div className="lg:col-span-1 md:col-span-1 text-sm rounded-lg h-fit">
          <div className="globalShadow3 bg-white px-3 py-4 mb-5 rounded-lg">
            <div className="flex items-center gap-2 mb-2 hover:bg-indigo-100 text-gray-500 hover:text-indigo-500 rounded-md p-2 cursor-pointer transition-all">
              <i className="fa-solid fa-book-open-reader"></i>
              <p>{userPostsNum} posts published</p>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-indigo-100 text-gray-500 hover:text-indigo-500 rounded-md cursor-pointer transition-all">
              <i className="fa-solid fa-comments"></i>
              <p>3 comments written</p>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-indigo-100 text-gray-500 hover:text-indigo-500 rounded-md cursor-pointer transition-all">
              <i className="fa-solid fa-hashtag"></i>
              <p>18 tags followed</p>
            </div>
          </div>
          {userDetail?.singleUser?.skills &&
            userDetail.singleUser.skills.length > 0 && (
              <div className="globalShadow3 bg-white px-3 py-4 rounded-lg">
                <h2 className="text-gray-600 text-lg font-semibold border-b mb-2 pb-2">
                  Skill & Languages
                </h2>
                <p className="text-gray-500 text-sm leading-[1.6]">
                  {/* Display the skills here */}
                  {userDetail?.singleUser?.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </p>
              </div>
            )}
        </div>

        <div className="lg:col-span-2 md:col-span-2 globalShadow3 py-4 rounded-lg">
          <div className=" flex items-center gap-3 border-b-2 pb-2 mx-4">
            <span className=" text-indigo-500 font-medium relative">
              Your Blogs
              <span className=" before:-bottom-[10px] before:left-0 before:absolute before:h-0.5 before:w-full before:bg-indigo-400 before:rounded-full"></span>
            </span>
            <span className="text-slate-500 relative">Comments</span>
          </div>
          {/* Blog Listed */}
          <div className="py-6">
            <table className="text-sm w-full text-left text-gray-500">
              <tbody>
                {userPostsNum > 0 ? (
                  userDetail?.foundPosts?.map((v, i) => (
                    <tr
                      key={i}
                      className="bg-white hover:bg-gray-50 border-b pb-2 border-gray-100"
                    >
                      <td className="py-3 px-4">
                        <span className="whitespace-nowrap text-xs">
                          {format(new Date(v.createdAt), "en_US")}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <h2 className="text-sm line-clamp-1">{v?.title}</h2>
                      </td>
                      <td className="px-3 pr-4">
                        <h2 className="px-3 py-1 whitespace-nowrap text-xs w-fit rounded-full bg-indigo-50 text-indigo-500">
                          {v?.category}
                        </h2>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-3 text-center">
                      Blog not posted yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
