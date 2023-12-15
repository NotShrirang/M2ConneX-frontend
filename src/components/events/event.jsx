import React from "react"
import { Link } from "react-router-dom"
import arrows from '../../assets/arrow.svg'
export default function Event({ upcoming = false }) {
    return (
        <div className="w-[100%] h-[28rem] mb-[6.813rem] flex flex-row border-none rounded-lg shadow-xl p-6">
            <div className="w-[42%] h-[100%] mr-[5%] bg-[#D9D9D9]">
                <img className="w-[100%] h-[100%] rounded-lg shadow-md" />
            </div>
            <div className="w-[55%] h-[100%] flex flex-col">
                <div className="w-[100%] h-[65%]  overflow-hidden text-justify leading-event text-[1.5rem]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, necessitatibus delectus expedita architecto facere qui animi, a porro veritatis asperiores sed ea dicta iste officia itaque ipsa maxime tempora quisquam voluptateslpa? Commodi necessitatibus reprehenderit sit deleniti mollitia!
                </div>
                <Link className="w-[12rem] self-end flex flex-row justify-end items-center text-[1.5rem]">
                    <div className="text-[#0038FF] my-5 "> know more</div>
                    <div className="w-8 h-1 "><img src={arrows} /></div>
                </Link>
                {upcoming &&
                    <button className="ml-[30%] w-[11rem] h-[4.375rem] text-[2.5rem] font-bold text-white rounded-md bg-lightmaroon text-center shadow-md shadow-gray bg-[#962E32]">RVSP</button>
                }
            </div>
        </div>

    )
}