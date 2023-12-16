import React from "react"
import { Link } from "react-router-dom"
import arrows from '../../assets/arrow.svg'

export default function Event({ upcoming = false }) {
    return (
        <div className="w-full lg:w-[75%] lg:py-16 shadow-2xl h-content mb-32 flex lg:gap-4 lg:flex-row flex-col justify-center items-center border-none rounded-lg p-6">
            <div className="lg:w-[50%] w-[90%] h-64 bg-[#D9D9D9]">
                <img className="w-full h-full rounded-lg shadow-md" />
            </div>
            <div className="lg:w-[50%] mt-4 w-[90%] h-full flex flex-col">
                <div className="w-full overflow-hidden text-justify leading-event text-2xl">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, necessitatibus delectus expedita architecto facere qui animi, a porro veritatis asperiores sed ea dicta iste officia itaque ipsa maxime tempora quisquam voluptateslpa? Commodi necessitatibus reprehenderit sit deleniti mollitia!
                </div>
                <Link className="self-end flex flex-row justify-end items-center text-2xl">
                    <div className="text-[#0038FF] my-5"> know more</div>
                    <div className="w-8 h-1 "><img src={arrows} /></div>
                </Link>
                {upcoming &&
                    <button className="self-end w-32 py-2 text-4xl font-bold text-white rounded-md bg-lightmaroon text-center shadow-md shadow-gray bg-[#962E32]">RVSP</button>
                }
            </div>
        </div>

    )
}