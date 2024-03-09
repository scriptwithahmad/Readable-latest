import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

// ASIDE LINKS ADDED => icon chart-simple
var adminNavLinks = [
  { href: "/dashboard", lable: "Dashboard", icon: "fa-clone" },
  {
    lable: "Category",
    href: "/dashboard/category",
    icon: "fa-paper-plane",
  },
  {
    lable: "Profile",
    href: "/dashboard/profile",
    icon: "fa-paste",
  },
  {
    href: "/dashboard/blogs",
    lable: "Blogs",
    icon: "fa-folder-closed",
  },
];

const Aside = () => {
  const pathname = usePathname();

  const [toggle, setToggle] = useState(true);

  const { user } = useContext(AuthContext);

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
        width: toggle ? "200px" : "48px",
      }}
      className={`overflow-hidden flex flex-col justify-between h-full py-2`}
    >
      <div className="flex flex-col relative">
        <div className="flex flex-1 flex-col justify-between h-full my-4">
          <h2 className="px-4 mb-3 text-gray-600 font-semibold text-sm">
            MENU
          </h2>
          <ul className="text-sm border-b mb-4 pb-2 w-full">
            {adminNavLinks.map((v, i) => {
              return (
                <ul key={i}>
                  <Link
                    href={v.href}
                    className={`relative py-2 mb-2 px-4 flex items-center hover:bg-[#9481ce10] group cursor-pointer ${
                      pathname === v.href
                        ? "group cursor-pointer border-r-[3px] border-r-[#3e1e97b1]"
                        : ""
                    }`}
                  >
                    <i
                      className={`${v.icon} text-base ${
                        pathname === v.href
                          ? "text-[#3E1E97] fa-solid"
                          : "text-gray-500 fa-regular"
                      }`}
                    ></i>
                    <div
                      style={{
                        opacity: toggle ? "1" : "0",
                        transition: ".5s",
                      }}
                      className={`ml-3 ${
                        pathname === v.href
                          ? "text-[#3E1E97] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {v.lable}
                    </div>
                  </Link>
                </ul>
              );
            })}
          </ul>
          <h2 className="px-3 mb-1.5 text-gray-600 font-semibold text-sm">
            OTHERS
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
