import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
const MonthlyBooking = ({ bookingsPerMonth }) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-gray-700 font-bold mb-4">Bookings Over Time (Monthly)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bookingsPerMonth} margin={{ top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar
              dataKey="booking"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              barSize={25}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default MonthlyBooking
