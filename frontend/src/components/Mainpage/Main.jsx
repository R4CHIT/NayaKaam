import React, { useContext, useEffect, useState } from 'react'
import Navigation from './Navbar/Navigation'
import Hero from '../Mainpage/Landingpage/Hero'
function Main({role}) {
  return (
    <div>
      <Hero role={role}/>
    </div>
  )
}

export default Main
