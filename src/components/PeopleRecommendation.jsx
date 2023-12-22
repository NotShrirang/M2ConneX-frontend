import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import DEPARTMENTS from "../utils/departments";

const PeopleRecommendation = ({ profileUserId }) => {
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPeople({ next: null });
  }, []);

  const fetchPeople = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (next == null) {
      axios
        .get(ApiConfig.recommendedConnection, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          // console.log(res.data.results);
          setPeople(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(next, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          // console.log(res.data.results);
          setPeople(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleConnect = (e, person) => {
    e.preventDefault();
    console.log("Connect");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }

    axios
      .post(
        ApiConfig.connectionRequest,
        {
          userB: person.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchPeople();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="suggestions-and-more flex flex-col md:w-2/5 px-6 md:max-w-sm pb-8 md:pb-0">
      <div className="suggestions rounded-lg bg-white mt-8 drop-shadow-sm shadow-sm border border-gray">
        <p className="px-6 py-5 text-xl">You may also know</p>
        {people.results &&
          people.results
            .filter((person) => person.id != profileUserId)
            .map((person, index) => (
              <div className="flex flex-col pl-6 pr-4 py-2" key={person.id}>
                <div className="flex">
                  <div
                    className="w-[60px] h-[60px] rounded-full cursor-pointer"
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
                  <div className="ml-4">
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
                        {person.bio && person.bio.slice(0, 100) + "..."}
                        {!person.bio &&
                          person.department &&
                          "Department of " + DEPARTMENTS[person.department]}
                        {!person.bio &&
                          !person.department &&
                          "Alumni Portal User"}
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
                {index != people.results.length - 1 && (
                  <hr className="w-11/12  h-[1px] border-gray mx-auto mt-4" />
                )}
                {index == people.results.length - 1 && (
                  <hr className="w-11/12 border-white mx-auto mt-4" />
                )}
              </div>
            ))}
        {people.next && (
          <p className="text-center mt-2 pt-2 pb-2 cursor-pointer border-t border-gray hover:bg-[#ebebebeb]">
            Show More
          </p>
        )}
      </div>
    </div>
  );
};

export default PeopleRecommendation;
