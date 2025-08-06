import React, { useContext, useState } from "react";
import PersonalDetails from "./Stages/PersonalDetails";
import JobDetails from "./Stages/JobDetails";
import Location from "./Stages/Location";
import AuthContext from "../../context/AuthContext";

const ProviderMain = ({setShow}) => {
  const {user} = useContext(AuthContext)
  const userId = user?.id
  const [stage,setStage]=useState(0)
  const [providerData,setProviderData]=useState({
    user:userId,
    fullname:'',
    contactnumber:'',
    profilepic:'',
    state:'',
    city:'',
    price:'',
    experience:'',
    description:'',
    jobtype:''
  })
  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-black/50 backdrop-blur-sm h-screen px-4 " onClick={()=>setShow(false)}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6" onClick={(e)=>e.stopPropagation()}>
        <h1 className="text-2xl font-bold text-center text-[#0f1729] mb-4">
          Become a Service Provider
        </h1>

        <form className="space-y-4">
          {stage==2 && 
          <PersonalDetails setStage={setStage} providerData={providerData} setProviderData={setProviderData}/>
          }
          {stage==1 && 
          <Location setStage={setStage} providerData={providerData} setProviderData={setProviderData}/>
          }
          {stage==0 && 
          <JobDetails setStage={setStage} providerData={providerData} setProviderData={setProviderData}/>
          }
        </form>
      </div>
    </div>
  );
};

export default ProviderMain;
