import Events_Navbar from "../components/events/events_navbar";
import Event_Gallery from "../components/events/gallery";
export default function Events_Gallery() {
    return (
        <>
            <Events_Navbar current={3} />
            <div className="flex flex-row w-[100%] min-h-fit flex-wrap justify-center">
                <Event_Gallery />
                <Event_Gallery />
                <Event_Gallery />
                <Event_Gallery />
                <Event_Gallery />
                <Event_Gallery />
                <Event_Gallery />
            </div>
        </>
    );
} 