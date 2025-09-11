import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Bookinggrid from "./Smallcomponents/Bookinggrid";
import LoadingEffect from "../../ui/LoadingEffect";
import getBookingHistory from "../../api/Booking/getBookingHistory";
const Booking = ({ bookings }) => {
  const [data, setData] = useState(bookings.results || []);
  const [nextUrl, setNextUrl] = useState(bookings.next);
  
  const fetchMoreData = async () => {
    if (!nextUrl) return;
    try {
      const res = await fetch(nextUrl ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        }
      });
      const newData = await res.json();
      setData((prev) => [...prev, ...newData.results]);
      setNextUrl(newData.next);
    } catch (err) {
      console.error("Error fetching more bookings:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">My Bookings</h1>
          <p className="text-lg text-gray-600">
            Manage your appointments and booking history
          </p>
        </div>

        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={!!nextUrl}
          loader={<LoadingEffect />}
          endMessage={
            data.length > 0 && (
              <p className="text-center text-sm text-gray-500 py-6">
                You’ve reached the end of your work history
              </p>
            )
          }
        >
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
                  <Bookinggrid key={booking.id} booking={booking} />
                ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>

       
        {data.length === 0 && (
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
