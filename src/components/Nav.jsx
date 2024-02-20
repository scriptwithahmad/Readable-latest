// "use client";
// import Link from "next/link";
import { Merienda } from "next/font/google";
// import { AuthContext } from "@/context/AuthContext";
// import React, { useContext, useEffect, useState } from "react";

const Meriend = Merienda({
  weight: "800",
  subsets: ["latin"],
});

// const Nav = () => {
//   var { user } = useContext(AuthContext);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <nav
//         className={`pt-5 pb-4 z-50 px-4 2xl:px-0 ${
//           scrolled ? "border-b bg-[#f6f6ff] sticky top-0" : ""
//         }`}
//       >
//         <div className="standardWidth flex items-center justify-between">
//           <div className=" w-[130px]">
//             <Link href={"/"} id="logo" className={Meriend.className}>
//               Readable
//             </Link>
//           </div>
//           <div className="flex items-center gap-6">
//             <ul className="hidden md:block">
//               <li className="flex items-center gap-6 text-slate-700 text-lg">
//                 <Link href={"/"}>Home</Link>
//                 <Link href={"/blog"}>Blog</Link>
//                 <Link href={"/login"}>Login</Link>
//                 <Link href={"/write"}>Write</Link>
//               </li>
//             </ul>
//             <button className="btn px-5 py-2">Let&apos;s Talk 👋</button>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Nav;

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import OutsideClickHandler from "react-outside-click-handler";
import { AuthContext } from "@/context/AuthContext";

const navLinks = [
  { text: "Home", route: "/" },
  { text: "blog", route: "/blog" },
  { text: "Write", route: "/write" },
  { text: "Login", route: "/login" },
  { text: "Register", route: "/register" },
];

const Nav = () => {
  const router = usePathname();
  const [mobNavPosstion, setMobNavPosstion] = useState(false);

  const { user, refetch } = useContext(AuthContext);

  // Logout Function ------------------------/
  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const res = await axios.post("/api/users/logout");
      if (res.data.success) {
        toast.success("User Logout Successfully!");
        window.location.reload();
        refetch();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <Toaster />
      {/* ===================== Navbar For Desktop ==========================================  */}
      <div className="bg-white z-50 drop-shadow-lg py-3 sticky top-0 backdrop-blur-3xl">
        <nav className="flex items-center justify-between max-w-[1200px] m-auto px-4 lg:px-0">
          {/* ===================== Navbar Image Here ==========================================  */}
          <div className=" w-24 h-auto">
            <Link href={"/"} id="logo" className={Meriend.className}>
              Readable
            </Link>
          </div>

          {/* ===================== Navbar Links Here ==========================================  */}
          <div>
            <ul className="flex gap-5 items-center">
              {navLinks.map(
                (links, i) =>
                  !(
                    user &&
                    (links.route === "/register" || links.route === "/login")
                  ) && (
                    <li
                      key={links.route}
                      className="text-[#777] relative z-20 font-light hover:text-slate-700 transition duration-200 hidden lg:block"
                    >
                      <Link
                        href={links.route}
                        className={
                          router === links.route
                            ? "relative before:absolute before:-bottom-1 font-medium text-orange-500"
                            : ""
                        }
                      >
                        {links.text}
                      </Link>
                    </li>
                  )
              )}
            </ul>

            {/* ===================== Navbar Toggle Button ==========================================  */}
            <OutsideClickHandler
              onOutsideClick={() => {
                setMobNavPosstion(false);
              }}
            >
              <div
                onClick={() => setMobNavPosstion(!mobNavPosstion)}
                className="lg:hidden visible"
              >
                <div className="grid grid-cols-1 items-center gap-3 relative cursor-pointer">
                  <span
                    className="w-6 border border-gray-400 absolute mt-0 transition-all duration-300 ease-in-out"
                    style={{
                      rotate: `${mobNavPosstion === false ? 0 : 44}deg`,
                      top: `${mobNavPosstion === false ? 3 : 12}px`,
                    }}
                  ></span>
                  <span
                    className="w-6 border border-gray-400 mt-5"
                    style={{ opacity: `${mobNavPosstion === false ? 1 : 0}` }}
                  ></span>
                  <span
                    className="w-6 border border-gray-400 mt-0 absolute top-3 transition-all duration-300 ease-in-out"
                    style={{
                      rotate: `${mobNavPosstion === false ? 0 : -44}deg`,
                    }}
                  ></span>
                </div>
              </div>
            </OutsideClickHandler>
            {/* ===================== Navbar Toggle Button Ends ==========================================  */}
          </div>

          {/* ===================== Navbar Icons and User Auth ==========================================  */}
          <div className=" lg:flex gap-4 items-center text-gray-60 hidden">
            {user ? (
              <div className="flex group relative items-center gap-2 pr-4">
                <img
                  src={user.photo}
                  alt="image here"
                  className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                />
                <div className="leading-3">
                  <p className="text-[14px] capitalize font-medium">
                    {user.fullName}
                  </p>
                  <span className="text-[11px] cursor-pointer text-red-500 hover:text-red-600">
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </div>

                {/* Profile Model Here --------------------- */}
                <div
                  className={`shade pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 bg-white absolute -left-4 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
                >
                  <ul className="px-4 py-5">
                    <li className="flex flex-col gap-2">
                      {user?.role == "admin" ? (
                        <Link
                          className="text-xs text-gray-600 hover:text-orange-600 flex items-center gap-2"
                          href="/dashboard"
                        >
                          <i className="fa-solid fa-chart-simple"></i> Dashboard
                        </Link>
                      ) : (
                        <Link
                          className="text-xs text-gray-600 hover:text-orange-600 flex items-center gap-2"
                          href="/dashboard/user-portal"
                        >
                          <i className="fa-solid fa-chart-simple"></i> Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="text-xs text-gray-600 hover:text-red-600 flex items-center gap-2"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link href={"/blog"} className="btn px-5 py-2">
                Let&apos;s Explore 👋
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* ===================== Navbar Responive ==========================================  */}
      <div
        style={{
          transition: ".3s",
          left: `${mobNavPosstion === true ? 0 : -100}%`,
        }}
        className="absolute top-0 z-50 bg-[#fff] w-1/2 h-screen overflow-hidden"
      >
        <nav
          style={{
            transition: ".8s",
            left: `${mobNavPosstion === true ? 0 : -100}%`,
          }}
          className="h-full w-1/2 fixed p-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-[140px]">
              <Link href={"/"} id="logo" className={Meriend.className}>
                Readable
              </Link>
            </div>
            <i
              onClick={() => setMobNavPosstion(false)}
              className="bx bx-x text-xl p-1 text-slate-300 hover:text-slate-400 cursor-pointer rounded-full object-cover grid place-content-center "
            ></i>
          </div>
          <ul className="grid gap-4 mt-10">
            {navLinks.map(
              (v, i) =>
                !(
                  user &&
                  (v.route === "/register" || v.route === "/login")
                ) && (
                  <li key={i} className="text-slate-500 hover:text-slate-600">
                    <Link href={v.route}>{v.text}</Link>
                  </li>
                )
            )}

            <li className="text-slate-500 mt-2 hover:text-slate-600">
              <Link href={"/blog"} className="btn px-5 py-2">
                Let&apos;s Talk 👋
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
