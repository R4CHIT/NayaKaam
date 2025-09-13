import React from 'react'
import { 
  FiSend, 
  FiPaperclip, 
  FiSmile, 
  FiMoreVertical, 
  FiPhone, 
  FiVideo, 
  FiSearch,
 
  FiMenu,
  
} from 'react-icons/fi'
import { 
  IoCheckmarkDone,
  IoCheckmark
} from 'react-icons/io5'
import sendMessage from '../../api/message/sendMessage'
const UserMessage = ({ messages, currentChat, setSidebarOpen,messagesEndRef }) => {
    const [message, setMessage] = React.useState('')
    
  const handleSendMessage = () => {
   sendMessage()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  return (
    <>
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Mobile Header */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className='md:hidden fixed top-4 left-4 z-40 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors'
        >
          <FiMenu className='w-5 h-5 text-gray-600' />
        </button>

        {/* Chat Header */}
        <div className='bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <img 
                src={currentChat?.avatar} 
                alt="Profile" 
                className='w-12 h-12 rounded-full object-cover'
              />
              {currentChat?.online && (
                <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
              )}
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 text-lg'>{currentChat?.name}</h3>
              <p className={`text-sm ${currentChat?.online ? 'text-green-500' : 'text-gray-500'}`}>
                {currentChat?.online ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <button className='p-3 hover:bg-gray-100 rounded-full transition-colors'>
              <FiSearch className='w-5 h-5 text-gray-600' />
            </button>
            <button className='p-3 hover:bg-gray-100 rounded-full transition-colors'>
              <FiPhone className='w-5 h-5 text-gray-600' />
            </button>
            <button className='p-3 hover:bg-gray-100 rounded-full transition-colors'>
              <FiVideo className='w-5 h-5 text-gray-600' />
            </button>
            <button className='p-3 hover:bg-gray-100 rounded-full transition-colors'>
              <FiMoreVertical className='w-5 h-5 text-gray-600' />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className='flex-1 overflow-y-auto px-6 py-6 bg-gray-50'>
          <div className='space-y-6'>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-3 max-w-md ${msg.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.sender === 'other' && (
                    <img 
                      src={msg.avatar} 
                      alt="Avatar" 
                      className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                    />
                  )}
                  <div className={`px-5 py-3 rounded-2xl shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                  }`}>
                    <p className='text-sm leading-relaxed'>{msg.text}</p>
                    <div className='flex items-center justify-between mt-2'>
                      <span className={`text-xs ${
                        msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </span>
                      {msg.sender === 'me' && msg.status && (
                        <div className='ml-2'>
                          {msg.status === 'read' && <IoCheckmarkDone className='w-4 h-4 text-blue-200' />}
                          {msg.status === 'delivered' && <IoCheckmarkDone className='w-4 h-4 text-blue-300' />}
                          {msg.status === 'sent' && <IoCheckmark className='w-4 h-4 text-blue-200' />}
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

        {/* Message Input */}
        <div className='bg-white border-t border-gray-200 px-6 py-4'>
          <div className='flex items-end space-x-3'>
            <button className='p-3 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0'>
              <FiPaperclip className='w-5 h-5 text-gray-500' />
            </button>
            <div className='flex-1 relative'>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className='w-full px-5 py-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 overflow-y-auto placeholder-gray-500'
                rows="1"
                style={{ minHeight: '52px' }}
              />
              <button className='absolute right-3 top-3 p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <FiSmile className='w-5 h-5 text-gray-500' />
              </button>
            </div>
            <button 
              onClick={handleSendMessage}
              className={`p-3 rounded-full transition-all flex-shrink-0 ${
                message.trim() 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!message.trim()}
            >
              <FiSend className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserMessage
