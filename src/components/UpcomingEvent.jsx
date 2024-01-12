import React from "react";
import Event from "./events/event";

const UpcomingEvent = () => {

  const events = [
    {
      id: "1",
      name: "Event 1",
      date: "12/12/2021",
      time: "12:00 PM",
      venue: "mmcoe",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      link: "https://www.google.com/",
      createdAt: "12/12/2021",
      images: ["https://images.unsplash.com/photo-1632836926807-4b9b9b5b9b0f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80"],
    },
  ]

  return (
    <>
      <div className="w-full mx-auto my-8">
        <h2 className="text-[3rem] font-semibold text-center">
          Upcoming Event
        </h2>

        <div className="flex w-full lg:flex-row justify-center items-center gap-x-8 gap-y-2 my-8">
          <div className="h-[22rem] flex justify-center rounded-lg">
            <Event event={events[0]} />
          </div>
          <div className="h-[22rem] rounded-lg flex justify-center">
            <Event event={events[0]} />
          </div>
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
