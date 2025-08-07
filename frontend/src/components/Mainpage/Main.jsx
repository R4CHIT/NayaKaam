import React, { useContext, useEffect, useState } from 'react'
import Navigation from './Navbar/Navigation'
import Hero from '../Mainpage/Landingpage/Hero'
import getUserRole from '../api/Role/getUserRole'
import AuthContext from '../../context/AuthContext'
function Main({role}) {
  return (
    <div>
      <Hero role={role}/>
    </div>
  )
}

export default Main
