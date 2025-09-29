import React from "react";

const Description = () => {
  const stats = [
    { label: "Happy Users", value: "10,000+" },
    { label: "Services Offered", value: "500+" },
    { label: "Support Availability", value: "24/7" },
  ];

  const testimonials = [
    {
      name: "Sita Sharma",
      text: "The service was super fast and professional. Highly recommend!",
    },
    {
      name: "Ram Thapa",
      text: "I feel safe using this platform, everything is secure and easy.",
    },
    {
      name: "Aarav Gurung",
      text: "Customer support was available even at midnight, amazing!",
    },
  ];

  return (
    <div className="bg-white py-16 px-6 sm:px-12 lg:px-20">
     
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Why People Trust Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We deliver reliable services with strong security and dedicated
          support. Here’s why thousands of users choose us every day.
        </p>
      </div>

      
      <div className="grid sm:grid-cols-3 gap-8 mb-20">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-3xl font-bold text-blue-500">{stat.value}</h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      
      <div>
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-10">
          What Our Customers Say
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="text-gray-600 mb-4">“{t.text}”</p>
              <h4 className="font-semibold text-gray-800">- {t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
