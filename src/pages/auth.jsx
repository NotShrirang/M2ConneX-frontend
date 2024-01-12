import { useState } from "react";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
export default function Auth({ stateVar = "login" }) {
  const [state, setState] = useState(stateVar);
  return (
    <>
      <div className="flex flex-col mb-16 ">
        {/* <div className="flex flex-row items-center justify-center pt-4">
        <p className="font-bold text-2xl"> Login/Register</p>
      </div> */}

        <div className="flex flex-row items-center justify-center">
          <button
            className={
              "px-4 py-2 rounded-l-lg w-full " +
              (state === "login"
                ? "bg-primary text-white shadow-xl drop-shadow-xl"
                : "bg-white text-black shadow-sm")
            }
            onClick={() => {
              setState("login");
            }}
          >
            Login
          </button>
          <button
            className={
              "px-4 py-2 rounded-r-lg w-full " +
              (state === "register"
                ? "bg-primary text-white shadow-xl drop-shadow-xl"
                : "bg-white text-black shadow-sm")
            }
            onClick={() => {
              setState("register");
            }}
          >
            Register
          </button>
        </div>
        <div className="component-holder">
          {state === "login" ? <Login /> : <Register />}
        </div>
      </div>

      {/* <div className="auth-full-page md:flex flex-row w-full justify-center m-auto items-center">
        <div className="login w-full">
          <Login />
        </div>
        <div className="register w-full">
          <Register />
        </div>
      </div> */}
    </>
  );
}
