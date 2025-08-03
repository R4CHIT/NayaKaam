import React from 'react'

const Historygrid = ({job,renderStars}) => {
  return (
   <div
      key={job.id}
      className="rounded-lg w-full shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 relative bg-slate-800 border-slate-700"
    >


      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {job.service}
        </h3>
        <div className="flex items-center justify-between mb-2 text-cyan-400">
          <h4 className="text-lg font-medium">
            Client: {job.client}
          </h4>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
            {job.type}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-slate-300">
        <div className="flex items-center">
          <span className="mr-2 text-cyan-400">📅</span>
          <span>
            {new Date(job.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-cyan-400">⏱️</span>
          <span>{job.duration}</span>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-cyan-400">📍</span>
          <span>{job.location}</span>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-cyan-400">💰</span>
          <span className="font-semibold text-emerald-500">{job.payment}</span>
        </div>
      </div>

      <p className="text-sm mb-4 leading-relaxed text-slate-300">
        {job.description}
      </p>

      <div className="border-t pt-4 flex justify-between items-center border-slate-700">
        <div>
          <span className="text-sm font-medium mb-2 block text-white">
            Rating:
          </span>
          {renderStars(job.rating)}
        </div>

        
      </div>
    </div>
  )
}

export default Historygrid
