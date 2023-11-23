import React from 'react'
import aPlusPlus from '../assets/naac.png';
import NBA from '../assets/nba.png';
import homeIcon from '../assets/home.svg';
const Header = () => {
    return (
        <>
            <div className='w-full h-full flex '>

                <div id='collegeLogo' className=''>
                    <div className="lg:block hidden" id="mainSiteLink">
                        <a href="https://www.mmcoe.edu.in/">Main Site</a>
                    </div>
                    <div className="flex" id="Logo">
                        <div className='w-32 p-3'>
                            <img src="https://www.mmcoe.edu.in/images/logo.png" alt="MMCOE Logo" />
                        </div>
                        <div className='text-justify px-4 lg:block hidden'>
                            <h1 className='text-3xl font-bold'>Marathwada Mitra Mandal's College of Engineering</h1>
                            <p className='my-2'>(Approved by AICTE New Delhi, Recognized by DTE Maharashtra and affiliated to Savitribai Phule Pune University) Accredited by NBA ( Mechanical and Electrical Departments) </p>
                            <p className='text-primary'>Accredited with 'A++' Grade by NAAC</p>
                        </div>
                    </div>
                </div>
                <div id='navItems' className='bg-[#1E1E1E] flex flex-col md:justify-between text-white lg:w-[60%] px-4 w-full'>
                    <div className='flex justify-between my-4 w-full'>
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
                    <h2 className='md:text-5xl text-3xl pt-4'>Alumni Network</h2>
                    <div className='class-items flex flex-row-reverse pt-4'>

                    <label htmlFor="navToggle" className='md:hidden block'>Expand_button</label>
                    <input type="checkbox" id="navToggle" className='hidden peer' />
                    <div id="item-list" className='md:flex-row w-full md:flex md:gap-x-2 md:items-center md:my-4 peer-checked:flex hidden flex-col'>
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
            </div>
        </>
    )
}

export default Header