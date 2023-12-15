import React from 'react'
import College from '../assets/college.png'

const Hero = () => {
    return (
        <>
            <div className="w-full relative h-[70vh] lg:h-screen  flex justify-center items-center">
                <img src={College} alt="" className='absolute w-[100%] lg:w-[70%]' />
                <div className='z-10 text-center'>
                    <h2 className='text-primary font-semibold text-[3rem] '>MMCOE Alumni</h2>
                    <p className='text-white font-bold text-[4rem] z-10'>Welcome Home</p>
                </div>
            </div>

            <div className='text-black w-[100%] lg:w-[70%] flex lg:flex-row flex-col justify-center items-center mx-auto'>
                <div className='w-[49%] flex flex-col justify-center items-center'>
                    <p className='text-[6rem] font-bold'>15</p>
                    <p className='text-lg'>years of excellence</p>
                </div>
                <div className='hidden lg:block border-2 border-opacity-50 h-[9rem]'></div>
                <div className='w-[49%] flex flex-col justify-center items-center'>
                    <p className='text-[6rem] font-bold'>15000</p>
                    <p className='text-lg'>Students</p>
                </div>
            </div>
            <div className='text-black w-[100%] lg:w-[70%] flex justify-center items-center mx-auto py-2 border-b-[3.5px] shadow-lg'>
                {/* connections for lifetime */}
            </div>

            <div className='bg-[#000000] w-[70%] mx-auto h-[11rem] flex items-center justify-center rounded my-24 gap-x-24'>
                <div className='flex flex-col items-center'>
                    <div className='bg-[#D9D9D9] w-[4rem] h-[4rem] rounded-[3rem] flex items-center justify-center '>
                        <i class="fa-solid fa-book fa-xl"></i>
                    </div>
                    <p className="text-[#D9D9D9] mt-2">Alumni Directory</p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='bg-[#D9D9D9] w-[4rem] h-[4rem] rounded-[3rem] flex items-center justify-center '>
                        <i class="fa-solid fa-handshake fa-xl"></i>
                    </div>
                    <p className="text-[#D9D9D9] mt-2">Your Connections</p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='bg-[#D9D9D9] w-[4rem] h-[4rem] rounded-[3rem] flex items-center justify-center '>
                        <i class="fa-solid fa-pen-to-square fa-xl"></i>
                    </div>
                    <p className="text-[#D9D9D9] mt-2">Write a testimonial</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='bg-[#D9D9D9] w-[4rem] h-[4rem] rounded-[3rem] flex items-center justify-center '>
                        <i class="fa-solid fa-trophy fa-xl"></i>
                    </div>
                    <p className="text-[#D9D9D9] mt-2">Oppurtunities</p>
                </div >
                <div className='flex flex-col items-center'>
                    <div className='bg-[#D9D9D9] w-[4rem] h-[4rem] rounded-[3rem] flex items-center justify-center '>
                        <i class="fa-solid fa-images fa-xl"></i>
                    </div>
                    <p className="text-[#D9D9D9] mt-2">Memories</p>
                </div>
            </div>

        </>
    )
}

export default Hero