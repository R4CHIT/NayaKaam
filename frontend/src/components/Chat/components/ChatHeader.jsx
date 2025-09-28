import React, { useContext, useState } from "react";
import { FiSearch, FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";
import sendNotification from "../../api/Notification/sendNotifiaction";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const ChatHeader = ({ currentChat }) => {
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

      
    </div>
  );
};

export default ChatHeader;
