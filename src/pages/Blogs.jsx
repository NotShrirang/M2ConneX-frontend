import React from "react";
import { useState, useEffect } from "react";
import BlogPost from "../components/Blogpost";

import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/date";
import College from "../assets/college.png";

function Blogs() {
  const [blogs, setBlogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs({ next: null });

    document.title = "Blogs | MMCOE Alumni Portal";
  }, []);

  const fetchBlogs = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (next == null) {
      setIsLoading(true);
      axios
        .get(ApiConfig.blogs, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setBlogs(res.data);
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
          setBlogs((prevBlogs) => {
            return {
              ...res.data,
              results: [...prevBlogs.results, ...res.data.results],
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
      <div className="w-full flex justify-center items-start min-h-full my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 h">
          {blogs.results &&
            blogs.results.map((blog) => (
              <BlogPost
                img={blog.image ? blog.image : College}
                title={blog.title}
                author={blog.authorFirstName + " " + blog.authorLastName}
                date={formatDate(blog.createdAt)}
                category={"#" + String(blog.keywords).split(",").join(" #")}
                blog={blog}
              />
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center my-8">
        {blogs.next && (
          <button
            className="bg-primary text-white font-semibold px-4 py-2 rounded-full"
            onClick={() => {
              fetchBlogs({ next: blogs.next });
            }}
          >
            <i className="fa-solid fa-arrow-down mr-2"></i>
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default Blogs;
