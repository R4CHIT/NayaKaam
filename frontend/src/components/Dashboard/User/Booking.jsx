import React from 'react'
import Bookinggrid from './Smallcomponents/Bookinggrid'

const Booking = () => {
  // Sample booking data
  const bookings = [
    {
      id: 1,
      service: 'Hair Cut & Styling',
      date: '2025-08-05',
      time: '2:00 PM',
      location: 'Downtown Salon',
      staff: 'Sarah Johnson',
      status: 'confirmed',
      price: '$85'
    },
    {
      id: 2,
      service: 'Massage Therapy',
      date: '2025-08-08',
      time: '11:00 AM',
      location: 'Wellness Center',
      staff: 'Mike Chen',
      status: 'pending',
      price: '$120'
    },
    {
      id: 3,
      service: 'Dental Cleaning',
      date: '2025-07-15',
      time: '9:30 AM',
      location: 'City Dental',
      staff: 'Dr. Smith',
      status: 'completed',
      price: '$150'
    },
    {
      id: 4,
      service: 'Personal Training',
      date: '2025-07-10',
      time: '6:00 PM',
      location: 'Fitness Plus Gym',
      staff: 'Alex Rivera',
      status: 'completed',
      price: '$60'
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" style={{ backgroundColor: '#0f1729' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>
            My Bookings
          </h1>
          <p className="text-lg" style={{ color: '#94a3b8' }}>
            Manage your appointments and booking history
          </p>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(booking => (
            <Bookinggrid booking={booking} getStatusColor={getStatusColor}/>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-gray-500 mb-2">No bookings found</h3>
            <p className="text-gray-400 mb-6">You don't have any appointments yet</p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors duration-200">
              Book New Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Booking