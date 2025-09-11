import React, { useEffect, useState } from "react";

import BookingStatus from "./Smallcomponents/BookingStatus";
import MonthlyEarning from "./Smallcomponents/MonthlyEarning";
import MonthlyBooking from "./Smallcomponents/MonthlyBooking";
import BookingSummary from "./Smallcomponents/BookingSummary";

const ProviderDashboard = ({monthlyBooking,monthlyEarning,statusData,summary}) => {
  
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
