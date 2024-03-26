import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <>
      {/* Single Page Here ---------------------------------- */}
      <div className=" max-w-[800px] m-auto py-4 px-3 2xl:px-0 my-4 border-b pb-4">
        <Skeleton height={40} count={2} className=" my-1 mb-2">
          Title Here
        </Skeleton>
        <Skeleton height={40} width={500} className=" my-1 mb-8">
          Title Here
        </Skeleton>
        {/* Tags here ----------- */}
        <div className="flex gap-x-3 gap-y-2 flex-wrap my-4 md:my-0 mt-8">
          <Skeleton
            width={90}
            className={`md:px-3 md:py-1 px-2 py-1`}
          ></Skeleton>
          <Skeleton
            width={90}
            className={`md:px-3 md:py-1 px-2 py-1`}
          ></Skeleton>
          <Skeleton
            width={90}
            className={`md:px-3 md:py-1 px-2 py-1`}
          ></Skeleton>
          <Skeleton
            width={90}
            className={`md:px-3 md:py-1 px-2 py-1`}
          ></Skeleton>
        </div>

        {/* Author Here ---------------------------- */}
        <div className=" flex items-center gap-3 my-8">
          <div className="h-12 w-12 rounded-full">
            <Link href={`#`}>
              <Skeleton
                alt="Image here"
                className="h-full w-full rounded-full"
                src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg"
              />
            </Link>
          </div>
          <div>
            <Link className="flex items-center gap-2" href={`#`}>
              <Skeleton width={100} className="text-sm">
                ahmad
              </Skeleton>
              <Skeleton width={2} height={2} className="text-gray-500">
                ·
              </Skeleton>
              <Skeleton width={60} className="text-xs text-gray-500">
                Develpment
              </Skeleton>
            </Link>
            <div className="flex items-center gap-3">
              <Skeleton width={70} className="text-xs text-gray-500">
                14 hour ago
              </Skeleton>
              <Skeleton width={2} height={2} className="text-gray-500">
                ·
              </Skeleton>
              <Skeleton width={50} className="text-xs text-gray-500">
                4 min read
              </Skeleton>
            </div>
          </div>
        </div>

        {/* Actions, share, like and much more ----------- */}
        <div className="border-y py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton width={80} className="flex items-center gap-2 text-sm">
              <i className="text-gray-400"></i>
            </Skeleton>
            <Skeleton width={40} href={"#"}>
              <i className="text-gray-400 cursor-pointer text-sm"></i>
            </Skeleton>
          </div>
          <div className="flex items-center gap-5">
            <Skeleton width={30} className="text-gray-500"></Skeleton>
            <Skeleton width={30} className="text-gray-500"></Skeleton>
            <Skeleton width={30} className="text-gray-500"></Skeleton>
            <Skeleton width={30} className="text-gray-500"></Skeleton>
          </div>
        </div>

        <div className="w-full h-56 md:h-[500px] mt-8 mb-4">
          <Skeleton
            src={""}
            alt="image here"
            className=" w-full h-full object-cover"
          />
        </div>
        {/* Description ------------------------------ */}
        <Skeleton count={4} height={20} className=" mt-3">
          <main className="mt-2 text-gray-500 leading-[1.5]"></main>
        </Skeleton>
        <Skeleton count={1} width={500} height={20} className=" mt-3">
          <main className="mt-2 text-gray-500 leading-[1.5]"></main>
        </Skeleton>
      </div>
    </>
  );
};

export default loading;
