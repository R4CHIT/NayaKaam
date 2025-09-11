import React, { useState,useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SideBar from "./SideBar";
import HomePage from "./HomePage";
import Booking from "./Booking";
import Historyuser from "./Historyuser";
import Setting from "../Common/Setting";
import getBookingSummary from "../../api/dashboardApi/getBookingSummary";
import getMonthlyBooking from "../../api/dashboardApi/getMonthlyBooking";
import getMonthlyIncome from "../../api/dashboardApi/getMonthlyIncome";
import getBookings from "../../api/dashboardApi/getBookings";
import getBookingHistory from "../../api/Booking/getBookingHistory";

const UserDashboard = () => {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [monthlyEarning,setMonthlyEarning] = useState([])
  const [statusData, setStatusData] = useState([]);
  const [monthlyBooking, setMonthlyBooking] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [api, setApi] = useState("api/getbooking/");
  
    useEffect(() => {
    getBookingSummary((res) => {
      setSummary(res);
      const formatted = [
        { name: "Completed", value: res.completed },
        { name: "Pending", value: res.pending },
        { name: "Confirmed", value: res.confirmed },
        { name: "Cancelled", value: res.cancelled },
      ];
      setStatusData(formatted);
    });
    getMonthlyBooking((res) => {
      const allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const formatted = allMonths.map((m) => {
        const monthData = res.find((d) => d.month === m);
        return { month: m, booking: monthData ? monthData.booking : 0 };
      });

      setMonthlyBooking(formatted);
    });
    getMonthlyIncome((res) => {
      const allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const formatted = allMonths.map((m) => {
        const monthData = res.find((d) => d.month === m);
        return { month: m, earnings: monthData ? monthData.earning : 0 };
      });

      setMonthlyEarning(formatted);
    });
    getBookings(setBookings, api);
  }, []);


  const [summary, setSummary] = useState([]);

  useEffect(() => {
    
  }, []);

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
        {active === 0 && <HomePage monthlyEarning={monthlyEarning} statusData={statusData} monthlyBooking={monthlyBooking} summary={summary}/>}
        {active === 1 && <Booking bookings={bookings}/>}
        {active === 2 && <Historyuser/>}
        {active === 3 && <Setting />}
      </div>
    </div>
  );
};

export default UserDashboard;
