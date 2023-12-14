import { useState } from "react"
import { url } from "../../utils/constants"
import Student_Registration from "./inputs/register_student"
import Alumni_Registration from "./inputs/register_alumini"

export default function Register() {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cprn: '',
        password: '',
        confirm_password: '',
        privilege: '1',
        department: '1',
    })

    const [page, setPage] = useState(0)

    const register = () => { }

    const [role, setRole] = useState('4')
    return (
        <div className="flex flex-col">

            {
                page != 0 ? <div><button className="self-start ml-16" onClick={() => { page === 3 ? setPage(page - 2) : setPage(page - 1) }}>back</button></div> : <></>
            }
            <div className="inputs flex flex-col items-center justify-center pt-16 w-full">
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
                                    </div>
                                </div>
                            </> : page == 2 ?
                                <>
                                    <div className="student-fields flex flex-col w-full items-center">
                                        Enter details for student
                                        <input required type="text" placeholder="CPRN" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.cprn} onChange={(value) => { setData({ ...data, cprn: value.target.value }) }}
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

                                        <input required type="password" placeholder="Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.password} onChange={(value) => { setData({ ...data, password: value.target.value }) }}
                                        />
                                        <input required type="password" placeholder="Confirm Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.confirm_password} onChange={(value) => { setData({ ...data, confirm_password: value.target.value }) }}
                                        />
                                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold" onClick={register}>
                                            Register
                                        </button>
                                    </div>
                                </> : page == 3 ? <>
                                    <div className="inputs flex flex-col items-center justify-center w-full">
                                        Enter details for alumini
                                        <div className="flex flex-row justify-between w-[60%] mt-8">
                                            <input type="text" placeholder="First Name" className="border-2 border-black w-full p-1 mr-2"
                                                value={data.name} onChange={(value) => { setData({ ...data, name: value.value }) }}
                                            />
                                            <input type="text" placeholder="Last Name" className="border-2 border-black w-full p-1 ml-2"
                                                value={data.name} onChange={(value) => { setData({ ...data, name: value.value }) }}
                                            />
                                        </div>
                                        <input type="email" placeholder="Email" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.email} onChange={(value) => { setData({ ...data, email: value.value }) }}
                                        />
                                        <input type="text" placeholder="CPRN" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.cprn} onChange={(value) => { setData({ ...data, cprn: value.value }) }}
                                        />
                                        <input type="password" placeholder="Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.password} onChange={(value) => { setData({ ...data, password: value.value }) }}
                                        />
                                        <input type="password" placeholder="Confirm Password" className="border-2 border-black w-[60%] p-1 mt-8"
                                            value={data.confirm_password} onChange={(value) => { setData({ ...data, confirm_password: value.value }) }}
                                        />
                                        <button className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold">Register</button>
                                    </div>
                                </> : <></>

                }
            </div>
        </div>
    )
}