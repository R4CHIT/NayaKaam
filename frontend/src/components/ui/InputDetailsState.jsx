import React from "react";

const InputDetailsState = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputDetailsState;
