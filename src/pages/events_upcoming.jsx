import Events_Navbar from "../components/events/events_navbar";

export default function Events_Upcoming() {
    return (
        <>
            <Events_Navbar current={1} />
            <div className="w-[75rem] min-h-fit mt-10 mx-auto bg-primary"></div>
        </>
    );
} 