import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Elements from "./Elements";

const Navigation = () => {
  const {Logout} = useContext(AuthContext);
  const handleLogout =()=>{
    Logout()
    console.log("logout")
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#0F172A] fixed h-20 w-[100vw] flex justify-between items-center px-4 sm:px-8 lg:px-20 z-50">
      <div className="text-[#F8FAFC] text-2xl sm:text-3xl">NayaKaam</div>
      
      <Elements />

      <button 
        className="md:hidden text-[#F8FAFC] p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="w-6 h-0.5 bg-[#F8FAFC] mb-1"></div>
        <div className="w-6 h-0.5 bg-[#F8FAFC] mb-1"></div>
        <div className="w-6 h-0.5 bg-[#F8FAFC]"></div>
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0F172A] border-t border-gray-700">
          <div className="flex flex-col p-4 space-y-4">
            <Link to={'/dashboard'} className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2">
              Dashboard
            </Link>
            <Link className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2">
              My Bookings
            </Link>
            <Link className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2">
              Chat
            </Link>
            <Link className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2">
              Profile
            </Link>
            <button className="text-[#F8FAFC] text-[17px] px-3 py-2 bg-red-400 rounded-xl hover:bg-red-500 transition-colors w-fit" onClick={()=>handleLogout()}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;