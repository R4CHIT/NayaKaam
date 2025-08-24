import React, { use, useEffect, useState } from "react";
import ProvderCard from "./components/ProvderCard";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import getProviderList from "../api/Services/getProviderList";
import BookingModal from "./modal/BookingModal";

const ProviderMainDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState([]);
  

  useEffect(() => {
    getProviderList(id, setProviders);
  }, [id]);

  return (
    <div className=" pt-25 px-6">
      <button
        onClick={() => navigate(-1)}
        className="max-h-12 max-w-30 mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
      >
        <AiOutlineArrowLeft size={20} />
        Back
      </button>

      {providers.length !== 0 ? (
        <>
          <h1 className="text-2xl font-semibold mb-6">Available Providers</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProvderCard key={provider.id} provider={provider} setProvider={setProvider} />
            ))}
          </div>
        </>
      ) : (
       <div className="text-center text-3xl flex justify-center items-center h-[70vh]">
         No Providers for this service
       </div>
      )}
    </div>
  );
};

export default ProviderMainDetail;
