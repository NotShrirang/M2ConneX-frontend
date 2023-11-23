import React from 'react'
import College from '../assets/college.png'

const Hero = () => {
  return (
    <>
        <div className="w-full relative h-[70vh] lg:h-screen  flex justify-center items-center">
            <img src={College}alt="" className='absolute w-[100%] lg:w-[60%]' />
            <div className='z-10 text-center'>

            <h2 className='text-primary font-semibold text-[3rem] '>MMCOE Alumni</h2>
            <p className='text-white font-bold text-[4rem] z-10'>Welcome Home</p>
            </div>
        </div>
        <div className='text-black w-[100%] lg:w-[60%] flex justify-center items-center mx-auto'>
                       
            <div className='w-[49%] flex flex-col justify-center items-center'>
                <p className='text-[6rem] font-bold'>15</p>
                <p className='text-lg'>years of excellence</p>
            </div>
            <div className='border-2 border-opacity-50 h-[9rem]'></div>
            <div className='w-[49%] flex flex-col justify-center items-center'>
                <p className='text-[6rem] font-bold'>15000</p>
                <p className='text-lg'>Students</p>
            </div>
        </div>
        <div className='text-black w-[100%] lg:w-[60%] flex justify-center items-center mx-auto py-2 border-b-4 shadow-lg'>
            connections for lifetime
        </div>
    </>
  )
}

export default Hero