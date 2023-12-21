import React, { useContext, useState } from "react";
import aPlusPlus from "../assets/naac.png";
import NBA from "../assets/nba.png";
import homeIcon from "../assets/home.svg";
import { NavLink, Link } from "react-router-dom";
import CollegeInfo from "./CollegeInfo";
import Navbar from "./Navbar";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // const [isLogged, setIsLogged] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ login: false, uid: "", uname: "" });
    localStorage.clear();
    navigate("/");
  };
  return (
    // {
    //   auth.login ? (
    //     <button onClick={handleLogout}>Log out</button>
    //   ) : (

    <>

      {
        auth.login ? (
          <>
            <div className="w-full bg-[#1E1E1E] flex flex-col md:justify-between text-white lg:w-full px-4 shadow-xl">

              <div className="flex md:items-center items-start md:justify-center gap-x-3 md:flex-row flex-row-reverse justify-between">
                <Navbar />
                <div className="flex justify-center md:pt-0 pt-1 items-center gap-x-3">
                  <Link to="/" className="hover:cursor-pointer">
                    <img src={homeIcon} width="30px" alt="home" />
                  </Link>

                  <button onClick={handleLogout}>Log out</button>


                  <div
                    id="searchBtn"
                    className="bg-primary bg-opacity-50 flex items-center gap-x-1 border-2 border-white px-2 py-[0.2rem] rounded-[4rem]"
                  >
                    <button>Search</button>
                    <i
                      className="fa-solid fa-magnifying-glass fa-xs"
                      style={{ color: "#ffffff", marginTop: "4px" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>

          </>

        ) :
          (
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
                    <Link to="/" className="hover:cursor-pointer">
                      <img src={homeIcon} width="30px" alt="home" />
                    </Link>

                    <Link className="flex gap-x-1" to="/auth">
                      <p href="/">Sign Up</p>|<p href="/">Log In</p>
                    </Link>

                    <div
                      id="searchBtn"
                      className="bg-primary bg-opacity-50 flex items-center gap-x-1 border-2 border-white px-2 py-[0.2rem] rounded-[4rem]"
                    >
                      <button>Search</button>
                      <i
                        className="fa-solid fa-magnifying-glass fa-xs"
                        style={{ color: "#ffffff", marginTop: "4px" }}
                      ></i>
                    </div>
                  </div>
                </div>

                <h2 className="md:text-5xl text-3xl pt-4">Alumni Network</h2>
                <Navbar />
              </div>
            </div>
          )
      }
    </>
  );
};

export default Header;
