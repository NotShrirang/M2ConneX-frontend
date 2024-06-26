import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiConfig from "../../utils/ApiConfig";
import KeywordInput from "./keywordInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ fetchFeed }) => {
  const [showModal, setShowModal] = useState(false);

  const [feedData, setFeedData] = useState({
    subject: "",
    body: "",
    images: "",
    connectionOnly: false,
    charCount: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (feedData.body.length === 0) {
      toast.error("Body cannot be empty", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (feedData.subject.length === 0) {
      // setError("");
      toast.error("Please add at least one keyword", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }

    const data = {
      subject: feedData.subject,
      body: feedData.body,
      images: feedData.images.split(";"),
      isPublic: !feedData.connectionOnly,
    };

    console.log(data);

    axios
      .post(ApiConfig.feed + "/", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setFeedData({
          subject: "",
          body: "",
          images: "",
          connectionOnly: false,
          charCount: 0,
        });

        fetchFeed({ next: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full h-[6rem] my-3 flex justify-center items-center border-b-2 border-gray">
        <div
          className="w-[90%] h-[4rem] flex justify-start gap-x-3 items-center rounded-[4rem] bg-white border-[#bc383e] border-2 hover:cursor-pointer hover:text-white transition-all duration-300 hover:bg-[#f4f2ee]"
          onClick={() => {
            document.title = "Write Post | MMCOE Alumni Portal";
            setShowModal(true);
          }}
        >
          <div className="border-[#bc383e] border-2 ml-2 flex justify-center items-center rounded-[2rem] w-[3rem] h-[3rem] ">
            <i
              className="fa-solid fa-plus fa-xl"
              style={{ color: "#bc383e" }}
            ></i>
          </div>
          <button className="">
            <p className="text-xl text-[#bc383e] tracking-wider">
              What is happening?!
            </p>
          </button>
        </div>
        {showModal ? (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
              onClick={() => {
                document.title = "Feed | MMCOE Alumni Portal";
                setShowModal(false);
              }}
            >
              <div
                className="flex flex-col items-center justify-center gap-y-4 w-[65%] h-[95%] bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="flex items-center justify-between w-full p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font=semibold">Create Post</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </button>
                </div>
                <div className="flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-scroll p-4">
                  <div className="">
                    <form
                      className="rounded w-full flex flex-col"
                      onSubmit={handleSubmit}
                    >
                      <textarea
                        name=""
                        id=""
                        cols="20"
                        rows="10"
                        className="rounded w-full border border-gray outline-gray justify-center items-center p-4"
                        placeholder="Share your thoughts..."
                        value={feedData.body}
                        onChange={(e) => {
                          if (e.target.value.length > 3600) {
                            return;
                          }
                          setFeedData({
                            ...feedData,
                            body: e.target.value,
                            charCount: e.target.value.length,
                          });
                        }}
                      ></textarea>
                      <div className="flex flex-col justify-between p-4">
                        <p className="text-sm">Add Images</p>
                        <KeywordInput
                          value={feedData.images}
                          setValue={(e) => {
                            setFeedData({
                              ...feedData,
                              images: e,
                            });
                          }}
                          flex={"col"}
                          itemsAlignment={"start"}
                          links={true}
                          placeholder={
                            "Type and press Enter to add image links..."
                          }
                        />
                      </div>
                      <div className="flex flex-col justify-between p-4">
                        <p className="text-sm">Add Keywords</p>
                        <KeywordInput
                          value={feedData.subject}
                          setValue={(e) => {
                            setFeedData({ ...feedData, subject: e });
                          }}
                          flex={"wrap"}
                          itemsAlignment={"center"}
                          links={false}
                          placeholder={
                            "Type and press Enter to add keywords..."
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center p-2 ml-2">
                        <div className="flex justify-start items-center gap-x-2">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="w-5 h-5"
                            checked={feedData.connectionOnly}
                            onChange={(e) => {
                              setFeedData({
                                ...feedData,
                                connectionOnly: e.target.checked,
                              });
                            }}
                          />
                          <p className="text-sm">Connection-Only</p>
                        </div>
                        <p className="text-sm">
                          {feedData.charCount}/3600 Characters
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center justify-end w-full border border-gray p-6 rounded-b">
                  <button
                    className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                    type="button"
                    onClick={() => {
                      document.title = "Feed | MMCOE Alumni Portal";
                      setShowModal(false);
                      setFeedData({
                        subject: "",
                        body: "",
                        images: "",
                        connectionOnly: false,
                        charCount: 0,
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary text-white px-6 py-2 uppercase text-lg rounded border border-gray shadow-sm hover:shadow-lg hover:bg-[#f4f2ee] hover:text-primary transition-all duration-300 ease-in-out"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
