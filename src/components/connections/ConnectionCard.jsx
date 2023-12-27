import React from "react";
import { useNavigate } from "react-router-dom";
import DEPARTMENTS from "../utils/departments";

const ConnectionCard = ({ person, handleConnect }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col ml-4 py-2" key={person.id}>
      <div className="flex flex-row gap-x-4">
        <div
          className="w-[60px] h-[60px] rounded-full cursor-pointer flex flex-col items-left justify-center"
          onClick={() => {
            navigate("/users/" + person.id);
            window.location.reload();
          }}
        >
          {person.profilePicture && (
            <img
              src={person.profilePicture}
              alt=""
              className="max-w-[48px] h-[48px] rounded-full"
            />
          )}
          {!person.profilePicture && (
            <i className="fas fa-user-circle text-5xl"></i>
          )}
        </div>
        <div className="flex flex-col items-left w-full">
          <div>
            <span
              className="font-semibold text-lg cursor-pointer"
              onClick={() => {
                navigate("/users/" + person.id);
                window.location.reload();
              }}
            >
              {person.firstName} {person.lastName}
            </span>
            <p
              className="text-gray-400 text-[14px] cursor-pointer"
              onClick={() => {
                navigate("/users/" + person.id);
                window.location.reload();
              }}
            >
              {person.bio &&
                person.bio.slice(0, 100) +
                  (person.bio.length > 100 ? "..." : "")}
              {!person.bio &&
                person.department &&
                "Department of " + DEPARTMENTS[person.department]}
              {!person.bio && !person.department && "Alumni Portal User"}
            </p>
            {person.mutualConnections.length > 0 && (
              <p
                className="text-gray-400 text-[14px] cursor-pointer"
                onClick={() => {
                  navigate("/users/" + person.id);
                  window.location.reload();
                }}
              >
                {person.mutualConnections.length} mutual connections
              </p>
            )}
          </div>
          <div className="flex pt-2">
            {person.isConnected == "not_connected" && (
              <button
                key={person.id}
                className="border border-gray rounded-l-full rounded-r-full text-gray-500 font-medium w-40 h-10 hover:bg-[#ebebebeb] hover:border-2 transition duration-100 ease-in-out"
                onClick={(e) => {
                  handleConnect(e, person);
                }}
              >
                <i className="fa-solid fa-user-plus mr-2 "></i>
                Connect
              </button>
            )}
            {person.isConnected == "pending" && (
              <button
                key={person.id}
                className="border border-gray rounded-l-full rounded-r-full text-gray-500 font-medium w-40 h-10 bg-[#ebebebeb]"
                disabled
              >
                <i className="fa-solid fa-check mr-2 "></i>
                Requested
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
