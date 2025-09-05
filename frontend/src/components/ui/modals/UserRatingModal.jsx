import React, { useState } from "react";
import { FaStar, FaRegStar, FaTimes, FaUser } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import giveRating from "../../api/rating/giveRating";

const UserRatingModal = ({ booking, onClose, id }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [submitted, setSubmitted] = useState(false); 

  const handleSubmit = async () => {
    if (rating === 0) return;
    await giveRating(rating, id);

    setSubmitted(true); 

    setTimeout(() => {
      onClose(); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        {!submitted ? (
          <>
            <div className="relative p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdCheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Completed!</h2>
                <p className="text-gray-600">
                  How was your experience with the provider?
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              
              <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {booking?.sender || "Provider"}
                  </h3>
                  <p className="text-sm text-gray-600">{booking?.service || "Service"}</p>
                </div>
              </div>

             
              <div className="mb-6 text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rate your experience
                </label>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <span
                        key={i}
                        className="cursor-pointer"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      >
                        {ratingValue <= (hover || rating) ? (
                          <FaStar className="text-3xl text-yellow-400" />
                        ) : (
                          <FaRegStar className="text-3xl text-gray-300" />
                        )}
                      </span>
                    );
                  })}
                </div>
                {rating > 0 && (
                  <p className="text-sm font-medium text-gray-700">
                    {["Very Bad", "Bad", "Okay", "Good", "Excellent"][rating - 1]}
                  </p>
                )}
              </div>

              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </>
        ) : (
          
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdCheckCircle className="text-blue-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanks for your rating! 🎉</h2>
            <p className="text-gray-600">We appreciate your feedback.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRatingModal;
