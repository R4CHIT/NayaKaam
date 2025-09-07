import React, { useContext, useState } from "react";

import LoadingEffect from "../../../../ui/LoadingEffect";


const CustomerBookingGrid = ({ booking }) => {
  const [status, setStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);
  const statusColors = {
    pending: "text-yellow-500",
    confirmed: "text-blue-500",
    cancelled: "text-red-500",
    completed: "text-green-600",
  };

  return (
    <tr key={booking.id} className="border-t hover:bg-gray-50">
      <td className="px-4 py-3">{booking.service || "N/A"}</td>
      <td className="px-4 py-3">
        {new Date(booking.booking_time).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-4 py-3">
        {new Date(booking.booking_time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="px-4 py-3">{booking.location || "N/A"}</td>
      <td className="px-4 py-3">{booking.provider}</td>
      <td className="px-4 py-3 font-semibold text-green-600">{booking.price}</td>
      <td className="px-4 py-3 flex items-center gap-2">
       
          <span className={`font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        {loading && <LoadingEffect />}
      </td>
    </tr>
  );
};

export default CustomerBookingGrid;
