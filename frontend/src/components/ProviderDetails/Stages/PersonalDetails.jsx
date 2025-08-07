import React, { useRef, useState } from 'react'
import InputDetails from '../../ui/InputDetails'
import Button from '../../ui/Button'

const PersonalDetails = ({setStage,providerData,setProviderData}) => {
  const nameRef = useRef()
  const contactRef = useRef()
  const profilepic = useRef(null)
  const errormessage =useRef('')
  const [error,setError] = useState(0)
  const handleProceed=()=>{
    
    if(nameRef.current.value==''){
      setError(1)
      errormessage.current = 'Enter your Name'     
    }else if(contactRef.current.value ==''){
      setError(2)
      errormessage.current = 'Enter your Contact' 
    
    }else if(profilepic.current.value ==''){
      setError(3)
      errormessage.current = 'Fill profile pic' 
    }
    else{
      setError(0)
      errormessage.current = ''
    setStage(1)
    let temp = { ...providerData}
    temp.fullname = nameRef.current.value
    temp.contactnumber = contactRef.current.value
    temp.profilepic = profilepic.current.files[0]
    setProviderData(temp)
  }
  }
  return (
    <>
      <InputDetails title={"Full Name:"} placeholder={"Enter your full Name"}  ref={nameRef} error={error == 1 && true} errormessage={errormessage.current}/>
      <InputDetails  title={"Contact No:"} placeholder={"Enter your Conatact No"}  ref={contactRef} error={error == 2 && true} errormessage={errormessage.current}/>
      <InputDetails title={"Profile Pic"} placeholder={"Fill your Profile pic "} type={"file"} ref={profilepic} error={error == 3 && true} errormessage={errormessage.current}/>
      <Button title={"Proceed"} type={'button'} onClick={()=>handleProceed()}/>
    </>
  )
}

export default PersonalDetails
