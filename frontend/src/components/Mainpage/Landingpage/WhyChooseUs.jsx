import React from "react";
import { FiZap, FiClock, FiShield } from "react-icons/fi"; // feather icons

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fast Work",
      description: "Get your tasks done quickly with top-rated professionals.",
      icon: <FiZap className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "24/7 Support",
      description: "We’re always here to help, anytime you need us.",
      icon: <FiClock className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Security",
      description: "Your data and transactions are safe with strong protection.",
      icon: <FiShield className="w-10 h-10 text-purple-500" />,
    },
  ];

  return (
    <div className="bg-white py-16 px-6 sm:px-12 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        Why Choose Us?
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              {item.title}
            </h3>
            <p className="text-gray-500 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
