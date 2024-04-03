import Link from "next/link";
import React from "react";

const JsonData = [
  {
    author: "M Ahmad",
    title: "Interviewer: Can sessionStorage Share Data Between Multiple Tabs?",
    url: "https://miro.medium.com/v2/resize:fit:679/1*LGqyNvlKQHQsBpisx705lg.jpeg",
    photo:
      "https://res.cloudinary.com/dmyrswz0r/image/upload/v1709715982/blog-image/download_yofegq.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ratione quisquam velit a tempora? Dicta omnis, voluptatem, quia reprehenderit officia, neque minima numquam quis consequuntur ab sed accusantium sequi blanditiis",
  },
  {
    author: "M Ahmad",
    title: "NodeJS 21 is HERE! Features that will blow your mind 🤯",
    url: "https://miro.medium.com/v2/resize:fit:679/1*LGqyNvlKQHQsBpisx705lg.jpeg",
    photo:
      "https://res.cloudinary.com/dmyrswz0r/image/upload/v1709715982/blog-image/download_yofegq.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ratione quisquam velit a tempora? Dicta omnis, voluptatem, quia reprehenderit officia, neque minima numquam quis consequuntur ab sed accusantium sequi blanditiis",
  },
];

const RelatedUserPosts = () => {
  return (
    <>
      <div className="bg-gray-50 py-12">
        <div className="max-w-[800px] m-auto px-3 md:px-0 border-b pb-8">
          <img
            alt="image here"
            className="h-[70px] w-[70px] rounded-full object-cover mb-4"
            src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1709715982/blog-image/download_yofegq.jpg"
          />
          <h1 className="text-gray-700 font-semibold text-lg mb-2">
            Written By Author Name (Ahmad)
          </h1>
          <div className="flex items-center gap-3 my-2">
            <span className="text-sm text-gray-600 hover:underline cursor-pointer">
              10 + Posts
            </span>
            <span className="text-sm text-gray-600 hover:underline cursor-pointer">
              200 + Likes
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aut
            ipsa error nihil cumque, a adipisci explicabo itaque id. Tenetur,
            maiores reprehenderit! Assumenda voluptates porro in accusantium
            atque pariatur libero?
          </p>
          <Link
            href={"#"}
            className="text-white bg-gray-700 px-4 py-1.5 rounded-full"
          >
            Profile
          </Link>
        </div>
        <div className="max-w-[800px] m-auto px-3 md:px-0 py-6">
          <h1 className="text-gray-700 font-semibold">
            More from fatfish and JavaScript in Plain English
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {JsonData.map((v, i) => {
              return (
                <div key={i}>
                  <img
                    src={v.url}
                    alt="image here"
                    className="object-cover h-52 w-full"
                  />
                  <div className="flex gap-2 items-center my-3">
                    <img
                      src={v.photo}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h2 className="text-gray-600 text-sm font-semibold">{v.author}</h2>
                  </div>
                  <h2 className="font-semibold text-[18px] text-gray-700 line-clamp-2 hover:text-gray-800 cursor-pointer">{v.title}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedUserPosts;
