import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiConfig from "../../utils/ApiConfig";
import PostCarousel from "./imageCarousel";
import KeywordInput from "./keywordInput";

const Post = ({ post, fetchFeed }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isCommentSectionExpanded, setIsCommentSectionExpanded] =
    useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(post.body);
  const [charCount, setCharCount] = useState(post.body.length);
  const [images, setImages] = useState(
    post.images
      .map((item) => item.image)
      .filter((url) => url)
      .join(";")
  );
  const [subject, setSubject] = useState(post.subject);
  const [connectionOnly, setConnectionOnly] = useState(post.isPublic);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
  }, []);

  const handleLike = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (isLiked) {
      axios
        .post(
          ApiConfig.feedActionDislike + "/",
          { feed: post.id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          setIsLiked(false);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .post(
        ApiConfig.feedAction + "/",
        {
          feed: post.id,
          action: "LIKE",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setIsLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComments = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .get(ApiConfig.feedActionComment + "/?feed=" + post.id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCommentSectionExpand = () => {
    setIsCommentSectionExpanded(!isCommentSectionExpanded);
    if (isCommentSectionExpanded) {
      return;
    }
    fetchComments();
  };

  const handleComment = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .post(
        ApiConfig.feedAction + "/",
        {
          feed: post.id,
          action: "COMMENT",
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setComment("");
        fetchComments();
        setIsCommentSectionExpanded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .put(
        ApiConfig.feed + "/" + post.id + "/",
        {
          subject: subject,
          body: body,
          images: images.split(";"),
          isPublic: !connectionOnly,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        fetchFeed({ next: null });
        setBody(post.body);
        setImages(post.images);
        setSubject(post.subject);
        setConnectionOnly(post.isPublic);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <div className="w-[90%] my-4 border-2 bg-white p-3 border-[#9D9494] rounded">
        <div className="flex justify-start items-center gap-x-2">
          <div className=" border-[#bc383e] border-2 ml-0 flex justify-center items-center rounded-[3rem] w-[3.5rem] h-[3.5rem]">
            {post.profilePicture && (
              <i className="fa-solid" style={{ color: "#bc383e" }}>
                <img
                  className="w-full h-full object-cover rounded-[2.9rem]"
                  src={post.profilePicture}
                  alt=""
                />
              </i>
            )}
            {!post.profilePicture && (
              <i
                className="fa-solid fa-user fa-xl"
                style={{ color: "#bc383e" }}
              >
                <img src={post.profilePicture} alt="" />
              </i>
            )}
          </div>
          <div>
            <h2 className="text-xl font-medium">{post.userName}</h2>
            <p className="text-xs">{post.userBio}</p>
          </div>
        </div>
        <div className="my-2">
          {post.images.length > 0 && !isEditing && (
            <>
              <div className="my-3 text-[1rem]">
                <pre className="">
                  <span class="inner-pre" style={{ "font-family": "arial" }}>
                    {post.body}
                  </span>
                </pre>
              </div>
              <div className="w-full h-100 bg-[#d4d9d9] my-4">
                <PostCarousel post={post} />
              </div>
            </>
          )}
          {post.images.length === 0 && !isEditing && (
            <div className="my-3 text-[2rem]">
              <pre>{post.body}</pre>
            </div>
          )}
          {isEditing && (
            <div className="my-3 text-[1rem]">
              <div className="">
                <textarea
                  name=""
                  id=""
                  cols="20"
                  rows="5"
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
                    placeholder={"Type and press Enter to add image links..."}
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
                    placeholder={"Type and press Enter to add keywords..."}
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
              </div>
            </div>
          )}
          <div className="flex justify-between items-center">
            {!isEditing && (
              <>
                <div className="flex justify-start items-center gap-x-3">
                  <button
                    className="flex justify-center items-center gap-x-2"
                    onClick={handleLike}
                  >
                    {!isLiked && (
                      <i
                        className="fa-solid fa-arrow-up fa-lg"
                        style={{ color: "#000" }}
                      ></i>
                    )}
                    {isLiked && (
                      <i
                        className="fa-solid fa-arrow-up fa-lg"
                        style={{ color: "#FF5555" }}
                      ></i>
                    )}
                    <span>{post.likesCount}</span>
                  </button>

                  <button
                    className="flex justify-center items-center gap-x-2"
                    onClick={handleCommentSectionExpand}
                  >
                    {!isCommentSectionExpanded && (
                      <i
                        className="fa-regular fa-comment fa-lg"
                        style={{ color: "#000" }}
                      ></i>
                    )}
                    {isCommentSectionExpanded && (
                      <i
                        className="fa-regular fa-comment fa-lg"
                        style={{ color: "#FF5555" }}
                      ></i>
                    )}
                    <span>{post.commentsCount}</span>
                  </button>

                  <button className="flex justify-center items-center gap-x-2">
                    <i
                      className="fa-solid fa-retweet fa-lg"
                      style={{ color: "#000", transform: "rotate(90deg)" }}
                    ></i>
                    <span>{post.sharesCount}</span>
                  </button>
                  {post.isEditable && (
                    <button
                      className="flex justify-center items-center gap-x-2"
                      onClick={() => {
                        console.log(images);
                        setIsEditing(true);
                      }}
                    >
                      <i
                        className="fa-solid fa-edit fa-lg"
                        style={{ color: "#000", transform: "rotate(90deg)" }}
                      ></i>
                    </button>
                  )}
                </div>
                <div>
                  <button className="flex justify-center items-center gap-x-2">
                    <i
                      className="fa-solid fa-share fa-lg"
                      style={{ color: "#000" }}
                    ></i>
                  </button>
                </div>
              </>
            )}
            {isEditing && (
              <button
                className="flex justify-center items-center gap-x-2"
                onClick={handleEditSave}
              >
                <div className="flex justify-center items-center gap-x-2">
                  Save
                  <i
                    className="fa-solid fa-check fa-lg rounded-full p-4 mr-1 hover:cursor-pointer"
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      border: "1px solid black",
                      marginRight: "1rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "black";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "black";
                    }}
                  ></i>
                </div>
              </button>
            )}
          </div>
        </div>
        <div
          className={`${
            isCommentSectionExpanded ? "block" : "hidden"
          } w-full border-t-2 border-[#9D9494] mt-2`}
        >
          {/* Comment input bar and send button */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="w-full h-10 px-4 m-1 border-2 border-[#9D9494] rounded-md outline-none focus:border-[#FF5555]"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="flex justify-center items-center gap-x-2"
              onClick={handleComment}
            >
              <i
                className="fa-solid fa-paper-plane fa-lg hover:text-[#FF5555] m-1"
                style={{ color: "#000" }}
              ></i>
            </button>
          </div>
          {comments && (
            <div className="flex flex-col justify-left items-left gap-x-2">
              <div className="m-2 self-center">Comments</div>
              {comments.map((comment) => (
                <div
                  className="flex justify-start items-center gap-x-2 m-1"
                  key={comment.id}
                >
                  <div className=" border-[#bc383e] border-2 ml-4 flex justify-center items-center rounded-[1.5rem] w-[2rem] h-[2rem]">
                    {post.profilePicture && (
                      <i className="fa-solid" style={{ color: "#bc383e" }}>
                        <img
                          className="w-full h-full object-cover rounded-[1.3rem]"
                          src={post.profilePicture}
                          alt=""
                        />
                      </i>
                    )}
                    {!post.profilePicture && (
                      <i
                        className="fa-solid fa-user fa-xl"
                        style={{ color: "#bc383e" }}
                      >
                        <img src={post.profilePicture} alt="" />
                      </i>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xs font-medium">{post.userName}</h2>
                    <p className="text-xs">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
