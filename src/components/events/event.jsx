import React from "react"
import { Link } from "react-router-dom"
import arrows from '../../assets/arrow.svg'

export default function Event({ upcoming = false, event }) {

    // const event = {
    //     "id": "00858cd4-b898-43da-ab53-09cfbf769ea3",
    //     "name": "New Year",
    //     "description": "New year Party for all students",
    //     "date": "2023-12-31",
    //     "time": "12:00:00",
    //     "venue": "college",
    //     "department": "1",
    //     "link": null,
    //     "createdByUser": "12921664-6ad7-447a-809e-8b08423b6bd1",
    //     "userName": "Swanand Kulkarni",
    //     "userProfilePicture": null,
    //     "createdAt": "2023-12-16T08:33:07.850430Z",
    //     "updatedAt": "2023-12-16T08:33:07.850456Z"

    // }


    return (
        <div className="w-full lg:w-[75%] lg:py-16 shadow-2xl h-content mb-32 flex lg:gap-4 lg:flex-row flex-col justify-center items-center border-none rounded-lg p-6">
            <div className="lg:w-[50%] w-[90%] h-64 bg-[#D9D9D9]">
                <img className="w-full h-full rounded-lg shadow-md" />
            </div>
            <div className="lg:w-[50%] mt-4 w-[90%] h-full flex flex-col">
                <div className="grid grid-cols-2 justify-between w-full py-2">
                    <p className="name text-2xl text-start font-bold self-start">{event.name}</p>
                    <p className="date text-xl font-medium text-end  self-start">{event.date}</p>
                    <p className="venue text-xl text-start self-start">venue: {event.venue}</p>
                    <p className="time text-xl text-end  self-start">{event.time}</p>
                </div>
                <div className="w-full overflow-hidden text-justify leading-event text-2xl">
                    {event.description}
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