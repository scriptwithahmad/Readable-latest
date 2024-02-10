import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Merienda } from "next/font/google";

const Meriend = Merienda({
  weight: "800",
  subsets: ["latin"],
});

const Nav = () => {
  return (
    <>
      <nav className="pt-5 pb-4">
        <div className="standardWidth flex items-center justify-between">
          <div className=" w-[130px]">
            <h2 id="logo" className={Meriend.className}>Readable</h2>
          </div>
          <div className="flex items-center gap-6">
            <ul>
              <li className="flex items-center gap-6 text-slate-700 text-lg">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>About</Link>
                <Link href={"/"}>Services</Link>
                <Link href={"/"}>Blogs</Link>
              </li>
            </ul>
            <button className="btn px-5 py-2">Let's Talk 👋</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
