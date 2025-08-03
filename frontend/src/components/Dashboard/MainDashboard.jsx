import React from 'react'
import UserDashboard from './User/UserDashboard'
import Navigation from '../Mainpage/Navbar/Navigation'
const MainDashboard = () => {
  return (
    <div>
      <Navigation />
      <div className='pt-20'>
        <UserDashboard/>
      </div>
    </div>
  )
}

export default MainDashboard
