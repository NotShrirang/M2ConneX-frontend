import { Link } from "react-router-dom";

export default function Events_Navbar({ current = 1 }) {
    return (
        <>
            <div className="flex items-center justify-evenly w-full py-2 bg-primary rounded-3xl my-8 font-bold">
                <Link to={'/events/upcoming'} className={`text-center text-2xl rounded-3xl p-2 ${current === 1 ? 'bg-black text-white' : ''}`}>Upcoming Events</Link>
                <Link to={'/events/past'} className={`text-center text-2xl rounded-3xl p-2 ${current === 2 ? 'bg-black text-white' : ''}`}> Past Events</Link>
                <Link to={'/events/gallery'} className={`text-center text-2xl rounded-3xl p-2 ${current === 3 ? 'bg-black text-white' : ''}`}>Gallery</ Link>
            </div >
        </>
    )
}