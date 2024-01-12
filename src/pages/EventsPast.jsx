import Event from "../components/events/event";

export default function Events_Past({ events }) {
  if (events === undefined) {
    return <div></div>;
  }
  events = events.filter((event) => {
    return new Date(event.date) <= new Date();
  });
  return (
    <div className="flex flex-col items-center justify-center">
      {events.length === 0 && (
        <p className="text-2xl font-bold text-center">No Past Events Found</p>
      )}
      {events.map((event) => {
        return <Event upcoming={false} event={event} key={event.id} />;
      })}
    </div>
  );
}
