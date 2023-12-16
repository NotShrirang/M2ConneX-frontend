import React from "react";

const UpcomingEvent = () => {
  return (
    <>
      <div className="w-[80%] mx-auto my-8">
        <h2 className="text-[3rem] font-semibold text-center">
          Upcoming Event
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-x-8 gap-y-2 my-8">
          <div className="w-[20rem] h-[22rem] bg-[#D9D9D9] rounded-lg"></div>
          <div className="w-[20rem] h-[22rem] bg-[#D9D9D9] rounded-lg"></div>
        </div>

        <div className="flex justify-center items-center">
          <a
            href="/events"
            className=" bg-primary w-[12rem] h-[3rem] text-white text-[2rem] font-semibold text-center rounded-md"
          >
            <button className="mr-4">Event</button>
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

export default UpcomingEvent;
