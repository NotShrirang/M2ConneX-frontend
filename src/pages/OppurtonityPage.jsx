import Opportunity from "../components/opportunity";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import { ToastContainer, toast } from "react-toastify";

export default function OpportunityPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [isSkillSearching, setIsSkillSearching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [about, setAbout] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [opportunity, setOpportunity] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/login");
    }
    setIsFilterOpen(false);
    fetchOpportunities({ next: null });
  }, []);

  const fetchOpportunities = async ({ search = "", next = null }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/login");
    }
    if (next != null) {
      axios
        .get(next, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setOpportunities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    if (search != "") {
      axios
        .get(ApiConfig.opportunities + search, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setOpportunities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    if (next === null) {
      axios
        .get(ApiConfig.recommendOpportunities, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setOpportunities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          console.log(res.data);
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
        console.log(res.data);
        setSkills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApply = ({ id, about }) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken || !userId) {
      navigate("/login");
      return;
    }
    if (about === "") {
      toast.error("Please tell us something about yourself.", {
        autoClose: 2000,
      });
      return;
    }
    setIsApplying(true);
    axios
      .post(
        ApiConfig.opportunityAppication,
        {
          opportunityId: id,
          about: about,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsApplied(true);
        setShowModal(false);
        setIsApplying(false);
        fetchOpportunities({ search: "", next: null });
        toast.success("Applied successfully.");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center w-full bg-white rounded-lg z-1">
        <div className="flex w-[95%] flex-col items-center justify-center gap-x-4 gap-y-2 h-full p-4 border border-gray mt-4">
          <div className="flex flex-row gap-x-2 w-full">
            <input
              className="w-full h-10 pl-4 pr-4 text-xl border rounded-lg outline-none border border-gray"
              placeholder="Search for opportunities"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                fetchOpportunities({
                  search: `?search=${e.target.value}`,
                  next: null,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchOpportunities({
                    search: `?search=${search}`,
                    next: null,
                  });
                }
                if (e.key === "Escape") {
                  setSearch("");
                  fetchOpportunities({ search: "", next: null });
                  setIsSkillSearching(false);
                  setSkillSearch("");
                  setIsFilterOpen(false);
                }
              }}
            />
            <button className="w-10 h-10 bg-[#ff3d00] text-white rounded-lg">
              Go
            </button>
            {isFilterOpen ? (
              <button
                className="w-10 h-10 bg-[#ff3d00] text-white rounded-lg"
                onClick={() => {
                  setIsFilterOpen(false);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            ) : (
              <button
                className="w-10 h-10 bg-[#ff3d00] text-white rounded-lg"
                onClick={() => {
                  setIsFilterOpen(true);
                }}
              >
                <i className="fas fa-filter"></i>
              </button>
            )}
          </div>
          {isFilterOpen ? (
            <div className="flex flex-col w-full items-between justify-center z-10">
              <div className="flex flex-row items-center justify-start gap-x-4 h-full max-sm:flex-wrap  sm:max-md:flex-wrap md:max-lg:flex-wrap lg:flex-row gap-y-2 justify-center">
                <div className="flex flex-row w-full gap-x-4 items-center justify-center">
                  <div className="flex flex-col gap-y-2 w-full">
                    <input
                      id="skillSearchInput"
                      className="min-w-full h-10 pl-4 pr-4 text-xl border rounded-lg outline-none border border-gray"
                      placeholder="Search for skills (min 3 characters)"
                      value={skillSearch}
                      onBlur={(e) => {
                        setSkillSearch(e.target.value);
                        setIsSkillSearching(false);
                      }}
                      onChange={(e) => {
                        setSkillSearch(e.target.value);
                        if (e.target.value.length >= 3)
                          setIsSkillSearching(true);
                        fetchSkills({ search: e.target.value });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fetchOpportunities({
                            search: `?search=${skillSearch}`,
                          });
                          setIsSkillSearching(false);
                        }
                        if (e.key === "Escape") {
                          setIsSkillSearching(false);
                        }
                      }}
                    />
                    {isSkillSearching && (
                      <div
                        className={`absolute mt-8 flex flex-col w-[45%] max-h-[20rem] items-center justify-center z-30 bg-white border border-gray border-t-white overflow-y-scroll`}
                      >
                        {skills.length > 0 ? (
                          skills.map((skill) => {
                            return (
                              <button
                                className="w-full h-8 text-sm outline-none z-30 hover:bg-gray"
                                key={skill.id}
                                onClick={() => {
                                  setSkillSearch(skill.name);
                                  fetchOpportunities({
                                    search: `?search=${skill.name}`,
                                  });
                                  setIsSkillSearching(false);
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
                  <button
                    className="w-20 h-10 bg-[#ff3d00] text-white rounded-lg"
                    onClick={() => {
                      fetchOpportunities({
                        search: `?search=${skillSearch}`,
                      });
                      setIsSkillSearching(false);
                    }}
                  >
                    Go
                  </button>
                </div>
                <div className="flex flex-row items-center justify-center gap-x-4 h-full">
                  Type
                  <select
                    id="typeSelect"
                    className="w-40 h-10 pl-4 pr-4 text-xl border rounded-lg outline-none border border-gray"
                    onChange={(e) => {
                      fetchOpportunities({
                        search: `?search=${search}&type=${e.target.value}`,
                      });
                    }}
                  >
                    <option value="">All</option>
                    <option value="Internship">Internship</option>
                    <option value="Job">Job</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-row items-center justify-center gap-x-4 h-full">
                  <div className="flex flex-row items-center justify-center gap-x-4">
                    Working
                    <select
                      id="workModeSelect"
                      className="w-40 h-10 pl-4 pr-4 text-xl border rounded-lg outline-none border border-gray"
                      onChange={(e) => {
                        setSkillSearch("");
                        fetchOpportunities({
                          search: `?search=${skillSearch}&workMode=${e.target.value}`,
                        });
                      }}
                    >
                      <option value="">All</option>
                      <option value="In Office">In Office</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <button
                    className="w-20 h-10 bg-[#ff3d00] text-white rounded-lg"
                    onClick={() => {
                      fetchOpportunities({
                        search: `?search=${search}`,
                      });
                      document.getElementById("typeSelect").value = "";
                      document.getElementById("workModeSelect").value = "";
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {opportunities.results && opportunities.results.length > 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full gap-y-2 my-6 z-1">
            {opportunities.results.map((opportunity) => {
              return (
                <Opportunity
                  opportunity={opportunity}
                  setShowModal={setShowModal}
                  setOpportunity={setOpportunity}
                  showApplyButton={true}
                  className="z-1"
                />
              );
            })}
          </div>
        )}
        {opportunities.results && opportunities.results.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-sm drop-shadow-sm z-1 mt-10 mb-6">
            <p className="text-xl font-bold h-[100%]">
              No opportunities found.
            </p>
          </div>
        )}
        {showModal && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <div
              className="flex flex-col items-center justify-center gap-y-4 w-[65%] h-[95%] p-4 bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60 overflow-y-scroll"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex flex-col items-center w-full h-full">
                <p className="text-xl font-bold mb-2">
                  Apply for this opportunity
                </p>
                <Opportunity
                  opportunity={opportunity}
                  showApplyButton={false}
                />
                <textarea
                  className="w-full h-[90%] border border-gray rounded-lg outline-none p-4 mt-4"
                  placeholder="Tell us about yourself..."
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>
              <div className="flex flex-row w-full justify-end gap-x-4">
                <button
                  className="w-32 h-10 bg-[#ff3d00] text-white rounded-lg"
                  onClick={() => {
                    console.log(about);
                    handleApply({ id: opportunity.id, about: about });
                  }}
                >
                  Apply
                </button>
                <button
                  className="w-32 h-10 bg-[#ff3d00] text-white rounded-lg"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {isApplying && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
            onClick={() => {
              setIsApplying(false);
            }}
          >
            <div
              className="flex flex-col items-center justify-center gap-y-4 w-[65%] h-[95%] p-4 bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-60 overflow-y-scroll"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex flex-col items-center w-full h-full">
                <p className="text-xl font-bold mb-2">Applying...</p>
                <i className="fas fa-spinner fa-spin fa-3x"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
