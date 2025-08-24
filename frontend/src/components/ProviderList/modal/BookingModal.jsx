import React, { useState } from "react";
import bookaServiceApi from "../../api/Booking/bookaServiceApi";
import swal from "sweetalert";

const BookingModal = ({ setShowModal, provider ,setStatus}) => {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!date || !time) {
      swal("Oops!", "Please select a date and time for booking.", "warning");
      return;
    }

    const bookingTime = new Date(`${date}T${time}:00`);
    const now = new Date();

    if (bookingTime <= now) {
      swal("Oops!", "Booking time cannot be in the past.", "warning");
      return;
    }
    const data = {
      notes: note,
      provider: provider,
      booking_time: bookingTime.toISOString(),
    };

    setLoading(true);
    try {
      await bookaServiceApi(data);
      swal({
        title: "Success!",
        text: "Your booking has been confirmed 💖",
        icon: "success",
        button: "Yay!",
      });

      setShowModal(false);
      setStatus(true)
    } catch (err) {
      console.error("Booking error:", err);
      swal("Error!", "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note to the provider..."
          className="w-full h-24 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label className="block mb-1 font-medium">Select Booking Date:</label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label className="block mb-1 font-medium">Select Booking Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleBook}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
