import React from "react";

const Testimonials = () => {
  return (
    <>
      <div className="w-[80%] mx-auto my-8">
        <h2 className="text-[3rem] font-semibold text-center">Testimonials</h2>

        <div className="flex justify-center items-center gap-x-8 my-8"></div>

        <div className="flex justify-center items-center">
          <a
            href="/"
            className=" bg-primary w-[16rem] h-[3rem] text-white text-[2rem] font-semibold text-center rounded-md"
          >
            <button className="mr-4">Testimonials</button>
            <i
              className="fa-solid fa-arrow-right fa"
              style={{ color: "#ffffff" }}
            ></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
