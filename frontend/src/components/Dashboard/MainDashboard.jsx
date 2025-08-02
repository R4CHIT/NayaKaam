import React from 'react'
import UserDashboard from './User/UserDashboard'
import Navigation from '../Mainpage/Navbar/Navigation'
const MainDashboard = () => {
  return (
    <div>
      <Navigation />
      <UserDashboard/>
    </div>
  )
}

export default MainDashboard
