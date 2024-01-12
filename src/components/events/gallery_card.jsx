import { useNavigate } from "react-router-dom";

export default function Gallery_Card({ event }) {
  const navigate = useNavigate();
  return event.images.length > 0 ? (
    <div className="w-64 grid-item flex flex-col items-center mx-4 mb-10">
      <div
        className="w-full h-72 bg-gray mb-4 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-xl hover:z-10"
        onClick={() => {
          window.open(event.images[0].image, "_blank");
        }}
      >
        <img
          src={event.images.length > 0 ? event.images[0].image : ""}
          alt="event"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <p
        className="text-xl font-bold tracking-wide cursor-pointer hover:underline hover:text-primary transition-all duration-300"
        onClick={() => window.open(event.link, "_blank")}
      >
        {event.name}
      </p>
    </div>
  ) : (
    <></>
  );
}
