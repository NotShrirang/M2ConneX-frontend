import { useEffect, useState } from 'react';
import Events_Hero from '../components/events/EventHero'
import { Outlet } from 'react-router-dom';
import ApiConfig from '../utils/ApiConfig';
import Events_Upcoming from '../pages/EventsUpcoming';
import Events_Past from '../pages/EventsPast';
import Events_Gallery from '../pages/EventsGallery';

export default function Events_Layout() {

    const[current,setCurrent] = useState(1)

    const [events,setEvents] = useState(
        {
            "count": 7,
            "next": "http://localhost:8000/event/event/?page=2",
            "previous": null,
            "results": [
                {
                    "id": "00858cd4-b898-43da-ab53-09cfbf769ea3",
                    "name": "New Year",
                    "description": "New year Party for all students",
                    "date": "2023-12-31",
                    "time": "12:00:00",
                    "venue": "college",
                    "department": "1",
                    "link": null,
                    "createdByUser": "12921664-6ad7-447a-809e-8b08423b6bd1",
                    "userName": "Swanand Kulkarni",
                    "userProfilePicture": null,
                    "createdAt": "2023-12-16T08:33:07.850430Z",
                    "updatedAt": "2023-12-16T08:33:07.850456Z"
                },
                {
                    "id": "2fdb1cd5-8875-499b-b787-44b0e4a24415",
                    "name": "New Year",
                    "description": "New year Party for all students",
                    "date": "2023-12-31",
                    "time": "12:00:00",
                    "venue": "college",
                    "department": "1",
                    "link": null,
                    "createdByUser": "12921664-6ad7-447a-809e-8b08423b6bd1",
                    "userName": "Swanand Kulkarni",
                    "userProfilePicture": null,
                    "createdAt": "2023-12-16T08:32:38.029700Z",
                    "updatedAt": "2023-12-16T08:32:38.029721Z"
                },
                {
                    "id": "1df26c28-7d42-4524-b298-0e77f9884a23",
                    "name": "Test Event",
                    "description": "This is a test event.",
                    "date": "2023-12-13",
                    "time": "10:00:00",
                    "venue": "Seminar Hall",
                    "department": "8",
                    "link": null,
                    "createdByUser": "12921664-6ad7-447a-809e-8b08423b6bd1",
                    "userName": "Swanand Kulkarni",
                    "userProfilePicture": null,
                    "createdAt": "2023-12-14T16:00:58.372855Z",
                    "updatedAt": "2023-12-14T16:00:58.372871Z"
                },
                {
                    "id": "2fc2cb99-c8ef-4ee7-b9a9-9da8f765b8bb",
                    "name": "Test Event",
                    "description": "This is a test event.",
                    "date": "2023-12-13",
                    "time": "10:00:00",
                    "venue": "Seminar Hall",
                    "department": "1",
                    "link": null,
                    "createdByUser": "12921664-6ad7-447a-809e-8b08423b6bd1",
                    "userName": "Swanand Kulkarni",
                    "userProfilePicture": null,
                    "createdAt": "2023-12-14T16:00:56.257331Z",
                    "updatedAt": "2023-12-14T16:00:56.257345Z"
                },
                {
                    "id": "eda55084-a36f-4123-8cad-41b2e4bbed0a",
                    "name": "Test Event",
                    "description": "This is a test event.",
                    "date": "2023-12-13",
                    "time": "10:00:00",
                    "venue": "Seminar Hall",
                    "department": "1",
                    "link": null,
                    "createdByUser": "12921664-6ad7-447a-809e-8b08423b6bd1",
                    "userName": "Swanand Kulkarni",
                    "userProfilePicture": null,
                    "createdAt": "2023-12-14T15:59:18.516810Z",
                    "updatedAt": "2023-12-14T15:59:18.516826Z"
                },
                {
                    "id": "894f4833-c7a8-42c6-af6c-88453bcd8ec4",
                    "name": "New Year",
                    "description": "New year Party for all students",
                    "date": "2023-12-31",
                    "time": "12:00:00",
                    "venue": "college",
                    "department": "1",
                    "link": null,
                    "createdByUser": "12921664-6ad7-447a-809e-8b08423b6bd1",
                    "userName": "Swanand Kulkarni",
                    "userProfilePicture": null,
                    "createdAt": "2023-12-14T15:54:31.990915Z",
                    "updatedAt": "2023-12-14T15:54:31.990929Z"
                }
            ]
        }
    )

    useEffect(() => {
        const getEvents = async () => {
            fetch(ApiConfig.events, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                }).catch(err => console.log(err)
                )
        }
    }, [])

    return (
        <div className='flex items-center flex-col'>
            <Events_Hero />
            <div className="w-full min-h-fit flex flex-col">
            <div className="flex items-center justify-evenly w-full py-2 bg-primary rounded-3xl my-8 font-bold">
                <p onClick={() => {setCurrent(1)}} className={`text-center text-2xl rounded-3xl p-2 hover:cursor-pointer ${current === 1 ? 'bg-black text-white' : ''}`}>Upcoming Events</p>
                <p onClick={() => {setCurrent(2)}} className={`text-center text-2xl rounded-3xl p-2 hover:cursor-pointer ${current === 2 ? 'bg-black text-white' : ''}`}> Past Events</p>
                <p onClick={() => {setCurrent(3)}} className={`text-center text-2xl rounded-3xl p-2 hover:cursor-pointer ${current === 3 ? 'bg-black text-white' : ''}`}>Gallery</ p>
            </div >

                {
                    current === 1 ? <Events_Upcoming events={events.results}/> 
                    : current === 2 ? <Events_Past events={events.results} /> 
                    : <Events_Gallery />
                
                }

            </div>
        </div>
    )
}