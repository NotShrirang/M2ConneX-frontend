import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../utils/ApiConfig";

const ConnectButton = ({ userId }) => {
  const [person, setPerson] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser({ userId });
  }, []);

  const handleConnect = ({ e, userId }) => {
    e.preventDefault();
    if (!userId) {
      console.log("User Id not found");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }

    setIsLoading(true);

    axios
      .post(
        ApiConfig.connectionRequest,
        {
          userB: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUser = ({ userId }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/auth");
    }
    setIsLoading(true);
    axios
      .get(ApiConfig.users + "/" + userId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setPerson(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return (
      <div className="flex">
        <button
          className="border border-gray rounded-l-full rounded-r-full text-gray-500 font-medium w-40 h-10 bg-[#ebebebeb]"
          disabled
        >
          <i className="fa-solid fa-user-plus mr-2 "></i>
          Connect
        </button>
      </div>
    );
  }

  if (person.id == currentUser) {
    return <div className="flex">Connected</div>;
  }
  return (
    <div className="flex">
      {person.isConnected == "not_connected" && (
        <button
          key={person.id}
          className="border border-gray rounded-l-full rounded-r-full text-gray-500 font-medium w-40 h-10 hover:bg-[#ebebebeb] hover:border-2 transition duration-100 ease-in-out"
          onClick={(e) => {
            handleConnect(e, person.id);
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
      {person.isConnected == "connected" && (
        <button
          key={person.id}
          className="border border-gray rounded-l-full rounded-r-full text-gray-500 font-medium w-40 h-10 bg-[#ebebebeb]"
          onClick={(e) => {
            e.preventDefault();
            navigate("/users/" + person.id);
            window.location.reload();
          }}
        >
          <i className="fa-solid fa-user mr-2 "></i>
          View Profile
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
