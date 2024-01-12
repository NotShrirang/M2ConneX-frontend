import Event from "../components/events/event";
export default function Events_Upcoming({ events }) {
  if (events === undefined) {
    return <div></div>;
  }
  events = events.filter((event) => {
    return new Date(event.date) >= new Date();
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mb-8">
      {events.length === 0 && (
        <p className="text-2xl font-bold text-center">
          No Upcoming Events Found
        </p>
      )}
      {events.map((event) => {
        return <Event upcoming={true} event={event} key={event.id} />;
      })}
    </div>
  );
}
