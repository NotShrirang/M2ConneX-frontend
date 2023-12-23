import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ login }) {
  return (
    <>
      <div className={"items flex flex-row-reverse w-full md:py-2 " + (login ? "" : "md:pt-6")}>
        <label htmlFor="navToggle" className={"md:hidden block text-xl  absolute right-4 " + (login ? "top-7" : "top-32")}>
          <i
            className="fa-solid fa-bars"
          ></i>
        </label>
        <input type="checkbox" id="navToggle" className="hidden peer" />

        <div
          id="item-list"
          className="md:flex-row w-full md:flex md:gap-x-2 md:items-center md:my-4 peer-checked:flex hidden flex-col gap-y-1"
        >
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Feed
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/batches"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Batches
          </NavLink>
          <NavLink
            to="/oppurtunities"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Oppurtunities
          </NavLink>
          <NavLink
            to="/directory"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Directory
          </NavLink>
          <NavLink
            to="/connections"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Connections
          </NavLink>
          <NavLink
            to="/donations"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Donations
          </NavLink>
          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-red transition-all duration-300"
            }
          >
            Feedback
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
