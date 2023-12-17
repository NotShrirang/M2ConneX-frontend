import Event from "../components/events/event";
export default function Events_Past({ events }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {events.map((event) => {
        return <Event upcoming={false} event={event} />;
      })}
    </div>
  );
}
