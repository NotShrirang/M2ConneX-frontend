import React from "react";
import img from "../assets/college.png";
import img1 from "../assets/instagram.png";
import { useNavigate } from "react-router-dom";

function Blogpost({ img, title, author, date, category, blog }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="border-[1px] border-[#dedede] bg-white shadow-sm w-[100%] rounded h-4/5 flex flex-row-reverse cursor-pointer justify-between hover:bg-[#dedede] hover:border-black hover:border-[1px] transition-all duration-300 my-1"
        onClick={() => {
          navigate("/blogs/" + blog.id);
        }}
      >
        <div className="w-[30%] cursor-pointer rounded-3xl overflow-hidden items-center justify-center flex">
          <img
            src={img}
            alt=""
            width="100px"
            className="rounded-3xl aspect-w-full aspect-h-full object-cover"
          />
        </div>
        <div className="w-[70%] p-4 flex flex-col items-between justify-center rounded-3xl">
          <div className="my-2 flex items-center justify-start gap-x-2">
            <div className="w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-[2rem] border-[#dedede] border-[1px]">
              <img
                src={blog.authorProfilePicture}
                className="rounded-full border border-black"
              />
            </div>
            <h3 className="">{author}</h3>
            <p className="text-black text-sm">{date}</p>
          </div>
          <div className="px-2">
            <p
              className="text-lg text-left font-semibold hover:cursor-pointer hover:text-primary transition-all duration-300"
              onClick={() => {
                navigate("/blogs/" + blog.id);
              }}
            >
              {title}
            </p>
          </div>
          <div className="flex justify-start gap-x-1 items-center my-2">
            <p className="px-2 flex text-sm font-semibold py-[0.2rem] rounded-[1rem]">
              {blog.keywords &&
                blog.keywords
                  .split(",")
                  .map((keyword) => (
                    <p className="bg-[#ebebebeb] px-2 text-sm font-semibold py-[0.125rem] rounded-[1rem]">
                      #{keyword}
                    </p>
                  ))}
            </p>
            <div className="w-1 h-1 rounded-full bg-[#757575]"></div>
            <p className="text-black text-xs rounded-3xl px-2 py-1">
              {blog.content && Math.round(blog.content.split(" ").length / 200)}{" "}
              min read
            </p>
          </div>
          <div className="my-2"></div>
          {/* <div className="py-[0.1px] w-[100%] bg-gray" /> */}
        </div>
      </div>
    </>
  );
}

export default Blogpost;
