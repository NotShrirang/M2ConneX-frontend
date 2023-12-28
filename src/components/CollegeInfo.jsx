import React from "react";

const CollegeInfo = () => {
  return (
    <>
      <div id="collegeLogo" className="shadow-xl border border-gray">
        {/* <div className="bg-white border m-2 py-1 px-2 w-[6rem] rounded-[2rem] hover:text-white hover:bg-opacity-70 hover:bg-black lg:block hidden " id="mainSiteLink">
                    <a href="https://www.mmcoe.edu.in/" target='_blank'>Main Site</a>
                    <i className="fa-solid fa-arrow-up fa-xs" style={{ color: "#000000", transform: "rotate(45deg)" }}></i>
                </div> */}
        <div className="flex items-center" id="Logo">
          <div
            className="w-24 p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img
              src="https://www.mmcoe.edu.in/images/logo.png"
              alt="MMCOE Logo"
            />
          </div>
          <div className="text-center px-4 lg:block hidden">
            <h1 className="text-2xl font-bold">
              Marathwada Mitra Mandal's College of Engineering
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeInfo;
