import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DEPARTMENTS from "../../utils/departments";
import axios from "axios";

const ConnectionInvitationCard = ({
  connection,
  handleAccept,
  handleReject,
}) => {
  const navigate = useNavigate();
  const [hasAccepted, setHasAccepted] = useState(false);
  const [hasRejected, setHasRejected] = useState(false);

  useEffect(() => {}, []);

  if (connection == null) {
    return null;
  }
  return (
    <div className="network-panel-body flex flex-col justify-center items-start mt-4 border border-gray rounded-lg p-4 w-full">
      <div className="flex flex-row justify-center items-center gap-x-4 w-full">
        <div
          className="w-[60px] h-[60px] rounded-full cursor-pointer flex flex-col items-left justify-center"
          onClick={() => {
            navigate("/users/" + connection.userA);
            window.location.reload();
          }}
        >
          {connection.userADetails.profilePicture ? (
            <img
              src={connection.userADetails.profilePicture}
              alt=""
              className="max-w-[48px] h-[48px] rounded-full"
            />
          ) : (
            <i className="fas fa-user-circle text-5xl"></i>
          )}
        </div>
        <div className="flex flex-row justify-between items-left w-full">
          <div
            onClick={() => {
              navigate("/users/" + connection.userA);
              window.location.reload();
            }}
          >
            <span className="font-semibold text-lg cursor-pointer">
              {connection.userADetails.firstName}{" "}
              {connection.userADetails.lastName}
            </span>
            <p className="text-gray-400 text-[14px] cursor-pointer">
              {connection.userADetails.bio &&
                connection.userADetails.bio.slice(0, 100) +
                  (connection.userADetails.bio.length > 100 ? "..." : "")}
              {!connection.userADetails.bio &&
                connection.userADetails.department &&
                "Department of " +
                  DEPARTMENTS[connection.userADetails.department]}
              {!connection.userADetails.bio &&
                !connection.userADetails.department &&
                "Alumni Portal User"}
            </p>
          </div>
          <div className="flex flex-row gap-x-4 pt-2">
            {!hasAccepted && !hasRejected && (
              <>
                <button
                  className="text-blue text-sm mr-2 border border-blue rounded-lg px-2 py-1 w-20 hover:bg-blue hover:text-white hover:font-bold cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => {
                    handleAccept({ connectionId: connection.id });
                    setHasAccepted(true);
                  }}
                >
                  <i className="fas fa-check"></i> Accept
                </button>
                <button
                  className="text-red text-sm border border-red rounded-lg px-2 py-1 w-20 hover:bg-red hover:text-white hover:font-bold cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => {
                    handleReject({ connectionId: connection.id });
                    setHasRejected(true);
                  }}
                >
                  <i className="fas fa-times"></i> Reject
                </button>
              </>
            )}
            {hasAccepted && (
              <div className="text-green text-lg mr-2 rounded-lg px-2 py-1 w-20">
                Accepted!
              </div>
            )}
            {hasRejected && (
              <button className="text-green text-lg mr-2 rounded-lg px-2 py-1 w-20">
                Rejected!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionInvitationCard;
