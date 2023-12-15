import { useState } from "react";
import { BASEURL } from "../../../utils/constants";

export default function Student_Registration() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cprn: "",
    password: "",
    confirm_password: "",
    privilege: "1",
    department: "1",
  });

  const [error, setError] = useState("");

  const register = () => {
    if (data.password !== data.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    console.log(data);
    fetch(`${BASEURL}/users/register/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          setError(data.message);
          console.log(data);
        });
      }
    });
  };

  return (
    <div className="inputs flex flex-col items-center justify-center pt-16 w-full">
      <div className="flex flex-row justify-between w-[60%]">
        <input
          required
          type="text"
          placeholder="First Name"
          className="border-2 border-black w-full p-1 mr-2"
          value={data.firstName}
          onChange={(value) => {
            setData({ ...data, firstName: value.target.value });
          }}
        />
        <input
          required
          type="text"
          placeholder="Last Name"
          className="border-2 border-black w-full p-1 ml-2"
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
        className="border-2 border-black w-[60%] p-1 mt-8"
        value={data.email}
        onChange={(value) => {
          setData({ ...data, email: value.target.value });
        }}
      />
      <input
        required
        type="text"
        placeholder="CPRN"
        className="border-2 border-black w-[60%] p-1 mt-8"
        value={data.cprn}
        onChange={(value) => {
          setData({ ...data, cprn: value.target.value });
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
        <option value="3">Electronics & Telecommunication Engineering</option>
        <option value="4">Electrical Engineering</option>
        <option value="5">Information Technology</option>
        <option value="6">Artificial Intelligence & Data Science</option>
        <option value="7">First Year Engineering</option>
        <option value="8">MBA</option>
      </select>

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
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}
