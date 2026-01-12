import React, { useContext, useState } from "react";
import PersonalDetails from "./Stages/PersonalDetails";
import JobDetails from "./Stages/JobDetails";
import Location from "./Stages/Location";
import AuthContext from "../../context/AuthContext";

const ProviderMain = ({ setShow }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [stage, setStage] = useState(0);
  const [providerData, setProviderData] = useState({
    user: userId,
    fullname: "",
    contactnumber: "",
    profilepic: "",
    state: "",
    city: "",
    price: "",
    experience: "",
    description: "",
    jobtype: [],
    time:"",
  });
  return (
    <div
      className="flex justify-center items-center min-h-[100vh] px-4 pt-20
      bg-gradient-to-br from-gray-500 via-white to-green-50"
    >
      
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-lg 
        border border-gray-200 p-8"
        onClick={(e) => e.stopPropagation()}
      >
     
        
       

        
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Become a Service Provider
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Fill in your details to start offering services
        </p>

        
        <form className="space-y-3">
          {stage === 0 && (
            <PersonalDetails
              setStage={setStage}
              providerData={providerData}
              setProviderData={setProviderData}
            />
          )}
          {stage === 1 && (
            <Location
              setStage={setStage}
              providerData={providerData}
              setProviderData={setProviderData}
            />
          )}
          {stage === 2 && (
            <JobDetails
              setStage={setStage}
              providerData={providerData}
              setProviderData={setProviderData}
            />
          )}
        </form>

        <div className="mt-6 text-xs text-gray-400 text-center">
          By continuing, you agree to our{" "}
          <span className="text-green-600 hover:underline cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-green-600 hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProviderMain;
