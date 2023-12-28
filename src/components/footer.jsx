import React from "react";
import InstagramIcon from "../assets/instagram.png";
import LinkedInIcon from "../assets/linkedin.png";
import GmailIcon from "../assets/gmail.png";
const Footer = () => {
  return (
    <>
      <div className="w-full h-[8rem] shadow-3xl flex items-center justify-center">
        <div className="flex gap-x-4 w-full bg-black p-4">
          <img
            src="https://www.mmcoe.edu.in/images/logo.png"
            alt="MMCOE Logo"
            className="w-[5rem] lg:w-[5rem]"
          />
          <div className="text-justify text-white px-4 lg:block hidden">
            <h1 className="text-2xl font-bold">
              Marathwada Mitra Mandal's College of Engineering
            </h1>
            <p className="my-2">
              (Approved by AICTE New Delhi, Recognized by DTE Maharashtra and
              affiliated to Savitribai Phule Pune University) Accredited by NBA
              ( Mechanical and Electrical Departments){" "}
            </p>
            <p className="text-primary">Accredited with 'A++' Grade by NAAC</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-x-4">
              <a href="https://www.instagram.com/code_mmcoe">
                <img src={InstagramIcon} width="35px" alt="" />
              </a>
              <a href="mailto:team_code@mmcoe.edu.in">
                <img src={GmailIcon} width="35px" alt="" />
              </a>
              <a href="https://www.linkedin.com/company/75646530/">
                <img src={LinkedInIcon} width="35px" alt="" />
              </a>
            </div>
            <p className="font-normal text-white text-center">
              Website Designed and Developed by C.O.D.E MMCOE
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
