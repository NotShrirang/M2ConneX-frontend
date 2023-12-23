import formatDate from "../utils/date";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Notification = ({ notification }) => {
  const navigate = useNavigate();
  const [_notification, setNotification] = useState(notification);
  return (
    <div
      className="w-full bg-[#f4f2ee] flex flex-col md:justify-between lg:w-full px-4 rounded-lg shadow-sm border border-gray cursor-pointer hover:bg-[#f4f2ee]"
      onClick={() => {
        window.open(_notification.link, "_blank");
      }}
    >
      <div className="flex flex-col">
        <h3>{_notification.title}</h3>
        <p>{formatDate(_notification.createdAt)}</p>
      </div>
      <div className="flex flex-col">
        <p>{_notification.description}</p>
      </div>
    </div>
  );
};

export default Notification;
