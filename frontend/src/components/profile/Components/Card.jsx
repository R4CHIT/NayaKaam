import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import updateProviderProfile from "../../api/providersApi/updateProviderProfile";
import AuthContext from '../../../context/AuthContext'
const Card = ({ provider, setEdit, edit }) => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const userId = user?.id
  console.log(userId);
  
  const handleUpdate = () => {
    setEdit(true);
  };
  const handleUpdateData=()=>{
    updateProviderProfile(provider, userId)
  }
  return (
    <div className="min-h-screen bg-white flex justify-center items-start pt-20 md:pt-25 pb-5">
      <div className="bg-white/50 backdrop-blur-md lg:rounded-lg shadow-lg w-full max-w-2xl">
        <div
          className="h-28 w-full rounded-t-lg bg-cover bg-center relative"
          style={{
            backgroundImage: provider.profilepic
              ? `url(http://127.0.0.1:8000${provider.profilepic})`
              : `url('/default-cover.jpg')`,
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="relative px-6">
          <div className="absolute -top-16 left-30 md:left-6 w-32 h-32 rounded-full border-6 border-white shadow-md overflow-hidden">
            <img
              src={
                provider.profilepic
                  ? `http://127.0.0.1:8000${provider.profilepic}`
                  : "/default-avatar.png"
              }
              alt={provider.fullname}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-20 pb-6 pl-5 lg:pl-44">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {provider.fullname}
            </h1>
            <p className="text-base text-gray-600 mt-1">
              {provider.city}, {provider.state}
            </p>

            {edit ? (
              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => handleUpdateData()}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                >
                  Update Profile
                </button>

            
              </div>
            ) : (
              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => handleUpdate()}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>

                <button className="px-5 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition">
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300 px-6 py-5 grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">About</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {provider.description}
            </p>
          </div>

          <div className="space-y-4 grid md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold mb-1">Job Types</h2>
              <div className="flex flex-wrap gap-2">
                {provider.jobtype?.map((job, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-800 font-medium text-sm"
                  >
                    {job.category}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">Experience & Price</h2>
              <p className="text-gray-700 text-base">
                {provider.experience} years experience
                <br />
                <span className="text-green-600 font-semibold text-lg">
                  ₹{provider.price} per hour
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">
                Contact & Availability
              </h2>
              <p className="text-gray-700 text-base">
                📞 {provider.contactnumber} <br />⏰ {provider.time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
