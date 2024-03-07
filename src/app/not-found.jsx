import React from "react";

const notFound = () => {
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div>
                <h3 className="">Look like your are lost</h3>

                <p>
                  the page you are looking for not avaible!
                </p>

                <a href="" class="link_404 btn px-6 py-3">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default notFound;
