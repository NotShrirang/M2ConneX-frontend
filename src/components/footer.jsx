import React from 'react'
import InstagramIcon from "../assets/instagram.png"
import TwitterIcon from "../assets/twitter.png"
import GmailIcon from "../assets/gmail.png"
const Footer = () => {
  return (
    <>
    <div className='w-full h-[8rem] shadow-2xl flex flex-col gap-y-3 items-center justify-center'>
        <div className='flex items-center justify-center gap-x-4'>
        <a href="/">
        <img src={InstagramIcon} width="35px" alt="" />
        </a>
        <a href="/">
        <img src={GmailIcon} width="35px" alt="" />
        </a>
        <a href="/">
        <img src={TwitterIcon} width="35px" alt="" />
        </a>
        </div>
        <p className='font-normal'>Designed and Developed by C.O.D.E MMCOE</p>
    </div>
    </>
  )
}

export default Footer