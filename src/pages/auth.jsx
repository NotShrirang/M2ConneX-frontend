import { useState } from "react";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
export default function Login_reg_page() {
  const [state, setState] = useState("login");
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center pt-4">
        <p> Login/Register</p>
      </div>

      <div className="flex flex-row items-center justify-center">
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
