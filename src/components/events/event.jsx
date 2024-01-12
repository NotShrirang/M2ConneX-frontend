import React from "react";
import { Link } from "react-router-dom";
import arrows from "../../assets/arrow.svg";
import PostCarousel from "../feed/imageCarousel";
import formatDate from "../../utils/date";

export default function Event({ upcoming = false, event }) {

  return (
    <div
      className="w-full lg:w-[75%] lg:py-8 shadow-sm h-full flex lg:gap-4 lg:flex-row flex-col justify-center items-center border border-gray rounded-lg p-4"
      key={event.id}
    >
      {event.images.length != 0 && (
        <div className="w-[90%] h-full bg-[#D9D9D9] lg:w-[50%]">
          {<PostCarousel post={event} />}
        </div>
      )}
      <div
        className={`${
          event.images.length != 0 ? "lg:w-[50%]" : "lg:w-full"
        } w-[90%] h-full flex flex-col`}
      >
        <div className="grid grid-cols-1 justify-between w-full py-2">
          <p className="name text-2xl text-start font-bold self-start">
            {event.name}
          </p>
        </div>
        <div className="flex flex-row justify-start w-full py-2 gap-x-4">
          <p className="date text-md text-start self-start">
            Date: {event.date}
          </p>
          <p className="time text-md text-end self-start">Time: {event.time}</p>
          <p className="venue text-md text-start self-start">
            Venue: {event.venue}
          </p>
        </div>
        <p className="date text-md font-medium text-end self-start">
          Posted: {formatDate(event.createdAt)}
        </p>
        <div className="w-full overflow-hidden leading-event text-md py-2">
          <p className="text-lg border-t border-gray pt-2">Description:</p>
          <p className="text-md pr-4">
            {event.description.slice(0, 100) + "..."}
          </p>
        </div>
        {upcoming && (
          <button
            className="self-center mt-4 w-32 py-2 text-xl font-bold text-white rounded-md bg-primary text-center shadow-md shadow-gray bg-[#962E32]"
            onClick={() => {
              window.open(event.link, "_blank");
            }}
          >
            Open Link
          </button>
        )}
      </div>
    </div>
  );
}
