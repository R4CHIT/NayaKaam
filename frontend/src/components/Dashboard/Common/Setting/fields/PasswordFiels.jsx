import React from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  isVisible, 
  onToggle, 
  placeholder 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <FaLock
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type={isVisible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {isVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
