import { useEffect, useState } from "react";
import Events_Hero from "../components/events/EventHero";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import Events_Upcoming from "../pages/EventsUpcoming";
import Events_Past from "../pages/EventsPast";
import Events_Gallery from "../pages/EventsGallery";

export default function Events_Layout() {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();

  const [events, setEvents] = useState({
    count: 7,
    next: "http://localhost:8000/event/event/?page=2",
    previous: null,
    results: [
      {
        id: "00858cd4-b898-43da-ab53-09cfbf769ea3",
        name: "New Year",
        description: "New year Party for all students",
        date: "2023-12-31",
        time: "12:00:00",
        venue: "college",
        department: "1",
        link: null,
        createdByUser: "12921664-6ad7-447a-809e-8b08423b6bd1",
        userName: "Swanand Kulkarni",
        userProfilePicture: null,
        createdAt: "2023-12-16T08:33:07.850430Z",
        updatedAt: "2023-12-16T08:33:07.850456Z",
      },
    ],
  });

  useEffect(() => {
    // const getEvents = async () => {
    // fetch(ApiConfig.events, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //     }).catch(err => console.log(err)
    //     )

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/auth");
    }

    axios
      .get(ApiConfig.events, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((err) => console.log(err));
    // };
  }, []);

  return (
    <div className="flex items-center flex-col">
      <Events_Hero />
      <div className="w-full min-h-fit flex flex-col">
        <div className="flex items-center justify-evenly w-full py-2 bg-primary rounded-3xl my-8 font-bold">
          <p
            onClick={() => {
              setCurrent(1);
            }}
            className={`text-center text-2xl rounded-3xl p-2 hover:cursor-pointer ${
              current === 1 ? "bg-black text-white" : ""
            }`}
          >
            Upcoming Events
          </p>
          <p
            onClick={() => {
              setCurrent(2);
            }}
            className={`text-center text-2xl rounded-3xl p-2 hover:cursor-pointer ${
              current === 2 ? "bg-black text-white" : ""
            }`}
          >
            {" "}
            Past Events
          </p>
          <p
            onClick={() => {
              setCurrent(3);
            }}
            className={`text-center text-2xl rounded-3xl p-2 hover:cursor-pointer ${
              current === 3 ? "bg-black text-white" : ""
            }`}
          >
            Gallery
          </p>
        </div>

        {current === 1 ? (
          <Events_Upcoming events={events.results} />
        ) : current === 2 ? (
          <Events_Past events={events.results} />
        ) : (
          <Events_Gallery />
        )}
      </div>
    </div>
  );
}
