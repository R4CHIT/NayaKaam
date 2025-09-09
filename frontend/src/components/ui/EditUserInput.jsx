import React from 'react';

const EditUserInput = ({
  title,
  type = "text",
  placeholder = "",
  setProfile,
  error,
  errormessage,
  name,
  provider,
  onChange // ✅ actually use this if provided
}) => {
  const handleChange = (e) => {
    if (type === "file") {
      setProfile({
        ...provider,
        [name]: e.target.files[0], 
      });
    } else {
      setProfile({
        ...provider,
        [name]: e.target.value,
      });
    }
  };

  return (
    <div>
      {title && (
        <label className="block text-sm font-medium text-gray-500">
          {title}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={type === "file" ? undefined : provider?.[name]}
        onChange={onChange || handleChange} // ✅ use custom onChange if passed
        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
      />
      {error && <span className="text-red-600">{errormessage}</span>}
    </div>
  );
};

export default EditUserInput;
