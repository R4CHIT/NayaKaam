import React, { useState } from 'react';
import { formatDistanceToNow } from "date-fns";
import readSelectednotification from '../../api/Notification/readSelectednotification';

const EachNotification = ({ notif ,setUnread}) => {
  const [isRead, setIsRead] = useState(notif.is_read);

  const handleRead = async (id) => {
    if (isRead) return; 

    setIsRead(true);
    try {
      await readSelectednotification(id);
      setUnread((prev)=>prev-1)
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setIsRead(false);
    }
  };

  return (
    <div
      key={notif.id}
      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-all duration-200 rounded-xl mb-2
        ${isRead ? "bg-white hover:bg-gray-50" : "bg-indigo-50 hover:bg-indigo-100 shadow-md"}`}
      onClick={() => handleRead(notif.id)}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold relative">
        {notif.sender.charAt(0).toUpperCase()}
        {!isRead && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className={`font-semibold ${isRead ? "text-gray-700" : "text-gray-900"}`}>
            {notif.sender}
          </span>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
          </span>
        </div>

        <p className={`text-sm mt-1 ${isRead ? "text-gray-500" : "text-gray-700"}`}>
          {notif.message}
        </p>

        {notif.location && (
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
            Location: {notif.location}
          </span>
        )}
      </div>
    </div>
  );
};

export default EachNotification;
