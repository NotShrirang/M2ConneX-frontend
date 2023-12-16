import React from "react";
import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import ApiConfig from "../../utils/ApiConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
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
          alert("Login Successful!");
          window.location.href = "/feed";
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
      <div className="flex flex-row items-center justify-center pt-4">
        <div className="flex flex-col pt-16 items-center justify-center w-full">
            
          <div className="w-full type-selector flex flex-col items-center">
              <p>Select login type</p>
              <div className="w-full cards flex flex-row justify-evenly">
                <div
                  class={"card w-36 h-40 px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer "
                  + (role === 'student' ? "border-2 border-primary" : "")}
                  onClick={() => {
                    setRole("student");
                  }}
                >
                  <img
                    class="w-32"
                    src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg"
                    alt="student"
                  />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Student</div>
                  </div>
                </div>

                <div
                  class={"card w-36 h-40 px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer "
                  + (role === 'alumini' ? "border-2 border-primary" : "")}
                  onClick={() => {
                    setRole('alumini');
                  }}
                >
                  <img
                    class="w-32"
                    src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg"
                    alt="alumini"
                  />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Alumini</div>
                  </div>
                </div>

                <div
                  class={"card w-36 h-40 px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer "
                  + (role === 'faculty' ? "border-2 border-primary" : "")}
                  onClick={() => {
                    setRole('faculty');
                  }}
                >
                  <img
                    class="w-32"
                    src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg"
                    alt="alumini"
                  />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Faculty</div>
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
          <button type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold"
            onSubmit={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
