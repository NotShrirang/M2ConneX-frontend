import React from "react";
import Post from "../components/feed/post";
import CreatePost from "../components/feed/CreatePost";
import AddPeopleCard from "../components/feed/AddPeople";
import Arrow from '../assets/arrow.svg'
import RecommendationBlogs from "../components/feed/RecommendationBlogs";

const Feed = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">

        <div className="w-full flex  justify-center items-start ">
        <div className="w-1/3 mx-4 rounded-md  my-2 flex flex-col justify-center items-center pb-4 shadow-lg">
            <div className=" w-full text-center font-medium  py-2 text-xl">
              <p>Recent Blogs</p>
            </div>
            <RecommendationBlogs/>
            <div className="flex justify-center items-center mt-4 h-[2rem] gap-x-3">
            <p className="text-[#2051FF] text-base">Read more blogs</p>
            <img src={Arrow} alt="" className="mt-1" />
            </div>
          </div>

          <div className="w-[60%] flex flex-col items-center border-x-2 border-[#9D9494] mx-6">
            <CreatePost />
            <Post />
          </div>

          <div className="w-1/3 mx-4 rounded-md  my-2 flex flex-col justify-center items-center pb-4 shadow-lg">
            <div className=" w-full text-center font-medium  py-2 text-xl">
              <p>Recommendations</p>
            </div>
            <AddPeopleCard/>
            <AddPeopleCard/>
            <AddPeopleCard/>
            <AddPeopleCard/>
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
