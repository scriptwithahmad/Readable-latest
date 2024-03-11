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

  const [scrolled, setScrolled] = useState(false);

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
        className={`pt-5 pb-4 z-50 px-4 2xl:px-0 ${
          scrolled ? "border-b bg-[#f6f6ff] sticky top-0" : ""
        }`}
      >
        <nav className="standardWidth flex items-center justify-between px-4 lg:px-0">
          {/* ===================== Navbar Image Here ==========================================  */}
          <div className=" w-24 h-auto">
            <Link href={"/"} className="flex items-center gap-1 cursor-pointer">
              <img src="/images/logo.png" alt="Image here" className=" w-12" />

              <h1 className={`${Meriend.className}`} id="logo">
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
                          router === links.route
                            ? "relative before:absolute before:-bottom-1 text-[#0077ff]"
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
                      <Link
                        className="text-xs text-gray-600 hover:text-orange-600 flex items-center gap-2"
                        href="/dashboard"
                      >
                        <i className="fa-solid fa-chart-simple"></i> Dashboard
                      </Link>

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
                Readables
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
