import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import logo from "../assets/logo.svg";
import ReactJoyride from "react-joyride";

const navItems = [
  { item: "Feed", link: "/feed", icon: "fa-solid fa-home" },
  {
    item: "Opportunities",
    link: "/opportunities",
    icon: "fa-solid fa-briefcase",
  },
  {
    item: "Connections",
    link: "/connections",
    icon: "fa-solid fa-user-friends",
  },
  { item: "Events", link: "/events", icon: "fa-solid fa-calendar" },
  { item: "Blogs", link: "/blogs", icon: "fa-solid fa-newspaper" },
  { item: "Batches", link: "/batches", icon: "fa-solid fa-users" },
  { item: "Directory", link: "/directory", icon: "fa-solid fa-address-book" },
  { item: "Donations", link: "/donations", icon: "fa-solid fa-donate" },
  { item: "Feedback", link: "/feedback", icon: "fa-solid fa-comment-alt" },
];

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const [state, setState] = useState({
    run: false,
    steps: [
      {
        target: ".nav",
        content: "Welcome to the M2ConneX, MMCOE's Alumni Portal!",
      },
      {
        target: window.innerWidth > 1024 ? "#desktop-item-list" : "#menutoggle",
        content: "Here are the various features of the portal!",
      },
      {
        target: ".userprofile",
        content: "Click here to view your profile and logout!",
      },
    ],
  });

  useEffect(() => {
    if (
      localStorage.getItem("visited") === "false" ||
      localStorage.getItem("visited") === null
    ) {
      setState((state) => ({ ...state, run: true }));
      localStorage.setItem("visited", "true");
    }
  }, []);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      <div className="nav w-full h-16 flex justify-between items-center px-4 bg-white shadow-2xl">
        <div
          className="flex justify-start items-center cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} width="200px" alt="" />

          {/* <div className="w-full flex justify-between items-center pl-4">
            <div>
              <Link to="/" className="hover:cursor-pointer">
                <img src={homeIcon} width="30px" alt="home" />
              </Link>
            </div>
          </div> */}
        </div>

        <div
          id="desktop-item-list"
          className="flex md:gap-x-2 text-black text-lg max-lg:hidden"
        >
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "text-primary"
                  : "hover:text-red transition-all duration-300"
              }
            >
              <div className="has-tooltip">
                <span className="tooltip bg-white rounded-lg border border-gray shadow-lg mt-8 text-black p-4">
                  {item.item}
                </span>
                <i className={`${item.icon} px-4 text-xl`}></i>
              </div>
            </NavLink>
          ))}
        </div>

        <div className="flex justify-center items-center gap-x-2">
          <Profile
            id="profile"
            dropdownRef={dropdownRef}
            user={user}
            toggleVisibility={toggleVisibility}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            handleLogout={handleLogout}
            navigate={navigate}
          />
          {/* <button onClick={handleLogout} className='px-3 py-2 rounded bg-primary text-white hover:bg-opacity-80'>LOGOUT</button> */}
          <div className="pl-4 max-lg:block hidden" id="menutoggle">
            <button onClick={toggleMenu}>
              <i className="fa-solid fa-bars text-black text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      {isOpen ? <Responsive isOpen={isOpen} toggleMenu={toggleMenu} /> : null}

      <ReactJoyride
        continuous
        hideCloseButton
        run={state.run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={state.steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </>
  );
}

function Responsive({ isOpen, toggleMenu }) {
  return (
    <div
      id="mobile-item-list"
      className={`z-10 ${
        isOpen
          ? "w-full hidden flex-col lg:gap-x-4 text-black text-lg fixed right-0 top-22 bg-[#f4f2ee] border-b pt-2 max-lg:flex"
          : "hidden"
      }`}
    >
      {useLockBodyScroll()}
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          onClick={toggleMenu}
          className={({ isActive }) =>
            isActive
              ? "px-4 py-1 text-primary"
              : "px-4 py-1 hover:text-red transition-all duration-300"
          }
        >
          {item.item}
        </NavLink>
      ))}
    </div>
  );
}

function Profile({
  dropdownRef,
  user,
  toggleVisibility,
  isVisible,
  setIsVisible,
  handleLogout,
  navigate,
}) {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const handleWindowClick = (event) => {
      handleClickOutside(event);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [handleClickOutside]);

  return (
    <div
      className="userprofile hover:cursor-pointer w-[40px] h-12 max-w-[40px] min-w-[52px] mb-1 rounded-[2rem] flex flex-col items-center transition-all duration-300"
      ref={dropdownRef}
    >
      {user.profilePicture ? (
        <img
          src={user.profilePicture}
          alt=""
          width="35px"
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
        <div className="absolute right-0 z-10 flex flex-col justify-evenly items-center mt-16 bg-white rounded-b-xl shadow-xl border border-gray transition-opacity duration-300">
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
  );
}

export default Nav;
