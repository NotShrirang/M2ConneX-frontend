import Events_Navbar from "../components/events/EventNavbar";
import Event from "../components/events/event";
export default function Events_Past() {
    return (
        <>
            <Events_Navbar current={2} />
            <Event />
            <Event />
            <Event />
            <Event />
        </>
    );
} 