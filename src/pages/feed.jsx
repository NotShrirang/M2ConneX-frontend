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
import PeopleRecommendation from "../components/PeopleRecommendation";

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
      <div className="w-full flex justify-center items-center bg-[#f4f2ee]">
        <div className="w-full flex justify-center items-start">
          <div className="w-1/5 rounded-lg my-8 flex flex-col justify-center items-center pb-4 shadow-sm border border-gray mx-4 px-8 bg-white">
            <div className="text-center py-2 text-xl">
              <p>Recent Blogs</p>
            </div>

            <RecommendationBlogs />
            <div
              className="flex justify-center items-center mt-4 h-[2rem] gap-x-3 cursor-pointer border-b border-white hover:border-b hover:border-[#2051FF]"
              onClick={() => {
                navigate("/blogs");
              }}
            >
              <p className="text-[#2051FF] text-base">Read more blogs</p>
              <img src={Arrow} alt="" className="mt-1" />
            </div>
          </div>

          <div className="w-[60%] flex flex-col items-center border-x-2 shadow-sm border border-gray bg-white">
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
          <PeopleRecommendation />
        </div>
      </div>
    </>
  );
};

export default Feed;
