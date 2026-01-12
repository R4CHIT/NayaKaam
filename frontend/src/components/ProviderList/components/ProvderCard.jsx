import React, { useContext, useState } from "react";
import BookingModal from "../modal/BookingModal";
import { FaStar } from "react-icons/fa";
import { sendMessage, socketconnect } from "../../api/message/socketconnect";
import AuthContext from "../../../context/AuthContext";

const ProvderCard = ({ provider }) => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [chatOpen,setChatOpen] = useState(false)
  const [chatInput,setChatInput] = useState('')
  const now = new Date();
  const currentHour = now.getHours();

  const providerTime = "4AM-5PM";
  let [start, end] = providerTime.split("-");

  const convertTo24 = (timeStr) => {
    let hour = parseInt(timeStr);
    if (timeStr.toUpperCase().includes("PM") && hour !== 12) hour += 12;
    if (timeStr.toUpperCase().includes("AM") && hour === 12) hour = 0;
    return hour;
  };

  const startHour = convertTo24(start);
  const endHour = convertTo24(end);

  const show = currentHour >= startHour && currentHour < endHour;

  const handleBooking = async () => {
    setShowModal((prev) => !prev);
  };


  const {user} = useContext(AuthContext)
  const handleChatSend=async()=>{
    const data ={
      sender:user?.id,
      recipient:provider.userId ,
      content: chatInput,
    }
    sendMessage(data)
  }
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col text-left hover:shadow-xl transition duration-300">
    
      <div className="flex items-center gap-4">
        <img
          src={`${provider.profilepic}`}
          alt={provider.fullname}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{provider.fullname}</h2>
          <p className="text-gray-500 text-sm">
            {provider.city}, {provider.state}
          </p>
        </div>
      </div>

    
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-semibold">📞</span> {provider.contactnumber}
        </p>
        <p>
          <span className="font-semibold">🕒</span> {provider.time}
        </p>
        <p>
          <span className="font-semibold">⭐</span> {provider.experience} yrs experience
        </p>
        <p>
          <span className="font-semibold">💰</span> Rs. {provider.price}
        </p>
      </div>

      
      <p className="mt-3 text-gray-700 text-sm">{provider.description}</p>

      
      <div className="flex items-center mt-3 space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${i < provider.rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="text-sm text-gray-600">({provider.rating})</span>
      </div>

      
      <div className="flex gap-3 mt-4">
        <button
          className={`px-4 py-2 text-white rounded-xl transition ${
            show
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-900 cursor-not-allowed"
          }`}
          disabled={status}
          onClick={() => handleBooking(provider.userId)}
        >
          {!status ? "Book Now" : "Booked"}
        </button>

        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition"
          onClick={async()=>{setChatOpen((prev)=>!prev);
            await socketconnect(user.id,provider.userId)
          }}
        >
          Chat with Provider
        </button>
      </div>

      {chatOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-80 rounded-xl p-4 flex flex-col">
      
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">Chat with {provider.fullname}</h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setChatOpen(false)}
        >
          ✕
        </button>
      </div>

      
      <div className="flex-1 text-center text-gray-500 py-3">
        Say something, then continue chatting in the Chat Section
      </div>

      
      <div className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-xl focus:outline-none"
        />
        <button
          onClick={()=>handleChatSend()}
          className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}


      
      {showModal && (
        <BookingModal
          setShowModal={setShowModal}
          provider={provider.userId}
          setStatus={setStatus}
          user_id={provider.userId}
        />
      )}
    </div>
  );
};

export default ProvderCard;
