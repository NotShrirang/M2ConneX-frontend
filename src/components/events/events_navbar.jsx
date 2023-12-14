import { Link } from "react-router-dom";

export default function Events_Navbar({ current = 1 }) {
    return (
        <>
            <div className="flex items-center w-[75rem] h-[4rem] bg-black rounded-3xl mx-auto mt-[5rem] cursor-pointer">
                <Link to={'/events/upcoming'} className={`w-[25rem] h-[4rem] pt-1 text-center text-[2rem] text-white font-semibold rounded-3xl ${current === 1 ? 'bg-primary' : 'bg - black'}`}>Upcoming Events</Link>
                <Link to={'/events/past'} className={`w-[25rem] h-[4rem] pt-1 text-center text-[2rem] text-white font-semibold rounded-3xl ${current === 2 ? 'bg-primary' : 'bg - black'}`}> Past Events</Link>
                <Link to={'/events/gallery'} className={`w-[25rem] h-[4rem] pt-1 text-center text-[2rem] text-white font-semibold rounded-3xl ${current === 3 ? 'bg-primary' : 'bg - black'}`}> Phote Gallery</ Link>
            </div >
        </>
    )
}