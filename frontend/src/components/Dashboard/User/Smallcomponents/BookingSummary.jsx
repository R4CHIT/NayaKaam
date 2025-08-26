import React from 'react'

const BookingSummary = ({summary}) => {
  const totalBookings = Object.values(summary).reduce((a, b) => a + b, 0);

  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-500">Total Bookings</h3>
        <p className="text-2xl font-bold text-blue-600">{totalBookings}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-500">{summary.completed}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-500">Ongoing</h3>
          <p className="text-2xl font-bold text-yellow-400">{summary.pending}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-500">Cancelled</h3>
          <p className="text-2xl font-bold text-red-500">{summary.confirmed}</p>
        </div>
      </div>
    </>
  )
}

export default BookingSummary
