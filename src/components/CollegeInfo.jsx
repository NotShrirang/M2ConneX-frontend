import React from 'react'

const CollegeInfo = () => {
    return (
        <>
            <div id='collegeLogo' className='shadow-xl'>
                {/* <div className="bg-white border m-2 py-1 px-2 w-[6rem] rounded-[2rem] hover:text-white hover:bg-opacity-70 hover:bg-black lg:block hidden " id="mainSiteLink">
                    <a href="https://www.mmcoe.edu.in/" target='_blank'>Main Site</a>
                    <i className="fa-solid fa-arrow-up fa-xs" style={{ color: "#000000", transform: "rotate(45deg)" }}></i>
                </div> */}
                <div className="flex" id="Logo">
                    <div className='w-24 p-1'>
                        <img src="https://www.mmcoe.edu.in/images/logo.png" alt="MMCOE Logo" />
                    </div>
                    <div className='text-justify px-4 lg:block hidden'>
                        <h1 className='text-2xl font-bold'>Marathwada Mitra Mandal's College of Engineering</h1>
                        <p className='my-2'>(Approved by AICTE New Delhi, Recognized by DTE Maharashtra and affiliated to Savitribai Phule Pune University) Accredited by NBA ( Mechanical and Electrical Departments) </p>
                        <p className='text-primary'>Accredited with 'A++' Grade by NAAC</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollegeInfo