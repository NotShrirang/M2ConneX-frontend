import { useState } from "react"
import { url } from "../../utils/constants"
import Student_Registration from "./inputs/register_student"
import Alumni_Registration from "./inputs/register_alumini"

export default function Register() {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        batch: '',
        password: '',
        confirm_password: '',
        privilege: '1',
        department: '1',
        enrollmentYear: '',
        passingOutYear: '',
        college: ''
    })

    const [page, setPage] = useState(0)

    const register = (type) => { 
        fetch(url + 'users/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                privilege: type === "student" ? 1 : type === "alumini" ? 2 : 3
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status === 200) {
                    alert("Registered Successfully")
                }
                else {
                    alert(data.message) // TODO: Add Error Message
                }
            })
    }

    const handleBack = () => {
        if(page === 3 || page === 4 || page === 2){
            setPage(1)
        }
        else{
            setPage(0)
        }
    }

    const [role, setRole] = useState('4')
    return (
        <div className="flex flex-col">

            {
                page != 0 ? <div><button className="self-start ml-4" onClick={handleBack}>
                    <svg className="h-14" viewBox="0 0 512 512"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg>
                    </button></div> : <></>
            }
            <div className={"inputs flex flex-col items-center justify-center w-full " + (page==0 ? "pt-16":"pt-8")}>
                {
                    page == 0 ?
                        <>
                            <div className="flex flex-row justify-between w-[60%]">
                                <input required type="text" placeholder="First Name" className="border-2 border-black w-full p-1 mr-2"
                                    value={data.firstName} onChange={(value) => { setData({ ...data, firstName: value.target.value }) }}
                                />
                                <input required type="text" placeholder="Last Name" className="border-2 border-black w-full p-1 ml-2"
                                    value={data.lastName} onChange={(value) => { setData({ ...data, lastName: value.target.value }) }}
                                />
                            </div>
                            <input required type="email" placeholder="Email" className="border-2 border-black w-[60%] p-1 mt-8"
                                value={data.email} onChange={(value) => { setData({ ...data, email: value.target.value }) }}
                            />

                            <button className="bg-blue text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold" onClick={() => { setPage(1) }}>Next</button>
                        </>
                        : page == 1 ?
                            <>
                                <div className="w-full type-selector flex flex-col items-center">
                                    <p>Select account type</p>
                                    <div className="w-full cards flex flex-row justify-evenly">
                                        <div class="card px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer" onClick={() => { setPage(2) }}>
                                            <img class="w-32" src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg" alt="student" />
                                            <div class="px-6 py-4">
                                                <div class="font-bold text-xl mb-2">Student</div>
                                            </div>
                                        </div>

                                        <div class="card px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer" onClick={() => { setPage(3) }}>
                                            <img class="w-32" src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg" alt="alumini" />
                                            <div class="px-6 py-4">
                                                <div class="font-bold text-xl mb-2">Alumini</div>
                                            </div>
                                        </div>

                                        <div class="card px-8 rounded overflow-hidden shadow-lg flex justify-center items-center flex-col hover:cursor-pointer" onClick={() => { setPage(4) }}>
                                            <img class="w-32" src="https://static.vecteezy.com/system/resources/previews/000/505/524/original/vector-male-student-icon-design.jpg" alt="alumini" />
                                            <div class="px-6 py-4">
                                                <div class="font-bold text-xl mb-2">Faculty</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : page == 2 ?
                                <>
                                    <div className="student-fields flex flex-col w-full items-center">
                                        Enter details for student
                                        <input required type="text" placeholder="Batch" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.batch} onChange={(value) => { setData({ ...data, batch: value.target.value }) }}
                                        />

                                        <select required name="department" id="department" className="border-2 border-black w-[60%] p-1 mt-8" onChange={(value) => { setData({ ...data, department: value.target.value }) }}>
                                            <option value="1">Computer Engineering</option>
                                            <option value="2">Mechanical Engineering</option>
                                            <option value="3">Electronics & Telecommunication Engineering</option>
                                            <option value="4">Electrical Engineering</option>
                                            <option value="5">Information Technology</option>
                                            <option value="6">Artificial Intelligence & Data Science</option>
                                            <option value="7">First Year Engineering</option>
                                            <option value="8">MBA</option>
                                        </select>
                                        
                                        <div className="flex flex-col w-full items-center mt-4">
                                        <label htmlFor="enrollment" className="w-[60%]">Enrollment Year</label>
                                        <input required type="date" id="enrollment" value={data.enrollmentYear} placeholder="Enrollment Year" className="border-2 border-black w-[60%] p-1" onChange={(value) => { setData({ ...data, enrollmentYear: value.target.value }) }} />
                                        </div>

                                        
                                        <div className="flex flex-col w-full items-center mt-4">
                                        <label htmlFor="passout" className="w-[60%]">Passing out Year</label>
                                        <input required type="date" id="passout" value={data.passingOutYear} placeholder="Pass out Year" className="border-2 border-black w-[60%] p-1" onChange={(value) => { setData({ ...data, passingOutYear: value.target.value }) }} />
                                        </div>

                                        <input required type="password" placeholder="Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.password} onChange={(value) => { setData({ ...data, password: value.target.value }) }}
                                        />
                                        <input required type="password" placeholder="Confirm Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.confirm_password} onChange={(value) => { setData({ ...data, confirm_password: value.target.value }) }}
                                        />
                                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold" onClick={() => {register("student")}}>
                                            Register
                                        </button>
                                    </div>
                                </> : page == 3 ? <>
                                    <div className="alumini fields flex flex-col items-center justify-center w-full">
                                        Enter details for alumini
                                        <input required type="text" placeholder="Batch" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.batch} onChange={(value) => { setData({ ...data, batch: value.target.value }) }}
                                        />

                                        <select required name="department" id="department" className="border-2 border-black w-[60%] p-1 mt-8" onChange={(value) => { setData({ ...data, department: value.target.value }) }}>
                                            <option value="1">Computer Engineering</option>
                                            <option value="2">Mechanical Engineering</option>
                                            <option value="3">Electronics & Telecommunication Engineering</option>
                                            <option value="4">Electrical Engineering</option>
                                            <option value="5">Information Technology</option>
                                            <option value="6">Artificial Intelligence & Data Science</option>
                                            <option value="7">First Year Engineering</option>
                                            <option value="8">MBA</option>
                                        </select>
                                        
                                        <div className="flex flex-col w-full items-center mt-4">
                                        <label htmlFor="enrollment" className="w-[60%]">Enrollment Year</label>
                                        <input required type="date" id="enrollment" value={data.enrollmentYear} placeholder="Enrollment Year" className="border-2 border-black w-[60%] p-1" onChange={(value) => { setData({ ...data, enrollmentYear: value.target.value }) }} />
                                        </div>

                                        
                                        <div className="flex flex-col w-full items-center mt-4">
                                        <label htmlFor="passout" className="w-[60%]">Passing out Year</label>
                                        <input required type="date" id="passout" value={data.passingOutYear} placeholder="Pass out Year" className="border-2 border-black w-[60%] p-1" onChange={(value) => { setData({ ...data, passingOutYear: value.target.value }) }} />
                                        </div>
                                        
                                        <input type="password" placeholder="Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.password} onChange={(value) => { setData({ ...data, password: value.target.value }) }}
                                        />
                                        <input type="password" placeholder="Confirm Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.confirm_password} onChange={(value) => { setData({ ...data, confirm_password: value.target.value }) }}
                                        />
                                        <button className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold" onClick={() => {register("alumini")}}>Register</button>
                                    </div>
                                </> : 
                                page == 4 ? 
                                
                                <div className="alumini fields flex flex-col items-center justify-center w-full">
                                        Enter details for faculty
                                        <input required type="text" placeholder="College" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.college} onChange={(value) => { setData({ ...data, college: value.target.value }) }}
                                        />
                                        <input type="password" placeholder="Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.password} onChange={(value) => { setData({ ...data, password: value.target.value }) }}
                                        />
                                        <input type="password" placeholder="Confirm Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.confirm_password} onChange={(value) => { setData({ ...data, confirm_password: value.target.value }) }}
                                        />
                                        <button className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold" onClick={() => {register("faculty")}}>Register</button>
                                    </div> : <></>

                }
            </div>
        </div>
    )
}