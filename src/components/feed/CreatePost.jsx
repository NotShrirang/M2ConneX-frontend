import React from "react";

const CreatePost = () => {
  return (
    <>
      <div className="w-full h-[6rem] my-4 flex justify-center items-center border-b-2  border-[#9D9494]">
        <div className="w-[90%] h-[4rem] flex justify-start items-center gap-x-[9rem] rounded-[4rem] border-[#bc383e] border-2">
          <div className=" border-[#bc383e] border-2 ml-4 flex justify-center items-center rounded-[2rem] w-[3rem] h-[3rem]">
            <i
              className="fa-solid fa-user fa-xl"
              style={{ color: "#bc383e" }}
            ></i>
          </div>
          <div className="">
            <p className="text-xl text-[#bc383e] tracking-wider">
              Share your thoughts
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
