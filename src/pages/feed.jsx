import React from "react";
import Post from "../components/feed/post";
import CreatePost from "../components/feed/CreatePost";
import AddPeopleCard from "../components/feed/AddPeople";
import Arrow from "../assets/arrow.svg";
import RecommendationBlogs from "../components/feed/RecommendationBlogs";
import Modal from "../components/feed/PostModal";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [feed, setFeed] = useState({});
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeed({ next: null });
    fetchPeople({ next: null });
  }, []);

  const fetchFeed = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (next == null) {
      // setIsLoading(true);
      axios
        .get(ApiConfig.recommendFeed + "/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFeed(res.data);
          setIsLoading(false);
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
          console.log(res.data);
          setFeed((prevFeed) => {
            return {
              ...res.data,
              results: [...prevFeed.results, ...res.data.results],
            };
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          console.log(res.data);
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
          console.log(res.data);
          setPeople((prevPeople) => {
            return {
              ...res.data,
              results: [...prevPeople.results, ...res.data.results],
            };
          });
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
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex  justify-center items-start ">
          <div className="w-1/3 mx-4 rounded-md  my-2 flex flex-col justify-center items-center pb-4 shadow-lg">
            <div className=" w-full text-center font-medium  py-2 text-xl">
              <p>Recent Blogs</p>
            </div>

            <RecommendationBlogs />
            <div className="flex justify-center items-center mt-4 h-[2rem] gap-x-3">
              <p className="text-[#2051FF] text-base">Read more blogs</p>
              <img src={Arrow} alt="" className="mt-1" />
            </div>
          </div>

          <div className="w-[60%] flex flex-col items-center border-x-2 border-[#9D9494] bg-[#EFFBFA] mx-6">
            <CreatePost fetchFeed={fetchFeed} />
            {!isLoading &&
              feed.results.map((post) => (
                <Post post={post} fetchFeed={fetchFeed} key={post.id} />
              ))}
            {feed.next && (
              <button
                className="w-full h-12 my-4 text-black font-medium rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  fetchFeed({ next: feed.next });
                }}
              >
                <i className="fa-solid fa-arrow-down m-2"></i>
                Load More
              </button>
            )}
          </div>

          <div className="suggestions-and-more flex flex-col md:w-2/5 w-[80%] px-6 md:max-w-sm pb-8 md:pb-0">
            <div className="suggestions rounded-lg bg-white mt-8 drop-shadow-sm shadow-sm border border-gray">
              <p className="px-6 py-5 text-xl">People also viewed</p>
              {people.results &&
                people.results.map((person, index) => (
                  <div className="flex flex-col pl-6 pr-4 py-2" key={person.id}>
                    <div className="flex">
                      <div className="w-[60px] h-[60px] rounded-full">
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
                          <span className="font-semibold text-lg">
                            {person.firstName} {person.lastName}
                          </span>
                          <p className="text-gray-400 text-[14px]">
                            {person.bio && person.bio}
                            {!person.bio &&
                              person.department &&
                              "Department of " + DEPARTMENTS[person.department]}
                            {!person.bio &&
                              !person.department &&
                              "Alumni Portal User"}
                          </p>
                          {person.mutualConnections.length > 0 && (
                            <p className="text-gray-400 text-[14px]">
                              {person.mutualConnections.length} mutual
                              connections
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
                    {index != people.length - 1 && (
                      <hr className="w-11/12  h-[1px] border-gray mx-auto mt-4" />
                    )}
                  </div>
                ))}
              {people.next && (
                <p
                  className="text-center mt-2 pt-2 pb-2 cursor-pointer border-t border-gray hover:bg-[#ebebebeb]"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchPeople({ next: people.next });
                  }}
                >
                  Show more
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
