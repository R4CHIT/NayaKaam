import React from 'react'
import { FaShieldAlt,FaClock } from 'react-icons/fa'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { BiMoney } from 'react-icons/bi'
const ServiceBottom = () => {
  return (
    <div>
      <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            Why Choose NayaKaam?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: FaShieldAlt,
                title: "Trusted Professionals",
                desc: "Background verified experts",
              },
              {
                icon: AiOutlineThunderbolt,
                title: "Quick Service",
                desc: "Same day service available",
              },
              {
                icon: BiMoney,
                title: "Transparent Pricing",
                desc: "No hidden charges",
              },
              {
                icon: FaClock,
                title: "24/7 Support",
                desc: "Round the clock assistance",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default ServiceBottom
