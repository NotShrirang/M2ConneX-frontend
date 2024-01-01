import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../utils/ApiConfig";
import ConnectButton from "../connections/ConnectButton";
import formatDate from "../../utils/date";
import Markdown from "react-markdown";
import PeopleRecommendation from "../PeopleRecommendation";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
    if (window.innerWidth > 1024) {
      setIsCommenting(true);
    }
  }, []);

  const fetchBlog = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    // setIsLoading(true);
    axios
      .get(ApiConfig.blogs + blogId + "/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBlog(res.data);
        document.title =
          res.data.title +
          " | " +
          res.data.authorFirstName +
          " " +
          res.data.authorLastName;
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlogLike = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }

    if (blog.isLiked) {
      axios
        .post(
          ApiConfig.blogActionDislike,
          {
            blog: blogId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          fetchBlog();
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    if (!blogId) {
      return;
    }

    axios
      .post(
        ApiConfig.blogAction,
        {
          action: "like",
          user: userId,
          blog: blogId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchBlog();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlogComment = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }

    if (!blogId) {
      return;
    }

    axios
      .post(
        ApiConfig.blogAction,
        {
          action: "comment",
          blog: blogId,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchBlog();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isLoading ? (
    <div className="text-center w-full h-screen mt-8">
      <div
        className="flex gap-x-4 items-center justify-center text-center"
        role="status"
      >
        <i className="fa fa-spinner fa-spin"></i>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col justify-center items-center my-6 mb-8 w-full">
      <div className="flex max-md:flex-col md:max-lg:flex-col lg:w-[95%] mx-6">
        <h1 className="text-cemter font-extrabold tracking-tighter text-4xl/[4rem] font-['Montersatt'] w-full">
          {blog.title}
        </h1>
      </div>
      <div className="flex max-md:flex-col md:max-lg:flex-col md:max-lg:items-center lg:w-[95%] mx-6">
        <div className="flex flex-col lg:w-[30%]">
          <div className="flex justify-start items-center gap-x-2 mt-4">
            <div className="w-[3.5rem] h-[3.5rem] flex justify-center items-center rounded-[2rem] border-[#dedede] border-[1px]">
              <img
                src={blog.authorProfilePicture}
                className="rounded-full border border-black cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/users/" + blog.author);
                  window.location.reload();
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-start gap-x-2">
                <h3
                  className="font-semibold text-xl hover:cursor-pointer hover:text-blue hover:underline transition-all duration-300 w-[50%]"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/users/" + blog.author);
                    window.location.reload();
                  }}
                >
                  {blog.authorFirstName + " " + blog.authorLastName}
                </h3>
                <div className="w-1 h-1 rounded-full bg-[#757575]"></div>
                <div className="w-[50%]">
                  <ConnectButton userId={blog.author} />
                </div>
              </div>
              <div className="flex items-center justify-start gap-x-2">
                <p className="text-center text-[#757575]">
                  {Math.round(blog.content.split(" ").length / 200)} min read
                </p>
                <div className="w-1 h-1 rounded-full bg-[#757575]"></div>
                <p className="text-center text-[#757575]">
                  {Date(blog.createdAt).split(" ").slice(1, 3).join(" ")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-x-2 mt-4">
            {blog.keywords &&
              blog.keywords
                .split(",")
                .map((keyword) => (
                  <p className="bg-[#ebebebeb] px-2 text-sm font-semibold py-[0.125rem] rounded-[1rem]">
                    #{keyword}
                  </p>
                ))}
          </div>
          <div className="flex flex-col border-t border-b border-gray p-2 mt-4 lg:w-[90%]">
            <div className="flex justify-start items-center gap-x-2">
              <div className="flex items-center justify-start gap-x-2 text-[#757575]">
                <div
                  className={`flex items-center justify-start gap-x-2 text-[#757575] hover:cursor-pointer hover:text-primary ${
                    blog.isLiked ? "text-primary" : ""
                  }`}
                  onClick={(e) => handleBlogLike(e)}
                >
                  <i className="fa-solid fa-arrow-up fa-lg"></i>
                  <span className="text-[#757575]">{blog.likes.length}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[#757575]"></div>
                <div
                  className={`flex items-center justify-start gap-x-2 text-[#757575] cursor-pointer ${
                    isCommenting ? "text-primary" : ""
                  } hover:text-primary`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCommenting(!isCommenting);
                  }}
                >
                  <i className="fa fa-comment-o fa-lg"></i>
                  <span className="text-[#757575]">{blog.comments.length}</span>
                </div>
              </div>
            </div>
            {isCommenting && (
              <div
                className="max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-full max-lg:bg-black max-lg:bg-opacity-50 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:z-50 lg:flex-row lg:items-center lg:justify-center lg:mt-4 lg:w-full lg:h-10rem lg:border lg:border-gray lg:rounded-lg lg:shadow-sm lg:drop-shadow-sm"
                onClick={() => {
                  setIsCommenting(false);
                }}
              >
                <div
                  className="flex flex-col items-start justify-start lg:justify-start max-lg:w-[65%] max-lg:h-[95%] lg:w-full lg:px-4 bg-white max-lg:border max-lg:border-gray rounded-lg shadow-sm drop-shadow-sm max-lg:z-60"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex justify-between items-center w-full max-lg:px-4 py-2 max-lg:border-b max-lg:border-gray">
                    <h1 className="text-xl font-semibold">Comments</h1>
                    <i
                      className="fa fa-times cursor-pointer lg:hidden"
                      onClick={() => {
                        setIsCommenting(false);
                      }}
                    ></i>
                  </div>
                  <div className="flex flex-col justify-start items-start w-full h-full py-2 overflow-y-auto">
                    <div className="flex justify-start items-start gap-x-4 w-full max-lg:px-4">
                      <div className="flex justify-center items-center w-[90%]">
                        <textarea
                          className="border border-gray rounded-lg px-2 py-2 outline-none w-full"
                          placeholder="Comment"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        className="px-4 py-2 bg-[#dedede] text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBlogComment(e);
                          setComment("");
                        }}
                      >
                        <i className="fa fa-paper-plane"></i>
                      </button>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-y-2 mt-4 overflow-y-scroll overflow-x-hidden w-full h-full">
                      {blog.comments &&
                        blog.comments.map((comment) => (
                          <div className="flex justify-start items-start gap-x-2 max-lg:w-[70%] px-4">
                            <div className="w-[2rem] h-[2rem] flex justify-center items-center rounded-[2rem] border-[#dedede] border-[1px]">
                              <img
                                src={comment.userProfilePicture}
                                className="rounded-full border border-black cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate("/users/" + comment.user);
                                  window.location.reload();
                                }}
                              />
                            </div>
                            <div
                              className="flex flex-col w-full"
                              style={{ wordWrap: "break-word" }}
                            >
                              <div className="flex items-center justify-start gap-x-2">
                                <h3
                                  className="font-semibold text-sm hover:cursor-pointer hover:text-blue hover:underline transition-all duration-300"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/users/" + comment.user);
                                    window.location.reload();
                                  }}
                                >
                                  {comment.userFirstName +
                                    " " +
                                    comment.userLastName}
                                </h3>
                                <div className="w-1 h-1 rounded-full bg-[#757575]"></div>
                                <p className="text-center text-[#757575]">
                                  {formatDate(comment.createdAt)}
                                </p>
                              </div>
                              <div className="flex items-center justify-start gap-x-2 max-lg:w-[50%]">
                                <p
                                  className="text-[#757575]"
                                  style={{ wordWrap: "break-word" }}
                                >
                                  {comment.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-[95%] sm:max-md:w-[95%] lg:w-[90%] mt-8">
            {window.innerWidth > 1024 && <PeopleRecommendation />}
            {window.innerWidth <= 1024 && <PeopleRecommendation flex="row" />}
          </div>
        </div>
        <div className="flex flex-col max-lg:w-[90%] md:max-lg:items-center lg:w-[70%] gap-y-4">
          <div className="max-lg:my-6 border border-gray rounded-lg flex justify-center items-center max-lg:w-[90%]">
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid rounded-lg"
              style={{ maxHeight: "500px" }}
            />
          </div>
          <div className="text-xl/7 max-md:w-[90%] font-[Times] tracking-wider text-left">
            <Markdown>{blog.content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
