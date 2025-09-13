import React from "react";

const InputField = ({ 
  icon: Icon, 
  type = "text", 
  value, 
  onChange, 
  placeholder 
}) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={16}
        />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
