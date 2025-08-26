import React, { useState } from 'react'
import UserDashboard from './User/UserDashboard'
import Navigation from '../Mainpage/Navbar/Navigation'
const MainDashboard = () => {
  
  return (
    <>
      <div className='pt-20'>
        <UserDashboard/>
      </div>
    </>
  )
}

export default MainDashboard
