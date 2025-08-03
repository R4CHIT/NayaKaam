import React, { useRef } from 'react'
import InputDetails from '../../../ui/InputDetails'
import Button from '../../../ui/Button'
const DetailChange = () => {
    const cityRef = useRef()
    const priceRef = useRef()
    const descriptionRef = useRef()
  return (
    <div>
      <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 border-[#374151] bg-[#1e293b]">
        <div className="text-center text-xl  text-orange-500 ">
          {" "}
          <h1>Details Change</h1>
        </div>
        <div className="flex flex-col gap-5">
            <InputDetails title={"City"} ref={cityRef} /> 
            <InputDetails title={"Price:"} ref={priceRef} /> 
            <InputDetails title={"Description:"} ref={descriptionRef} /> 
            
        <Button title={"Submit"}/>
        </div>
      </div>
    </div>
  )
}

export default DetailChange
