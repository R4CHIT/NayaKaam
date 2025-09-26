import React, { useContext, useState } from "react";
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
import { sendMessage } from "../../api/message/socketconnect";
import AuthContext from "../../../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatHeader from "./ChatHeader";
const UserMessage = ({
  messages,
  currentChat,
  setSidebarOpen,
  messagesEndRef,
  mainBar,
  setMessages,
}) => {
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [hasMore, setHasMore] = useState(true);
  const currentUser = user?.id;
  let profilepic = null;
  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      sender: mainBar.id,
      recipient: currentUser,
      content: message,
      status: "sent",
      attachment: null,
      timestamp: new Date().toISOString(),
      read: false,
      receiver_profile: {
        id: mainBar.id,
        username: mainBar.username,
      },
      sender_profile: {
        id: currentUser,
        username: currentChat.user.username,
        profilepic: currentChat.user.profilepic || null,
      },
    };

    if (messages[0].sender_profile.id == currentUser) {
      profilepic = messages[0].sender_profile.profilepic;
    }
    const sendmessage = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      sender: mainBar.id,
      recipient: currentUser,
      content: message,
      status: "sent",
      attachment: null,
      timestamp: new Date().toISOString(),
      read: false,
      sender_profile: {
        id: mainBar.id,
        username: mainBar.username,
      },
      receiver_profile: {
        id: currentUser,
        username: currentChat.user.username,
        profilepic: profilepic,
      },
    };

    sendMessage(sendmessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };
  const loadOlderMessages = async () => {
    if (!hasMore) return;
    try {
      const res = await fetch(
        `/api/messages/${currentChat.user.id}/?page=${page}`
      );
      const data = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setMessages((prev) => [...data.results, ...prev]); 
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
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

  const MainBar = () => (
    <>
    <ChatHeader currentChat={currentChat}/>
    </>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors"
      >
        <FiMenu className="w-5 h-5 text-gray-600" />
      </button>

      <MainBar />

      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
        <div className="space-y-6">
          <InfiniteScroll
            dataLength={messages.length}
            next={loadOlderMessages}
            hasMore={true}
            inverse={true}
            loader={<h4 className="text-center">Loading...</h4>}
            scrollableTarget="scrollableDiv"
            className="space-y-6"
          >
            {messages.map((msg) => {
              const isSender = msg.sender !== currentUser;
              const profile = isSender
                ? msg.sender_profile
                : msg.receiver_profile;

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end space-x-3 max-w-md ${
                      !isSender ? " flex-row gap-1 space-x-reverse" : ""
                    }`}
                  >
                    <div className={isSender ? "hidden" : "flex"}>
                      {profile.profilepic ? (
                        <img
                          src={`http://127.0.0.1:8000${profile.profilepic}`}
                          alt={profile.username}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {profile.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div
                      className={`px-5 py-3 rounded-2xl shadow-sm ${
                        !isSender
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs ${
                            !isSender ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {!isSender && msg.status && (
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
              );
            })}
          </InfiniteScroll>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-center h-full items-end space-x-3">
          <form action="" className="flex justify-center h-full items-end space-x-3 w-full" >
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
                ? "text-blue-600"
                : "bg-white text-gray-400 cursor-not-allowed"
            }`}
            disabled={!message.trim()}
          >
            <FiSend className="w-5 h-5" />
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
