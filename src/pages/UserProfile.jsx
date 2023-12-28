import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import DEPARTMENTS from "../utils/departments";
import formatDate from "../utils/date";
import { EXPERIENCE } from "../utils/skills";
import PeopleRecommendation from "../components/PeopleRecommendation";
import { ToastContainer, toast } from "react-toastify";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showExperienceEditModal, setShowExperienceEditModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showSkillEditModal, setShowSkillEditModal] = useState(false);

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [isSkillDropDownOpen, setIsSkillDropDownOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({});
  const [newSkillEdit, setNewSkillEdit] = useState({});
  const [newExperience, setNewExperience] = useState({});
  const [newExperienceEdit, setNewExperienceEdit] = useState({});

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

  const getDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.ceil(diffDays / 30);
    return diffMonths;
  };

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
        console.log(res.data);
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

  const fetchCities = async ({ search = "" }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/login");
    }
    if (search != "") {
      axios
        .get(ApiConfig.cities + "?search=" + search, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setCities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .get(ApiConfig.cities, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSkills = async ({ search = "" }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/login");
    }
    if (search != "") {
      axios
        .get(ApiConfig.skills + "?search=" + search, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setSkills(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .get(ApiConfig.skills, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }
  };

  const handleEditProfile = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .patch(ApiConfig.users + "/" + userId + "/", updateUser, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setShowProfileModal(false);
        toast.success("Profile Updated Successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditExperience = ({ id = null }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (id != null) {
      axios
        .patch(ApiConfig.experience + "/" + id + "/", newExperienceEdit, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          fetchUserExperience({ next: null });
          setShowExperienceEditModal(false);
          toast.success("Experience Updated Successfully", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .post(ApiConfig.experience + "/", newExperience, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        fetchUserExperience({ next: null });
        setShowExperienceModal(false);
        toast.success("Experience Added Successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditSkill = ({ id = null }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (id != null) {
      axios
        .patch(ApiConfig.userSkills + "/" + id + "/", newSkillEdit, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          fetchUserSkills({ next: null });
          setShowSkillEditModal(false);
          toast.success("Skill Updated Successfully", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .post(ApiConfig.userSkills + "/", newSkill, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        fetchUserSkills({ next: null });
        setShowSkillsModal(false);
        toast.success("Skill Added Successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.detail == "Skill already exists") {
          toast.error("Skill Already Exists", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex bg-[#f4f2ee] justify-center flex-col md:items-start items-center md:flex-row md:gap-x-4 lg:w-full lg:gap-x-4">
        <div className="flex flex-col md:pl-8 w-3/4 max-w-4xl lg:w-3/4">
          <div className="profile-card flex flex-col items-start px-6 rounded-lg bg-white mt-8 mb-2 shadow-sm drop-shadow-sm h-fit pt-16 pb-8 border border-gray">
            <button
              className="py-4 absolute top-0 right-5"
              onClick={() => {
                document.title = "Edit Profile | MMCOE Alumni Portal";
                setShowProfileModal(true);
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
            <div className="profile-name w-full">
              <h1 className="text-3xl font-bold mb-1">
                {user.firstName} {user.lastName}
              </h1>
            </div>
            {user.bio && (
              <div className="profile-department w-full">
                <p className="text-lg text-left font-thin">{user.bio}</p>
              </div>
            )}
            <div className="profile-department w-full">
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
            <p className="font-semibold text-xl">Bio</p>
            {user.bio ? <p>{user.bio}</p> : <p>No Bio Found</p>}
          </div>

          {user.resume && (
            <div className="About rounded-lg flex gap-y-2 mt-2 flex-col shadow-sm drop-shadow-sm border border-gray bg-white pl-4 py-4">
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
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-xl pl-4">Experience</p>
              <div className="py-4 absolute top-0 right-5 flex flex-row gap-x-8">
                <button
                  onClick={() => {
                    document.title = "Add Experience | MMCOE Alumni Portal";
                    setShowExperienceModal(true);
                  }}
                >
                  <i className="fas fa-plus text-2xl"></i>
                </button>
              </div>
            </div>
            {userExperience.results &&
              userExperience.results.map((exp, index) => (
                <div
                  className={`flex flex-col pl-4 ${
                    index == userExperience.results.length - 1 && "mb-4"
                  }`}
                >
                  <div
                    className="flex flex-row justify-left gap-x-2 mt-2 cursor-pointer w-full"
                    key={exp.id}
                    onClick={() => {
                      setShowExperienceEditModal(true);
                      setNewExperienceEdit(exp);
                    }}
                  >
                    <div className="max-w-[100px] h-[80px] w-[80px] rounded-lg border flex flex-col justify-center items-center">
                      <i
                        className="fa fa-briefcase text-2xl transition-all duration-300"
                        onMouseEnter={(e) => {
                          e.target.classList.add("fa-edit");
                        }}
                        onMouseLeave={(e) => {
                          e.target.classList.remove("fa-edit");
                        }}
                      ></i>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold">{exp.designation}</p>
                      <p className="text-sm font-light">{exp.company}</p>
                      <p className="text-xs">
                        {exp.startDate} - {exp.isCurrent && "Present"}
                        {" (" +
                          getDuration(exp.startDate, Date.now()) +
                          " months)"}
                        {!exp.isCurrent &&
                          exp.endDate +
                            " (" +
                            getDuration(exp.startDate, exp.endDate) +
                            " months)"}
                      </p>
                      <p className="text-sm font-medium">
                        {exp.description && exp.description.slice(0, 100)}
                        {exp.description &&
                          exp.description.length > 100 &&
                          "..."}
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
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-xl pl-4">Skill</p>
              <div className="py-4 absolute top-0 right-5 flex flex-row gap-x-8">
                <button
                  onClick={() => {
                    document.title = "Add Skill | MMCOE Alumni Portal";
                    setShowSkillsModal(true);
                  }}
                >
                  <i className="fas fa-plus text-2xl"></i>
                </button>
              </div>
            </div>
            {userSkills.results &&
              userSkills.results.map((skill, index) => (
                <div
                  className={`flex flex-col pl-4 ${
                    index == userSkills.results.length - 1 && "mb-4"
                  }`}
                  onClick={() => {
                    setShowSkillEditModal(true);
                    setNewSkillEdit(skill);
                    setSkillSearch(skill.skillName);
                  }}
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
        <div className="flex flex-col w-1/4 max-w-1/4 md:w-1/4 md:mt-8 md:mr-8">
          {window.innerWidth > 768 && <PeopleRecommendation />}
        </div>
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

      {showProfileModal ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          onClick={() => {
            setShowProfileModal(false);
          }}
        >
          <div
            className="flex flex-col items-start justify-start w-[65%] h-[95%] bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-row items-center justify-between w-full p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-2xl font=semibold">Edit Profile</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowProfileModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </button>
            </div>
            <div className="flex flex-col px-4 gap-y-4 w-full h-full overflow-y-scroll">
              <p className="mt-4 text-xl font-semibold">Basic Info</p>
              <div className="flex flex-row justify-center w-full max-sm:flex-wrap sm:max-lg:flex-wrap gap-y-2 gap-x-8 lg:flex-row">
                <div
                  className="flex flex-col items-center gap-y-2"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {updateUser.profilePicture ? (
                    <img
                      src={updateUser.profilePicture}
                      alt=""
                      className="w-48 h-48 rounded-full border-4 border-black max-sm:w-24 max-sm:h-24 sm:max-lg:w-48 sm:max-lg:h-48 lg:w-48 lg:h-48"
                    />
                  ) : (
                    <i className="fas fa-user-circle text-9xl w-48 h-48 rounded-full border-4 border-black flex flex-col justify-center items-center max-sm:w-24 max-sm:h-24 max-sm:text-7xl sm:max-lg:w-48 sm:max-lg:h-48 sm:max-lg:text-9xl lg:w-48 lg:h-48 lg:text-9xl"></i>
                  )}
                </div>
                <div className="flex flex-col items-start gap-y-2 w-[75%]">
                  <p className="text-sm">Profile Picture</p>
                  <input
                    type="url"
                    name="profilePicture"
                    id="profilePicture"
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                    value={updateUser.profilePicture}
                    onChange={(e) => {
                      setUpdateUser({
                        ...updateUser,
                        profilePicture: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-x-8 mt-4 max-sm:flex-wrap sm:max-lg:flex-wrap gap-y-2 lg:flex-row">
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="firstName" className="text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="border-2 border-gray-300 rounded-lg p-2"
                    value={updateUser.firstName}
                    onChange={(e) => {
                      setUpdateUser({
                        ...updateUser,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2">
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
              </div>
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-md">Bio</p>
                <textarea
                  type="text"
                  name="bio"
                  id="bio"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={updateUser.bio}
                  onChange={(e) => {
                    setUpdateUser({
                      ...updateUser,
                      bio: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row gap-x-4 mt-4 max-sm:flex-wrap sm:max-lg:flex-wrap gap-y-2 lg:flex-row">
                <div className="flex flex-col items-start gap-y-2 w-full">
                  <label htmlFor="city" className="text-sm">
                    City
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="border-2 border-gray-300 rounded-md p-2 w-full"
                      placeholder="Search for cities (min 3 characters)"
                      value={citySearch}
                      onChange={(e) => {
                        setCitySearch(e.target.value);
                        if (e.target.value.length >= 3) {
                          setIsCityDropdownOpen(true);
                          fetchCities({ search: e.target.value });
                        }
                        if (e.target.value.length < 3) {
                          setIsCityDropdownOpen(false);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fetchCities({
                            search: `?search=${citySearch}`,
                          });
                          setIsCityDropdownOpen(false);
                        }
                        if (e.key === "Escape") {
                          setIsCityDropdownOpen(false);
                        }
                      }}
                    />
                    {isCityDropdownOpen && (
                      <div
                        className={`absolute flex flex-col w-full max-h-[20rem] items-center justify-center z-30 rounded-b-lg bg-white border border-gray border-t-white overflow-y-scroll`}
                      >
                        {cities.length > 0 ? (
                          cities.map((city) => {
                            return (
                              <button
                                className="w-full h-8 text-sm outline-none z-30 hover:bg-gray"
                                key={city.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCitySearch(city.name);
                                  setUpdateUser({
                                    ...updateUser,
                                    city: city.id,
                                  });
                                  setIsCityDropdownOpen(false);
                                }}
                              >
                                {city.cityName}
                              </button>
                            );
                          })
                        ) : (
                          <>No such city.</>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-md">Phone Number</p>
                <input
                  type="phone"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={updateUser.phoneNumber}
                  onChange={(e) => {
                    setUpdateUser({
                      ...updateUser,
                      phoneNumber: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!e.target.value.startsWith("+")) {
                      e.target.style.border = "2px solid primary";
                      toast.error("Please include country code", {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }
                    if (e.target.value.length != 13) {
                      e.target.style.border = "2px solid primary";
                      toast.error("Please enter a valid phone number", {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    } else {
                      e.target.style.border = "2px solid black";
                    }
                  }}
                />
              </div>
              <div className="flex flex-col items-start mb-8 gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-sm">Resume</p>
                <input
                  type="url"
                  name="resume"
                  id="resume"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={updateUser.resume}
                  onChange={(e) => {
                    setUpdateUser({
                      ...updateUser,
                      resume: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-end w-full border border-gray p-6 rounded-b">
              <button
                className="bg-primary text-white px-6 py-2 uppercase text-lg rounded border border-gray shadow-sm mr-1 hover:shadow-lg hover:bg-[#f4f2ee] hover:text-primary transition-all duration-300 ease-in-out"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditProfile();
                }}
              >
                Edit
              </button>
              <button
                className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                type="button"
                onClick={() => {
                  document.title =
                    updateUser.firstName +
                    " " +
                    updateUser.lastName +
                    " | MMCOE Alumni Portal";
                  setShowProfileModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showExperienceModal ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          onClick={() => {
            setShowExperienceModal(false);
          }}
        >
          <div
            className="flex flex-col items-center justify-center w-[65%] h-[95%] bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between w-full p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">Add Experience</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => {
                  setNewExperience({});
                  setShowExperienceModal(false);
                }}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </button>
            </div>
            <div className="flex flex-col px-4 w-full h-full overflow-y-scroll">
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-sm">Company</p>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={newExperience.company}
                  onChange={(e) => {
                    setNewExperience({
                      ...newExperience,
                      company: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-sm">Designation</p>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={newExperience.designation}
                  onChange={(e) => {
                    setNewExperience({
                      ...newExperience,
                      designation: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row gap-x-8 mt-4 max-sm:flex-wrap sm:max-lg:flex-wrap gap-y-2 lg:flex-row">
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="startDate" className="text-sm">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="border-2 border-gray-300 rounded-lg p-2"
                    value={newExperience.startDate}
                    onChange={(e) => {
                      setNewExperience({
                        ...newExperience,
                        startDate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="endDate" className="text-sm">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    className="border-2 border-gray-300 rounded-md p-2"
                    value={newExperience.endDate}
                    onChange={(e) => {
                      setNewExperience({
                        ...newExperience,
                        endDate: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-sm">Description</p>
                <textarea
                  type="text"
                  rows={5}
                  name="description"
                  id="description"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={newExperience.desctription}
                  onChange={(e) => {
                    setNewExperience({
                      ...newExperience,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-x-2 mt-4 mb-8 md:max-lg:flex-row lg:flex-row">
                <input
                  type="checkbox"
                  name="isCurrent"
                  id="isCurrent"
                  className="border-2 border-gray-300 rounded-md"
                  checked={newExperience.isCurrent}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewExperience({
                        ...newExperience,
                        endDate: null,
                      });
                    }
                    setNewExperience({
                      ...newExperience,
                      isCurrent: e.target.checked,
                    });
                  }}
                />
                <p className="text-sm">Is Current</p>
              </div>
            </div>
            <div className="flex items-center justify-end w-full border border-gray p-6 rounded-b">
              <button
                className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                type="button"
                onClick={() => {
                  document.title =
                    updateUser.firstName +
                    " " +
                    updateUser.lastName +
                    " | MMCOE Alumni Portal";
                  setShowExperienceModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-2 uppercase text-lg rounded border border-gray shadow-sm hover:shadow-lg hover:bg-[#f4f2ee] hover:text-primary transition-all duration-300 ease-in-out"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditExperience({ id: null });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showExperienceEditModal ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          onClick={() => {
            setShowExperienceEditModal(false);
          }}
        >
          <div
            className="flex flex-col items-center justify-center w-[65%] h-[95%] bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between w-full p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">Edit Experience</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => {
                  setNewExperienceEdit({});
                  setShowExperienceEditModal(false);
                }}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </button>
            </div>
            <div className="flex flex-col px-4 w-full h-full overflow-y-scroll">
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-sm">Company</p>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={newExperienceEdit.company}
                  onChange={(e) => {
                    setNewExperienceEdit({
                      ...newExperienceEdit,
                      company: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-sm">Designation</p>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={newExperienceEdit.designation}
                  onChange={(e) => {
                    setNewExperienceEdit({
                      ...newExperienceEdit,
                      designation: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row gap-x-8 mt-4 max-sm:flex-wrap sm:max-lg:flex-wrap gap-y-2 lg:flex-row">
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="startDate" className="text-sm">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="border-2 border-gray-300 rounded-lg p-2"
                    value={newExperienceEdit.startDate}
                    onChange={(e) => {
                      setNewExperienceEdit({
                        ...newExperienceEdit,
                        startDate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="endDate" className="text-sm">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    className="border-2 border-gray-300 rounded-md p-2"
                    value={newExperienceEdit.endDate}
                    onChange={(e) => {
                      setNewExperienceEdit({
                        ...newExperienceEdit,
                        endDate: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-y-2 mt-4 md:max-lg:flex-wrap lg:flex-col">
                <p className="text-sm">Description</p>
                <textarea
                  type="text"
                  rows={5}
                  name="description"
                  id="description"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  value={newExperienceEdit.desctription}
                  onChange={(e) => {
                    setNewExperienceEdit({
                      ...newExperienceEdit,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-x-2 mt-4 mb-8 md:max-lg:flex-row lg:flex-row">
                <input
                  type="checkbox"
                  name="isCurrent"
                  id="isCurrent"
                  className="border-2 border-gray-300 rounded-md"
                  checked={newExperienceEdit.isCurrent}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewExperienceEdit({
                        ...newExperienceEdit,
                        endDate: null,
                      });
                    }
                    setNewExperienceEdit({
                      ...newExperienceEdit,
                      isCurrent: e.target.checked,
                    });
                  }}
                />
                <p className="text-sm">Is Current</p>
              </div>
            </div>
            <div className="flex items-center justify-end w-full border border-gray p-6 rounded-b">
              <button
                className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                type="button"
                onClick={() => {
                  document.title =
                    updateUser.firstName +
                    " " +
                    updateUser.lastName +
                    " | MMCOE Alumni Portal";
                  setShowExperienceEditModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-2 uppercase text-lg rounded border border-gray shadow-sm hover:shadow-lg hover:bg-[#f4f2ee] hover:text-primary transition-all duration-300 ease-in-out"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditExperience({ id: newExperienceEdit.id });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showSkillsModal ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          onClick={() => {
            document.title = "Feed | MMCOE Alumni Portal";
            setShowSkillsModal(false);
          }}
        >
          <div
            className="flex flex-col items-center justify-center gap-y-4 w-[65%] h-[95%] bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between w-full p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">Add Skills</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowSkillsModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </button>
            </div>
            <div className="flex flex-col px-4 w-full h-full overflow-y-scroll">
              <div className="flex flex-col items-start gap-y-2 mt-4 w-full md:max-lg:flex-wrap lg:flex-col">
                <div className="flex flex-row gap-x-4 mt-4 w-full max-sm:flex-wrap sm:max-lg:flex-wrap gap-y-2 lg:flex-row">
                  <div className="flex flex-col items-start gap-y-2 w-full">
                    <p className="text-sm">Skill Name</p>
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                        placeholder="Search for skills"
                        value={skillSearch}
                        onChange={(e) => {
                          setSkillSearch(e.target.value);
                          setIsSkillDropDownOpen(true);
                          fetchSkills({ search: e.target.value });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            fetchSkills({
                              search: `?search=${skillSearch}`,
                            });
                            setIsSkillDropDownOpen(false);
                          }
                          if (e.key === "Escape") {
                            setIsSkillDropDownOpen(false);
                          }
                        }}
                      />
                      {isSkillDropDownOpen && (
                        <div
                          className={`absolute flex flex-col w-full max-h-[20rem] items-center justify-center z-30 rounded-b-lg bg-white border border-gray border-t-white overflow-y-scroll`}
                        >
                          {skills.length > 0 ? (
                            skills.map((skill) => {
                              return (
                                <button
                                  className="w-full h-8 text-sm outline-none z-30 hover:bg-gray"
                                  key={skill.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSkillSearch(skill.name);
                                    setNewSkill({
                                      ...newSkill,
                                      skill: skill.id,
                                    });
                                    setIsSkillDropDownOpen(false);
                                  }}
                                >
                                  {skill.name}
                                </button>
                              );
                            })
                          ) : (
                            <>No such skill.</>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-2 mt-4 mb-8 md:max-lg:flex-row lg:flex-row"></div>
              <div className="flex flex-row items-center gap-x-2 mt-4 mb-8 md:max-lg:flex-row lg:flex-row">
                <p className="text-sm">Experience</p>
                <select
                  className="text-lg"
                  name="experience"
                  id="experience"
                  value={newSkill.experience}
                  onChange={(e) => {
                    setNewSkill({
                      ...newSkill,
                      experience: e.target.value,
                    });
                  }}
                >
                  <option value="0">Select Experience</option>
                  <option value="1">Interested</option>
                  <option value="2">Beginner</option>
                  <option value="3">Intermediate</option>
                  <option value="4">Expert</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end w-full border border-gray p-6 rounded-b">
              <button
                className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                type="button"
                onClick={() => {
                  document.title =
                    updateUser.firstName +
                    " " +
                    updateUser.lastName +
                    " | MMCOE Alumni Portal";
                  setShowSkillEditModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-2 uppercase text-lg rounded border border-gray shadow-sm hover:shadow-lg hover:bg-[#f4f2ee] hover:text-primary transition-all duration-300 ease-in-out"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditSkill({ id: null });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showSkillEditModal ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          onClick={() => {
            document.title = "Feed | MMCOE Alumni Portal";
            setShowSkillEditModal(false);
          }}
        >
          <div
            className="flex flex-col items-center justify-center gap-y-4 w-[65%] h-[95%] bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between w-full p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">Edit Skill</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowSkillEditModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </button>
            </div>
            <div className="flex flex-col px-4 w-full h-full overflow-y-scroll">
              <div className="flex flex-col items-start gap-y-2 mt-4 w-full md:max-lg:flex-wrap lg:flex-col">
                <div className="flex flex-row gap-x-4 mt-4 w-full max-sm:flex-wrap sm:max-lg:flex-wrap gap-y-2 lg:flex-row">
                  <div className="flex flex-col items-start gap-y-2 w-full">
                    <p className="text-sm">Skill Name</p>
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                        placeholder="Search for skills"
                        value={newSkillEdit.skillName}
                        onChange={(e) => {
                          setSkillSearch(e.target.value);
                          setIsSkillDropDownOpen(true);
                          fetchSkills({ search: e.target.value });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            fetchSkills({
                              search: `?search=${skillSearch}`,
                            });
                            setIsSkillDropDownOpen(false);
                          }
                          if (e.key === "Escape") {
                            setIsSkillDropDownOpen(false);
                          }
                        }}
                      />
                      {isSkillDropDownOpen && (
                        <div
                          className={`absolute flex flex-col w-full max-h-[20rem] items-center justify-center z-30 rounded-b-lg bg-white border border-gray border-t-white overflow-y-scroll`}
                        >
                          {skills.length > 0 ? (
                            skills.map((skill) => {
                              return (
                                <button
                                  className="w-full h-8 text-sm outline-none z-30 hover:bg-gray"
                                  key={skill.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSkillSearch(skill.name);
                                    setNewSkillEdit({
                                      ...newSkillEdit,
                                      skill: skill.id,
                                    });
                                    setIsSkillDropDownOpen(false);
                                  }}
                                >
                                  {skill.name}
                                </button>
                              );
                            })
                          ) : (
                            <>No such skill.</>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-2 mt-4 mb-8 md:max-lg:flex-row lg:flex-row"></div>
              <div className="flex flex-row items-center gap-x-2 mt-4 mb-8 md:max-lg:flex-row lg:flex-row">
                <p className="text-sm">Experience</p>
                <select
                  className="text-lg"
                  name="experience"
                  id="experience"
                  value={newSkillEdit.experience}
                  onChange={(e) => {
                    setNewSkillEdit({
                      ...newSkillEdit,
                      experience: e.target.value,
                    });
                  }}
                >
                  <option value="0">Select Experience</option>
                  <option value="1">Interested</option>
                  <option value="2">Beginner</option>
                  <option value="3">Intermediate</option>
                  <option value="4">Expert</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end w-full border border-gray p-6 rounded-b">
              <button
                className="background-transparent uppercase px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-[#f4f2ee] transition-all duration-300 ease-in-out"
                type="button"
                onClick={() => {
                  document.title =
                    updateUser.firstName +
                    " " +
                    updateUser.lastName +
                    " | MMCOE Alumni Portal";
                  setShowSkillEditModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-2 uppercase text-lg rounded border border-gray shadow-sm hover:shadow-lg hover:bg-[#f4f2ee] hover:text-primary transition-all duration-300 ease-in-out"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditSkill({ id: newSkillEdit.id });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
