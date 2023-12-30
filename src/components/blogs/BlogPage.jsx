import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../utils/ApiConfig";
import ConnectButton from "../connections/ConnectButton";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    setIsLoading(true);
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

    console.log({
      action: "like",
      user: userId,
      blog: blogId,
    });

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
    <div className="w-full flex justify-center items-start">
      <div className="flex flex-col my-6 w-[50%]">
        <h1 className="text-left font-extrabold tracking-tighter text-4xl/[4rem] font-['Arial']">
          {blog.title}
        </h1>
        <div className="flex justify-start items-center gap-x-2 mt-4">
          <div className="w-[3.5rem] h-[3.5rem] flex justify-center items-center rounded-[2rem] border-[#dedede] border-[1px]">
            <img
              src={blog.authorProfilePicture}
              className="rounded-full border border-black cursor-pointer"
              onClick={() => {
                navigate("/users/" + blog.author);
                window.location.reload();
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-start gap-x-2">
              <h3
                className="font-semibold text-xl hover:cursor-pointer hover:text-blue hover:underline transition-all duration-300"
                onClick={() => {
                  navigate("/users/" + blog.author);
                  window.location.reload();
                }}
              >
                {blog.authorFirstName + " " + blog.authorLastName}
              </h3>
              <div className="w-1 h-1 rounded-full bg-[#757575]"></div>
              <ConnectButton userId={blog.author} />
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
        <div className="flex justify-start items-center gap-x-2 mt-4 border-t border-b border-gray p-2">
          <div className="flex items-center justify-start gap-x-2 text-[#757575]">
            <div
              className="flex items-center justify-start gap-x-2 text-[#757575] hover:cursor-pointer hover:text-primary"
              onClick={handleBlogLike}
            >
              <i className="fa-solid fa-arrow-up fa-lg"></i>
              Like
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
        <div className="text-center">
          <img
            src={blog.image}
            alt={blog.title}
            className="img-fluid"
            style={{ maxHeight: "500px" }}
          />
        </div>
        <div
          className="my-5"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
};

export default BlogPage;
