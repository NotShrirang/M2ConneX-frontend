import React from "react";
import { useState, useEffect } from "react";
import BlogPost from "../components/Blogpost";

import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import { NavLink, useNavigate } from "react-router-dom";
import formatDate from "../utils/date";
import College from "../assets/college.png";


const recommended = ['Machine learning', 'Data science', 'Web development', 'App development', 'Competitive coding', 'Cyber security', 'Artificial intelligence', 'Blockchain', 'Internet of things', 'Cloud computing', 'DevOps', 'Big data', 'Robotics', 'Augmented reality', 'Virtual reality', 'Quantum computing', '5G', 'Edge computing', 'Biometrics', 'Neural networks', 'Computer vision', 'Natural language processing'];
const dummyBlogData = {
  results: [
    {
      id: 1,
      title: "Sample Blog Title 1",
      authorFirstName: "John",
      authorLastName: "Doe",
      createdAt: "2022-01-01T12:00:00Z",
      image: "https://dummyimage.com/300",
      category: "Frontend development",
    },
    {
      id: 2,
      title: "Sample Blog Title 2",
      authorFirstName: "Jane",
      authorLastName: "Smith",
      createdAt: "2022-01-02T10:30:00Z",
      image: "https://dummyimage.com/300",
      category: "Backend development",
    },
    {
      id: 3,
      title: "Sample Blog Title 3",
      authorFirstName: "Bob",
      authorLastName: "Johnson",
      createdAt: "2022-01-03T15:45:00Z",
      image: "https://dummyimage.com/300",
      category: "fulstack development",
    },
    // Add more blog entries as needed
  ],
};


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
      <div className="w-full flex-col justify-center items-start min-h-full my-6 ">
        <div className=" flex justify-start items-center gap-x-2 mx-6">
          <NavLink to="/blogs" className={({ isActive }) =>
            isActive
              ? "px-4 py-1 border-b "
              : "px-4 py-1 hover:text-red transition-all duration-300"
          }>For you</NavLink>
          <NavLink to="/blogs/following" className={({ isActive }) =>
            isActive
              ? "px-4 py-1 border-b "
              : "px-4 py-1 hover:text-red transition-all duration-300"
          }>Following</NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
          {isLoading &&
            [...Array(6)].map((item, index) => (
              <BlogPost
                img={""}
                title={"Loading..."}
                author={"Loading..."}
                date={"Loading..."}
                category={"Loading..."}
                blog={{}}
              />
            ))}
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[60%] flex flex-col justify-center items-center">
            {dummyBlogData.results &&
              dummyBlogData.results.map((blog) => (
                <BlogPost
                  img={blog.image ? blog.image : College}
                  title={blog.title}
                  author={blog.authorFirstName + " " + blog.authorLastName}
                  date={formatDate(blog.createdAt)}
                  category={blog.category}
                  blog={blog}
                />
              ))}
          </div>

          <div className="w-[30%] h-screen border-2">

              <h2 className="font-semibold mx-4">Recommended topics</h2> 
            <div className="flex justify-start items-center flex-wrap gap-y-2 gap-x-2 px-8">
              {recommended.map((item) => (
            <p className="bg-[#ebebeb] p-2 text-sm font-semibold rounded-[1rem]">
              {item}
            </p>))}
            </div>
          </div>
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
