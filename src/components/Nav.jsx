import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <>
      <nav className="pt-5 pb-4">
        <div className="standardWidth flex items-center justify-between">
          <div className=" w-[130px]">
            <Image
              width={300}
              height={300}
              alt="logo here"
              src="/images/logo.png"
              className=" h-full w-full mix-blend-multiply"
            />
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
            <button className="btn">Let's Talk</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
