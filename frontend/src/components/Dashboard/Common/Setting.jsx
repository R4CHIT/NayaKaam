import React from 'react'
import PasswordChange from './Setting/PasswordChange'
import AccountDelete from './Setting/AccountDelete'
import LoginActivity from './Setting/LoginActivity'

const Setting = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <PasswordChange />
        <AccountDelete />
        <LoginActivity />
      </div>
    </div>
  )
}

export default Setting
