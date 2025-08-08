import React, { useEffect, useRef,useState } from "react";
import InputDetails from "../../ui/InputDetails";
import Button from "../../ui/Button";
import becomeprovderApi from "../../api/providersApi/becomeprovderApi";
import getCategory from "../../api/providersApi/getCategory";
import Category from "../component/category";



const JobDetails = ({ setStage, providerData, setProviderData }) => {
  const priceRef = useRef();
  const experienceRef = useRef();
  const bioRef = useRef();
  const jobtypeRef = useRef();
  const errormessage = useRef();
  const [error, setError] = useState(0);
  const [category,setCategory] =useState([])
  const [jobtype,setJobtype] = useState([])
  useEffect(()=>{
    getCategory(setCategory)
    console.log(jobtype);
  },[])
  const handleProceed = (e) => {
    
    if(experienceRef.current.value == ''){
      setError(1)
      errormessage.current = 'Enter you demanding Price'
    }else if(priceRef.current.value == ''){
      setError(2)
      errormessage.current = 'Enter your Experience'
    
    }else if(bioRef.current.value == ''){
      setError(3)
      errormessage.current = 'Enter your Bio'
    }else{
    let temp = providerData;
    temp.price = Number(priceRef.current?.value);
    temp.experience = Number(experienceRef.current?.value);
    temp.description = experienceRef.current?.value;
    temp.jobtype = jobtype;
    setProviderData(temp);
    becomeprovderApi(providerData)
    }
  };
  return (
    <>
      <InputDetails
        title={"Experience:"}
        placeholder={"Enter your Experience"}
        ref={experienceRef}
        error={error == 1 && true}
        errormessage={errormessage.current}
      />
      <InputDetails
        title={"Price:"}
        placeholder={"Price per hour / price per task"}
        ref={priceRef}
        error={error == 2 && true}
        errormessage={errormessage.current}
      />
      <InputDetails
        title={"About you:"}
        placeholder={"Write something about you"}
        ref={bioRef}
        error={error == 3 && true}
        errormessage={errormessage.current}
      />
      <Category category={category} setJobtype={setJobtype} jobtype={jobtype}/>
      <Button title={"Proceed"} type={'button'} onClick={() => handleProceed()} />
    </>
  );
};

export default JobDetails;
