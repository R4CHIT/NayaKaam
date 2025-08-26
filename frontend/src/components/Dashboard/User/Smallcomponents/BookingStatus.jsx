import React from 'react'
import { PieChart,ResponsiveContainer,Pie,Legend,Tooltip,Cell } from 'recharts'
const BookingStatus = ({statusData,COLORS}) => {
  return (
    <>
       <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-gray-700 font-bold mb-4">Booking Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default BookingStatus
