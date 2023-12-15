import React from "react";

const TopStories = () => {
  return (
    <>
      <div className="w-[80%]  m-auto flex flex-col justify-center items-center ">
        <h2 className="text-[3rem] font-semibold text-center">Top Stories</h2>
        <div className="w-2/3 flex  justify-center items-center gap-4 my-8">
          <div  className="flex flex-col gap-y-4">
            <div className="w-[20rem] h-[27rem] bg-[#D9D9D9] rounded-lg"></div>
            <div className="w-[20rem] h-[10rem] bg-[#D9D9D9] rounded-lg"></div>
          </div >
          <div className="hidden lg:flex flex-col gap-y-4">
            <div className="w-[20rem] h-[10rem] bg-[#D9D9D9] rounded-lg"></div>
            <div className="w-[20rem] h-[27rem] bg-[#D9D9D9] rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <a
          href="/feed"
          className=" bg-primary w-[20rem] h-[3rem] text-white text-[2rem] font-semibold text-center rounded-md"
        >
          <button className="mr-4">View Your Feed</button>
          <i
            class="fa-solid fa-arrow-right fa"
            style={{ color: "#ffffff" }}
          ></i>
        </a>
      </div>
    </>
  );
};

export default TopStories;
