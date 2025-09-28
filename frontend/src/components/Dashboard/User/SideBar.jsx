import React, { useContext } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { RiHistoryLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import AuthContext from "../../../context/AuthContext";

const SideBar = ({ active, setActive, setIsOpen, isOpen }) => {
  const{user}=useContext(AuthContext)
  const condition = user.roles == 'provider'
  return (
    <>
      <div className="flex flex-col h-full w-full md:w-64 bg-white text-gray-800 p-6 gap-6 text-lg shadow-xl relative">
        
       <div className="flex items-center">
         <button
          className="absolute top-7 right-4 md:hidden text-gray-600 hover:text-red-500 transition"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-2">
          {condition ? 'Admin' : 'User'} Dashboard
        </h2>
       </div>

        <button
          className={`flex items-center gap-3 ${
            active == 0 && "text-blue-600 font-semibold"
          } hover:text-blue-600 transition-all`}
          onClick={() => {
            setActive(0);
            setIsOpen(false); 
          }}
        >
          <IoHomeOutline className="text-2xl" />
          <div>Home</div>
        </button>

        <button
          className={`flex items-center gap-3 ${
            active == 1 && "text-blue-600 font-semibold"
          } hover:text-blue-600 transition-all`}
          onClick={() => {
            setActive(1);
            setIsOpen(false);
          }}
        >
          <BsBookmarkPlusFill className="text-xl" />
          My Bookings
        </button>

        <button
          className={`flex items-center gap-3 ${
            active == 2 && "text-blue-600 font-semibold"
          } hover:text-blue-600 transition-all`}
          onClick={() => {
            setActive(2);
            setIsOpen(false);
          }}
        >
          <RiHistoryLine className="text-xl" />
          History
        </button>

        <button
          className={`flex items-center gap-3 ${
            active == 3 && "text-blue-600 font-semibold"
          } hover:text-blue-600 transition-all`}
          onClick={() => {
            setActive(3);
            setIsOpen(false);
          }}
        >
          <FiSettings className="text-xl" />
          Settings
        </button>
      </div>
    </>
  );
};

export default SideBar;
