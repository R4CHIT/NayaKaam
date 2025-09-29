import React from 'react'
import { 
 
  FiSearch,
  FiSettings,
  FiX
} from 'react-icons/fi'
const SideBar = ({sidebarOpen}) => {
  return (
    <>
      <div className='p-6 border-b border-gray-100'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold text-gray-900'>Messages</h1>
            <div className='flex items-center space-x-2'>
              <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <FiSettings className='w-5 h-5 text-gray-600' />
              </button>
              <button 
                onClick={() => sidebarOpen(false)}
                className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'
              >
                <FiX className='w-5 h-5 text-gray-600' />
              </button>
            </div>
          </div>
          
         
          <div className='relative'>
            <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className='w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all'
            />
          </div>
        </div>
    </>
  )
}

export default SideBar
