import React from 'react'
import { FaFire } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { FaHeart,FaStar } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'
const ServicesGrid = ({selectedCategory,searchFilteredServices,categories}) => {
  return (
    <>
      <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaFire className="w-5 h-5 text-orange-500 mr-2" />
              {selectedCategory === 'all' ? 'Popular Services' : `${categories.find(c => c.id === selectedCategory)?.name} Services`}
            </h2>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              View All <FaChevronRight className="w-3 h-3 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchFilteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {service.isPopular && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <FaFire className="w-3 h-3 mr-1" />
                        Popular
                      </span>
                    )}
                    {service.discount > 0 && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {service.discount}% OFF
                      </span>
                    )}
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500">
                    <FaHeart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center space-x-3 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="ml-1">({service.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <BiTime className="w-4 h-4 mr-1" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    {service.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-800">₹{service.price}</span>
                      {service.originalPrice > service.price && (
                        <span className="text-sm text-gray-400 line-through">₹{service.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default ServicesGrid
