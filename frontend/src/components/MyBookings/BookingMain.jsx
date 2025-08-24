import React, { useEffect, useState } from "react";
import axios from "../../axios";
import swal from "sweetalert";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([
    
  ]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/getbooking/",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        }
      });
      console.log(res)
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      swal("Error!", "Could not load bookings.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await axios.patch(`/api/bookings/${bookingId}/update-status/`, { status });
      swal("Success!", `Booking ${status}`, "success");
      fetchBookings();
    } catch (err) {
      console.error(err);
      swal("Error!", "Could not update booking status.", "error");
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Customer:</strong> {booking.customer_name || booking.customer}
              </p>
              <p>
                <strong>Time:</strong> {new Date(booking.booking_time).toLocaleString()}
              </p>
              <p>
                <strong>Notes:</strong> {booking.notes || "—"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "pending"
                      ? "text-yellow-500"
                      : booking.status === "confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
            </div>
            {booking.status === "pending" && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookingsPage;
