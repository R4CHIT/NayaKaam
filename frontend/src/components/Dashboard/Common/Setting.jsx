import React from 'react'
import UserProfileChange from './Setting/UserProfileChange'
import DetailChange from './Setting/DetailChange'
import PasswordChange from './Setting/PasswordChange'
import AccountDelete from './Setting/AccountDelete'

const Setting = () => {
  return (
    <div>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
        <UserProfileChange /> 
        <DetailChange  />
        <PasswordChange />
        <AccountDelete />
      </div>
    </div>
  )
}

export default Setting
