import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import homeIcon from "../assets/home.svg";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import AuthContext from '../authContext';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import axios from 'axios';
import ApiConfig from '../utils/ApiConfig';

const navItems = [
    { item: "Events", link: "/events" },
    { item: "Feed", link: "/feed" },
    { item: "Batches", link: "/batches" },
    { item: "Opportunities", link: "/opportunities" },
    { item: "Directory", link: "/directory" },
    { item: "Connections", link: "/connections" },
    { item: "Donations", link: "/donations" },
    { item: "Feedback", link: "/feedback" },
];

function Nav({login}) {
    const [isOpen, setIsOpen] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);
    console.log(auth);

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
    }

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
            <div className='w-full h-[6rem] flex justify-between items-center px-4'>
                <div className='flex justify-start items-center'>
                    <img src="https://www.mmcoe.edu.in/images/logo.png" width="50px" alt="" />
                    <h2 className='hidden md:block text-xl font-semibold ml-2 '>Marathwada Mitra Mandal's College of Engineering</h2>
                    <h2 className='md:hidden block text-xl font-semibold ml-2 '>MMCOE</h2>

                </div>
                <div>
                    <Link className="flex gap-x-1 " to="/auth">
                        {auth.login ?
                            (<div className='flex justify-center items-center gap-x-2'>
                                <Profile dropdownRef={dropdownRef} user={user} toggleVisibility={toggleVisibility} isVisible={isVisible} setIsVisible={setIsVisible} handleLogout={handleLogout} navigate={navigate} />
                                {/* <button onClick={handleLogout} className='px-3 py-2 rounded bg-primary text-white hover:bg-opacity-80'>LOGOUT</button> */}
                            </div>)
                            :
                            (<a href="/" className='text-base font-semibold p-2 rounded bg-primary text-white hover:bg-opacity-80'>SIGN UP / LOGIN</a>)
                        }

                    </Link>
                </div>
            </div>

            <div className='bg-[#1E1E1E] w-full h-[5rem] flex lg:flex-row-reverse justify-between lg:justify-center lg:gap-x-4 items-center px-4'>
                <div id="desktop-item-list" className="hidden lg:flex lg:gap-x-4 text-white text-lg">
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
                            {item.item}
                        </NavLink>
                    ))}
                </div>

                <div className='w-full lg:w-auto flex justify-between items-center'>
                    <div>
                        <Link to="/" className="hover:cursor-pointer">
                            <img src={homeIcon} width="30px" alt="home" />
                        </Link>
                    </div>
                    <div className='block lg:hidden relative'>
                        <button onClick={toggleMenu}>
                            <i className="fa-solid fa-bars" style={{ color: 'white', fontSize: '1.3rem' }}></i>
                        </button>
                        {isOpen ? <Responsive isOpen={isOpen} toggleMenu={toggleMenu} /> : null}
                    </div>
                </div>
            </div>
        </>
    );
}



function Responsive({ isOpen, toggleMenu }) {
    return (
        <div
            id="mobile-item-list"
            className={`${isOpen
                ? "w-full flex flex-col lg:gap-x-4 text-white text-lg fixed right-0 top-44 bg-[#1E1E1E]"
                : "hidden"
                }`}
        >
            {useLockBodyScroll()}
            {
                navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.link}
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary"
                                : "hover:text-red transition-all duration-300"
                        }
                    >
                        {item.item}
                    </NavLink>
                ))}
        </div>
    )
}


function Profile({ dropdownRef, user, toggleVisibility, isVisible, setIsVisible, handleLogout, navigate }) {
    return (
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
    )
}

export default Nav;
