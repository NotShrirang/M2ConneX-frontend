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
  const [events, setEvents] = useState({});
  const [user, setUser] = useState({});
  const [clubs, setClubs] = useState([]);
  const [isClubAdmin, setIsClubAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
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

    axios
      .get(ApiConfig.users + "/" + userId + "/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setUser(response.data);
        var clubs = data["clubs"];
        clubs = clubs.filter((club) => {
          if (club.isClubAdmin) {
            setIsClubAdmin(true);
            return club;
          }
        });
        setClubs(clubs);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex items-center flex-col h-full">
      <Events_Hero isClubAdmin={isClubAdmin} clubsList={clubs} />
      <div className="w-full min-h-fit flex flex-col items-center">
        <div className="flex items-center justify-evenly w-[95%] py-1 bg-primary rounded-lg my-8 font-bold">
          <p
            onClick={() => {
              setCurrent(1);
            }}
            className={`w-[33%] text-center font-medium rounded-lg p-2 hover:cursor-pointer ${
              current === 1 ? "bg-black text-white" : ""
            }`}
          >
            Upcoming Events
          </p>
          <p
            onClick={() => {
              setCurrent(2);
            }}
            className={`w-[33%] text-center font-medium rounded-lg p-2 hover:cursor-pointer ${
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
            className={`w-[33%] text-center font-medium rounded-lg p-2 hover:cursor-pointer ${
              current === 3 ? "bg-black text-white" : ""
            }`}
          >
            Gallery
          </p>
        </div>

        {current === 1 ? (
          <Events_Upcoming events={events.results && events.results} />
        ) : current === 2 ? (
          <Events_Past events={events.results && events.results} />
        ) : (
          <Events_Gallery events={events.results && events.results} />
        )}
      </div>
    </div>
  );
}
