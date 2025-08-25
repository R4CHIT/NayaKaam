import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import ProviderMain from '../../ProviderDetails/ProviderMain'
const Navigation = ({role}) => {
  const navigate = useNavigate();
  const { Logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show,setShow] = useState(false);
  const handleLogout = () => {
    Logout();
    console.log("logout");
  };

  return (
    <div className="bg-[#0F172A] fixed h-20 w-[100vw] flex justify-between items-center px-4 sm:px-8 lg:px-20 z-50">
      <div
        className="text-[#F8FAFC] text-2xl sm:text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        NayaKaam
      </div>

     {role != 'provider' ?(
       <div className="hidden md:flex text-[#F8FAFC] text-xl list-none gap-6 lg:gap-10">
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link to="/services">Services</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link to={'/mybooking'}>My Bookings</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link to={'/becomeapro'}>Become a Pro</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link to="/profile">Chats</Link>
        </li>
      </div>
     ):(
       <div className="hidden md:flex text-[#F8FAFC] text-xl list-none gap-6 lg:gap-10">
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link>My Bookings</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link to="/chat">Chats</Link>
        </li>
      </div>
     )}

      <button
        className="hidden md:block text-[#F8FAFC] text-[17px] px-3 py-2 bg-red-400 rounded-xl hover:bg-red-500 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-[#F8FAFC] p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="w-6 h-0.5 bg-[#F8FAFC] mb-1"></div>
        <div className="w-6 h-0.5 bg-[#F8FAFC] mb-1"></div>
        <div className="w-6 h-0.5 bg-[#F8FAFC]"></div>
      </button>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0F172A] border-t border-gray-700">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/services"
              className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2"
            >
              Services
            </Link>
            <Link
              to="/bookings"
              className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2"
            >
              My Bookings
            </Link>
            <Link
              to="/become-provider"
              className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2"
            >
              Become a Pro
            </Link>
            <Link
              to="/profile"
              className="text-[#F8FAFC] text-lg hover:text-[#38BDF8] transition-colors py-2"
            >
              Chat
            </Link>
            <button
              className="text-[#F8FAFC] text-[17px] px-3 py-2 bg-red-400 rounded-xl hover:bg-red-500 transition-colors w-fit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {show && <ProviderMain setShow={setShow}/>}
    </div>
  );
};

export default Navigation;
