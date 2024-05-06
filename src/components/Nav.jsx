import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Merienda } from "next/font/google";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const Meriend = Merienda({
  weight: "800",
  subsets: ["latin"],
});

const navLinks = [
  { text: "Home", route: "/" },
  { text: "blog", route: "/blog" },
  { text: "Write", route: "/dashboard/write" },
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

  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Toaster />
      {/* ===================== Navbar For Desktop ==========================================  */}
      <div
        className={`pt-5 pb-4 z-50 2xl:px-0 ${
          scrolled ? "border-b bg-[#f6f6ff] sticky top-0" : ""
        }`}
      >
        <nav className="standardWidth flex items-center justify-between px-4 lg:px-0">
          {/* ===================== Navbar Image Here ==========================================  */}
          <div className=" w-24 h-auto">
            <Link href={"/"} className="flex items-center gap-1 cursor-pointer">
              <img
                alt="Image here"
                className="w-9"
                src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1713427098/blog-image/favicon_jcqo9l.png"
              />

              <h1 className={`${Meriend.className} text-2xl text-gray-600`}>
                Readable
              </h1>
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
                      key={i}
                      className="text-slate-500 relative z-10 hover:text-slate-700 transition duration-200 hidden lg:block"
                    >
                      <Link
                        href={links.route}
                        className={
                          router === links.route &&
                          "relative before:absolute before:-bottom-1 text-[#0077ff]"
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
          <div className="lg:flex gap-4 items-center text-gray-60 hidden">
            <div
              onClick={() => setToggle(true)}
              className="bg-gray-200/70 flex gap-1.5 px-3 py-1 rounded-lg items-center text-pink-500 hover:text-pink-600 hover:bg-gray-300/60 cursor-pointer"
            >
              <i className="fa-solid fa-fire-flame-curved"></i>
              <span>1</span>
            </div>
            {/* <div className="w-[80vw] h-[80vh] bg-red-200 fixed top-0 left-0 "></div> */}
            {user ? (
              <div className="flex group relative items-center gap-2 pr-4 border-l pl-2.5">
                <img
                  src={user.photo}
                  alt="image here"
                  className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                />
                <div className="leading-3">
                  <p className="text-[14px] capitalize font-medium">
                    {user.fullName}
                  </p>
                  <span className="text-[11px] cursor-pointer text-blue-500">
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </div>

                {/* Profile Model Here --------------------- */}
                <div
                  className={`globalShadow2 bg-white border border-dotted pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 absolute -left-4 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
                >
                  <ul className="px-4 py-5">
                    <li className="flex flex-col gap-2">
                      {user?.isAdmin ? (
                        <Link
                          className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                          href="/dashboard"
                        >
                          <i className="fa-solid fa-chart-simple"></i> Dashboard
                        </Link>
                      ) : (
                        <Link
                          className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                          href="/dashboard/user-blogs"
                        >
                          <i className="fa-solid fa-chart-simple"></i> Dashboard
                        </Link>
                      )}

                      <Link
                        className="text-xs text-gray-600 my-2 hover:text-blue-600 flex items-center gap-2"
                        href="/dashboard/write"
                      >
                        <i className="fa-solid fa-square-pen"></i> Create Post
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="text-xs text-gray-600 hover:text-blue-700 flex items-center gap-2"
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
        className="fixed top-0 z-50 bg-[#fff] bg-gradient-to-tr from-purple-100 to-sky-100 w-full h-screen overflow-hidden"
      >
        <nav
          style={{
            transition: ".8s",
            left: `${mobNavPosstion === true ? 0 : -100}%`,
          }}
          className="h-full fixed p-4 w-full"
        >
          <div className="flex items-center justify-between">
            <div className="w-[140px]">
              <Link href={"/"} id="logo" className={Meriend.className}>
                Readables
              </Link>
            </div>
            <div>
              <i
                onClick={() => setMobNavPosstion(false)}
                className="fa-solid fa-xmark text-xl p-1 text-slate-400 hover:text-slate-500 cursor-pointer rounded-full object-cover grid place-content-center "
              ></i>
            </div>
          </div>
          <div className="flex flex-col justify-between h-[90vh]">
            <ul className="grid gap-2 mt-10">
              {navLinks.map(
                (v, i) =>
                  !(
                    user &&
                    (v.route === "/register" || v.route === "/login")
                  ) && (
                    <li
                      key={i}
                      className="text-slate-500 group hover:text-slate-600 hover:bg-blue-50 py-2 px-3 rounded cursor-pointer"
                    >
                      <Link
                        href={v.route}
                        className=" group-hover:text-blue-500"
                      >
                        {v.text}
                      </Link>
                    </li>
                  )
              )}

              <li className="text-slate-500 mt-4 hover:text-slate-600">
                <Link
                  href={"/blog"}
                  className="px-5 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                >
                  Let&apos;s Talk 👋
                </Link>
              </li>
            </ul>
            <div className="bg-white p-4 rounded-lg w-fit group">
              {user && (
                <div className="flex relative items-center gap-2 pr-4">
                  <img
                    src={user.photo}
                    alt="image here"
                    className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                  />
                  <div className="leading-3">
                    <p className="text-[14px] capitalize font-medium">
                      {user.fullName}
                    </p>
                    <span className="text-[11px] cursor-pointer text-blue-500">
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </div>

                  {/* Profile Model Here --------------------- */}
                  <div
                    className={`globalShadow2 bg-white border border-dotted pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:bottom-[130%] transition-all duration-500 absolute -left-4 bottom-[0%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
                  >
                    <ul className="px-4 py-5">
                      <li className="flex flex-col gap-2">
                        {user?.isAdmin ? (
                          <Link
                            className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                            href="/dashboard"
                          >
                            <i className="fa-solid fa-chart-simple"></i>{" "}
                            Dashboard
                          </Link>
                        ) : (
                          <Link
                            className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                            href="/dashboard/user-blogs"
                          >
                            <i className="fa-solid fa-chart-simple"></i>{" "}
                            Dashboard
                          </Link>
                        )}
                        <Link
                          className="text-xs text-gray-600 my-2 hover:text-blue-600 flex items-center gap-2"
                          href="/dashboard/write"
                        >
                          <i className="fa-solid fa-square-pen"></i> Create Post
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="text-xs text-gray-600 hover:text-blue-700 flex items-center gap-2"
                        >
                          <i className="fa-solid fa-right-from-bracket"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
