import React from "react";
import Post from "../components/feed/post";
import CreatePost from "../components/feed/create_post";

const Feed = () => {
  return (
    <>
      <div className="w-full">
        <div className="w-2/3 mx-auto flex flex-col justify-center items-center">
          <div className="w-2/3 flex flex-col items-center border-x-2 border-[#9D9494]">
            <CreatePost />
            <Post />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
