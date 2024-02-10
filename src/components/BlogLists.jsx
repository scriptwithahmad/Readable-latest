import Image from "next/image";

const BlogLists = () => {
  return (
    <>
      <div className="standardWidth">
        <h1 className=" border-l-4 border-[#2386FF] pl-4 mt-24 mb-8 text-2xl font-semibold">
          Must Read Articles :
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 ------ */}
          <div>
            <div className="w-full h-[320px]">
              <Image
                width={400}
                height={400}
                alt="Blog Image Here"
                src={"/images/blog3.png"}
                className=" h-full w-full object-cover"
              ></Image>
            </div>
            <div className=" border-b-4 pb-1 border-[#2386ff6d]">
              <div className="flex items-center justify-between mt-3">
                <h3 className="accentColor text-sm">Development</h3>
                <span className="text-slate-600 flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-clock text-sm"></i>2hr ago
                </span>
              </div>
              <div className="my-2">
                <h1 className="text-2xl font-semibold text-gray-800 leading-[1.2]">
                  Important Features to look for in Web Development Services
                </h1>
                <button className="btn flex items-center justify-center gap-2 my-4 px-4 py-1.5">
                  Read More
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Card 2 ------ */}
          <div>
            <div className="w-full h-[320px]">
              <Image
                width={400}
                height={400}
                alt="Blog Image Here"
                src={"/images/blog2.png"}
                className=" h-full w-full object-cover"
              ></Image>
            </div>
            <div className=" border-b-4 pb-1 border-[#2386ffc2]">
              <div className="flex items-center justify-between mt-3">
                <h3 className="accentColor text-sm">Development</h3>
                <span className="text-slate-600 flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-clock text-sm"></i>2hr ago
                </span>
              </div>
              <div className="my-2">
                <h1 className="text-2xl font-semibold text-gray-800 leading-[1.2]">
                  Important Features to look for in Web Development Services
                </h1>
                <button className="btn flex items-center justify-center gap-2 my-4 px-4 py-1.5">
                  Read More
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Card 3 ------ */}
          <div>
            <div className="w-full h-[320px]">
              <Image
                width={400}
                height={400}
                alt="Blog Image Here"
                src={"/images/blog1.png"}
                className=" h-full w-full object-cover"
              ></Image>
            </div>
            <div className=" border-b-4 pb-1 border-[#2386ff6d]">
              <div className="flex items-center justify-between mt-3">
                <h3 className="accentColor text-sm">Development</h3>
                <span className="text-slate-600 flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-clock text-sm"></i>2hr ago
                </span>
              </div>
              <div className="my-2">
                <h1 className="text-2xl font-semibold text-gray-800 leading-[1.2]">
                  Important Features to look for in Web Development Services
                </h1>
                <button className="btn flex items-center justify-center gap-2 my-4 px-4 py-1.5">
                  Read More
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogLists;
