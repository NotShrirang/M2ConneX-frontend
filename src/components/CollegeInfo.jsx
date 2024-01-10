import React from "react";
import logo from "../assets/logo.svg";

const CollegeInfo = () => {
  return (
    <>
      <div id="collegeLogo" className="shadow-xl border border-gray flex items-center">
        {/* <div className="bg-white border m-2 py-1 px-2 w-[6rem] rounded-[2rem] hover:text-white hover:bg-opacity-70 hover:bg-black lg:block hidden " id="mainSiteLink">
                    <a href="https://www.mmcoe.edu.in/" target='_blank'>Main Site</a>
                    <i className="fa-solid fa-arrow-up fa-xs" style={{ color: "#000000", transform: "rotate(45deg)" }}></i>
                </div> */}
        <div className="flex items-center" id="Logo">
          <div
            className="w-full p-2 cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img src={logo} className="w-[10rem] h-[4rem]" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeInfo;
