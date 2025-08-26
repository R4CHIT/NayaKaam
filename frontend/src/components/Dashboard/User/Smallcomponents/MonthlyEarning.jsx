import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
const MonthlyEarning = ({ earningsPerMonth }) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-gray-700 font-bold mb-4">Earnings Over Time (Monthly)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={earningsPerMonth} margin={{ top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default MonthlyEarning
