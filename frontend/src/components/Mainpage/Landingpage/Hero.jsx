import React from 'react'

const Hero = () => {
  return (
    <div className='relative top-20'>
      <div className='min-h-[91.2vh] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 py-8 lg:py-0'>
        
        <div className='flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:pr-12'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0F172A] leading-tight mb-6'>
            Find Trusted
            <span className='block text-[#38BDF8]'>Local Services</span>
            <span className='block'>Near You</span>
          </h1>
          
          <p className='text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0'>
            Connect with skilled professionals for all your home and business needs. From plumbing to cleaning, we've got you covered with verified service providers.
          </p>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8'>
            <button className='bg-[#38BDF8] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#0EA5E9] transition-colors shadow-lg'>
              Find Services
            </button>
            <button className='border-2 border-[#38BDF8] text-[#38BDF8] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#38BDF8] hover:text-white transition-colors'>
              Become a Provider
            </button>
          </div>
          
          <div className='flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>1000+ Verified Providers</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>24/7 Support</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>Same Day Service</span>
            </div>
          </div>
        </div>
        
        <div className='flex-1 flex justify-center items-end max-w-lg lg:max-w-none'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-t from-[#38BDF8]/20 to-transparent rounded-2xl'></div>
            <img 
              src="https://img.freepik.com/premium-photo/electrician-working-electric-panel_1004054-12066.jpg" 
              alt="Professional service provider" 
              className='w-full h-auto max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl'
            />
            <div className='absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-gray-700'>Available Now</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Hero