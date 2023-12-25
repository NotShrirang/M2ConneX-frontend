import formatDate from "../utils/date";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";

const Notification = ({ notification }) => {
  const navigate = useNavigate();
  const [isRead, setIsRead] = useState(notification.isRead);

  const handleRead = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    axios
      .post(
        ApiConfig.notificationRead,
        {
          notificationId: notification.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsRead(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return isRead ? (
    <div
      className="w-full h-[3rem] bg-[#f4f2ee] flex flex-col justify-center lg:w-full px-4 shadow-sm border border-gray cursor-pointer hover:bg-[#f4f2ee]"
      onClick={() => {
        window.open(notification.link, "_blank");
      }}
    >
      <div className="flex flex-row gap-x-2 items-center">
        <h3>{notification.message}</h3>
        {" • "}
        <p className="text-sm">{formatDate(notification.createdAt)}</p>
      </div>
    </div>
  ) : (
    <div
      className="w-full h-[3rem] bg-white flex flex-col md:justify-between lg:w-full px-4 shadow-sm border border-gray cursor-pointer hover:bg-[#f4f2ee]"
      onClick={() => {
        handleRead();
        window.open(notification.link, "_blank");
      }}
    >
      <div className="flex flex-row gap-x-2 items-center">
        <h3>{notification.message}</h3>
        {" • "}
        <p className="text-sm">{formatDate(notification.createdAt)}</p>
      </div>
    </div>
  );
};

export default Notification;
