import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <div className="standardWidth px-3 2xl:px-0">
      <div className=" w-[25%]">
        <Skeleton height={40} count={1} className="pl-4 mt-24 mb-8">
          Must Read Articles :
        </Skeleton>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Map Here ------ */}
        {[1, 2, 3].map((v, i) => {
          return (
            <div key={i} className="w-full h-[320px]">
              <Skeleton className="w-full h-[320px]">
                <img
                  src={
                    "https://res.cloudinary.com/dmyrswz0r/image/upload/v1709034147/blog-image/gitness_tjqite.png"
                  }
                  alt="image here"
                  className=" h-full w-full object-cover"
                ></img>
              </Skeleton>

              <div className="pb-1 h-28">
                <div className="flex items-center justify-between mt-3">
                  <div className=" w-[30%]">
                    <Skeleton
                      height={20}
                      count={1}
                      className="accentColor text-sm"
                    >
                      Technology
                    </Skeleton>
                  </div>
                </div>

                <div className="my-2">
                  <Skeleton
                    count={1}
                    height={40}
                    className="text-2xl line-clamp-1 font-semibold text-gray-700 leading-[1.2] hover:text-[#146ad3] cursor-pointer"
                  >
                    Using Clerk to authenticate users in...
                  </Skeleton>

                  <Skeleton
                    height={20}
                    count={2}
                    className="text-sm mt-2 text-gray-500 line-clamp-2"
                  >
                    In this short guide you will learn how to set up an Encore
                    auth handler that makes use of Clerk in order to add an
                    integrated
                  </Skeleton>

                  <div className=" w-[35%]">
                    <Skeleton
                      height={20}
                      count={1}
                      className="my-4 px-4 py-1.5"
                    >
                      Read More
                    </Skeleton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default loading;
