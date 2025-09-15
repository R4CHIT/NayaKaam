import React, { useState } from "react";
import {
  FiSend,
  FiPaperclip,
  FiSmile,
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiSearch,
  FiMenu,
} from "react-icons/fi";
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";
import sendMessage from "../../api/message/sendMessage";

const UserMessage = ({
  messages,
  currentChat,
  setSidebarOpen,
  messagesEndRef,
  mainBar
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) sendMessage(message, currentChat.user.id);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
        Click on a profile to start chatting
      </div>
    );
  }

  const MainBar = ({mainBar}) => {
    
    return (
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {mainBar.profilepic ? (
              <img
                src={`http://127.0.0.1:8000${mainBar.profilepic}`}
                alt={mainBar.username}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                {mainBar?.username ? mainBar.username.charAt(0).toUpperCase() : "U"}

              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {mainBar.username}
            </h3>
          </div>
        </div>
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

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors"
      >
        <FiMenu className="w-5 h-5 text-gray-600" />
      </button>
      <MainBar mainBar={mainBar}/>
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === currentChat.user.id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div
                className={`flex items-end space-x-3 max-w-md ${
                  msg.sender !== currentChat.user.id
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                {msg.sender === currentChat.user.id &&
                  msg.sender_profile &&
                  (msg.sender_profile.profilepic ? (
                    <img
                      src={`http://127.0.0.1:8000${msg.sender_profile.profilepic}`}
                      alt={msg.sender_profile.username}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {msg.sender_profile.username.charAt(0).toUpperCase()}
                    </div>
                  ))}

                <div
                  className={`px-5 py-3 rounded-2xl shadow-sm ${
                    msg.sender !== currentChat.user.id
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`text-xs ${
                        msg.sender !== currentChat.user.id
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {msg.sender !== currentChat.user.id && msg.status && (
                      <div className="ml-2">
                        {msg.status === "read" && (
                          <IoCheckmarkDone className="w-4 h-4 text-blue-200" />
                        )}
                        {msg.status === "delivered" && (
                          <IoCheckmarkDone className="w-4 h-4 text-blue-300" />
                        )}
                        {msg.status === "sent" && (
                          <IoCheckmark className="w-4 h-4 text-blue-200" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className=" bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-center h-full items-end space-x-3">
          <button className="p-5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <FiPaperclip className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 overflow-y-auto placeholder-gray-500"
              rows="1"
              style={{ minHeight: "52px" }}
            />
            <button className="absolute right-3 top-3 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiSmile className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            className={`p-5 relative rounded-full transition-all flex-shrink-0 ${
              message.trim()
                ? " text-blue-600"
                : "bg-white text-gray-400 cursor-not-allowed"
            }`}
            disabled={!message.trim()}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
