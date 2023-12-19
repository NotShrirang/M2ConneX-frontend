import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ApiConfig from "../../utils/ApiConfig";
import AuthContext from "../../authContext";

export default function Login() {
  const { setAuth } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("login");
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    console.log(ApiConfig.login);
    axios
      .post(ApiConfig.login, data)
      .then((res) => {
        console.log(res);
        if (res.data.tokens.access) {
          var decoded = jwtDecode(res.data.tokens.access);
          const userId = decoded.user_id;
          localStorage.setItem("accessToken", res.data.tokens.access);
          localStorage.setItem("refreshToken", res.data.tokens.refresh);
          localStorage.setItem("role", role);
          localStorage.setItem("userId", userId);
          setAuth({ login: true, role: role, userId: userId, email: res.data.email, tokens: res.data.tokens })
          navigate("/");
          alert("Login Successful!");
        } else {
          console.log("error");
          alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.detail);
      });
  };
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-center pt-4">
          <div className="flex flex-col pt-16 items-center justify-center w-full">
            <div className="w-full type-selector flex flex-col items-center">
              <p>Select login type</p>
              <div className="w-full cards flex flex-row justify-evenly">
                <div
                  className={
                    "card w-36 h-40 px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer " +
                    (role === "student" ? "border-2 border-primary" : "")
                  }
                  onClick={() => {
                    setRole("Student");
                  }}
                >
                  <img
                    className="w-32"
                    src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg"
                    alt="student"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Student</div>
                  </div>
                </div>

                <div
                  className={
                    "card w-36 h-40 px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer " +
                    (role === "alumini" ? "border-2 border-primary" : "")
                  }
                  onClick={() => {
                    setRole("Alumni");
                  }}
                >
                  <img
                    className="w-32"
                    src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg"
                    alt="alumni"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Alumni</div>
                  </div>
                </div>

                <div
                  className={
                    "card w-36 h-40 px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer " +
                    (role === "faculty" ? "border-2 border-primary" : "")
                  }
                  onClick={() => {
                    setRole("Staff");
                  }}
                >
                  <img
                    className="w-32"
                    src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg"
                    alt="staff"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Staff</div>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="border-2 border-black w-[60%] p-1 mt-16"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-black w-[60%] p-1 mt-8"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
