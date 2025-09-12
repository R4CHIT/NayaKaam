import React, { useContext, useState } from "react";
import updateBookingStatus from "../../../api/Booking/updateBookingStatus";
import { toast } from "react-toastify";
import LoadingEffect from "../../../ui/LoadingEffect";
import sendNotifiaction from "../../../api/Notification/sendNotifiaction";
import AuthContext from "../../../../context/AuthContext";

const Bookinggrid = ({ booking }) => {
  const [status, setStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (newstatus) => {
    setStatus(newstatus);
    try {
      const data = {
        user: user?.username || "Guest", 
        bookingId: booking?.id || null, 
        providerId: user?.id || "N/A", 
        service: booking?.service || "Service", 
        status: newstatus, 
        message: `Your booking is now ${newstatus}`,
        notes: `Booking updated by ${user?.username}`, 
        timestamp: new Date().toISOString(),
      };
      setLoading(true);
      sendNotifiaction(booking.customer, data, user.username);
      await updateBookingStatus({ status: newstatus }, booking.id);
      toast.dismiss();
      toast.success(`Booking ${newstatus} successfully!`);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update status ❌");
      setStatus(booking.status);
    } finally {
      setLoading(false);
    }
  };

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
      <td className="px-4 py-3">{booking.customername}</td>
      <td className="px-4 py-3 font-semibold text-green-600">
        {booking.price}
      </td>
      <td className="px-4 py-3 flex items-center gap-2">
        {status === "cancelled" || status === "completed" ? (
          <span className={`font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ) : (
          <select
            value={status}
            disabled={loading}
            onChange={(e) => handleSubmit(e.target.value)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              loading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100"
            }`}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        )}
        {loading && <LoadingEffect />}
      </td>
    </tr>
  );
};

export default Bookinggrid;
