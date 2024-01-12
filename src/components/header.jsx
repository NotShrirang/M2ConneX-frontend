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
            className="bg-[#1E1E1E] flex flex-col md:justify-between text-white w-full shadow-xl h-[8rem] md:h-fit"
          >
            <div className="flex flex-col md:flex-row justify-between w-full pt-2">
              <h1 className="text-2xl pt-1 ml-4">
                Marathwada Mitra Mandal's College of Engineering
              </h1>
              <div className="flex justify-end items-center md:w-[26%] w-[80%] md:pr-2 md:mr-4">
                {/* <Link to="/" className="hover:cursor-pointer">
                  <img
                    src={homeIcon}
                    alt="home"
                    className="w-[1.4rem] md:w-[2rem]"
                  />
                </Link> */}

                <Link
                  className="flex gap-x-2 text-[0.8rem] md:text-[1rem]"
                  to="/auth"
                >
                  <p
                    className="rounded-lg border border-gray p-2 hover:bg-primary transition-all duration-300"
                    href="/"
                  >
                    Sign Up
                  </p>
                  <p
                    className="rounded-lg border border-gray p-2 hover:bg-primary transition-all duration-300"
                    href="/"
                  >
                    Log In
                  </p>
                </Link>

                {/* <div
                  id="searchBtn"
                  className="bg-primary bg-opacity-50 flex md:flex-grow ml-2 items-center gap-x-1 border-2 border-white px-2 py-[0.2rem] rounded-[4rem]"
                >
                  <button>Search</button>
                  <i className="fa-solid fa-magnifying-glass fa-xs mt-1 text-white"></i>
                </div> */}
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
