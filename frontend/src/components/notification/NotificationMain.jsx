import React, { useEffect } from "react";
import EachNotification from "./components/EachNotification";
import readAllNotification from "../api/Notification/readAllNotification";
const NotificationMain = ({ setShow, notifications, setNotificationStatus, setApi,setUnread }) => {
  const notificationList = notifications.results || [];

  useEffect(() => {
    setNotificationStatus(false);
  }, []);

  return (
    <>
      {open && (
        <div className="absolute right-10 top-17 w-96 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-slide-down">
          
          <div className="px-6 py-4 border-b border-white/10 font-bold text-lg flex justify-between items-center bg-[#3d90ff] text-white rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3d90ff] to-[#5ba3ff] opacity-90"></div>
            <div className="relative flex items-center gap-4">
              <span className="text-lg font-semibold">Notifications</span>
              <button
                onClick={()=>{readAllNotification();setUnread(0)}}
                className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200 border border-white/20"
              >
                Mark All as Read
              </button>
            </div>
            <button
              className="relative text-white hover:text-gray-200 font-bold text-xl transition-colors duration-200 hover:rotate-90 transform"
              onClick={() => setShow(false)}
            >
              ✕
            </button>
          </div>

          
          <div className="max-h-80 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-gray-100/30 backdrop-blur-sm">
            {notificationList.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                <div className="text-5xl mb-4 opacity-50">🔔</div>
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-sm mt-1">You're all caught up!</p>
              </div>
            )}

            {notificationList.map((notif) => (
              <EachNotification key={notif.id} notif={notif} setUnread={setUnread}/>
            ))}
          </div>

          
          {notifications.next !== null && notifications.previous !== null &&(
            <div className="px-6 py-4 border-t border-gray-200/50 flex justify-between bg-white/80 backdrop-blur-sm">
            {notifications.previous !== null && (
              <button
              onClick={() => setApi(notifications.previous)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                !notifications.previous
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "text-[#3d90ff] hover:bg-[#3d90ff]/10 hover:shadow-md transform hover:-translate-x-1"
              }`}
            >
              ← Previous
            </button>
            )}
           
            {notifications.next !== null && (
              <button
              onClick={() => setApi(notifications.next)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                !notifications.next
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "text-[#3d90ff] hover:bg-[#3d90ff]/10 hover:shadow-md transform hover:translate-x-1"
              }`}
            >
              Next →
            </button>
            )}
          </div>
          )}
        </div>
      )}

      <style >{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default NotificationMain;
