import React, { useState, useRef, useEffect } from 'react'

import SideBar from './components/SideBar'
import ChatList from './components/ChatList'
import UserMessage from './components/UserMessage'
import getUserIcon from '../api/message/getUserIcon'

const ChatMain = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState(0)
  const [messages, setMessages] = useState([])
  const [mainBar,setMainBar]=useState([])
  const [chats, setChats] = useState([])
  console.log(mainBar)
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await getUserIcon(); 
            console.log(res.data.results);
            setChats(res.data.results);
        } catch (error) {
            console.error("Error fetching user icon:", error);
        }
    };

    fetchData();
}, []);


  const messagesEndRef = useRef(null)
  const currentChat = chats.find(chat => chat.id === selectedChat)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  return (
    <div className='h-screen pt-20 bg-white flex overflow-hidden'>
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}>
        <SideBar />

        <div className='flex-1 overflow-y-auto'>
                {chats.map((chat) => (
                  <ChatList chat={chat} setSidebarOpen={setSidebarOpen} setSelectedChat={setSelectedChat} selectedChat={selectedChat} setMessages={setMessages} setMainBar={setMainBar}/>
                ))}
              </div>
      </div>

      <UserMessage messages={messages} currentChat={currentChat} setSidebarOpen={setSidebarOpen} messagesEndRef={messagesEndRef} mainBar={mainBar}/>

      
      {sidebarOpen && (
        <div 
          className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default ChatMain