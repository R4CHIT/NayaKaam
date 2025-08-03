import React from 'react'

const Bookinggrid = ({booking,getStatusColor}) => {
  return (
    <div key={booking.id} className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow duration-200" style={{ backgroundColor: '#1e293b', borderColor: '#374151' }}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#ffffff' }}>{booking.service}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3 mb-6" style={{ color: '#cbd5e1' }}>
                <div className="flex items-center">
                  <span className="mr-2" style={{ color: '#06b6d4' }}>📅</span>
                  <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2" style={{ color: '#06b6d4' }}>🕐</span>
                  <span>{booking.time}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2" style={{ color: '#06b6d4' }}>📍</span>
                  <span>{booking.location}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2" style={{ color: '#06b6d4' }}>👤</span>
                  <span>{booking.staff}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: '#374151' }}>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">💳</span>
                  <span className="text-lg font-semibold text-green-600">{booking.price}</span>
                </div>
                
                <div className="flex space-x-2">
                  {booking.status === 'confirmed' && (
                    <>
                      <button className="px-3 py-1 text-white rounded-md hover:opacity-80 transition-opacity duration-200 text-sm" style={{ backgroundColor: '#0f1729' }}>
                        Reschedule
                      </button>
                      <button className="px-3 py-1 text-white rounded-md hover:opacity-80 transition-opacity duration-200 text-sm" style={{ backgroundColor: '#dc2626' }}>
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === 'pending' && (
                    <button className="px-3 py-1 text-white rounded-md hover:opacity-80 transition-opacity duration-200 text-sm" style={{ backgroundColor: '#0f1729' }}>
                      View Details
                    </button>
                  )}
                  {booking.status === 'completed' && (
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm">
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            </div>
  )
}

export default Bookinggrid
