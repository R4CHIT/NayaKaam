import React, { useContext, useState } from "react";
import { FiBell } from "react-icons/fi";
import useNotifications from "../api/Notification/handleNotification";
import AuthContext from "../../context/AuthContext";

const NotificationMain = () => {
  const [open, setOpen] = useState(false);

  
  // const notifications = [
  //   { id: 1, text: "Ramesh booked your service 🚀", time: "2m ago", read: false },
  //   { id: 2, text: "Your booking has been approved ✅", time: "1h ago", read: true },
  //   { id: 3, text: "You received a new message 💬", time: "3h ago", read: false },
  // ];
  const user = useContext(AuthContext)
  const userId = 1
  const notifications = useNotifications(userId)
  console.log(notifications)

  return (
    <>
        <div className="absolute right-10 mt-80 w-80 bg-white rounded-2xl shadow-lg border overflow-hidden z-50">
          <div className="px-4 py-2 border-b font-semibold text-gray-700">
            Notifications
          </div>

          <div className="max-h-72 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`px-4 py-3 cursor-pointer flex flex-col hover:bg-gray-50 ${
                  notif.read ? "bg-white" : "bg-blue-50"
                }`}
              >
                <span className="text-sm text-gray-800">{notif.sender_name}</span>
                <span className="text-xs text-gray-500">{notif.notification_type}</span>
              </div>
            ))}
          </div>

          <div className="px-4 py-2 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer">
            See all
          </div>
        </div>
      
    </>
  );
};

export default NotificationMain;
