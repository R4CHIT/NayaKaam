import React, { useState, useRef, useEffect } from 'react'

import SideBar from './components/SideBar'
import ChatList from './components/ChatList'
import UserMessage from './components/UserMessage'

const ChatMain = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState(1)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How are you doing today?",
      sender: 'other',
      time: '10:30 AM',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some new projects. How about you?",
      sender: 'me',
      time: '10:32 AM',
      status: 'read'
    },
    {
      id: 3,
      text: "That sounds exciting! I'd love to hear more about what you're working on.",
      sender: 'other',
      time: '10:33 AM',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      text: "Sure! I'm building a new chat interface with React and Tailwind. It's been really fun to work with modern UI patterns.",
      sender: 'me',
      time: '10:35 AM',
      status: 'delivered'
    }
  ])

  const [chats] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      lastMessage: 'That sounds exciting! I\'d love to...',
      time: '10:33 AM',
      unread: 2,
      online: true,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      lastMessage: 'Perfect! See you tomorrow',
      time: '9:15 AM',
      unread: 0,
      online: false,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emma Davis',
      lastMessage: 'Thanks for the help! 👍',
      time: 'Yesterday',
      unread: 1,
      online: true,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Alex Chen',
      lastMessage: 'Can you review the design?',
      time: 'Yesterday',
      unread: 0,
      online: false,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Lisa Park',
      lastMessage: 'Great work on the project!',
      time: 'Tuesday',
      unread: 0,
      online: true,
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=40&h=40&fit=crop&crop=face'
    }
  ])

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
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}>
        {/* Sidebar Header */}
        <SideBar />

        {/* Chat List */}
        <div className='flex-1 overflow-y-auto'>
                {chats.map((chat) => (
                  <ChatList chat={chat} setSidebarOpen={setSidebarOpen} setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>
                ))}
              </div>
      </div>

      {/* Main Chat Area */}
      <UserMessage messages={messages} currentChat={currentChat} setSidebarOpen={setSidebarOpen} messagesEndRef={messagesEndRef}/>

      {/* Sidebar Overlay for Mobile */}
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