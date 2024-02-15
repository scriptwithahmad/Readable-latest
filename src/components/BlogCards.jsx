import { format, render, cancel, register } from "timeago.js";

// Fetch Blog Data here ---------------
async function getData() {
  const res = await fetch("http://localhost:3000/api/blog");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
// Fetch Blog Category ----------------
async function getCatgoryData() {
  const res = await fetch("http://localhost:3000/api/category");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const BlogCards = async () => {
  const data = await getData();
  // console.log(data.message.data);
  const category = await getCatgoryData();
  const total = category?.getcat?.length;

  return (
    <>
      <main className="standardWidth px-3 lg:px-0">
        {/* Tabs --------- */}
        <div className="flex md:flex-row flex-col items-center justify-between gap-2 bg-[#FFFFFF] rounded-2xl md:rounded-full py-2 md:py-4 px-2 md:px-6 overflow-hidden">
          <div className="heroFilterSection flex items-center gap-1 md:gap-4 border-none md:border-r px-3 pt-3 md:pr-10 w-full md:overflow-x-visible overflow-x-auto pb-4">
            {category?.getcat?.map((data, index) => {
              return (
                <button
                  key={index}
                  style={{
                    color: data?.name == "All" ? "#fff" : null,
                    background: data?.name == "All" ? "#2386FF" : null,
                    boxShadow: data?.name == "All" ? "globalShadow" : "none",
                  }}
                  className={` hover:bg-[#eeeeee8c] text-slate-500 whitespace-nowrap px-2.5 md:px-6 rounded-full py-1.5 text-xs md:text-base`}
                >
                  {data?.name == "All" ? (
                    <div className="flex items-center gap-1">
                      <h2>{data?.name}</h2>
                      <span className=" h-5 w-5 flex items-center justify-center  bg-white text-xs text-blue-500 rounded-full">
                        {total}
                      </span>
                    </div>
                  ) : (
                    data?.name
                  )}
                </button>
              );
            })}
          </div>
          <div className="bg-gray-100 rounded-full px-4 my-2 py-1.5 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
            <input
              type="search"
              placeholder="Search"
              className=" bg-transparent outline-none py-1 text-sm w-[180px]"
            />
          </div>
        </div>

        {/* Cards Starts Here --------- */}
        <div className="px-3 lg:px-0">
          <h1 className="border-l-4 border-[#2386FF] pl-4 mt-16 mb-8 text-2xl font-semibold">
            Recent Posts:
          </h1>
          {data?.message?.data?.slice(0, 1).map((v, i) => {
            return (
              <section
                key={i}
                className=" flex md:flex-row flex-col items-center gap-5 lg:gap-12"
              >
                <div className="lg:w-1/2 lg:h-[450px]  h-[260px] w-full md:w-[300px]">
                  <img
                    src={v?.featuredImage?.url}
                    alt={v?.featuredImage?.altText}
                    className="h-full w-full object-cover"
                  ></img>
                </div>
                <div className=" w-full md:w-1/2">
                  <div className=" border-b-2 lg:border-b-4 border-[#2386ffb8]">
                    <div className="flex items-center gap-2 text-sm lg:text-base">
                      <h3 className="  accentColor">{v?.category}</h3>
                      <pre className=" text-slate-500">.</pre>
                      <span className="text-slate-500 flex items-center gap-1">
                        <i className="fa-regular fa-clock lg:text-[15px]"></i>
                        {format(new Date(v.createdAt), "en_US")}
                      </span>
                    </div>
                    <div>
                      <h1 className="globalBlogCardText font-bold text-gray-800 leading-[1.2] my-2 lg:my-4">
                        {v?.title}
                      </h1>
                      <button className="btn flex items-center justify-center gap-2 mb-3 lg:mb-8 px-3 text-sm lg:test-base lg:px-5 py-1.5 lg:py-3">
                        Read More
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                  {/* Sub DIv Here -------- */}
                  <div className=" mt-4 lg:mt-6 flex items-center justify-cente gap-4">
                    <div className=" w-36 md:w-48 lg:w-40">
                      <img
                        className=" h-full w-full object-cover"
                        src={data?.message?.data[1]?.featuredImage?.url}
                        alt={data?.message?.data[1]?.featuredImage?.altText}
                      ></img>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 lg:mb-2">
                        <h3 className="accentColor text-[11px] lg:text-sm">
                          {data?.message?.data[1]?.category}
                        </h3>
                        <pre className=" text-slate-400  text-[11px] lg:text-sm">
                          -
                        </pre>
                        <span className="text-slate-500 flex items-center gap-1  text-[11px] lg:text-sm">
                          <i className="fa-regular fa-clock  text-[11px] lg:text-sm"></i>
                          {format(
                            new Date(data?.message?.data[1]?.createdAt),
                            "en_US"
                          )}
                        </span>
                      </div>
                      <h1 className="line-clamp-2 text-slate-700 text-sm md:text-base lg:text-2xl font-semibold">
                        {data?.message?.data[1]?.title}
                      </h1>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default BlogCards;
