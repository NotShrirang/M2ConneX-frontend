import { Link } from "react-router-dom";

export default function Events_Navbar({ current = 1 }) {
    return (
        <>
            <div className="flex items-center w-[100%] h-[4rem] bg-primary rounded-3xl mx-auto mt-[5rem] mb-[5rem] cursor-pointer font-bold">
                <Link to={'/events/upcoming'} className={`w-[25rem] h-[4rem] pt-1 text-center text-[2rem] rounded-3xl ${current === 1 ? 'bg-black text-white' : ''}`}>Upcoming Events</Link>
                <Link to={'/events/past'} className={`w-[25rem] h-[4rem] pt-1 text-center text-[2rem] rounded-3xl ${current === 2 ? 'bg-black text-white' : ''}`}> Past Events</Link>
                <Link to={'/events/gallery'} className={`w-[25rem] h-[4rem] pt-1 text-center text-[2rem] rounded-3xl ${current === 3 ? 'bg-black text-white' : ''}`}> Phote Gallery</ Link>
            </div >
        </>
    )
}