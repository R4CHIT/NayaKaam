import React, { useEffect, useState } from "react";
import getBookingSummary from "../../api/dashboardApi/getBookingSummary";
import BookingStatus from "./Smallcomponents/BookingStatus";
import MonthlyEarning from "./Smallcomponents/MonthlyEarning";
import MonthlyBooking from "./Smallcomponents/MonthlyBooking";
import BookingSummary from "./Smallcomponents/BookingSummary";
import getMonthlyBooking from "../../api/dashboardApi/getMonthlyBooking";
import getMonthlyIncome from "../../api/dashboardApi/getMonthlyIncome";
const ProviderDashboard = () => {
  const [monthlyEarning,setMonthlyEarning] = useState([])
  const [statusData, setStatusData] = useState([]);
  const [monthlyBooking, setMonthlyBooking] = useState([]);

  useEffect(() => {
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
  }, []);

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
      <MonthlyEarning earningsPerMonth={monthlyEarning} />
      <BookingStatus statusData={statusData} COLORS={COLORS} />
    </div>
  );
};

export default ProviderDashboard;
