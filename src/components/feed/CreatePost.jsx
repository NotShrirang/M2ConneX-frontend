import React, { useState } from "react";
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
              className="fixed inset-0 bg-black opacity-60 z-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-auto w-1/2">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
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
                  <div className="">
                    <form
                      className="rounded w-[96.5%] flex flex-col"
                      onSubmit={handleSubmit}
                    >
                      <textarea
                        name=""
                        id=""
                        cols="20"
                        rows="10"
                        className="rounded w-full mt-3 mx-3 p-4 border border-gray outline-gray justify-center items-center"
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
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                      type="button"
                      onClick={() => {
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
            </div>
          </>
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
