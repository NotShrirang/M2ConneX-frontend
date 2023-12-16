import Events_Navbar from "../components/events/EventNavbar";
import Gallery_Card from "../components/events/gallery_card";
export default function Events_Gallery() {
    return (
        <>
            <Events_Navbar current={3} />
            <div 
            className="flex flex-row w-full min-h-fit flex-wrap justify-center"
            >
                <Gallery_Card />
                <Gallery_Card />
                <Gallery_Card />
                <Gallery_Card />
                <Gallery_Card />
                <Gallery_Card />
                <Gallery_Card />
            </div>
        </>
    );
} 