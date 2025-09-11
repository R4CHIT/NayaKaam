import React, { useContext, useState } from 'react'
import UserDashboard from './User/UserDashboard'
import Navigation from '../Mainpage/Navbar/Navigation'
import AuthContext from '../../context/AuthContext'
import CustomerDashboard from './customer/CustomerDashboard'
const MainDashboard = () => {
  const {user} = useContext(AuthContext)
  const role = user?.roles;
  return (
    
    <>
      <div className='pt-20'>
        {role==="provider" ? (
          <UserDashboard/>
        ):(
          
          <CustomerDashboard />
        )}
        
      </div>
    </>
  )
}

export default MainDashboard
