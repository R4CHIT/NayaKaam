import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { RiHistoryLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

const SideBar = ({active,setActive}) => {
  return (
    <>
      <div className="flex flex-col h-full w-full md:w-64 bg-[#0f1729] text-white p-6 gap-6 text-lg rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-orange-400 text-center mb-4">
          User Dashboard
        </h2>
        <button className={`flex items-center gap-3 ${active==0 && "text-orange-400"} hover:text-orange-400 transition-all`} onClick={()=>setActive(0)}>
          <IoHomeOutline className="text-2xl" />
          <div className='md:flex hidden'>Home</div>
        </button>

        <button className={`flex items-center gap-3 ${active==1 && "text-orange-400"} hover:text-orange-400 transition-all`} onClick={()=>setActive(1)}>
          <BsBookmarkPlusFill className="text-xl" />
          My Bookings
        </button>

        <button className={`flex items-center gap-3 ${active==2 && "text-orange-400"} hover:text-orange-400 transition-all`} onClick={()=>setActive(2)}>
          <RiHistoryLine className="text-xl" />
          History
        </button>

        <button className={`flex items-center gap-3 ${active==3 && "text-orange-400"} hover:text-orange-400 transition-all`} onClick={()=>setActive(3)}>
          <FiSettings className="text-xl" />
          Settings
        </button>
      </div>
    </>
  )
}

export default SideBar
