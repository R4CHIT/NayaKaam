import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const NotificationMain = ({ setShow, notifications,setNotificationStatus, onNext, onPrev }) => {
  const notificationList = notifications.results || [];
  useEffect(()=>{setNotificationStatus(false)},[])
  return (
    <>
      {open && (
        <div className="absolute right-10 top-17 w-96 bg-white rounded-3xl shadow-2xl border overflow-hidden z-50 animate-slide-down">
          <div className="px-6 py-3 border-b font-bold text-gray-900 text-lg flex justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-t-3xl">
            Notifications
            <button
              className="text-white hover:text-gray-200 font-bold"
              onClick={() => setShow(false)}
            >
              ✕
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto bg-gray-50">
            {notificationList.length === 0 && (
              <div className="p-6 text-center text-gray-400">
                No notifications
              </div>
            )}

            {notificationList.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 px-6 py-4 cursor-pointer transition-all duration-200 rounded-lg mb-2
                  ${notif.is_read ? "bg-white hover:bg-gray-50" : "bg-indigo-50 hover:bg-indigo-100 shadow-sm"}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold">
                  {notif.sender.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{notif.sender}</span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
                  {notif.location && (
                    <span className="text-xs text-gray-500 mt-0.5 block">Location: {notif.location}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-3 border-t flex justify-between text-indigo-600 font-medium bg-white">
            <button
              onClick={onPrev}
              className={`px-3 py-1 rounded hover:bg-gray-100 ${
                !notifications.previous ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              ← Previous
            </button>
            <button
              onClick={onNext}
              className={`px-3 py-1 rounded hover:bg-gray-100 ${
                !notifications.next ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationMain;
