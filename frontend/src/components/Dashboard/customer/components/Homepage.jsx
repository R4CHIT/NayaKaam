import React, { useEffect, useState } from "react";
import MonthlyBooking from "../../User/Smallcomponents/MonthlyBooking";
import getMonthlyBooking from "../../../api/dashboardApi/getMonthlyBooking";
import BookingSummary from "../../User/Smallcomponents/BookingSummary";
import BookingStatus from "../../User/Smallcomponents/BookingStatus";
import getBookingSummary from "../../../api/dashboardApi/getBookingSummary";
const Homepage = () => {
  const [monthlyEarning,setMonthlyEarning] = useState([])
  const [statusData, setStatusData] = useState([]);
  const [monthlyBooking, setMonthlyBooking] = useState([]);

  

  useEffect(() => {
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
  }, []);
  

  const [summary, setSummary] = useState([]);

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
  }, []);
  const COLORS = ["#22c55e", "#facc15", "#4194ff", "#ef4444"];

  return (
    <div className="space-y-8 p-4 md:p-8 bg-gray-50 min-h-screen">
      <BookingSummary summary={summary} />
      <MonthlyBooking bookingsPerMonth={monthlyBooking} />
      <BookingStatus statusData={statusData} COLORS={COLORS} />
    </div>
  );
};

export default Homepage;
