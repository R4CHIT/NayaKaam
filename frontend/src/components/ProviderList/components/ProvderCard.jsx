import React, { useState } from "react";
import BookingModal from "../modal/BookingModal";
const ProvderCard = ({provider}) => {
  const [showModal,setShowModal] = useState(false)
  const [status,setStatus]=useState(false)
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

const handleBooking=async()=>{
 setShowModal((prev)=>!prev)
 
}
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col text-left hover:shadow-xl transition duration-300">
      <div className="flex items-center gap-4">
        <img
          src={`http://127.0.0.1:8000/${provider.profilepic}`}
          alt={provider.fullname}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{provider.fullname}</h2>
          <p className="text-gray-500 text-sm">{provider.city}, {provider.state}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p><span className="font-semibold">📞</span> {provider.contactnumber}</p>
        <p><span className="font-semibold">🕒</span> {provider.time}</p>
        <p><span className="font-semibold">⭐</span> {provider.experience} yrs experience</p>
        <p><span className="font-semibold">💰</span> Rs. {provider.price}</p>
      </div>

      <p className="mt-3 text-gray-700 text-sm">{provider.description}</p>

      <button
  className={`mt-4 px-4 py-2 text-white rounded-xl transition ${
    show ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-900 cursor-not-allowed"
  }`}
  disabled={!show || status}
  onClick={()=>handleBooking(provider.userId)}
  >
  {!status ? 'Book Now':'Booked'}
  </button>
  {showModal && <BookingModal setShowModal={setShowModal} provider={provider.userId}  setStatus={setStatus}/>}
    </div>
  );
};

export default ProvderCard;
