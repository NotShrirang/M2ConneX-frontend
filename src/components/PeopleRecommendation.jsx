import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import DEPARTMENTS from "../utils/departments";

const PeopleRecommendation = ({ profileUserId, flex = "col" }) => {
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
        fetchPeople({ next: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="suggestions-and-more h-full flex flex-col max-md:w-full max-lg:pb-0 lg:w-full self-start">
      <div className="suggestions rounded-lg bg-white flex flex-col drop-shadow-sm shadow-sm border border-gray p-6 gap-y-6 w-full h-full lg:w-full">
        <p className="text-xl">You may also know</p>
        <div
          className={`flex flex-${flex} w-full h-full ${
            flex == "wrap" && "justify-start items-start"
          }`}
        >
          {people.results &&
            people.results
              .filter((person) => person.id != profileUserId)
              .map((person, index) => (
                <div
                  className={`flex flex-${flex} h-full ${
                    flex == "wrap"
                      ? "lg:w-[25%] md:w-[50%] sm:w-full max-sm:w-full p-2"
                      : "lg:w-full py-2"
                  }`}
                  key={person.id}
                >
                  <div
                    className={`flex flex-${
                      flex == "col" ? "row" : "col"
                    } gap-x-4 w-full ${
                      flex == "wrap" &&
                      "rounded-lg border border-gray p-4 h-[20rem] justify-between items-center"
                    }`}
                  >
                    <div
                      className={`${
                        flex == "col"
                          ? "w-[60px] h-[60px]"
                          : "max-w-[120px] h-[120px] border border-gray"
                      } rounded-full cursor-pointer flex flex-row items-start justify-center ${
                        flex == "wrap" && "justify-center items-center"
                      }`}
                      onClick={() => {
                        navigate("/users/" + person.id);
                        window.location.reload();
                      }}
                    >
                      {person.profilePicture && (
                        <img
                          src={person.profilePicture}
                          alt=""
                          className={`${
                            flex == "col"
                              ? "max-w-[48px] h-[48px]"
                              : "max-w-[100px] h-[100px]"
                          } rounded-full`}
                        />
                      )}
                      {!person.profilePicture && (
                        <i className="fas fa-user-circle text-5xl"></i>
                      )}
                    </div>
                    <div
                      className={`flex flex-col items-left w-full h-full ${
                        flex == "wrap" && "justify-between items-center"
                      }`}
                    >
                      <div
                        className={`flex flex-col ${
                          flex == "wrap" &&
                          "justify-between items-center w-full mt-4"
                        }`}
                      >
                        <span
                          className="font-semibold text-lg cursor-pointer hover:underline"
                          onClick={() => {
                            navigate("/users/" + person.id);
                            window.location.reload();
                          }}
                        >
                          {person.firstName} {person.lastName}
                        </span>
                        <p
                          className={`text-gray-400 text-[14px] cursor-pointer ${
                            flex == "wrap" &&
                            "flex justify-center items-center w-full text-center"
                          }`}
                          onClick={() => {
                            navigate("/users/" + person.id);
                            window.location.reload();
                          }}
                        >
                          {person.bio &&
                            person.bio.slice(0, 70) +
                              (person.bio.length > 70 ? "..." : "")}
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
                  {index != people.results.length - 1 && flex == "col" && (
                    <hr className="w-11/12  h-[1px] border-gray mx-auto mt-4" />
                  )}
                  {index == people.results.length - 1 && flex == "col" && (
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
    </div>
  );
};

export default PeopleRecommendation;
