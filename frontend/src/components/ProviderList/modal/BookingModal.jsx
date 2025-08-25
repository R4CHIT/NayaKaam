import React, { useState } from "react";
import bookaServiceApi from "../../api/Booking/bookaServiceApi";
import swal from "sweetalert";
import InputDetailsState from "../../ui/InputDetailsState";

const BookingModal = ({ setShowModal, provider, setStatus }) => {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
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
      location: location,
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
      setStatus(true);
    } catch (err) {
      console.error("Booking error:", err);
      swal("Error!", "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center p-10 justify-center bg-black/40 backdrop-blur-sm z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-[490px] p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Confirm Your Booking
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Fill in the details below to book your service.
        </p>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Notes to Provider
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note... (e.g. Bring your own tools)"
          className="w-full h-24 p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-sm"
        />

        <InputDetailsState
          label="Booking Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <InputDetailsState
          label="Booking Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <InputDetailsState
          label="Service Location"
          type="text"
          placeholder="Enter your address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
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
