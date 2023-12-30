import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ApiConfig from "../../utils/ApiConfig";
import AuthContext from "../../authContext";
import { ToastContainer, toast } from "react-toastify";
import EyeOpen from "./EyeOpen";
import EyeClose from "./EyeClose";

export default function Login() {
  const { setAuth } = useContext(AuthContext)

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();


  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

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
          toast.success("Login Successful", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (res.status === 401 || res.status === 400) {
          console.log("error");
          toast.error("Invalid Credentials", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.detail, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-center pt-4">
          <div className="w-full lg:w-2/3 flex flex-col pt-12 items-center justify-center border-[#dedede] rounded-md">
            <div className="w-full type-selector flex flex-col items-center ">
              <p className="font-medium mb-2">Select login type</p>
              <div className="w-full cards flex flex-row justify-evenly ">
                <div
                  className={
                    "card w-36 h-40 px-8 rounded overflow-hidden border-gray border-[1px] flex justify-center items-center flex-col hover:cursor-pointer " +
                    (role === "Student" ? "border-[2.2px] border-primary" : "")
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
                    "card w-36 h-40 px-8 rounded overflow-hidden border-gray border-[1px] flex justify-center items-center flex-col hover:cursor-pointer " +
                    (role === "Alumni" ? "border-[2.2px] border-primary" : "")
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
                    "card w-36 h-40 px-8 rounded overflow-hidden border-gray border-[1px] flex justify-center items-center flex-col hover:cursor-pointer " +
                    (role === "Staff" ? "border-[2.2px] border-primary" : "")
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

            <div className="lg:w-2/3 w-full h-[15rem] mt-4 gap-y-6 flex flex-col justify-center items-center ">

              <input
                type="text"
                placeholder="Email"
                className="border-2 border-gray outline-none rounded w-[90%] px-2 py-2 "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div className="border-2 border-gray outline-none w-[90%] px-2 py-2 rounded flex items-center">

              <input
                type={isShowPassword?"text" : "password"}
                placeholder="Password"
                className="w-full border-none outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                />
                {isShowPassword ? <EyeOpen onClick={handleShowPassword} /> : <EyeClose onClick={handleShowPassword} />}
                </div>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg w-32 font-bold"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}




