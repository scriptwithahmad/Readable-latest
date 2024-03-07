import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Page = () => {
  return (
    <>
      <main className="standardWidth px-3 2xl:px-0">
        <div className="my-8 md:my-20">
          <div className="w-[25%] mb-3">
            <Skeleton height={30} count={1} className="flex items-center gap-2">
              <h1 className=" text-slate-600 text-xs md:text-base">Home</h1>
              <pre className=" text-slate-500 text-xs md:text-base">.</pre>
              <span className="accentColor text-xs md:text-base">
                Blogs And News
              </span>
            </Skeleton>
          </div>
          <Skeleton count={2} height={50} width={800}></Skeleton>
          <div className=" w-[30%] mt-3">
            <Skeleton
              count={1}
              height={20}
              className=" text-slate-500 "
            ></Skeleton>
          </div>
          <div className=" w-[20%]">
            <Skeleton
              count={1}
              height={20}
              className=" text-slate-500 "
            ></Skeleton>
          </div>
        </div>
      </main>
      <div className="px-3 2xl:px-0 standardWidth">
        <Skeleton count={1} height={40} width={250} className="mb-4">
          Recent Posts:
        </Skeleton>
        {/* Blog Card --------- */}
        <section className=" flex md:flex-row flex-col items-center gap-5 lg:gap-12">
          <Skeleton
            count={1}
            height={500}
            width={700}
            className="lg:w-1/2 lg:h-[450px]  h-[260px] w-full md:w-[300px]"
          >
            <img
              src=""
              alt="image"
              className="h-full w-full object-cover"
            ></img>
          </Skeleton>
          <div className=" w-full md:w-1/2 lineOfContent">
            <div>
              <Skeleton
                height={20}
                count={1}
                width={100}
                className="flex items-center gap-2"
              >
                <h2 className="">Tech</h2>
              </Skeleton>
              <div className="my-3">
                <Skeleton height={40} count={1} width={400} className="mt-0">
                  Title Here
                </Skeleton>
                <Skeleton height={40} count={1} width={200} className="mt-0">
                  Title Here
                </Skeleton>

                <Skeleton
                  count={1}
                  width={120}
                  height={30}
                  className="my-4 px-4 py-1.5"
                >
                  Read More
                </Skeleton>
              </div>
            </div>

            <div className=" mt-4 lg:mt-6 flex items-center justify-cente gap-4">
              <Skeleton
                count={1}
                height={160}
                width={200}
                className=" w-36 md:w-48 lg:w-40"
              ></Skeleton>
              <div>
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <Skeleton count={1} height={10} width={60}>
                    Category
                  </Skeleton>
                </div>
                <Skeleton
                  count={1}
                  height={30}
                  width={160}
                  className="line-clamp-2 text-slate-700 hover:text-slate-800 cursor-pointer text-sm md:text-base lg:text-2xl font-semibold"
                >
                  Populate Method Title
                </Skeleton>
                <Skeleton
                  count={1}
                  height={20}
                  width={60}
                  className="my-2 px-3 py-1"
                >
                  Read More
                </Skeleton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
