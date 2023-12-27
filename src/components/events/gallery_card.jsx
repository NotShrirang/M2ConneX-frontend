export default function Gallery_Card({ event }) {
  console.log(event);
  return event.images.length > 0 ? (
    <div className="w-64 grid-item flex flex-col items-center mx-4 mb-10">
      <div className="w-full h-72 bg-gray mb-4 rounded-lg shadow-sm">
        <img
          src={event.images.length > 0 ? event.images[0].image : ""}
          alt="event"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <p className="text-xl font-bold tracking-wide">{event.name}</p>
    </div>
  ) : (
    <></>
  );
}
