import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ApiConfig from "../../utils/ApiConfig";

const NetworkPanel = () => {
  const navigate = useNavigate();
  const [influence, setInfluence] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsExpanded(true);
    }
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (accessToken === null) {
      navigate("/auth");
    }
    axios
      .get(ApiConfig.yourInfluence, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setInfluence(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="network-panel flex flex-col w-full border border-gray bg-white rounded-lg shadow-sm p-4 gap-y-4">
      <div className="network-panel-header flex flex-row justify-between items-center">
        <p className="text-lg">Your Influence</p>
      </div>
      <div className="network-panel-body flex flex-col justify-center items-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-2 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row items-center justify-between gap-x-2">
                <i className="fas fa-user-plus text-xs"></i>
                <p className="text-lg font-light">Connections</p>
              </div>
              <p className="text-lg text-gray">{influence.connection_count}</p>
            </div>
            {isExpanded && (
              <>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center justify-between gap-x-2">
                    <i className="fas fa-users text-xs"></i>
                    <p className="text-lg font-light">Followers</p>
                  </div>
                  <p className="text-lg text-gray">
                    {influence.follower_count}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center justify-between gap-x-2">
                    <i className="fas fa-plus text-xs"></i>
                    <p className="text-lg font-light">Your Posts</p>
                  </div>
                  <p className="text-lg text-gray">{influence.feed_count}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center justify-between gap-x-2">
                    <i className="fas fa-comments text-xs"></i>
                    <p className="text-lg font-light">Post Impressions</p>
                  </div>
                  <p className="text-lg text-gray">{influence.action_count}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center justify-between gap-x-2">
                    <i className="fas fa-bullhorn text-xs"></i>
                    <p className="text-lg font-light">Influence</p>
                  </div>
                  <p className="text-lg text-gray">
                    {influence.influence_percentage}%
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center justify-between gap-x-2">
                    <i className="fas fa-chain text-xs"></i>
                    <p className="text-lg font-light">Network Strength</p>
                  </div>
                  <p className="text-lg text-gray">
                    {influence.feed_action_percentage}%
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center justify-between gap-x-2">
                    <i className="fas fa-rss text-xs"></i>
                    <p className="text-lg font-light">Reach</p>
                  </div>
                  <p className="text-lg text-gray">{influence.reach}</p>
                </div>
              </>
            )}
            <div
              className="flex flex-row justify-center items-center w-full cursor-pointer"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <p className="text-lg font-light">
                {isExpanded ? "Hide Details" : "Show Details"}
              </p>
              <i
                className={
                  "fas fa-chevron-" + (isExpanded ? "up" : "down") + " ml-2"
                }
              ></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkPanel;
