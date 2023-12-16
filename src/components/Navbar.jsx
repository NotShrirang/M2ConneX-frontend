import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="className-items flex flex-row-reverse pt-4">
        <label htmlFor="navToggle" className="md:hidden block text-xl">
          <i className="fa-solid fa-bars"></i>
        </label>
        <input type="checkbox" id="navToggle" className="hidden peer" />

        <div
          id="item-list"
          className="md:flex-row w-full md:flex md:gap-x-2 md:items-center md:my-4 peer-checked:flex hidden flex-col"
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
