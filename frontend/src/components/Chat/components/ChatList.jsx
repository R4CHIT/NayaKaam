import React from "react";
import { 
  FiSend, 
  FiPaperclip, 
  FiSmile, 
  FiMoreVertical, 
  FiPhone, 
  FiVideo, 
  FiSearch,
 
  FiMenu,
    FiX 
} from 'react-icons/fi'
const ChatList = ({chat ,setSidebarOpen,setSelectedChat,selectedChat}) => {
  return (
    <>
      <div
        key={chat.id}
        onClick={() => {
          setSelectedChat(chat.id);
          setSidebarOpen(false);
        }}
        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
          selectedChat === chat.id
            ? "bg-blue-50 border-blue-500"
            : "border-transparent"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {chat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 truncate">
                {chat.name}
              </h3>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage}
              </p>
              {chat.unread > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full min-w-[20px]">
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatList;
