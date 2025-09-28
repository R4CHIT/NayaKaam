import React, { useContext, useState } from "react";
import getMessage from "../../api/message/getMessage";
import {socketconnect} from "../../api/message/socketconnect";
import AuthContext from '../../../context/AuthContext'
const ChatList = ({ chat, setSidebarOpen, setSelectedChat, selectedChat ,setMessages,setMainBar,setNextApi}) => {
  
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };
  const {user}=useContext(AuthContext)
const handleClick=async()=>{
  const res = await getMessage(chat.user.id)
  setMessages(res.data.results)
  setNextApi(res.data.next)
  setMainBar({
    id:chat.user.id,
    username:chat.user.username,
    profilepic:chat.user.profilepic
    
  })
  await socketconnect(user?.id,chat.user.id,setMessages)
  
}
  return (
    <div
      key={chat.id}
      onClick={() => {
        setSelectedChat(chat.id);
        setSidebarOpen(false);
        handleClick()
      }}
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
        selectedChat === chat.id
          ? "bg-blue-50 border-blue-500"
          : "border-transparent"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12">
          {chat.user.profilepic ? (
            <img
              src={`http://127.0.0.1:8000${chat.user.profilepic}`}
              alt={chat.user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {chat.user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 truncate">
              {chat.user.username}
            </h3>
            <span className="text-xs text-gray-500">
              {formatTime(chat.timestamp)}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-600 truncate">{chat.content}</p>
            {!chat.read && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full min-w-[20px]">
                1
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
