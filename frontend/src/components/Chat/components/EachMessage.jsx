import React, { useContext } from 'react'
import AuthContext from '../../../context/AuthContext';
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";
const EachMessage = ({msg}) => {
    
    const formatTime = (timestamp) => {
    if (!timestamp) return null;; 
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

    const {user} = useContext(AuthContext)
    const currentUser = user?.id;
    const condition = user?.roles == "provider"
    const isCurrentUser = msg.sender === currentUser;
    const profile = !condition
              ? msg.sender_profile
              : msg.sender_profile;
    console.log(msg)
  return (
    <div>
      <div
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-end max-w-md ${
                    isCurrentUser ? "flex-row-reverse gap-2" : "gap-2"
                  }`}
                >
                  {!isCurrentUser && (
                    profile?.profilepic ? (
                      <img
                        src={`http://127.0.0.1:8000${profile.profilepic}`}
                        alt={profile?.username || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {profile?.username?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )
                  )}

                  
                  <div
                    className={`px-5 py-3 rounded-2xl shadow-sm ${
                      isCurrentUser
                        ? "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-xs ${
                          isCurrentUser ? "text-gray-500" : "text-blue-100"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </span>
                      {isCurrentUser && msg.status && (
                        <div className="ml-2">
                          {msg.status === "read" && (
                            <IoCheckmarkDone className="w-4 h-4 text-blue-500" />
                          )}
                          {msg.status === "delivered" && (
                            <IoCheckmarkDone className="w-4 h-4 text-gray-400" />
                          )}
                          {msg.status === "sent" && (
                            <IoCheckmark className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default EachMessage
