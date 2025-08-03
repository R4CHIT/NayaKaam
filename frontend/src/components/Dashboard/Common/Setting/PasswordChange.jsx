import React, { useRef } from 'react'
import InputDetails from '../../../ui/InputDetails'
import Button from '../../../ui/Button'
const PasswordChange = () => {
    const newpasswordRef = useRef()
    const conformpasswordref = useRef()
  return (
    <div>
      <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 border-[#374151] bg-[#1e293b]">
        <div className="text-center text-xl  text-orange-500 ">
          {" "}
          <h1>Password Change</h1>
        </div>
        <div className="flex flex-col gap-5">
            <InputDetails title={"New Password:"} ref={newpasswordRef} /> 
            <InputDetails title={"Conform Password:"} ref={conformpasswordref} /> 
            
        <Button title={"Submit"}/>
        </div>
      </div>
    </div>
  )
}

export default PasswordChange
