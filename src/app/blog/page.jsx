import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className=" max-w-[800px] m-auto py-5">
      <h1 className="globalBlogCardText font-bold text-gray-800 leading-[1.2] my-2 lg:my-4">
        How to stream data over HTTP using Node and Fetch API
      </h1>

      {/* Author Here ---------------------------- */}
      <div className=" flex items-center gap-2 my-8">
        <div className=" h-12 w-12 rounded-full">
          <img
            alt="Image here"
            className=" h-full w-full object-cover rounded-full"
            src="https://miro.medium.com/v2/resize:fill:88:88/1*wZUTkEo2bOKA8xyaQI8Bcg.png"
          />
        </div>
        <div>
          <h3 className="text-sm text-gray-700 font-bold">Muhammad Ahmad</h3>
          <span className="text-xs text-gray-600">Education</span>
        </div>
      </div>

      <div className="w-full h-[500px] mt-8">
        <img
          className=" w-full h-full object-cover"
          src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1707829966/blog-image/blog1_sdxzzz.png"
          alt="image here"
        />
      </div>
      {/* Description ------------------------------ */}
      <div className=" my-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eius
          repudiandae possimus quos natus culpa tempora architecto nihil
          consequatur, neque commodi excepturi tempore quisquam molestias
          voluptatum accusantium. Eaque, laudantium nemo?
        </p>
      </div>
    </div>
  );
};

export default page;
