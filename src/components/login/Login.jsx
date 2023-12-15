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
          <div className="flex flex-row pr-4">
            <label
              htmlFor="role"
              className={"px-4 rounded-l-lg w-48 lg:w-64 font-bold"}
            >
              Login Type
            </label>
            <select
              name="role"
              id="role"
              className="pr-4"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
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
            className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
