import React from "react";
import img from "../assets/college.png";
import img1 from "../assets/instagram.png";

function Blogpost({ img, title, author, date, category }) {
  return (
    <>
      <div className="border-[1px] border-[#dedede] shadow-md w-96 rounded-3xl ">
        <div className="max-w-96">
          <img src={img} alt="" className="w-96" />
        </div>
        <div className="p-4 flex flex-col justify-center">
          <div className="flex justify-between items-center my-2">
            <p className="bg-[#dedede] px-2 text-sm font-semibold py-[0.125rem] rounded-[1rem]">
              {category}
            </p>
            <p className="text-gray text-sm">{date}</p>
          </div>
          <div className="my-2">
            <p
              className="text-lg mx-2 text-left font-semibold hover:cursor-pointer hover:text-primary transition-all duration-300"
              onClick={() => {
                // TODO Do something
              }}
            >
              {title}
            </p>
          </div>
          <div className="py-[0.1px] w-[90%] bg-black self-center" />
          <div className="my-2 flex items-center justify-start gap-x-2">
            <div className="w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-[2rem] border-[#dedede] border-[1px]">
              {/* <img src={img1} className='rounded-[2rem]' alt="" /> */}
              <i className="fa-solid fa-user"></i>
            </div>
            <h3 className="">{author}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogpost;
