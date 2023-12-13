import { useState } from "react"

export default function Alumini_Registration() {
    const [data, setData] = useState({
        name: '',
        email: '',
        cprn: '',
        password: '',
        confirm_password: '',
        privilege: '3',
        department: '1',
    })

    return (
        <div className="inputs flex flex-col items-center justify-center pt-16 w-full">
            <div className="flex flex-row justify-between w-[60%]">
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
    )
}