import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import ProviderMain from "../../ProviderDetails/ProviderMain";
import { FiBell } from "react-icons/fi";
import NotificationMain from "../../notification/NotificationMain";
import getNotification from "../../api/Notification/getNotification";
import getUnreadNotification from "../../api/Notification/getUnreadNotification";

const Navigation = ({ role, notificationstatus, setNotificationStatus }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [api, setApi] = useState("api/getnotification");
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    getNotification(setNotifications, api);
  }, [api,notificationstatus]);
  useEffect(() => {
    getUnreadNotification(setUnread);
  }, [notificationstatus]);
  return (
    <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 fixed h-20 w-[100vw] flex justify-between items-center px-4 sm:px-8 lg:px-20 shadow-md z-50">
      <div
        className="text-white font-bold text-2xl sm:text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        NayaKaam
      </div>

      {role !== "provider" ? (
        <div className="hidden md:flex text-white text-lg list-none gap-6 lg:gap-10">
          <li className="hover:text-yellow-300 transition-colors">
            <Link to="/services">Services</Link>
          </li>
          <li className="hover:text-yellow-300 transition-colors">
            <Link to="/mybooking">My Bookings</Link>
          </li>
          <li className="hover:text-yellow-300 transition-colors">
            <Link to="/becomeapro">Become a Pro</Link>
          </li>
          <li className="hover:text-yellow-300 transition-colors">
            <Link to="/profile">Chats</Link>
          </li>
        </div>
      ) : (
        <div className="hidden md:flex text-white text-lg list-none gap-6 lg:gap-10">
          <li className="hover:text-yellow-300 transition-colors">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hover:text-yellow-300 transition-colors">
            <Link>My Bookings</Link>
          </li>
          <li className="hover:text-yellow-300 transition-colors">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="hover:text-yellow-300 transition-colors">
            <Link to="/chat">Chats</Link>
          </li>
        </div>
      )}
      

      <button
        className="relative hidden md:flex text-white text-2xl hover:text-yellow-300 transition-colors"
        onClick={() => setShow((prev) => !prev)}
      >
        <FiBell className="text-3xl" />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unread}
          </span>
        )}
      </button>

      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-gradient-to-r from-blue-500 via-blue-500 to-blue-400 shadow-md">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/services"
              className="text-white text-lg hover:text-yellow-300 transition-colors py-2"
            >
              Services
            </Link>
            <Link
              to="/bookings"
              className="text-white text-lg hover:text-yellow-300 transition-colors py-2"
            >
              My Bookings
            </Link>
            <Link
              to="/become-provider"
              className="text-white text-lg hover:text-yellow-300 transition-colors py-2"
            >
              Become a Pro
            </Link>
            <Link
              to="/profile"
              className="text-white text-lg hover:text-yellow-300 transition-colors py-2"
            >
              Chat
            </Link>
            <button className="text-white text-2xl hover:text-yellow-300 transition-colors">
              <FiBell />
            </button>
          </div>
        </div>
      )}

      {show && (
        <NotificationMain
          setShow={setShow}
          notifications={notifications}

          setNotificationStatus={setNotificationStatus}
          setApi={setApi}
          setUnread={setUnread}
        />
      )}
    </div>
  );
};

export default Navigation;
