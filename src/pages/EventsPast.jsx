import Events_Navbar from "../components/events/EventNavbar";
import Event from "../components/events/event";
export default function Events_Past() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Events_Navbar current={2} />
            <Event />
            <Event />
            <Event />
            <Event />
        </div>
    );
} 