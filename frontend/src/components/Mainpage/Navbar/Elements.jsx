import React from "react";
import { Link } from "react-router-dom";
const Elements = () => {
  return (
    <>
      <div className="hidden md:flex text-[#F8FAFC] text-xl list-none gap-6 lg:gap-10">
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link  to={'/dashboard'}>Dashboard</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link>My Bookings</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link>Chat</Link>
        </li>
        <li className="hover:text-[#38BDF8] transition-colors">
          <Link>Profile</Link>
        </li>
      </div>

      <button
        className="hidden md:block text-[#F8FAFC] text-[17px] px-3 py-2 bg-red-400 rounded-xl hover:bg-red-500 transition-colors"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </>
  );
};

export default Elements;
