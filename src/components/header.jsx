import React from 'react'
import aPlusPlus from '../assets/naac.png';
import NBA from '../assets/nba.png';
import homeIcon from '../assets/home.svg';
const Header = () => {
    return (
        <>
            <div className='w-full h-[15rem] flex'>

                <div id='collegeLogo' className='w-[40%]'>
                    <div className="" id="mainSiteLink">
                        <a href="https://www.mmcoe.edu.in/">MMCOE</a>
                    </div>
                    <div className="flex " id="Logo">
                        <div>
                            <img src="https://www.mmcoe.edu.in/images/logo.png" alt="MMCOE Logo" />
                        </div>
                        <div className='w-full text-justify px-4'>
                            <h1 className='text-3xl font-bold'>Marathwada Mitra Mandal's College of Engineering</h1>
                            <p className='my-2'>(Approved by AICTE New Delhi, Recognized by DTE Maharashtra and affiliated to Savitribai Phule Pune University) Accredited by NBA ( Mechanical and Electrical Departments) </p>
                            <p className='text-primary'>Accredited with 'A++' Grade by NAAC</p>
                        </div>
                    </div>
                </div>
                <div id='navItems' className='bg-[#1E1E1E] flex flex-col justify-between text-white w-[60%] px-4'>
                    <div className='flex justify-between my-4'>
                        <div className='flex'>
                            <img src={NBA} alt="" />
                            <img src={aPlusPlus} alt="" />
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <div>
                            <img src={homeIcon} width="30px" alt="" />
                            </div>
                            <div className='flex gap-x-1'>
                                <a href="/">Sign Up</a>
                                |
                                <a href="/">Log In</a>
                            </div>
                            <div id='searchBtn' className='bg-primary bg-opacity-50 flex items-center gap-x-1 border-2 border-white px-2 py-[0.2rem] rounded-[4rem]'>
                                <button>Search</button>
                                <i class="fa-solid fa-magnifying-glass fa-xs" style={{color: "#ffffff", marginTop:"4px"}}></i>
                            </div>
                        </div>
                    </div>
                    <div>
                         <h2 className='text-5xl '>Alumni Network</h2>
                    </div>

                    <div className='flex gap-x-2 items-center my-4 hover:text'>
                        <a href="/">Events</a>
                        <a href="/">Feed</a>
                        <a href="/">Batches</a>
                        <a href="/">Oppurtunities</a>
                        <a href="/">Directory</a>
                        <a href="/">Connections</a>
                        <a href="/">Events</a>
                        <a href="/">Donations</a>
                        <a href="/">Feedback</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header