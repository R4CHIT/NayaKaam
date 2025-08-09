import React, { useEffect, useRef, useState } from "react";
import InputDetails from "../../ui/InputDetails";
import Category from "../../ProviderDetails/component/category";
import getCategory from "../../api/providersApi/getCategory";
import EditUserInput from "../../ui/EditUserInput";
import EditCategory from "./EditCategory";
const UpdateuserFrom = ({ provider, setProfile }) => {    
const [username, setUsername] = useState("");
const [profilePic, setProfilePic] = useState(null);
const [stateName, setStateName] = useState("");
const [city, setCity] = useState("");
const [availableTime, setAvailableTime] = useState("");
const [contactNo, setContactNo] = useState("");
const [experience, setExperience] = useState("");
const [price, setPrice] = useState("");
const [jobtype, setJobtype] = useState([]);


return (
  <div className="bg-white relative top-25 p-6 w-full md:w-[40%] rounded-lg shadow-md">
    <EditUserInput
      title="Full Name"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter your name"
      name={'fullname'}
      provider={provider}
      setProfile={setProfile}
    />
    <EditUserInput
      title="Profile Picture"
      type="file"
      name={'profilepic'}
      onChange={(e) => setProfilePic(e.target.files[0])}
      provider={provider}
      setProfile={setProfile}
    />
    <EditUserInput
      title="State"
      value={stateName}
      name={'state'}
      onChange={(e) => setStateName(e.target.value)}
      placeholder="Enter your state"
      provider={provider}
      setProfile={setProfile}
    />
    <EditUserInput
      title="City"
      value={city}
      name={'city'}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter your city"
      provider={provider}
      setProfile={setProfile}
    />
    <EditCategory setJobtype={setJobtype} setProfile={setProfile} jobtype={jobtype} provider={provider} />
    <EditUserInput
      title="Available Time"
      value={availableTime}
      name={'time'}
      onChange={(e) => setAvailableTime(e.target.value)}
      placeholder="Enter your available time"
      provider={provider}
      setProfile={setProfile}
    />
    <EditUserInput
      title="Contact Number"
      value={contactNo}
      name={'contactnumber'}
      onChange={(e) => setContactNo(e.target.value)}
      placeholder="Enter contact number"
      provider={provider}
      setProfile={setProfile}
    />
    <EditUserInput
      title="Experience (years)"
      value={experience}
      name={'experience'}
      onChange={(e) => setExperience(e.target.value)}
      placeholder="Enter your experience"
      provider={provider}
      setProfile={setProfile}
    />
    <EditUserInput
      title="Price (₹)"
      value={price}
      name={'price'}
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Enter your price"
      provider={provider}
      setProfile={setProfile}
    />
  </div>
);

};

export default UpdateuserFrom;
