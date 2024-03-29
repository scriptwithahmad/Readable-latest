import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <section className="page_404 standardWidth">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className=" -translate-y-14">
                <h3 className="">Seems like youre lost</h3>

                <p className=" mb-6">
                  the page you are looking for isnt avaible!
                </p>

                <Link
                  href="/"
                  className="link_404 bg-gradient-to-tr from-[#f3626f] to-[#ff4791] px-6 py-3 rounded-xl text-white"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default notFound;
