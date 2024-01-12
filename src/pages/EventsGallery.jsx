import Gallery_Card from "../components/events/gallery_card";
export default function Events_Gallery({ events }) {
  console.log(events);
  return (
    <>
      <div className="flex flex-row w-full min-h-fit flex-wrap justify-center">
        {events.length === 0 && (
          <p className="text-2xl font-bold text-center">
            No Events Found in Gallery
          </p>
        )}
        {events &&
          events.map((event) => {
            return <Gallery_Card event={event} key={event.id} />;
          })}
      </div>
    </>
  );
}
