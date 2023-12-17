import Event from "../components/events/event";
export default function Events_Upcoming({ events }) {
  // events = events.filter((event) => {
  //     return event.date >= Date.now()
  // })
  //   console.log(events);

  return (
    <div className="flex flex-col items-center justify-center">
      {events.map((event) => {
        return <Event upcoming={true} event={event} />;
      })}
    </div>
  );
}
