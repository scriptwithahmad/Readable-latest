import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <>
      <div className="max-w-[800px] m-auto px-3 2xl:px-0">
        <Skeleton height={40} count={1} className="pl-4 mt-24 mb-8 w-fit">
          Must Read Articles :
        </Skeleton>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Map Here ------ */}
          {[1, 2, 3].map((v, i) => {
            return (
              <div key={i}>
                <div className="w-full h-[180px]">
                  <Skeleton className="w-full h-[250px]">
                    <img
                      src={
                        "https://res.cloudinary.com/dmyrswz0r/image/upload/v1709034147/blog-image/gitness_tjqite.png"
                      }
                      alt="image here"
                      className=" h-full w-full object-cover"
                    ></img>
                  </Skeleton>
                </div>
                <div className="">
                  <Skeleton className="mt-20 w-[40%]" width={100}>
                    <h1 className="text-lg my-2 line-clamp-2 font-semibold text-gray-700 leading-[1.4] hover:text-gray-800 cursor-pointer">
                      {v?.title}
                    </h1>
                    <Skeleton className="text-sm text-gray-500 line-clamp-2"></Skeleton>
                  </Skeleton>
                  <Skeleton className="mt-2" height={30}>
                    <h1 className="text-lg my-2 line-clamp-2 font-semibold text-gray-700 leading-[1.4] hover:text-gray-800 cursor-pointer">
                      {v?.title}
                    </h1>
                    <Skeleton className="text-sm text-gray-500 line-clamp-2"></Skeleton>
                  </Skeleton>
                  <Skeleton className="mt-2" width={100}>
                    <h1 className="text-lg my-2 line-clamp-2 font-semibold text-gray-700 leading-[1.4] hover:text-gray-800 cursor-pointer">
                      {v?.title}
                    </h1>
                    <Skeleton className="text-sm text-gray-500 line-clamp-2"></Skeleton>
                  </Skeleton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Loading;
