import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiConfig from "../../utils/ApiConfig";
import KeywordInput from "./keywordInput";

const CreatePost = ({ fetchFeed }) => {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [connectionOnly, setConnectionOnly] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }

    const data = {
      subject: subject,
      body: body,
      images: images.split(";"),
      isPublic: !connectionOnly,
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
        setSubject("");
        setBody("");
        setImages([]);
        setConnectionOnly(false);

        fetchFeed({ next: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full h-[6rem] my-4 flex justify-center items-center border-b-2 border-[#9D9494]">
        <div
          className="w-[90%] h-[4rem] flex justify-start items-center gap-x-[9rem] rounded-[4rem] bg-white border-[#bc383e] border-2 hover:cursor-pointer hover:text-white transition-all duration-300"
          onClick={() => setShowModal(true)}
        >
          <div className=" border-[#bc383e] border-2 ml-4 flex justify-center items-center rounded-[2rem] w-[3rem] h-[3rem] ">
            <i
              className="fa-solid fa-plus fa-xl"
              style={{ color: "#bc383e" }}
            ></i>
          </div>
          <button className="">
            <p className="text-xl text-[#bc383e] tracking-wider">
              Share your thoughts
            </p>
          </button>
        </div>
        {showModal ? (
          <>
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
                    <form className="rounded w-full" onSubmit={handleSubmit}>
                      <textarea
                        name=""
                        id=""
                        cols="20"
                        rows="10"
                        className="rounded w-full p-4 border-none outline-gray resize-none"
                        placeholder="Share your thoughts"
                        value={body}
                        onChange={(e) => {
                          if (e.target.value.length > 1000) {
                            return;
                          }
                          setBody(e.target.value);
                          setCharCount(e.target.value.length);
                        }}
                      ></textarea>
                      <div className="flex flex-col justify-between p-4">
                        <p className="text-sm">Add Images</p>
                        <KeywordInput
                          value={images}
                          setValue={setImages}
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
                          value={subject}
                          setValue={setSubject}
                          flex={"wrap"}
                          itemsAlignment={"center"}
                          links={false}
                          placeholder={
                            "Type and press Enter to add keywords..."
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <div className="flex justify-start items-center gap-x-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="w-5 h-5"
                            checked={connectionOnly}
                            onChange={(e) => {
                              setConnectionOnly(e.target.checked);
                            }}
                          />
                          <p className="text-sm">Connection-Only</p>
                        </div>
                        <p className="text-sm">{charCount}/1000 Characters</p>
                      </div>
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setBody("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-primary text-white w-[5rem] h-[2rem] uppercase text-sm font-bold rounded"
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
    </>
  );
};

export default CreatePost;
