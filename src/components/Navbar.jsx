import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { item: "Feed", link: "/feed" },
  { item: "Opportunities", link: "/opportunities" },
  { item: "Connections", link: "/connections" },
  { item: "Events", link: "/events" },
  { item: "Blogs", link: "/blogs" },
  { item: "Batches", link: "/batches" },
  { item: "Directory", link: "/directory" },
  { item: "Donations", link: "/donations" },
  { item: "Feedback", link: "/feedback" },
];

function Navbar({ login }) {
  return (
    <>
      <div
        className={
          "items flex flex-row-reverse w-full md:py-2" + (login ? "" : "pt-6")
        }
      >
        <label
          htmlFor="navToggle"
          className={
            "md:hidden block text-xl absolute right-4 " +
            (login ? "top-7" : "top-[70px]")
          }
        >
          <i className="fa-solid fa-bars"></i>
        </label>
        <input type="checkbox" id="navToggle" className="hidden peer" />

        <div
          id="item-list"
          className="md:ml-2 md:flex-row w-full md:flex md:gap-x-2 md:items-center bg-[#1E1E1E] z-10 mt-[1.2rem] md:mt-0 peer-checked:flex hidden flex-col gap-y-1"
        >
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className="text-white text-base hover:text-primary transition-all duration-300 p-2"
              activeClassName="text-primary"
            >
              {item.item}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
