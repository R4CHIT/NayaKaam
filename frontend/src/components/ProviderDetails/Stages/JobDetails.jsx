import React, { useRef,useState } from "react";
import InputDetails from "../../ui/InputDetails";
import Button from "../../ui/Button";
const JobDetails = ({ setStage, providerData, setProviderData }) => {
  const priceRef = useRef();
  const experienceRef = useRef();
  const bioRef = useRef();
  const jobtypeRef = useRef();
  const errormessage = useRef();
  const [error, setError] = useState(0);

  const handleProceed = () => {
    if(experienceRef.current.value == ''){
      setError(1)
      errormessage.current = 'Enter you demanding Price'
    }else if(priceRef.current.value == ''){
      setError(2)
      errormessage.current = 'Enter your Experience'
    
    }else if(bioRef.current.value == ''){
      setError(3)
      errormessage.current = 'Enter your Bio'
    
    }else if(jobtypeRef.current.value == ''){
      setError(4)
      errormessage.current = 'Enter your Job type'
    }else{
    setStage(0);
    let temp = providerData;
    temp.price = priceRef.current?.value;
    temp.experience = experienceRef.current?.value;
    temp.bio = experienceRef.current?.value;
    temp.jobtype = jobtypeRef.current?.value;
    setProviderData(temp);
    console.log(providerData);
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
      <InputDetails
        title={"Job Type:"}
        placeholder={"What your Job type"}
        ref={jobtypeRef}
        error={error == 4 && true}
        errormessage={errormessage.current}
      />
      <Button title={"Proceed"} onClick={() => handleProceed()} />
    </>
  );
};

export default JobDetails;
