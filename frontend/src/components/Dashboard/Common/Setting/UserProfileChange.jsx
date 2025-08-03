import React, { useRef } from "react";
import InputDetails from '../../../ui/InputDetails'
import Button from "../../../ui/Button";
const UserProfileChange = () => {
    const usernameRef = useRef()
    const emailRef = useRef()
    const profileRef = useRef()
  return (
    <div>
      <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 border-[#374151] bg-[#1e293b]">
        <div className="text-center text-xl  text-orange-500">
          {" "}
          <h1>UserProfile Change</h1>
        </div>
        <div className="flex flex-col gap-5">
            <InputDetails title={"Username:"} ref={usernameRef} /> 
            <InputDetails title={"Email:"} ref={emailRef} /> 
            <InputDetails title={"Profile Picture:"} ref={profileRef} type={"file"}/> 

            <Button title={"Submit"}/>
        </div>
      </div>
    </div>
  );
};

export default UserProfileChange;
