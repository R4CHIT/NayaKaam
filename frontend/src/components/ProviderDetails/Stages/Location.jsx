import React, { useRef, useState } from "react";
import InputDetails from "../../ui/InputDetails";
import Button from "../../ui/Button";
const Location = ({ setStage, providerData, setProviderData }) => {
  const stateRef = useRef();
  const cityRef = useRef();
  const errormessage = useRef();
  const [error, setError] = useState(0);

  const handleProceed = (e) => {
    
    if (stateRef.current.value == "") {
      setError(1);
      errormessage.current = "Enter your state Name";
    } else if (cityRef.current.value == '') {
      setError(2);
      errormessage.current = "Enter your city Name";
    } else {
      setError(0);
      errormessage.current = "";
      setStage(2);
      let temp = providerData;
      temp.state = stateRef.current?.value;
      temp.city = cityRef.current?.value;
      setProviderData(temp);
    }
  };
  return (
    <>
      <InputDetails
        title={"State:"}
        placeholder={"Enter your State"}
        ref={stateRef}
        error={error == 1 && true}
        errormessage={errormessage.current}
      />
      <InputDetails
        title={"City"}
        placeholder={"Enter your city"}
        error={error == 2 && true}
        errormessage={errormessage.current}
        ref={cityRef}
      />
      <Button title={"Proceed"} type={'button'} onClick={() => handleProceed()} />
    </>
  );
};

export default Location;
