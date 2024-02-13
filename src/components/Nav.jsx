"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Merienda } from "next/font/google";

const Meriend = Merienda({
  weight: "800",
  subsets: ["latin"],
});

const Nav = () => {
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
      <nav
        className={`pt-5 pb-4 z-50 px-4 md:px-0 ${
          scrolled ? "border-b bg-[#f6f6ff] sticky top-0" : ""
        }`}
      >
        <div className="standardWidth flex items-center justify-between">
          <div className=" w-[130px]">
            <h2 id="logo" className={Meriend.className}>
              Readable
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <ul className="hidden md:block">
              <li className="flex items-center gap-6 text-slate-700 text-lg">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>About</Link>
                <Link href={"/"}>Services</Link>
                <Link href={"/write"}>Write</Link>
              </li>
            </ul>
            <button className="btn px-5 py-2">Let&apos;s Talk 👋</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
