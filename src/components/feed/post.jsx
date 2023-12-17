import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiConfig from "../../utils/ApiConfig";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
  }, []);

  const handleLike = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (isLiked) {
      axios
        .post(
          ApiConfig.feedActionDislike + "/",
          { feed: post.id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          setIsLiked(false);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .post(
        ApiConfig.feedAction + "/",
        {
          feed: post.id,
          action: "LIKE",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setIsLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-[90%] my-4 border-2 p-3 border-[#9D9494] rounded">
        <div className="flex justify-start items-center gap-x-2">
          <div className=" border-[#bc383e] border-2 ml-4 flex justify-center items-center rounded-[3rem] w-[3.5rem] h-[3.5rem]">
            <i className="fa-solid" style={{ color: "#bc383e" }}>
              <img src={post.profilePicture} alt="" />
            </i>
          </div>
          <div>
            <h2 className="text-xl font-medium">{post.userName}</h2>
            <p className="text-xs">{post.userBio}</p>
          </div>
        </div>
        <div className="my-2">
          <div className="mx-6 text-sm">
            <p>{post.body}</p>
          </div>
          <div className="w-full h-[20rem] bg-[#d4d9d9] my-2 "></div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-x-3">
              <button
                className="flex justify-center items-center gap-x-2"
                onClick={handleLike}
              >
                {!isLiked && (
                  <i
                    className="fa-solid fa-arrow-up fa-lg"
                    style={{ color: "#000" }}
                  ></i>
                )}
                {isLiked && (
                  <i
                    className="fa-solid fa-arrow-up fa-lg"
                    style={{ color: "#FF5555" }}
                  ></i>
                )}
                <span>{post.likesCount}</span>
              </button>

              <button className="flex justify-center items-center gap-x-2">
                <i
                  className="fa-regular fa-comment fa-lg"
                  style={{ color: "#000" }}
                ></i>
                <span>{post.commentsCount}</span>
              </button>

              <button className="flex justify-center items-center gap-x-2">
                <i
                  className="fa-solid fa-retweet fa-lg"
                  style={{ color: "#000", transform: "rotate(90deg)" }}
                ></i>
                <span>{post.sharesCount}</span>
              </button>
            </div>
            <div>
              <button className="flex justify-center items-center gap-x-2">
                <i
                  className="fa-solid fa-share fa-lg"
                  style={{ color: "#000" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
