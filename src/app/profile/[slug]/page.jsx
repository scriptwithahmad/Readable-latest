import axios from "axios";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
});

const Page = async ({ params }) => {
  const getSingleUser = async () => {
    const { data } = await axios.get(
      `https://readable-blogging.vercel.app/api/single-user?id=${params?.slug}`
    );
    return data?.foundPosts;
  };

  const getUserProfile = async () => {
    const { data } = await axios.get(
      `https://readable-blogging.vercel.app/api/user-posts?id=${params?.slug}`
    );
    return data?.foundPosts;
  };

  const userDetail = await getUserProfile();
  const singleUser = await getSingleUser();
  console.log(singleUser);
  const userProfilePosts = userDetail?.length;

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

      <div className="bg-white -translate-y-12 rounded-lg max-w-[1000px] m-auto">
        <div className="flex items-center justify-center">
          <img
            alt="user profile"
            className="w-32 h-32 object-cover border-[8px] border-[#FAB85C] rounded-full -translate-y-12"
            src={
              userDetail[0]?.author?.photo ||
              "https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1320336%2Fc601d462-6b3a-47ac-b0ae-889c5fc913d1.png"
            }
          />
        </div>
        <div className="flex items-center justify-center flex-col px-8 -translate-y-4">
          <h1
            className={`${nunito.className} mb-2 text-2xl font-bold text-slate-700`}
          >
            {userDetail[0]?.author?.fullName}
          </h1>
          <p className="text-center my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ad iure
            architecto voluptate in. Placeat laboriosam quo nihil dolorum at
            corporis.
          </p>
          <div className="flex items-center gap-4 p-4 w-full justify-center">
            <div className="flex items-center gap-2 text-slate-700">
              <i className="fa-solid fa-location-dot text-sm"></i>
              <h2 className=" text-sm">Faisalabad Punjab, Pakistan</h2>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <i className="fa-solid fa-location-dot text-sm"></i>
              <h2 className=" text-sm">{userDetail[0]?.author?.email}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Post div */}
      <div className="grid grid-cols-3 max-w-[1000px] m-auto gap-5 -translate-y-7">
        <div className="col-span-1 bg-white p-5 text-sm rounded-lg">
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <i className="fa-solid fa-location-dot text-gray-500"></i>
            <p>{userProfilePosts} posts published</p>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <i className="fa-solid fa-comment text-gray-500"></i>
            <p>3 comments written</p>
          </div>
        </div>
        <div className="col-span-2 bg-white p-4 rounded-lg">
          <h1>card 2</h1>
        </div>
      </div>
    </>
  );
};

export default Page;
