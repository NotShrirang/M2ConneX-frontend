import Events_Navbar from "../components/events/events_navbar";
import Event from "../components/events/event";
export default function Events_Upcoming() {
    return (
        <>
            <Events_Navbar current={1} />
            <Event upcoming={true} />
            <Event upcoming={true} />
            <Event upcoming={true} />

        </>
    );
} 