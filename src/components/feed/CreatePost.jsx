import React, { useState } from "react";

const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  return (
    <>
      <div className="w-full h-[6rem] my-4 flex justify-center items-center border-b-2  border-[#9D9494]">
        <div className="w-[90%] h-[4rem] flex justify-start items-center gap-x-[9rem] rounded-[4rem] border-[#bc383e] border-2" onClick={() => setShowModal(true)}>
          <div className=" border-[#bc383e] border-2 ml-4 flex justify-center items-center rounded-[2rem] w-[3rem] h-[3rem]">
            <i
              className="fa-solid fa-user fa-xl"
              style={{ color: "#bc383e" }}
            ></i>
          </div>
          <button className="" >
            <p className="text-xl text-[#bc383e] tracking-wider" >
              Share your thoughts
            </p>
          </button>
        </div>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-auto w-1/4">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-2xl font=semibold">Create Post</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                        <i class="fa-solid fa-xmark"></i>
                      </span>
                    </button>
                  </div>
                  <div className="" >
                    <form className="rounded w-full">
                      <textarea name="" id="" cols="20" rows="10" className="p-4 border-none outline-none resize-none" placeholder="Share your thoughts" onChange={(e) => setContent(e.target.value)}></textarea>
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-primary text-white w-[5rem] h-[2rem] uppercase text-sm font-bold rounded"
                      type="button"
                      onClick={() => setShowModal(false)}
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
