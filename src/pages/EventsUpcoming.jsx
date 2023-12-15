import Events_Navbar from "../components/events/EventNavbar";
import Event from "../components/events/Event";
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