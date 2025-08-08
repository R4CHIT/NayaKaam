import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../Components/Card";
import InputDetails from "../../ui/InputDetails";
import UpdateuserFrom from "./UpdateuserFrom";
const EditProfile = ({provider,setProfile}) => {
  
  return (
    <div>
      <div className=" min-h-screen flex px-10 gap-5">
        <div className="hidden md:flex"><Card provider={provider} /></div>
        <UpdateuserFrom setProfile={setProfile} provider={provider} />
      </div>
    </div>
  );
};

export default EditProfile;
