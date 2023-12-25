import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import DEPARTMENTS from "../utils/departments";
import formatDate from "../utils/date";
import { EXPERIENCE } from "../utils/skills";
import PeopleRecommendation from "../components/PeopleRecommendation";

export default function UserProfile() {
  // user data fetched from api :readonly
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState({
    total: {},
    weekly: {},
    monthly: {},
  });
  const [userActivity, setUserActivity] = useState({});
  const [userExperience, setUserExperience] = useState({});
  const [userSkills, setUserSkills] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }

    axios
      .get(ApiConfig.users + "/" + userId + "/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
        setUpdateUser(res.data);
        document.title = res.data.firstName
          ? res.data.firstName + " " + res.data.lastName + " | " + "Profile"
          : "Profile";
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(ApiConfig.profileAnalytics, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAnalytics(res.data);
        var feedRelated = 0;
        for (let key in res.data.total) {
          if (key.startsWith("feed")) {
            feedRelated += res.data.total[key];
          }
        }
        setAnalytics({
          ...res.data,
          total: {
            ...res.data.total,
            feedImpressions: feedRelated,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });

    fetchUserActivity({ next: null });
    fetchUserExperience({ next: null });
    fetchUserSkills({ next: null });
  }, []);

  const fetchUserActivity = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }
    if (next == null) {
      axios
        .get(ApiConfig.userActivity + "/" + userId + "/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUserActivity(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .get(next, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUserActivity((prevActivity) => {
          return {
            ...res.data,
            results: [...prevActivity.results, ...res.data.results],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserExperience = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }

    if (next == null) {
      axios
        .get(ApiConfig.userExperience + "/" + userId + "/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUserExperience(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .get(next, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserExperience((prevExperience) => {
          return {
            ...res.data,
            results: [...prevExperience.results, ...res.data.results],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserSkills = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }

    if (next == null) {
      axios
        .get(ApiConfig.userSkillsByUser + "/" + userId + "/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUserSkills(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .get(next, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserSkills((prevSkills) => {
          return {
            ...res.data,
            results: [...prevSkills.results, ...res.data.results],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setShowModal(false);
    setUser({ ...updateUser });
  };

  return (
    <>
      <div className="flex bg-[#f4f2ee] justify-center flex-col md:items-start items-center md:flex-row">
        <div className="flex flex-col md:pl-8 w-3/4 max-w-4xl">
          <div className="profile-card flex flex-col items-start pl-6 rounded-lg bg-white mt-8 mb-2 shadow-sm drop-shadow-sm h-fit pt-16 pb-8 border border-gray">
            <button
              className="py-4 absolute top-0 right-5"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <i className="fas fa-edit text-2xl"></i>
            </button>
            <div className="profile-pic flex justify-center items-center mb-4">
              {user.profilePicture != null ? (
                <img
                  src={user.profilePicture}
                  alt=""
                  className="w-36 h-36 rounded-full border-4 border-black"
                />
              ) : (
                <i className="fas fa-user-circle text-9xl"></i>
              )}
            </div>
            <div className="profile-name w-full flex flex-col">
              <h1 className="text-3xl font-bold mb-1">
                {user.firstName} {user.lastName}
              </h1>
            </div>
            {user.bio && (
              <div className="profile-department w-full flex flex-col">
                <p className="text-lg text-left font-medium">{user.bio}</p>
              </div>
            )}
            <div className="profile-department w-full flex flex-col">
              <p className="text-md text-left font-medium">
                {DEPARTMENTS[user.department]}
              </p>
            </div>
            <div className="city w-full">
              <p className="text-md text-left font-medium">
                {user.cityName && `${user.cityName} - `}
                <span className="text-blue hover:cursor-pointer hover:border-b-2">
                  Contact info
                </span>
              </p>
            </div>
            <div className="profile-bio flex flex-col pt-4">
              <span className="text-blue hover:cursor-pointer hover:border-b-2">
                {user.connections} connections
                {/* TODO: Add clickable box */}
              </span>
            </div>
          </div>
          <div className="analytics rounded-t-lg flex gap-y-2 flex-col shadow-sm drop-shadow-sm border border-gray bg-white pl-4 py-4">
            <div className="flex flex-col">
              <p className="font-semibold text-xl">Analytics</p>
              <div className="flex flex-row gap-x-1 items-center">
                <i className="fas fa-eye text-sm"></i>
                <p className="font-md text-md text-gray">Private to you</p>
              </div>
            </div>
            <div className="flex flex-row pt-4 justify-evenly">
              {analytics["total"]["profile visit"] != null ? (
                <div className="flex flex-row">
                  <i className="fas fa-user-friends text-lg pl-2"></i>
                  <p className="text-md font-medium px-4">
                    {analytics["total"]["profile visit"]} profile views
                  </p>
                </div>
              ) : (
                <div className="flex flex-row">
                  <i className="fas fa-user-friends text-lg pl-2"></i>
                  <p className="text-md font-medium px-4">0 profile views</p>
                </div>
              )}
              {analytics.total.feedImpressions != null ? (
                <div className="flex flex-row">
                  <i
                    className="fas fa-line-chart text-lg pl-2"
                    aria-hidden="true"
                  ></i>
                  <p className="text-md font-medium px-4">
                    {analytics.total.feedImpressions} post impressions
                  </p>
                </div>
              ) : (
                <div className="flex flex-row">
                  <i
                    className="fas fa-line-chart text-lg pl-2"
                    aria-hidden="true"
                  ></i>
                  <p className="text-md font-medium px-4">0 post impressions</p>
                </div>
              )}
              {analytics.total.search != null ? (
                <div className="flex flex-row">
                  <i className="fas fa-search text-lg pl-2"></i>
                  <p className="text-md font-medium px-4">
                    {analytics.total.search} search appearances
                  </p>
                </div>
              ) : (
                <div className="flex flex-row">
                  <i className="fas fa-search text-lg pl-2"></i>
                  <p className="text-md font-medium px-4">
                    0 search appearances
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full rounded-b-lg text-center py-2 shadow-sm drop-shadow-sm border border-gray hover:cursor-pointer bg-white hover:bg-[#ebebebeb]">
            <p className="text-blue font-medium">Show All analytics</p>
          </div>

          <div className="About rounded-lg flex gap-y-2 mt-2 flex-col shadow-sm drop-shadow-sm border border-gray bg-white pl-4 py-4">
            <p className="font-semibold text-xl">About</p>
            <p>{user.bio}</p>
          </div>

          <div className="Activity rounded-lg flex gap-y-2 flex-col mt-2 shadow-sm drop-shadow-sm border border-gray bg-white pt-4">
            <p className="font-semibold text-xl pl-4">Activity</p>
            {userActivity.results &&
              userActivity.results.map((act, index) => {
                if (act.type == "feed") {
                  return (
                    <div
                      className="flex flex-col cursor-pointer pl-4"
                      key={act.id}
                      onClick={() => {
                        navigate("/feed/" + act.data.id);
                      }}
                    >
                      <p className="text-sm pb-1">
                        {user.firstName + " " + user.lastName}
                        {" posted"} {" - "}
                        <span className="text text-gray-400 font-thin">
                          {formatDate(act.data.createdAt)}
                        </span>
                      </p>
                      <div className="flex flex-row">
                        <div className="w-[80px] h-[80px] rounded-sm">
                          {act.data.images &&
                            act.data.images[0] &&
                            act.data.images[0].image == "" && (
                              <div className="max-w-[100px] h-[80px] w-[80px] rounded-lg border flex flex-col justify-center items-center">
                                <i className="fa fa-file-text text-2xl"></i>
                              </div>
                            )}
                          {act.data.images &&
                            act.data.images[0] &&
                            act.data.images[0].image != "" && (
                              <img
                                src={act.data.images[0].image || ""}
                                alt=""
                                className="max-w-[100px] h-[80px] w-[80px] rounded-lg"
                              />
                            )}
                          {!act.data.images[0] && (
                            <div className="max-w-[100px] h-[80px] w-[80px] rounded-lg border flex flex-col justify-center items-center">
                              <i className="fa fa-file-text text-2xl"></i>
                            </div>
                          )}
                        </div>
                        <div className="ml-5 pr-2">
                          <span className="text-sm font-thin">
                            #
                            {act.data.subject
                              .split(";")
                              .slice(0, 3)
                              .join(", #")}
                          </span>
                          <pre className="text-sm">
                            <span
                              className="inner-pre"
                              style={{ fontFamily: "Verdana" }}
                            >
                              {act.data.body.slice(0, 50) + "..."}
                            </span>
                          </pre>
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-2 mt-2 pl-1">
                        <p className="text-sm pb-1 text-blue">
                          <i className="fa fa-arrow-up"></i>{" "}
                          {act.data.likesCount}
                        </p>
                        <p className="text-sm pb-1 text-blue">
                          <i className="fa fa-comment-o"></i>{" "}
                          {act.data.commentsCount}
                        </p>
                        <p className="text-sm pb-1 text-blue">
                          <i className="fa fa-share"></i> {act.data.sharesCount}
                        </p>
                      </div>
                      {index != userActivity.results.length - 1 && (
                        <hr className="w-11/12 h-[1px] border-gray mt-4" />
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="flex flex-col cursor-pointer pl-4"
                      key={act.id}
                      onClick={() => {
                        navigate("/feed/" + act.data.feed);
                      }}
                    >
                      <p className="text-sm pb-1">
                        {user.firstName + " " + user.lastName}{" "}
                        {act.data.action == "LIKE" && "liked"}{" "}
                        {act.data.action == "COMMENT" && "commented on"}{" "}
                        {act.data.action == "SHARE" && "shared"} {" - "}
                        <span className="text text-gray-400 font-thin">
                          {formatDate(act.data.createdAt)}
                        </span>
                      </p>
                      <div className="flex flex-row">
                        <div className="max-w-[100px] h-[80px] w-[80px] rounded-lg border flex flex-col justify-center items-center">
                          {act.data.action == "LIKE" && (
                            <i className="fa fa-arrow-up text-2xl"></i>
                          )}
                          {act.data.action == "COMMENT" && (
                            <i className="fa fa-commenting-o text-2xl"></i>
                          )}
                        </div>
                        <div className="ml-5">
                          <span className="text-sm font-thin">
                            #
                            {act.data.feedName
                              .split(";")
                              .slice(0, 3)
                              .join(", #")}
                          </span>
                          <pre className="text-sm">
                            <span
                              className="inner-pre"
                              style={{ fontFamily: "Verdana" }}
                            >
                              {act.data.feedBody.slice(0, 50) + "..."}
                            </span>
                          </pre>
                        </div>
                      </div>
                      {index != userActivity.results.length - 1 && (
                        <hr className="w-11/12 h-[1px] border-gray mt-4" />
                      )}
                    </div>
                  );
                }
              })}
            {userActivity.next && (
              <p
                className="text-center mt-2 pt-2 pb-2 cursor-pointer border-t border-gray hover:bg-[#ebebebeb]"
                onClick={() => {
                  fetchUserActivity({ next: userActivity.next });
                }}
              >
                Load More
              </p>
            )}
            {userActivity.next == null && <p className="text-center mt-2"></p>}
          </div>
          <div className="Experience rounded-lg flex gap-y-2 mt-2 flex-col shadow-sm drop-shadow-sm border border-gray bg-white pt-4">
            <p className="font-semibold text-xl pl-4">Experience</p>
            {userExperience.results &&
              userExperience.results.map((exp, index) => (
                <div
                  className={`flex flex-col pl-4 ${
                    index == userExperience.results.length - 1 && "mb-4"
                  }`}
                >
                  <div
                    className="flex flex-row justify-left gap-x-2 mt-2 cursor-pointer"
                    key={exp.id}
                  >
                    <div className="max-w-[100px] h-[80px] w-[80px] rounded-lg border flex flex-col justify-center items-center">
                      <i className="fa fa-briefcase text-2xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold">{exp.designation}</p>
                      <p className="text-sm font-light">{exp.company}</p>
                      <p className="text-sm font-light">
                        {exp.startDate} - {exp.isCurrent && "Now"}{" "}
                        {!exp.isCurrent && exp.endDate}
                      </p>
                      <p className="text-sm font-medium">
                        {exp.description.slice(0, 100) + "..."}
                      </p>
                    </div>
                  </div>
                  {index != userExperience.results.length - 1 && (
                    <hr className="w-11/12 h-[1px] border-gray mt-4" />
                  )}
                </div>
              ))}
            {userExperience.next && (
              <p
                className="text-center mt-2 pt-2 pb-2 cursor-pointer border-t border-gray hover:bg-[#ebebebeb]"
                onClick={() => {
                  fetchUserExperience({ next: userExperience.next });
                }}
              >
                Load More
              </p>
            )}
            {userExperience.count == 0 && (
              <div className="flex flex-row justify-left gap-x-2 pl-4 py-4">
                <span>No Experiences Found.</span>
              </div>
            )}
          </div>
          <div className="Skills rounded-lg flex gap-y-2 mt-2 mb-8 flex-col shadow-sm drop-shadow-sm border border-gray bg-white pt-4">
            <p className="font-semibold text-xl pl-4">Skill</p>
            {userSkills.results &&
              userSkills.results.map((skill, index) => (
                <div
                  className={`flex flex-col pl-4 ${
                    index == userSkills.results.length - 1 && "mb-4"
                  }`}
                >
                  <div
                    className="flex flex-row justify-left items-center gap-x-2 mt-2 cursor-pointer"
                    key={skill.id}
                  >
                    <div className="max-w-[100px] h-[80px] w-[80px] rounded-lg border flex flex-col justify-center items-center">
                      <i className="fa fa-rocket text-2xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">{skill.skillName}</p>
                      <p className="text-sm font-light">
                        {EXPERIENCE[skill.experience]}
                      </p>
                    </div>
                  </div>
                  {index != userSkills.results.length - 1 && (
                    <hr className="w-11/12 h-[1px] border-gray mt-4" />
                  )}
                </div>
              ))}
            {userSkills.next && (
              <p
                className="text-center mt-2 pt-2 pb-2 cursor-pointer border-t border-gray hover:bg-[#ebebebeb]"
                onClick={() => {
                  fetchUserSkills({ next: userSkills.next });
                }}
              >
                Load More
              </p>
            )}
            {userSkills.count == 0 && (
              <div className="flex flex-row justify-left gap-x-2 pl-4 py-4">
                <span>No Skills Found.</span>
              </div>
            )}
          </div>
        </div>
        <PeopleRecommendation />
      </div>

      {showModal ? (
        <>
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-auto w-1/2">
              <div className="border-0 mt-64 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font=semibold">Update Data</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowModal(false);
                      setUpdateUser({ ...user });
                    }}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </button>
                </div>
                <div className="">
                  <form className="rounded w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="firstName" className="text-sm">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.firstName}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            firstName: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="lastName" className="text-sm">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.lastName}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            lastName: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="email" className="text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.email}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="department" className="text-sm">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        id="department"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.department}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            department: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="bio" className="text-sm">
                        Bio
                      </label>
                      <input
                        type="text"
                        name="bio"
                        id="bio"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.bio}
                        onChange={(e) => {
                          setUpdateUser({ ...updateUser, bio: e.target.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="resume" className="text-sm">
                        Resume
                      </label>
                      <input
                        type="text"
                        name="resume"
                        id="resume"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.resume}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            resume: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="profilePicture" className="text-sm">
                        Profile Picture
                      </label>
                      <input
                        type="text"
                        name="profilePicture"
                        id="profilePicture"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.profilePicture}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            profilePicture: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="city" className="text-sm">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.city}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            city: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4">
                      <label htmlFor="phoneNumber" className="text-sm">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateUser.phoneNumber}
                        onChange={(e) => {
                          setUpdateUser({
                            ...updateUser,
                            phoneNumber: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <p className="text-red font-bold self-start">{error}</p>
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setUpdateUser({ ...user });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary  w-[5rem] h-[2rem] uppercase text-sm font-bold rounded"
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
    </>
  );
}
