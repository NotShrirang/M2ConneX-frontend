import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../utils/ApiConfig";
import DEPARTMENTS from "../../utils/departments";
import formatDate from "../../utils/date";
import { EXPERIENCE } from "../../utils/skills";
import PeopleRecommendation from "../PeopleRecommendation";

export default function Profile() {
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [error, setError] = useState("");
  const [userActivity, setUserActivity] = useState({});
  const [userExperience, setUserExperience] = useState({});
  const [userSkills, setUserSkills] = useState({});

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/auth");
    }

    fetchUser();
    fetchUserActivity({ next: null });
    fetchUserExperience({ next: null });
    fetchUserSkills({ next: null });
  }, []);

  const fetchUser = () => {
    const accessToken = localStorage.getItem("accessToken");

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
  };

  const fetchUserActivity = ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
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
          // console.log(res.data);
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

  const handleConnect = (e, person) => {
    e.preventDefault();
    console.log("Connect");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }

    axios
      .post(
        ApiConfig.connectionRequest,
        {
          userB: person.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex bg-[#f4f2ee] justify-center flex-col md:items-start items-center md:flex-row lg:w-full lg:gap-x-4">
        <div className="flex flex-col md:pl-8 w-3/4 max-w-4xl lg:w-3/4">
          <div className="profile-card flex flex-col items-start pl-6 rounded-lg bg-white mt-8 mb-2 shadow-sm drop-shadow-sm h-fit pt-16 pb-8 border border-gray">
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
            <div className="flex pt-2">
              {user.isConnected == "not_connected" && (
                <button
                  key={user.id}
                  className="border border-gray rounded-l-full rounded-r-full text-gray-500 font-medium w-40 h-10 hover:bg-[#ebebebeb] hover:border-2 transition duration-100 ease-in-out"
                  onClick={(e) => {
                    handleConnect(e, user);
                  }}
                >
                  <i className="fa-solid fa-user-plus mr-2 "></i>
                  Connect
                </button>
              )}
              {user.isConnected == "pending" && (
                <button
                  key={user.id}
                  className="border border-gray rounded-l-full rounded-r-full text-gray-500 font-medium w-40 h-10 bg-[#ebebebeb]"
                  disabled
                >
                  <i className="fa-solid fa-check mr-2 "></i>
                  Requested
                </button>
              )}
            </div>
          </div>

          {user.bio && (
            <div className="About rounded-lg flex gap-y-2 mt-2 flex-col shadow-sm drop-shadow-sm border border-gray bg-white pl-4 py-4">
              <p className="font-semibold text-xl">Bio</p>
              <p>{user.bio}</p>
            </div>
          )}

          {user.resume && (
            <div className="Resume rounded-lg flex gap-y-2 mt-2 flex-col shadow-sm drop-shadow-sm border border-gray bg-white pl-4 py-4">
              <p className="font-semibold text-xl">Resume</p>
              <button
                className="bg-[#ebebebeb] border border-gray text-black font-bold py-2 px-4 rounded-lg mr-4 hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => {
                  window.open(user.resume, "_blank");
                }}
              >
                View
              </button>
            </div>
          )}

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
                                className="max-w-[100px] h-[80px] w-[80px] rounded-lg border"
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
                        {exp.description &&
                          exp.description.slice(0, 100) + "..."}
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
        <div className="flex flex-col w-1/4 max-w-[300px] lg:w-1/4 mt-8">
          {window.innerWidth > 768 && (
            <PeopleRecommendation profileUserId={useParams().userId} />
          )}
        </div>
      </div>
    </>
  );
}
