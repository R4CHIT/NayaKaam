import React, { useContext, useState } from "react";
import {
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
  FaCheck,
} from "react-icons/fa";
import InformationChange from "./Setting/InformationChange";
import Security from "./Setting/Security";
import AccountDelete from "./Setting/AccountDelete";
import AuthContext from "../../../context/AuthContext";

const Settings = () => {
  const {user} = useContext(AuthContext)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200">
        <InformationChange
        
        />
        {user.auth_type == 'system' && <Security />}
        

        <AccountDelete />
      </div>
    </div>
  );
};

export default Settings;
