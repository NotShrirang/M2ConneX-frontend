import React, { useState } from 'react'
import aPlusPlus from '../assets/naac.png';
import NBA from '../assets/nba.png';
import homeIcon from '../assets/home.svg';
import { NavLink, Link } from 'react-router-dom';
import CollegeInfo from './CollegeInfo';
import Navbar from './Navbar';
const Header = () => {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <>
            <div className='w-full flex '>
                <CollegeInfo />

                <div id='navItems' className='bg-[#1E1E1E] flex flex-col md:justify-between text-white lg:w-[60%] px-4 w-full shadow-xl'>
                    <div className='flex justify-between my-4 w-full'>
                        <div className='flex'>
                            <img src={NBA} alt="" />
                            <img src={aPlusPlus} alt="" />
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Link to="/" className='hover:cursor-pointer'>
                                <img src={homeIcon} width="30px" alt="home" />
                            </Link>
                            {isLogged ? (<button>Log out</button>) :
                                (<Link className='flex gap-x-1' to="/auth">
                                    <p href="/">Sign Up</p>
                                    |
                                    <p href="/">Log In</p>
                                </Link>)
                            }
                            <div id='searchBtn' className='bg-primary bg-opacity-50 flex items-center gap-x-1 border-2 border-white px-2 py-[0.2rem] rounded-[4rem]'>
                                <button>Search</button>
                                <i className="fa-solid fa-magnifying-glass fa-xs" style={{ color: "#ffffff", marginTop: "4px" }}></i>
                            </div>
                        </div>
                    </div>

                    <h2 className='md:text-5xl text-3xl pt-4'>Alumni Network</h2>
                    
                    <Navbar/>
                </div>
            </div>
        </>
    )
}

export default Header