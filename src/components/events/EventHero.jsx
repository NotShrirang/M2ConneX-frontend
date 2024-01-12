import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../utils/ApiConfig";
import DEPARTMENTS from "../../utils/departments";
import { ToastContainer, toast } from "react-toastify";

export default function Events_Hero({ isClubAdmin = false, clubsList }) {
  const [showModal, setShowModal] = useState(false);
  const [addEvent, setAddEvent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/auth");
    }
  }, []);

  const handleAddEvent = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/auth");
    }
    if (
      !String(addEvent.link).startsWith("http://") ||
      !String(addEvent.link).startsWith("https://")
    ) {
      toast.error("A valid link is required!");
      return;
    }
    axios
      .post(ApiConfig.events + "/", addEvent, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
        if (err.response.status === 401) {
          toast.error("Invalid Data! Make sure you have filled all fields.");
        }
        if (err.response.status === 400) {
          toast.error(err.response.data.toString());
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-fit h-full my-4">
      <ToastContainer />
      <div className="flex flex-row items-center justify-center w-full min-h-fit">
        <h1 className="text-5xl font-bold text-center text-black">Events</h1>
        {isClubAdmin && (
          <button
            className="absolute right-4 bg-[#f4f2ee] text-black border border-gray rounded-lg px-4 py-2 font-md hover:cursor-pointer hover:bg-primary hover:text-white transition duration-300 ease-in-out"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Event
          </button>
        )}
      </div>
      <div className="flex flex-row items-center justify-center w-full min-h-fit mt-4">
        <p className="text-xl font-medium text-center text-black">
          Stay updated with the latest events and happenings at MMCOE.
        </p>
      </div>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="flex flex-col items-start justify-center w-[65%] h-[95%] bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-row items-center justify-between w-full p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-2xl font=semibold">Add Event</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </button>
            </div>
            <div className="relative flex flex-col justify-center items-center px-4 gap-y-4 w-full h-full overflow-y-scroll">
              <form className="flex flex-col justify-evenly items-center w-full h-full">
                <div className="flex flex-col items-start justify-center w-[75%] mt-24">
                  <p className="text-sm font-light text-center text-black">
                    Event Name
                  </p>
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="w-full h-12 border border-gray rounded-lg px-4"
                    value={addEvent.name}
                    onChange={(e) => {
                      setAddEvent({ ...addEvent, name: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-[75%]">
                  <p className="text-sm font-light text-center text-black">
                    Department
                  </p>
                  <select
                    className="w-full h-12 border border-gray rounded-lg px-4 outline-none"
                    placeholder="Department"
                    value={addEvent.department}
                    onChange={(e) => {
                      setAddEvent({ ...addEvent, department: e.target.value });
                    }}
                  >
                    <option className="w-full">Select Department</option>
                    {Object.keys(DEPARTMENTS).map((key) => {
                      return (
                        <option className="w-full" value={key} key={key}>
                          {DEPARTMENTS[key]}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-row items-center justify-center gap-x-4 w-[75%]">
                  <div className="flex flex-col items-start justify-center w-full">
                    <p className="text-sm font-light text-center text-black">
                      Event Venue
                    </p>
                    <input
                      type="text"
                      placeholder="Event Venue"
                      className="w-full h-12 border border-gray rounded-lg px-4"
                      value={addEvent.venue}
                      onChange={(e) => {
                        setAddEvent({ ...addEvent, venue: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center w-full ">
                    <p className="text-sm font-light text-center text-black">
                      Event Date
                    </p>
                    <input
                      type="date"
                      placeholder="Event Date"
                      className="w-full h-12 border border-gray rounded-lg px-4"
                      value={addEvent.date}
                      onChange={(e) => {
                        setAddEvent({ ...addEvent, date: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center w-full ">
                    <p className="text-sm font-light text-center text-black">
                      Event Time
                    </p>
                    <input
                      type="time"
                      placeholder="Event Time"
                      className="w-full h-12 border border-gray rounded-lg px-4"
                      value={addEvent.time}
                      onChange={(e) => {
                        setAddEvent({ ...addEvent, time: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center w-[75%] ">
                  <p className="text-sm font-light text-center text-black">
                    Event Description
                  </p>
                  <textarea
                    type="text"
                    rows={5}
                    placeholder="Event Description"
                    className="w-full border border-gray rounded-lg px-4 py-2"
                    value={addEvent.description}
                    onChange={(e) => {
                      setAddEvent({ ...addEvent, description: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-[75%] ">
                  <p className="text-sm font-light text-center text-black">
                    Event Link
                  </p>
                  <input
                    type="text"
                    placeholder="Event Link"
                    className="w-full h-12 border border-gray rounded-lg px-4"
                    value={addEvent.link}
                    onChange={(e) => {
                      setAddEvent({ ...addEvent, link: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-[75%]">
                  <p className="text-sm font-light text-center text-black">
                    Club
                  </p>
                  <select
                    className="w-full h-12 border border-gray rounded-lg px-4 mb-8 outline-none"
                    placeholder="Club"
                    value={addEvent.club}
                    onChange={(e) => {
                      setAddEvent({ ...addEvent, club: e.target.value });
                    }}
                  >
                    <option className="w-full">Select Club</option>
                    {console.log(clubsList)}
                    {clubsList.map((club) => {
                      return (
                        <option
                          className="w-full"
                          value={club.club}
                          key={club.club}
                        >
                          {club.clubName} - {club.positionInWords}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </form>
            </div>
            <div className="flex flex-row items-center justify-end w-full border border-gray p-6 rounded-b">
              <button
                className="bg-primary text-white px-6 py-2 uppercase text-lg rounded border border-gray shadow-sm mr-1 hover:shadow-lg hover:bg-[#f4f2ee] hover:text-primary transition-all duration-300 ease-in-out"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddEvent();
                }}
              >
                Add
              </button>
              <button
                className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                type="button"
                onClick={() => {
                  document.title = "Events | MMCOE Alumni Portal";
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
