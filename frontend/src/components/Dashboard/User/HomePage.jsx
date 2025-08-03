import React from "react";
import { useNavigate } from "react-router-dom";
import { FaWrench, FaBroom, FaPlug, FaHammer } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-500">
          Welcome back, Rachit 👋
        </h1>
        <h2 className="text-2xl mt-2">Need something fixed today?</h2>
        <div className="flex gap-4 justify-center mt-6 flex-wrap">
          <button
            onClick={() => navigate("/book-service")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-lg transition"
          >
            Book a Service
          </button>
          <button
            onClick={() => navigate("/my-bookings")}
            className="bg-white text-orange-500 px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            My Bookings
          </button>
        </div>
      </div>


     
      <div>
        <h2 className="text-2xl font-semibold mb-4">Top Services</h2>
        <div className="flex gap-6 flex-wrap justify-center">
          <div className="flex flex-col items-center bg-white/10 text-white px-6 py-4 rounded-xl shadow-md w-[140px] hover:bg-orange-500 transition">
          <div className="text-3xl mb-2">fjifj</div>
          <p className="text-lg font-semibold">fkdnf</p>
        </div>
        </div>
      </div>

      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="bg-white/10 p-4 rounded-lg border border-white/10">
            🛠️ Electrician - AC Repair →{" "}
            <span className="text-green-400">Completed</span>
          </li>
          <li className="bg-white/10 p-4 rounded-lg border border-white/10">
            🚿 Plumber - Pipe Fix →{" "}
            <span className="text-yellow-400">Scheduled for tomorrow</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HomePage;
