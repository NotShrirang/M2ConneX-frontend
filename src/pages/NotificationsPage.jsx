import axios from "axios";
import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import ApiConfig from "../utils/ApiConfig";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications({ next: null });
  }, []);

  const fetchNotifications = async ({ next }) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/auth");
    }

    try {
      if (next) {
        axios
          .get(next, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setNotifications((prevNotifications) => {
              return {
                ...res.data,
                results: [...prevNotifications.results, ...res.data.results],
              };
            });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      } else {
        axios
          .get(ApiConfig.notification + "?user=" + userId, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setNotifications(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-y-4 bg-[#f4f2ee] min-h-[80%]">
      <h1 className="text-3xl font-bold mt-4">Notifications</h1>
      <div className="flex flex-col items-center justify-start w-3/4 h-full border border-gray shadow-sm items-center rounded-b rounded-lg gap-y-2 mb-4">
        {notifications.results &&
          notifications.results.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        {notifications.next && (
          <button
            className="w-full h-12 my-4 text-black font-medium rounded-md"
            onClick={(e) => {
              e.preventDefault();
              fetchNotifications({ next: notifications.next });
            }}
          >
            <i className="fa-solid fa-arrow-down m-2"></i>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
