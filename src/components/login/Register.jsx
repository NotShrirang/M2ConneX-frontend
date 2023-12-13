import { useState } from "react"
import { url } from "../../utils/constants"
import Student_Registration from "./inputs/register_student"
import Alumni_Registration from "./inputs/register_alumini"

export default function Register() {
    const [role, setRole] = useState('4')
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center pt-4">

                <div className="flex flex-col pt-16 items-center justify-center w-full">
                    <div className="flex flex-row pr-4">

                        <label htmlFor="role" className={
                            "px-4 rounded-l-lg w-48 lg:w-64 font-bold"
                        }>Registration Type</label>
                        <select name="role" id="role" className="pr-4" onChange={(value) => { setRole(value.target.value) }}>
                            <option value="4">Student</option>
                            <option value="3">Alumni</option>
                        </select>
                    </div>
                    {
                        role === '4' ?
                            <Student_Registration /> :
                            <Alumni_Registration />
                    }

                </div>


            </div>
        </div>
    )
}