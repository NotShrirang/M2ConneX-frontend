import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogPost from "../components/Blogpost";
import ApiConfig from "../utils/ApiConfig";
import formatDate from "../utils/date";
import College from "../assets/college.png";

const recommended = [
  "Machine learning",
  "Data science",
  "Web development",
  "App development",
  "Competitive coding",
  "Cyber security",
  "Artificial intelligence",
  "Blockchain",
  "Internet of things",
  "Cloud computing",
  "DevOps",
  "Big data",
  "Robotics",
  "Augmented reality",
  "Virtual reality",
  "Quantum computing",
  "5G",
  "Edge computing",
  "Biometrics",
  "Neural networks",
  "Computer vision",
  "Natural language processing",
];

function Blogs() {
  const [blogs, setBlogs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchBlogs({ next: null });
    setIsLoading(false);

    document.title = "Blogs | MMCOE Alumni Portal";
  }, []);

  const fetchBlogs = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (next == null) {
      axios
        .get(ApiConfig.blogs, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setBlogs(res.data);
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-start gap-x-8 min-h-full my-6">
        <div className="w-full md:w-[60%] flex flex-col">
          <div className="flex justify-between items-center md:w-[95%]">
            <div className=" flex justify-start items-center gap-x-2 mx-6">
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-1 border-b "
                    : "px-4 py-1 hover:text-red transition-all duration-300"
                }
              >
                For you
              </NavLink>
              <NavLink
                to="/blogs/following"
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-1 border-b "
                    : "px-4 py-1 hover:text-red transition-all duration-300"
                }
              >
                Your Drafts
              </NavLink>
            </div>
            <Link to="/write-blog">
              <button className="flex justify-start items-center gap-x-1">
                Write
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-start m-4">
            <div className="w-full md:w-full flex flex-col justify-center items-center">
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
              {blogs.results &&
                blogs.results.map((blog) => (
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
          </div>
        </div>
        <div className="hidden md:block w-[30%] h-screen border-2">
          <h2 className="font-semibold mx-4">Recommended topics</h2>
          <div className="flex justify-start items-center flex-wrap gap-y-2 gap-x-2 px-8">
            {recommended.map((item) => (
              <p className="bg-[#ebebeb] p-2 text-sm font-semibold rounded-[1rem]">
                {item}
              </p>
            ))}
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
