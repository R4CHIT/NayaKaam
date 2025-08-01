import React from 'react'

const Button = ({title,...props}) => {
  return (
    <div className='text-center'>
      <div {...props} className='w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer'>
        {title}
      </div>
    </div>
  )
}

export default Button
