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
              <img
                alt="Blog Image Here"
                src="https://img.freepik.com/premium-vector/time-management-paperwork-deadline-working-efficient-organization-3d-icon-realistic-vector_92753-13405.jpg?w=740"
                className=" h-full w-full object-cover"
              ></img>
            </div>
            <div className=" border-b-4 pb-1 border-[#2386ff6d]">
              <div className="flex items-center justify-between mt-3">
                <h3 className="accentColor text-sm">Development</h3>
                <span className="text-slate-600 flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-clock text-sm"></i>2hr ago
                </span>
              </div>
              <div className="my-2">
                <h1 className="text-2xl font-semibold text-gray-700 leading-[1.2] hover:text-[#146ad3] cursor-pointer">
                  Important Features to look for in Web Development Services
                </h1>
                <p className="text-sm mt-2 text-gray-500 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, alias? Minus ex quisquam dignissimos obcaecati.
                </p>
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
              <img
                alt="Blog Image Here"
                src="https://media.licdn.com/dms/image/sync/D4D27AQFk6_cet1g0Uw/articleshare-shrink_800/0/1706816792180?e=1708174800&v=beta&t=J3EV-I5IesSg_JG-bbbeckyITYKn56d8ogEDerPU_hc"
                className=" h-full w-full object-cover"
              ></img>
            </div>
            <div className=" border-b-4 pb-1 border-[#2386ff6d]">
              <div className="flex items-center justify-between mt-3">
                <h3 className="accentColor text-sm">Technology</h3>
                <span className="text-slate-600 flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-clock text-sm"></i>2hr ago
                </span>
              </div>
              <div className="my-2">
                <h1 className="text-2xl font-semibold text-gray-700 leading-[1.2] hover:text-[#146ad3] cursor-pointer">
                  Important Features to look for in Web Development Services
                </h1>
                <p className="text-sm mt-2 text-gray-500 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, alias? Minus ex quisquam dignissimos obcaecati.
                </p>
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
              <img
                alt="Blog Image Here"
                src="https://img.freepik.com/premium-vector/time-management-paperwork-deadline-working-efficient-organization-3d-icon-realistic-vector_92753-13405.jpg?w=740"
                className=" h-full w-full object-cover"
              ></img>
            </div>
            <div className=" border-b-4 pb-1 border-[#2386ffc2]">
              <div className="flex items-center justify-between mt-3">
                <h3 className="accentColor text-sm">Data Science / DevOps</h3>
                <span className="text-slate-600 flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-clock text-sm"></i>2hr ago
                </span>
              </div>
              <div className="my-2">
                <h1 className="text-2xl font-semibold text-gray-700 leading-[1.2] hover:text-[#146ad3] cursor-pointer">
                  Important Features to look for in Web Development Services
                </h1>
                <p className="text-sm mt-2 text-gray-500 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, alias? Minus ex quisquam dignissimos obcaecati.
                </p>
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
