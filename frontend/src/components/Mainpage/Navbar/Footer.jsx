import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const Footer = () => {
    const {user}= useContext(AuthContext)
    const role = user?.roles
  return (
    <footer className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 text-white py-10 px-6 sm:px-12 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-bold cursor-pointer">NayaKaam</div>
        <div className="flex flex-wrap justify-center gap-6 text-lg">
          {role !== "provider" ? (
            <>
              <Link
                to="/services"
                className="hover:text-yellow-300 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/becomeapro"
                className="hover:text-yellow-300 transition-colors"
              >
                Become a Pro
              </Link>
              <Link
                to="/chat"
                className="hover:text-yellow-300 transition-colors"
              >
                Chats
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="hover:text-yellow-300 transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/chat"
                className="hover:text-yellow-300 transition-colors"
              >
                Chats
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-blue-300 mt-8 pt-6 text-center text-sm text-blue-100">
        © {new Date().getFullYear()} NayaKaam. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
