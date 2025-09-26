import React, { useContext, useState } from "react";
import { FiSearch, FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";
import sendNotification from "../../api/Notification/sendNotifiaction";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { socketconnect } from "../../api/videocall/socketConect";


const ChatHeader = ({ currentChat }) => {
  const [status,setStatus]=useState('')
  const navigate = useNavigate();
  if (!currentChat) return null;
  const { user } = useContext(AuthContext);

  const handleCallClick = async () => {
  const data = {
    type: "call_notification",
    caller: user?.username || "Guest",
    callerId: user?.id || null,
    receiverId: currentChat?.user?.id || null,
    message: `${user?.username || "Someone"} is calling you... 📞`,
    status: "calling",
    timestamp: new Date().toISOString(),
  };

  
  sendNotification(currentChat?.user?.id, data, currentChat?.user?.username);
  const socket = socketconnect(user.id, currentChat.user.id);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Message from server:", data);
};

socket.onclose = () => {
  console.log("WebSocket closed ❌");
  setStatus("disconnected");
};

socket.onerror = (err) => {
  console.error("WebSocket error:", err);
  setStatus("error");
};

navigate(`/waiting/${user.id}/${currentChat.user.id}`)
return () => socket.close();


};


  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        {currentChat.user.profilepic ? (
          <div className="relative">
            <img
              src={`http://127.0.0.1:8000${currentChat.user.profilepic}`}
              alt={currentChat.user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            {currentChat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">
              {currentChat.user.username?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {currentChat.user.username}
          </h3>
          <p
            className={`text-sm ${
              currentChat.online ? "text-green-500" : "text-gray-500"
            }`}
          >
            {currentChat.online ? "Online" : "Last seen recently"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
          <FiSearch className="w-5 h-5 text-gray-600" />
        </button>

        
        <button
          onClick={handleCallClick}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiPhone className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
          <FiVideo className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
          <FiMoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
