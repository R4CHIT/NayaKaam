import React, { useContext, useEffect, useState } from "react";
import { FiSend, FiPaperclip, FiSmile, FiMenu } from "react-icons/fi";
import { sendMessage } from "../../api/message/socketconnect";
import AuthContext from "../../../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatHeader from "./ChatHeader";
import EachMessage from "./EachMessage";
import LoadingEffect from "../../ui/LoadingEffect";

const UserMessage = ({
  messages,
  currentChat,
  setSidebarOpen,
  messagesEndRef,
  mainBar,
  setMessages,
  nextapi,
}) => {
  const [message, setMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  
  const { user } = useContext(AuthContext);
  const currentUser = user?.id;

  let profilepic = null
  if(user.roles=='provider'){
    const {profile} = useContext(AuthContext)
    profilepic=profile.profilepic
  }
  

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const timestamp = new Date().toISOString();
    const newMessage = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      sender: currentUser,
      recipient: mainBar.id,
      content: message,
      status: "sent",
      attachment: null,
      timestamp,
      read: false,
      sender_profile: {
        id: currentUser,
        username: user?.username || "Unknown",
        profilepic: profilepic || null,
      },
      receiver_profile: {
        id: mainBar.id,
        username: mainBar.username,
        profilepic: null,
      },
    };

    sendMessage(newMessage);
    setMessages((prev) => [ newMessage,...prev]);
    setMessage("");
  };

  const loadOlderMessages = async () => {
    try {
      console.log(nextapi)
      const res = await fetch(nextapi,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("accesstoken")}`
        }
      }); 
      const data = await res.json();

      if (data.next==null) {
        setHasMore(false);
        return;
      }

      
      setMessages((prev) => {
        const newMessages = data.results.filter(
          (m) => !prev.some((p) => p.id === m.id)
        );
        return [ ...prev,...newMessages,];
      });
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

  return (
    <div className="flex-1 flex flex-col min-w-0">

      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg"
      >
        <FiMenu className="w-5 h-5 text-gray-600" />
      </button>

      <ChatHeader currentChat={currentChat} />

      
      <div
  id="scrollableDiv"
  style={{ height: "calc(100vh - 160px)", overflow: "auto", display: "flex", flexDirection: "column-reverse" }}
>
  <InfiniteScroll
    dataLength={messages.length}
    next={loadOlderMessages}
    hasMore={hasMore}
    inverse={true}  
    loader={<h4 className="text-center"><LoadingEffect/></h4>}
    scrollableTarget="scrollableDiv"
    style={{ display: "flex", flexDirection: "column-reverse", gap: "1rem" }}
  >
    {messages.map((msg) => (
      <EachMessage key={msg.id} msg={msg} />
    ))}
  </InfiniteScroll>
</div>


      
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3 w-full">
          <button type="button" className="p-5 hover:bg-gray-100 rounded-full">
            <FiPaperclip className="w-5 h-5 text-gray-500" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
              style={{ minHeight: "52px" }}
            />
            <button
              type="button"
              className="absolute right-3 top-3 p-2 hover:bg-gray-100 rounded-full"
            >
              <FiSmile className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <button
            type="submit"
            className={`p-5 rounded-full transition-all ${
              message.trim() ? "text-blue-600" : "bg-white text-gray-400 cursor-not-allowed"
            }`}
            disabled={!message.trim()}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserMessage;
