import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SideBar from "./SideBar";
import HomePage from "./HomePage";
import Booking from "./Booking";
import Historyuser from "./Historyuser";
import Setting from "../Common/Setting";

const UserDashboard = () => {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="flex">
      
      <div
        className={`fixed  left-0 h-[calc(100vh-5rem)] w-64 bg-white shadow-lg z-40 
        transform transition-transform duration-300 
        ${isOpen ? "translate-x-0 " : "-translate-x-full top-20"}  md:translate-x-0`}
      >
        <SideBar active={active} setActive={setActive} setIsOpen={setIsOpen} isOpen={isOpen}/>
      </div>

      
      <button
        className="md:hidden fixed top-24 left-4 z-50 text-black p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen && <FiMenu size={24}/>}
      </button>

      
      <div className="flex-1 px-6 py-10 bg-gray-50 text-gray-800 min-h-screen md:ml-64">
        {active === 0 && <HomePage />}
        {active === 1 && <Booking />}
        {active === 2 && <Historyuser />}
        {active === 3 && <Setting />}
      </div>
    </div>
  );
};

export default UserDashboard;
