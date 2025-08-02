import React, { useState } from "react";
import PersonalDetails from "./Stages/PersonalDetails";
import JobDetails from "./Stages/JobDetails";
import Location from "./Stages/Location";

const ProviderMain = ({setShow}) => {
  const [stage,setStage]=useState(0)
  const [providerData,setProviderData]=useState({
    fullname:'',
    contactno:'',
    profileimage:'',
    state:'',
    city:'',
    price:'',
    experience:'',
    bio:'',
    jobtype:''
  })
  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-black/50 backdrop-blur-sm h-screen px-4 " onClick={()=>setShow()}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6" onClick={(e)=>e.stopPropagation()}>
        <h1 className="text-2xl font-bold text-center text-[#0f1729] mb-4">
          Become a Service Provider
        </h1>

        <form className="space-y-4">
          {stage==0 && 
          <PersonalDetails setStage={setStage} providerData={providerData} setProviderData={setProviderData}/>
          }
          {stage==1 && 
          <Location setStage={setStage} providerData={providerData} setProviderData={setProviderData}/>
          }
          {stage==2 && 
          <JobDetails setStage={setStage} providerData={providerData} setProviderData={setProviderData}/>
          }
        </form>
      </div>
    </div>
  );
};

export default ProviderMain;
