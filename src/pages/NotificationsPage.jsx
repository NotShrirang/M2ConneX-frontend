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
            setNotifications([...notifications, ...res.data]);
            setLoading(false);
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
            setLoading(false);
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-3/4 mt-8 border border-gray shadow-sm items-center rounded-lg gap-y-2">
        {notifications.results &&
          notifications.results.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
      </div>
    </div>
  );
};

export default NotificationPage;
