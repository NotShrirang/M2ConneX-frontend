import React from "react";

const Post = () => {
  return (
    <>
      <div className="w-[90%] my-4 border-2 p-3 border-[#9D9494] rounded">
        <div className="flex justify-start items-center gap-x-2">
          <div className=" border-[#bc383e] border-2 ml-4 flex justify-center items-center rounded-[3rem] w-[3.5rem] h-[3.5rem]">
            <i
              className="fa-solid fa-user fa-2xl"
              style={{ color: "#bc383e" }}
            ></i>
          </div>
          <div>
            <h2 className="text-xl font-medium">John Doe</h2>
            <p className="text-xs">Batch of 2018 | Founder XYZ</p>
          </div>
        </div>
        <div className="my-2">
          <div className="mx-6 text-sm">
            <p>
              Excited to share that I’m hiring for 5 new positions at XYZ Inc.
              XYZ Inc. believes in good work environment and paying what every
              employee see more..
            </p>
          </div>
          <div className="w-full h-[20rem] bg-[#d9d9d9] my-2 "></div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-x-3">
              <button className="flex justify-center items-center gap-x-2">
                <i
                  className="fa-solid fa-arrow-up fa-lg"
                  style={{ color: "#000" }}
                ></i>
                <span>3</span>
              </button>

              <button className="flex justify-center items-center gap-x-2">
                <i
                  className="fa-regular fa-comment fa-lg"
                  style={{ color: "#000" }}
                ></i>
                <span>1</span>
              </button>

              <button className="flex justify-center items-center gap-x-2">
                <i
                  className="fa-solid fa-retweet fa-lg"
                  style={{ color: "#000", transform: "rotate(90deg)" }}
                ></i>
                <span>1</span>
              </button>
            </div>
            <div>
              <button className="flex justify-center items-center gap-x-2">
                <i
                  className="fa-solid fa-share fa-lg"
                  style={{ color: "#000" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
