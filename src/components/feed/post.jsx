import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiConfig from "../../utils/ApiConfig";
import PostCarousel from "./imageCarousel";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isCommentSectionExpanded, setIsCommentSectionExpanded] =
    useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

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

  const fetchComments = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .get(ApiConfig.feedActionComment + "/?feed=" + post.id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCommentSectionExpand = () => {
    setIsCommentSectionExpanded(!isCommentSectionExpanded);
    if (isCommentSectionExpanded) {
      return;
    }
    fetchComments();
  };

  const handleComment = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .post(
        ApiConfig.feedAction + "/",
        {
          feed: post.id,
          action: "COMMENT",
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setComment("");
        fetchComments();
        setIsCommentSectionExpanded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-[90%] my-4 border-2 bg-white p-3 border-[#9D9494] rounded">
        <div className="flex justify-start items-center gap-x-2">
          <div className=" border-[#bc383e] border-2 ml-0 flex justify-center items-center rounded-[3rem] w-[3.5rem] h-[3.5rem]">
            {post.profilePicture && (
              <i className="fa-solid" style={{ color: "#bc383e" }}>
                <img
                  className="w-full h-full object-cover rounded-[2.9rem]"
                  src={post.profilePicture}
                  alt=""
                />
              </i>
            )}
            {!post.profilePicture && (
              <i
                className="fa-solid fa-user fa-xl"
                style={{ color: "#bc383e" }}
              >
                <img src={post.profilePicture} alt="" />
              </i>
            )}
          </div>
          <div>
            <h2 className="text-xl font-medium">{post.userName}</h2>
            <p className="text-xs">{post.userBio}</p>
          </div>
        </div>
        <div className="my-2">
          {post.images.length > 0 && (
            <>
              <div className="my-3 text-[1rem]">
                <p>{post.body}</p>
              </div>
              <div className="w-full h-100 bg-[#d4d9d9] my-4">
                <PostCarousel post={post} />
              </div>
            </>
          )}
          {post.images.length === 0 && (
            <div className="my-3 text-[2rem]">
              <p>{post.body}</p>
            </div>
          )}
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

              <button
                className="flex justify-center items-center gap-x-2"
                onClick={handleCommentSectionExpand}
              >
                {!isCommentSectionExpanded && (
                  <i
                    className="fa-regular fa-comment fa-lg"
                    style={{ color: "#000" }}
                  ></i>
                )}
                {isCommentSectionExpanded && (
                  <i
                    className="fa-regular fa-comment fa-lg"
                    style={{ color: "#FF5555" }}
                  ></i>
                )}
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
        <div
          className={`${
            isCommentSectionExpanded ? "block" : "hidden"
          } w-full border-t-2 border-[#9D9494] mt-2`}
        >
          {/* Comment input bar and send button */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="w-full h-10 px-4 m-1 border-2 border-[#9D9494] rounded-md outline-none focus:border-[#FF5555]"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="flex justify-center items-center gap-x-2"
              onClick={handleComment}
            >
              <i
                className="fa-solid fa-paper-plane fa-lg hover:text-[#FF5555] m-1"
                style={{ color: "#000" }}
              ></i>
            </button>
          </div>
          {comments && (
            <div className="flex flex-col justify-left items-left gap-x-2">
              <div className="m-2 self-center">Comments</div>
              {comments.map((comment) => (
                <div
                  className="flex justify-start items-center gap-x-2 m-1"
                  key={comment.id}
                >
                  <div className=" border-[#bc383e] border-2 ml-4 flex justify-center items-center rounded-[1.5rem] w-[2rem] h-[2rem]">
                    {post.profilePicture && (
                      <i className="fa-solid" style={{ color: "#bc383e" }}>
                        <img
                          className="w-full h-full object-cover rounded-[1.3rem]"
                          src={post.profilePicture}
                          alt=""
                        />
                      </i>
                    )}
                    {!post.profilePicture && (
                      <i
                        className="fa-solid fa-user fa-xl"
                        style={{ color: "#bc383e" }}
                      >
                        <img src={post.profilePicture} alt="" />
                      </i>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xs font-medium">{post.userName}</h2>
                    <p className="text-xs">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
