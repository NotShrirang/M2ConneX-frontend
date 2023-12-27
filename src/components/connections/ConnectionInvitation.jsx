import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import ConnectionInvitationCard from "./ConnectionInvitationCard";
import ApiConfig from "../../utils/ApiConfig";
import DEPARTMENTS from "../../utils/departments";

const ConnectionInvitation = () => {
  const navigate = useNavigate();
  const [connectionInvitation, setConnectionInvitation] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (accessToken === null) {
      navigate("/auth");
    }
    axios
      .get(ApiConfig.connection + "/?status=pending&userB=" + userId, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setConnectionInvitation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAccept = async ({ connectionId }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/auth");
    }
    axios
      .post(
        ApiConfig.connectionRequestAccept,
        {
          connectionId: connectionId,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error accepting connection request");
      });
  };

  const handleReject = async ({ connectionId }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/auth");
    }
    axios
      .post(
        ApiConfig.connectionRequestReject,
        {
          connectionId: connectionId,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error rejecting connection request");
      });
  };

  return (
    <div className="network-panel flex flex-col w-full border border-gray bg-white rounded-lg shadow-sm p-4">
      <ToastContainer />
      <div className="network-panel-header flex flex-row justify-between items-center w-full">
        <p className="text-lg">Connection Requests</p>
        <button className="text-blue-500 text-sm">See All</button>
      </div>
      <div className="flex flex-col justify-start items-center w-full">
        {connectionInvitation.results &&
          connectionInvitation.results.length > 0 &&
          connectionInvitation.results.map((connection) => {
            if (connection.userADetails != null) {
              return (
                <ConnectionInvitationCard
                  connection={connection}
                  handleAccept={handleAccept}
                  handleReject={handleReject}
                />
              );
            }
          })}
        {connectionInvitation.results &&
          connectionInvitation.results.length == 0 && (
            <div className="flex flex-col justify-center items-center w-full">
              <p className="text-gray-400 text-lg">No connection requests</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ConnectionInvitation;
