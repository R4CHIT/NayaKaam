import React from 'react'

const InputDetails = ({placeholder,title,type,ref,error,errormessage}) => {
  return (
  <div>
        <label className="block text-sm font-medium text-gray-700">{title}</label>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
        />
        {error && <span className='text-red-600'>{errormessage}</span>}
        
      </div>
  )
}

export default InputDetails
