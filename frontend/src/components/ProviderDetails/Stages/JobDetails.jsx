import React, { useEffect, useRef,useState } from "react";
import InputDetails from "../../ui/InputDetails";
import Button from "../../ui/Button";
import becomeprovderApi from "../../api/providersApi/becomeprovderApi";
import getCategory from "../../api/providersApi/getCategory";
import Category from "../component/category";
import { useNavigate } from "react-router-dom";



const JobDetails = ({ setStage, providerData, setProviderData }) => {
  const navigate = useNavigate()
  const priceRef = useRef();
  const experienceRef = useRef();
  const bioRef = useRef();
  const jobtypeRef = useRef();
  const errormessage = useRef();
  const firstactivetimeRef= useRef();
  const secondactivetimeRef= useRef();
  const activetimeRef = useRef();
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
      errormessage.current = 'Enter your Experience'
    }else if(priceRef.current.value == ''){
      setError(2)
      errormessage.current = 'Enter you demanding Price'
    
    }else if(bioRef.current.value == ''){
      setError(3)
      errormessage.current = 'Enter your Bio'
    }else if(firstactivetimeRef.current.value == ''){
      setError(4)
      errormessage.current = 'Enter your work starting time'
    }else if(secondactivetimeRef.current.value == ''){
      setError(5)
      errormessage.current = 'Enter your work end time'
    }
    else {
  let temp = { ...providerData };
  temp.price = Number(priceRef.current?.value);
  temp.experience = Number(experienceRef.current?.value);
  temp.description = bioRef.current?.value;
  temp.jobtype = jobtype;
  
  temp.time = `${firstactivetimeRef.current.value}-${secondactivetimeRef.current.value}`;
  setProviderData(temp);
  becomeprovderApi(temp);
  location.href = '/'
}

  };
  return (
    <>
      <InputDetails
        title={"Experience:"}
        placeholder={"Enter your Experience in years"}
        ref={experienceRef}
        type={"number"}
        error={error == 1 && true}
        errormessage={errormessage.current}
      />
      <InputDetails
        title={"Price:"}
        placeholder={"Price per hour / price per task"}
        type={"number"}
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
      <div className="flex gap-5">
  <InputDetails
    title={"Work Starting Time:"}
    placeholder={"Start hour"}
    
    ref={firstactivetimeRef}
    error={error == 4 && true}
    errormessage={errormessage.current}
  />
  <InputDetails
    title={"Work Ending Time:"}
    placeholder={"End hour"}
    
    ref={secondactivetimeRef}   
    error={error == 5 && true}
    errormessage={errormessage.current}
  />
</div>

      <Category category={category} setJobtype={setJobtype} jobtype={jobtype}/>
      <Button title={"Proceed"} type={'button'} onClick={() => handleProceed()} />
    </>
  );
};

export default JobDetails;
