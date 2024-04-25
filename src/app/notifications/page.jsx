"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { generateToken } from "@/firebase";

const Page = () => {
  // async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  //   if (permission === "granted") {
  //     alert("you accepted");
  //     const token = await getToken(messaging, {
  //       vapidKey:
  //         "BC4LB8TI3h7AFKw05kob5DEfffz7ji73B60KPvnFKvT8IvstdXw47rrsiDu5-3uCqK8GWDSyAYyPAac2IoPxAKE",
  //     });
  //     console.log(token);
  //   } else if (permission === "denied") {
  //     alert("you denied for the notificatiosn");
  //   } else {
  //     alert("default Running");
  //   }
  // }

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <>
      <div className="max-w-[1100px] m-auto px-3 2xl:px-0">
        <h1 className=" border-l-4 border-[#2386FF] pl-4 mt-10 mb-8 text-2xl font-semibold">
          Notifications :
        </h1>
        <div className="flex gap-4">
          <div className="globalShadow3 bg-white px-3 py-4 mb-5 rounded-lg">
            <div className="flex items-center gap-2 mb-2 hover:bg-indigo-100 text-gray-500 hover:text-indigo-500 rounded-md p-2 cursor-pointer transition-all">
              <i className="fa-solid fa-book-open-reader"></i>
              <p>All</p>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-indigo-100 text-gray-500 hover:text-indigo-500 rounded-md cursor-pointer transition-all">
              <i className="fa-solid fa-comments"></i>
              <p>Comments</p>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-indigo-100 text-gray-500 hover:text-indigo-500 rounded-md cursor-pointer transition-all">
              <i className="fa-solid fa-hashtag"></i>
              <p>Posts</p>
            </div>
          </div>
          <div className="flex-1 globalShadow3 bg-white px-4 py-4 mb-5 rounded-lg">
            <div className="flex gap-4">
              <Image
                width={500}
                height={500}
                priority="true"
                alt="Image Here"
                className="w-16 h-16 rounded-full object-cover"
                src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&t=st=1711798312~exp=1711798912~hmac=378ae5590dae09b639a7f612e614e17d403ef50a843f0d3817d41e55b4193400"
              ></Image>
              <div className="w-full">
                <h1 className="font-semibold">
                  M Ahmad{" "}
                  <span className="font-light text-sm">made a new post</span>
                </h1>
                <span className="text-gray-500 text-xs">About 3 hour ago</span>
                <div className="border p-3 w-full rounded-lg mt-4 mb-2">
                  <h1 className="text-gray-700 mb-2 font-semibold">
                    Blog Title Goes Here
                  </h1>
                  <div
                    className={`flex items-center hover:bg-purple-50 cursor-pointer text-sm `}
                  >
                    <span className={`text-gray-500 text-sm`}>#</span>
                    <h2 className="text-sm">JavaScript</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
