import React, { useEffect, useState } from "react";
import getBookings from "../../api/dashboardApi/getBookings";
import Bookinggrid from "./Smallcomponents/Bookinggrid";
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [api, setApi] = useState("api/getbooking/");
  useEffect(() => {
    getBookings(setBookings, api);
  }, [api]);
  
  const data = bookings.results || [];


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">My Bookings</h1>
          <p className="text-lg text-gray-600">
            Manage your appointments and booking history
          </p>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Staff</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking) => (
               <Bookinggrid booking={booking}/>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => setApi(bookings.previous)}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => setApi(bookings.next)}
          >
            Next
          </button>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-gray-500 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-400 mb-6">
              You don't have any appointments yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
