import React, { useContext, useState, useRef } from "react";
import aPlusPlus from "../assets/naac.png";
import NBA from "../assets/nba.png";
import homeIcon from "../assets/home.svg";
import { NavLink, Link } from "react-router-dom";
import CollegeInfo from "./CollegeInfo";
import Navbar from "./Navbar";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import Nav from "./Nav";

const Head = () => {
  // const [isLogged, setIsLogged] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const dropdownRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ login: false, uid: "", uname: "" });
    localStorage.clear();
    navigate("/");
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
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {auth.login ? (
        <>
          <Nav />
        </>
      ) : (
        <div className="w-full flex shadow-2xl">
          <CollegeInfo />

          <div
            id="navItems"
            className="bg-[#1E1E1E] flex flex-col md:justify-between text-white px-4 w-full shadow-xl"
          >
            <div className="flex justify-between w-full pt-2">
              {/* <div className="flex">
                <img src={NBA} alt="" />
                <img src={aPlusPlus} alt="" />
              </div> */}
              {/* <h2 className="text-4xl pt-1">Alumni Network</h2> */}
              <h1 className="text-2xl pt-1">
                Marathwada Mitra Mandal's College of Engineering
              </h1>
              <div className="flex justify-center items-center gap-x-1">
                <Link to="/" className="hover:cursor-pointer min-w-max">
                  <img src={homeIcon} alt="home" className="w-8" />
                </Link>

                <Link className="flex gap-x-1" to="/auth">
                  <p href="/">Sign Up</p>|<p href="/">Log In</p>
                </Link>

                <div
                  id="searchBtn"
                  className="bg-primary bg-opacity-50 flex items-center gap-x-1 border-2 border-white px-2 py-[0.2rem] rounded-[4rem]"
                >
                  <button>Search</button>
                  <i className="fa-solid fa-magnifying-glass fa-xs mt-1 text-white"></i>
                </div>
              </div>
            </div>
            <Navbar />
          </div>
        </div>
      )}
    </>
  );
};

export default Head;
