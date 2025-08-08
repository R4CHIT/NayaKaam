import React, { useEffect, useRef, useState } from "react";
import InputDetails from "../../ui/InputDetails";
import Category from "../../ProviderDetails/component/category";
import getCategory from "../../api/providersApi/getCategory";
const UpdateuserFrom = ({ provider, setprofile }) => {    
  const usernameRef = useRef();
  const profilepicRef = useRef(null);
  const stateRef = useRef();
  const cityRef = useRef();
  const availableTimeRef = useRef();
  const contactnoRef = useRef();
  const experienceRef = useRef();
  const priceRef = useRef();
  const [category, setCategory] = useState([]);
  const [jobtype,setJobtype] = useState([])

  useEffect(() => {
    setJobtype(provider.jobtype)
    getCategory(setCategory);
    if (usernameRef.current) usernameRef.current.value = provider.fullname;
    if (stateRef.current) stateRef.current.value = provider.state;
    if (cityRef.current) cityRef.current.value = provider.city;
    if (availableTimeRef.current) availableTimeRef.current.value = provider.time;
    if (contactnoRef.current) contactnoRef.current.value = provider.contactnumber;
    if (experienceRef.current) experienceRef.current.value = provider.experience;
    if (priceRef.current) priceRef.current.value = provider.price;
  },[provider]);
  return (
    <div className="bg-white relative top-25 p-6 w-full md:w-[40%] rounded-lg shadow-md">
      <InputDetails
        title={"Full Name"}
        ref={usernameRef}
        placeholder={"Enter your name"}
      />
      <InputDetails
        title={"Profile Picture URL"}
        ref={profilepicRef}
        placeholder={"Enter profile pic URL"}
        type={"file"}
      />
      <InputDetails
        title={"State"}
        ref={stateRef}
        placeholder={"Enter your state"}
      />
      <InputDetails
        title={"City"}
        ref={cityRef}
        placeholder={"Enter your city"}
      />
      <Category category={category} setJobtype={setJobtype} jobtype={jobtype} />
      <InputDetails
        title={"Available Time"}
        ref={availableTimeRef}
        placeholder={"Enter your available time"}
      />
      <InputDetails
        title={"Contact Number"}
        ref={contactnoRef}
        placeholder={"Enter contact number"}
      />
      <InputDetails
        title={"Experience (years)"}
        ref={experienceRef}
        placeholder={"Enter your experience"}
      />
      <InputDetails
        title={"Price (₹)"}
        ref={priceRef}
        placeholder={"Enter your price"}
      />
    </div>
  );
};

export default UpdateuserFrom;
