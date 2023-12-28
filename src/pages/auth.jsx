import { useState } from "react";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
export default function Auth() {
  const [state, setState] = useState("login");
  return (
    <div className="flex flex-col h-screen mb-16">
      <div className="flex flex-row items-center justify-center pt-4">
        <p className="font-bold text-2xl"> Login/Register</p>
      </div>

      <div className="flex flex-row items-center justify-center pt-4">
        <button
          className={
            "px-4 py-2 rounded-l-lg w-48 lg:w-64 " +
            (state === "login"
              ? "bg-white text-black shadow-xl drop-shadow-xl"
              : "bg-black text-white shadow-sm")
          }
          onClick={() => {
            setState("login");
          }}
        >
          Login
        </button>
        <button
          className={
            "px-4 py-2 rounded-r-lg w-48 lg:w-64 " +
            (state === "register"
              ? "bg-white text-black shadow-xl drop-shadow-xl"
              : "bg-black text-white shadow-sm")
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
  );
}
