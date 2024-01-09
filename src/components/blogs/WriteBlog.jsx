import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiConfig from "../../utils/ApiConfig";

function WriteBlog() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    setIsLoading(false);
  }, []);

  const handlePublish = () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .post(ApiConfig.blogs, blog, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setBlog(res.data);
        navigate("/blogs/" + res.data.id);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";
    setBlog({ ...blog, content: e.target.value });
  };

  return (
    <>
      <div className="relative w-full h-full lg:flex justify-center items-start bg-white py-2">
        <div className="w-full lg:w-1/2">
          <div>
            <input
              type="text"
              className="text-cemter font-extrabold text-4xl/[4rem] font-['Montersatt'] w-full borfder-none outline-none"
              placeholder="Title"
              value={blog.title || ""}
              onChange={(e) => {
                setBlog({ ...blog, title: e.target.value });
              }}
            />
            <div className="flex gap-x-4">
              <div>
                <button
                  className="bg-gray hover:bg-primary transition-all duration-300 rounded text-white p-2"
                  onClick={handlePublish}
                >
                  Publish
                </button>
              </div>
              <div>
                <button className="bg-gray hover:bg-primary transition-all duration-300 rounded text-white p-2">
                  Save Draft
                </button>
              </div>
            </div>
          </div>
          <div>
            <textarea
              name=""
              id=""
              cols="20"
              rows={5}
              className="text-xl/7 w-full font-[Times] tracking-wider text-left outline-none mt-8 overflow-hidden border-none"
              placeholder="Share your story"
              onInput={handleTextareaInput}
              value={blog.content || ""}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteBlog;
