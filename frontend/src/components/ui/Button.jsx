import React from 'react'

const Button = ({title,type,className,...props}) => {
  return (
    <div className='text-center'>
      <button {...props} type={type} className={`${className} w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer`}>
        {title}
      </button>
    </div>
  )
}

export default Button
