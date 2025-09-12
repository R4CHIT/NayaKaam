import React, { useEffect, useState } from "react";
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
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (provider) {
      setUsername(provider.fullname || "");
      setStateName(provider.state || "");
      setCity(provider.city || "");
      setAvailableTime(provider.time || "");
      setContactNo(provider.contactnumber || "");
      setExperience(provider.experience || "");
      setPrice(provider.price || "");
      setJobtype(provider.jobtype || []);
      setDescription(provider.description || "");
    }
  }, [provider]);

  return (
    <div className="bg-white relative top-25 p-6 w-full md:w-[40%] h-full rounded-lg shadow-md space-y-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <EditUserInput
            title="Full Name"
            value={username}
            placeholder="Enter your name"
            name="fullname"
            provider={provider}
            setProfile={setProfile}
          />
        </div>
        <div className="w-1/2">
          <EditUserInput
            title="Profile Picture"
            type="file"
            value={profilePic}
            name="profilepic"
            onChange={(e) => setProfilePic(e.target.files[0])}
            provider={provider}
            setProfile={setProfile}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <EditUserInput
            title="State"
            value={stateName}
            name="state"
            placeholder="Enter your state"
            provider={provider}
            setProfile={setProfile}
          />
        </div>
        <div className="w-1/2">
          <EditUserInput
            title="City"
            value={city}
            name="city"
            placeholder="Enter your city"
            provider={provider}
            setProfile={setProfile}
          />
        </div>
      </div>

      <EditCategory
        setJobtype={setJobtype}
        setProfile={setProfile}
        jobtype={jobtype}
        provider={provider}
      />

      <div className="flex gap-4">
        <div className="w-1/2">
          <EditUserInput
            title="Available Time"
            value={availableTime}
            name="time"
            placeholder="Enter your available time"
            provider={provider}
            setProfile={setProfile}
          />
        </div>
        <div className="w-1/2">
          <EditUserInput
            title="Contact Number"
            value={contactNo}
            name="contactnumber"
            placeholder="Enter contact number"
            provider={provider}
            setProfile={setProfile}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <EditUserInput
            title="Experience (years)"
            value={experience}
            name="experience"
            placeholder="Enter your experience"
            provider={provider}
            setProfile={setProfile}
          />
        </div>
        <div className="w-1/2">
          <EditUserInput
            title="Price (₹)"
            value={price}
            name="price"
            placeholder="Enter your price"
            provider={provider}
            setProfile={setProfile}
          />
        </div>
      </div>

      <EditUserInput
        title="Description"
        value={description}
        name="description"
        placeholder="Enter your bio"
        provider={provider}
        setProfile={setProfile}
      />
    </div>
  );
};

export default UpdateuserFrom;
