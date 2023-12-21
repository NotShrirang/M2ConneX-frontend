import React from 'react'
import img from '../assets/college.png'
import img1 from '../assets/instagram.png'

function Blogpost() {
    return (
        <>
            <div className='border-[1px] border-[#dedede] shadow-md w-[25rem] rounded-lg '>
                <div>
                    <img src={img} alt="" />
                </div>
                <div className='p-4'>
                    <div className='flex justify-between items-center my-2'>
                        <p className='bg-[#dedede] px-2 text-sm font-semibold py-[0.125rem] rounded-[1rem]'>Machine learning</p>
                        <p className='text-gray font-semibold text-sm'>26 sept 2025</p>
                    </div>
                    <div className='my-2'>
                        <p className='text-2xl mx-2 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    {/* <hr /> */}
                    <div className='my-2 flex items-center justify-start gap-x-2'>
                        <div className='w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-[2rem] border-[#dedede] border-[1px]'>
                        {/* <img src={img1} className='rounded-[2rem]' alt="" /> */}
                        <i class="fa-solid fa-user"></i>
                        </div>
                        <h3 className=''>Author</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogpost