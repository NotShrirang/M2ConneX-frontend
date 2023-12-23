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

const Header = () => {
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
    // {
    //   auth.login ? (
    //     <button onClick={handleLogout}>Log out</button>
    //   ) : (

    <>
      {auth.login ? (
        <>
          <div className="w-full bg-[#1E1E1E] flex flex-col md:justify-between text-white lg:w-full px-4 shadow-xl">
            <div className="flex md:items-center items-start md:justify-center gap-x-3 md:flex-row flex-col-reverse justify-between">
              <Navbar login={true} />
              <div className="flex justify-center md:pt-0 pt-1 items-center gap-x-6">
                <Link to="/" className="hover:cursor-pointer min-w-max">
                  <img src={homeIcon} className="w-8" alt="home" />
                </Link>
                <div
                  className="userprofile hover:cursor-pointer w-[52px] h-16 pt-2 max-w-[52px] min-w-[52px] mb-1 rounded-xl flex flex-col items-center"
                  ref={dropdownRef}
                >
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt=""
                      className="rounded-xl focus:outline-none"
                      onClick={toggleVisibility}
                    />
                  ) : (
                    <i
                      className="fa-solid fa-user-circle fa-3x"
                      onClick={toggleVisibility}
                    ></i>
                  )}
                  {isVisible ? (
                    <div className="absolute z-10 flex flex-col justify-evenly items-center mt-16 bg-white rounded-b-xl shadow-xl border border-gray transition-opacity duration-300">
                      <ul className="flex flex-col">
                        <li
                          className="hover:bg-[#f4f2ee] text-black flex flex-row gap-x-4 items-center justify-start cursor-pointer px-7 py-4"
                          onClick={() => {
                            navigate("/profile");
                            setIsVisible(false);
                          }}
                        >
                          <i className="fa-solid fa-user-circle fa-xl pt-1"></i>
                          <p className="text-md">Profile</p>
                        </li>
                        <li
                          className="hover:bg-[#f4f2ee] text-black flex flex-row gap-x-4 items-center justify-start cursor-pointer px-7 py-4"
                          onClick={() => {
                            navigate("/notifications");
                            setIsVisible(false);
                          }}
                        >
                          <i className="fa-solid fa-bell fa-xl pt-1"></i>
                          <p className="text-md">Notifications</p>
                        </li>
                        <li
                          className="hover:bg-[#f4f2ee] rounded-b-xl text-black flex flex-row gap-x-4 items-center justify-start cursor-pointer px-8 py-4"
                          onClick={handleLogout}
                        >
                          <i className="fa-solid fa-sign-out fa-lg pt-1"></i>
                          <p className="text-md">Log out</p>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div
                  id="searchBtn"
                  className="bg-primary bg-opacity-50 flex items-center gap-x-1 border-2 border-white px-2 py-[0.2rem] rounded-[4rem]"
                >
                  <button>Search</button>
                  <i
                    className="fa-solid fa-magnifying-glass fa-xs mt-1 text-white"
                  // style={{ color: "#ffffff", marginTop: "4px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex ">
          <CollegeInfo />

          <div
            id="navItems"
            className="bg-[#1E1E1E] flex flex-col md:justify-between text-white lg:w-[60%] px-4 w-full shadow-xl"
          >
            <div className="flex justify-between w-full">
              <div className="flex">
                <img src={NBA} alt="" />
                <img src={aPlusPlus} alt="" />
              </div>
              <div className="flex items-center gap-x-3">
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

            <h2 className="md:text-5xl text-3xl pt-4">Alumni Network</h2>
            <Navbar login={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
