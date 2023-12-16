import Events_Navbar from "../components/events/EventNavbar";
import Event from "../components/events/event";
export default function Events_Upcoming() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Events_Navbar current={1} />
            <Event upcoming={true} />
            <Event upcoming={true} />
            <Event upcoming={true} />

        </div>
    );
} 
