import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ApiConfig from "../../utils/ApiConfig";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../authContext";

export default function Register() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    batch: "",
    password: "",
    confirm_password: "",
    privilege: "Student",
    department: "1",
    enrollmentYear: "",
    passingOutYear: "",
    college: "",
  });

  const { setAuth } = useContext(AuthContext);

  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [emailError, setEmailError] = useState(false);

  const register = (type) => {
    if (data.password !== data.confirm_password) {
      // alert("Passwords do not match");
      toast.error("Passwords do not match", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    data.privilege =
      type === "student" ? "Student" : type === "alumni" ? "Alumni" : "Staff";

    axios
      .post(ApiConfig.register, data)
      .then((res) => {
        if (res.status === 201) {
          axios
            .post(ApiConfig.login, {
              email: data.email,
              password: data.password,
            })
            .then((response) => {
              console.log("response");
              if (response.data.tokens.access) {
                var decoded = jwtDecode(response.data.tokens.access);
                const userId = decoded.user_id;
                localStorage.setItem(
                  "accessToken",
                  response.data.tokens.access
                );
                localStorage.setItem(
                  "refreshToken",
                  response.data.tokens.refresh
                );
                localStorage.setItem("role", role);
                localStorage.setItem("userId", userId);
                navigate("/");
                setAuth({ login: true, role: role, userId: userId, email: res.data.email, tokens: res.data.tokens })

                toast.success("Register Successful", {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              } else {
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
            });
        } else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err, {
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

  const handleBack = () => {
    if (page === 3 || page === 4 || page === 2) {
      setPage(1);
    } else {
      setPage(0);
    }
  };

  const [role, setRole] = useState("4");
  return (
    <div className="flex flex-col">
      {page != 0 ? (
        <div>
          <button className="self-start ml-4" onClick={handleBack}>
            <svg className="h-14" viewBox="0 0 512 512">
              <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}
      <div
        className={
          "inputs flex flex-col items-center justify-center w-full " +
          (page == 0 ? "pt-16" : "pt-8")
        }
      >
        {page == 0 ? (
          <>
          <div className="flex flex-col items-center justify-center w-full lg:w-2/3 gap-y-8 border-[#dedede] shadow-xl rounded-md">

            <div className="flex flex-row justify-between w-[80%] mt-4">
              <input
                required
                type="text"
                placeholder="First Name"
                className=" w-full p-2 mr-2 border-2 border-gray outline-none rounded"
                value={data.firstName}
                onChange={(value) => {
                  setData({ ...data, firstName: value.target.value });
                }}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="border-2 border-gray outline-none rounded w-full p-2 ml-2"
                value={data.lastName}
                onChange={(value) => {
                  setData({ ...data, lastName: value.target.value });
                }}
                />
            </div>
            <input
              required
              type="email"
              placeholder="Email"
              className={"border-2 border-gray outline-none rounded w-[80%] p-2 " + (emailError ? " border-red " : " border-[green]")}
              value={data.email}
              onChange={(value) => {
                if (!validateEmail(value.target.value)) {
                  setEmailError(true);
                }
                else {
                  setEmailError(false);
                }
                setData({ ...data, email: value.target.value });
              }}
              />

            <button
              className="bg-blue text-white px-4 py-2 rounded-lg my-4 w-32 font-bold"
              onClick={() => {
                if (emailError) {
                  toast.error("Invalid email", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  return;
                }
                
                if (data.lastName.length === 0 || data.firstName.length === 0) {
                  toast.error("First or Last Name or cannot be empty", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  return
                }


                axios.get(ApiConfig.checkEmail + "?email=" + data.email).then((res) => {
                  if (res.data.exists) {
                    toast.error("Email already exists", {
                      position: "bottom-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  } else {
                    setPage(1);
                  }
                });
              }}
            >
              Next
            </button>
            </div>
          </>
        ) : page == 1 ? (
          <>
            <div className="w-full type-selector flex flex-col items-center">
              <p>Select account type</p>
              <div className="w-full cards flex flex-row justify-evenly">
                <div
                  className="card px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer"
                  onClick={() => {
                    setPage(2);
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
                  className="card px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer"
                  onClick={() => {
                    setPage(3);
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
                  className="card px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer"
                  onClick={() => {
                    setPage(4);
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
          </>
        ) : page == 2 ? (
          <>
            <div className="student-fields flex flex-col w-full items-center">
              Enter details for student
              <input
                required
                type="text"
                placeholder="Batch"
                className="border-2 border-black w-[60%] p-1 mt-8"
                value={data.batch}
                onChange={(value) => {
                  setData({ ...data, batch: value.target.value });
                }}
              />
              <select
                required
                name="department"
                id="department"
                className="border-2 border-black w-[60%] p-1 mt-8"
                onChange={(value) => {
                  setData({ ...data, department: value.target.value });
                }}
              >
                <option value="1">Computer Engineering</option>
                <option value="2">Mechanical Engineering</option>
                <option value="3">
                  Electronics & Telecommunication Engineering
                </option>
                <option value="4">Electrical Engineering</option>
                <option value="5">Information Technology</option>
                <option value="6">
                  Artificial Intelligence & Data Science
                </option>
                <option value="7">First Year Engineering</option>
                <option value="8">MBA</option>
              </select>
              <div className="flex flex-col w-full items-center mt-4">
                <label htmlFor="enrollment" className="w-[60%]">
                  Enrollment Year
                </label>
                <input
                  required
                  type="date"
                  id="enrollment"
                  value={data.enrollmentYear}
                  placeholder="Enrollment Year"
                  className="border-2 border-black w-[60%] p-1"
                  onChange={(value) => {
                    setData({ ...data, enrollmentYear: value.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col w-full items-center mt-4">
                <label htmlFor="passout" className="w-[60%]">
                  Passing out Year
                </label>
                <input
                  required
                  type="date"
                  id="passout"
                  value={data.passingOutYear}
                  placeholder="Pass out Year"
                  className="border-2 border-black w-[60%] p-1"
                  onChange={(value) => {
                    setData({ ...data, passingOutYear: value.target.value });
                  }}
                />
              </div>
              <input
                required
                type="password"
                placeholder="Password"
                className="border-2 border-black w-[60%] p-1 mt-8"
                value={data.password}
                onChange={(value) => {
                  setData({ ...data, password: value.target.value });
                }}
              />
              <input
                required
                type="password"
                placeholder="Confirm Password"
                className="border-2 border-black w-[60%] p-1 mt-8"
                value={data.confirm_password}
                onChange={(value) => {
                  setData({ ...data, confirm_password: value.target.value });
                }}
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold"
                onClick={() => {
                  register("student");
                }}
              >
                Register
              </button>
            </div>
          </>
        ) : page == 3 ? (
          <>
            <div className="alumni fields flex flex-col items-center justify-center w-full">
              Enter details for alumni
              <input
                required
                type="text"
                placeholder="Batch"
                className="border-2 border-black w-[60%] p-1 mt-8"
                value={data.batch}
                onChange={(value) => {
                  setData({ ...data, batch: value.target.value });
                }}
              />
              <select
                required
                name="department"
                id="department"
                className="border-2 border-black w-[60%] p-1 mt-8"
                onChange={(value) => {
                  setData({ ...data, department: value.target.value });
                }}
              >
                <option value="1">Computer Engineering</option>
                <option value="2">Mechanical Engineering</option>
                <option value="3">
                  Electronics & Telecommunication Engineering
                </option>
                <option value="4">Electrical Engineering</option>
                <option value="5">Information Technology</option>
                <option value="6">
                  Artificial Intelligence & Data Science
                </option>
                <option value="7">First Year Engineering</option>
                <option value="8">MBA</option>
              </select>
              <div className="flex flex-col w-full items-center mt-4">
                <label htmlFor="enrollment" className="w-[60%]">
                  Enrollment Year
                </label>
                <input
                  required
                  type="date"
                  id="enrollment"
                  value={data.enrollmentYear}
                  placeholder="Enrollment Year"
                  className="border-2 border-black w-[60%] p-1"
                  onChange={(value) => {
                    setData({ ...data, enrollmentYear: value.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col w-full items-center mt-4">
                <label htmlFor="passout" className="w-[60%]">
                  Passing out Year
                </label>
                <input
                  required
                  type="date"
                  id="passout"
                  value={data.passingOutYear}
                  placeholder="Pass out Year"
                  className="border-2 border-black w-[60%] p-1"
                  onChange={(value) => {
                    setData({ ...data, passingOutYear: value.target.value });
                  }}
                />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-black w-[60%] p-1 mt-8"
                value={data.password}
                onChange={(value) => {
                  setData({ ...data, password: value.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border-2 border-black w-[60%] p-1 mt-8"
                value={data.confirm_password}
                onChange={(value) => {
                  setData({ ...data, confirm_password: value.target.value });
                }}
              />
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold"
                onClick={() => {
                  register("alumni");
                }}
              >
                Register
              </button>
            </div>
          </>
        ) : page == 4 ? (
          <div className="alumni fields flex flex-col items-center justify-center w-full">
            Enter details for faculty
            <input
              required
              type="text"
              placeholder="College"
              className="border-2 border-black w-[60%] p-1 mt-8"
              value={data.college}
              onChange={(value) => {
                setData({ ...data, college: value.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-black w-[60%] p-1 mt-8"
              value={data.password}
              onChange={(value) => {
                setData({ ...data, password: value.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-2 border-black w-[60%] p-1 mt-8"
              value={data.confirm_password}
              onChange={(value) => {
                setData({ ...data, confirm_password: value.target.value });
              }}
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold"
              onClick={() => {
                register("faculty");
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
