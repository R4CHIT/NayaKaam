import React from 'react'
import Historygrid from './Smallcomponents/Historygrid'

const Historyuser = () => {
  // Sample service work history data
  const workHistory = [
    {
      id: 1,
      service: 'Home Cleaning',
      client: 'Sarah Johnson',
      date: '2025-08-01',
      duration: '3 hours',
      type: 'Completed',
      location: 'Apartment 4B, Downtown',
      description: 'Deep cleaning of 2-bedroom apartment including kitchen, bathrooms, and living areas. Client was very satisfied with the thorough work.',
      rating: 5,
      payment: '$120',
      current: false
    },
    {
      id: 2,
      service: 'Plumbing Repair',
      client: 'Mike Chen',
      date: '2025-07-30',
      duration: '2 hours',
      type: 'Completed',
      location: 'Villa Park, Suburb Area',
      description: 'Fixed leaking kitchen sink and replaced old faucet. Also checked bathroom plumbing for any issues.',
      rating: 4,
      payment: '$85',
      current: false
    },
    {
      id: 3,
      service: 'Electrical Work',
      client: 'David Wilson',
      date: '2025-07-28',
      duration: '4 hours',
      type: 'Completed',
      location: 'Commercial Building, City Center',
      description: 'Installed new light fixtures in office space and repaired faulty wiring. Ensured all safety standards were met.',
      rating: 5,
      payment: '$200',
      current: false
    },
    {
      id: 4,
      service: 'AC Maintenance',
      client: 'Lisa Brown',
      date: '2025-08-05',
      duration: '1.5 hours',
      type: 'Scheduled',
      location: 'Residential Complex, North Side',
      description: 'Scheduled AC cleaning and maintenance service. Will include filter replacement and system check.',
      rating: null,
      payment: '$75',
      current: true
    }
  ]

  const renderStars = (rating) => {
    if (!rating) return <span style={{ color: '#94a3b8' }}>Not rated yet</span>
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? '#f59e0b' : '#374151' }}>
            ⭐
          </span>
        ))}
        <span className="ml-2 text-sm" style={{ color: '#cbd5e1' }}>({rating}/5)</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#0f1729' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>
            Work History
          </h1>
          <p className="text-lg" style={{ color: '#94a3b8' }}>
            Your completed and upcoming service jobs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {workHistory.map(job => (
            <Historygrid job={job} renderStars={renderStars }/>
          ))}
        </div>

        {/* Empty State */}
        {workHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-medium mb-2" style={{ color: '#ffffff' }}>No work history found</h3>
            <p className="mb-6" style={{ color: '#94a3b8' }}>Start accepting service requests to build your history</p>
            <button className="text-white px-6 py-3 rounded-md hover:opacity-80 transition-opacity duration-200" style={{ backgroundColor: '#0f1729' }}>
              Find New Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Historyuser