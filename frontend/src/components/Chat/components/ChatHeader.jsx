import React from "react";
import { FiSearch, FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";

const ChatHeader = ({ currentChat }) => {
  if (!currentChat) return null;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Left: Chat User Info */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={currentChat.avatar}
            alt={currentChat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {currentChat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{currentChat.name}</h3>
          <p
            className={`text-sm ${
              currentChat.online ? "text-green-500" : "text-gray-500"
            }`}
          >
            {currentChat.online ? "Online" : "Last seen recently"}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2">
        <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
          <FiSearch className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
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
