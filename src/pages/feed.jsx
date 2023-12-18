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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeed({ next: null });
  }, []);

  const fetchFeed = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (next == null) {
      setIsLoading(true);
      axios
        .get(ApiConfig.feed + "/", {
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

          <div className="w-1/3 mx-4 rounded-md  my-2 flex flex-col justify-center items-center pb-4 shadow-lg">
            <div className=" w-full text-center font-medium  py-2 text-xl">
              <p>Recommendations</p>
            </div>
            <AddPeopleCard />
            <AddPeopleCard />
            <AddPeopleCard />
            <AddPeopleCard />
            <div className="flex justify-center items-center mt-4 h-[2rem] gap-x-3">
              <p className="text-[#2051FF] text-base">Find more people</p>
              <img src={Arrow} alt="" className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
