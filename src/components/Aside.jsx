import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import BellSvg from "./icons/BellSvg";
import DashboardSvg from "./icons/DashboardSvg";
import UserSvg from "./icons/UserSvg";
import FileSvg from "./icons/FileSvg";
import Ripple from "material-ripple-effects";

// ASIDE LINKS ADDED => icon chart-simple
var adminNavLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <DashboardSvg />,
  },
  {
    label: "Category",
    href: "/dashboard/category",
    icon: <BellSvg />,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: <UserSvg />,
  },
  {
    href: "/dashboard/blogs",
    label: "Blogs",
    icon: <FileSvg />,
  },
  {
    href: "/dashboard/write",
    label: "Write",
    icon: <FileSvg />,
  },
];

const Aside = () => {
  const ripple = new Ripple();
  const pathname = usePathname();
  const [toggle, setToggle] = useState(true);

  // set the Toggle Value False if window width should be md, or sm -------
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setToggle(false);
      } else {
        setToggle(true);
      }
    };

    // Set initial toggle state based on the window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside
      style={{
        transition: ".6s",
        width: toggle ? "200px" : "70px",
      }}
      className={`overflow-hidden flex flex-col justify-between py-2 bg-white min-h-screen border-dotted border-r`}
    >
      <div className="flex flex-col relative">
        <div className="flex flex-1 flex-col justify-between h-full my-4">
          <Link href={"/"} className="cursor-pointer">
            <img
              alt="Image Here"
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRhUf_q7p5OOMOCgU1_GdeNnbWW0RtKpW05Kh_NJujvJgCG5bLo"
              className={`${toggle ? "pl-5" : "pl-2"} w-16 mb-4`}
            />
          </Link>
          <h2
            className={`${
              toggle
                ? "font-semibold text-slate-400 text-xs px-6 my-2"
                : "hidden"
            }`}
          >
            OVERVIEW
          </h2>
          <ul className="text-sm mb-4 w-full">
            {adminNavLinks.map((v, i) => (
              <ul key={i} className="my-2">
                <Link
                  href={v.href}
                  onMouseUp={(e) => ripple.create(e, "dark")}
                  className={`group relative flex cursor-pointer items-center mx-2 py-2 rounded-lg hover:bg-[#F6F7F8] ${
                    pathname === v.href
                      ? "group cursor-pointer bg-[#ECF8F4]"
                      : ""
                  } ${toggle ? "px-4" : "pl-4"}`}
                >
                  {React.cloneElement(v.icon, {
                    className:
                      pathname === v.href
                        ? "text-green-700 animate-pulse"
                        : "text-[#637381]",
                  })}
                  <div
                    style={{
                      opacity: toggle ? "1" : "0",
                      transition: ".5s",
                    }}
                    className={`ml-3 ${
                      pathname === v.href
                        ? "font-medium text-green-600"
                        : "text-[#637381]"
                    }`}
                  >
                    {v.label}
                  </div>
                </Link>
              </ul>
            ))}
          </ul>
          <h2
            className={`${
              toggle
                ? "font-semibold text-slate-400 text-xs px-6 my-2"
                : "hidden"
            }`}
          >
            OVERVIEW
          </h2>
        </div>
      </div>

      <div className="pl-2 mb-3">
        <span onClick={() => setToggle(!toggle)}>
          <i
            style={{
              transition: ".5s",
            }}
            className={`asideAnimate px-2 bg-gray-50 text-gray-600 active:bg-gray-300 cursor-pointer text-lg p-1 rounded-lg ${
              toggle ? "fa-solid fa-angle-left" : "fa-solid fa-angle-right"
            }`}
          ></i>
        </span>
      </div>
    </aside>
  );
};

export default Aside;
