import React, { useEffect, useState } from "react";
import Select from "react-select";

const Category = ({ category, setJobtype, jobtype }) => {
  const options = category.map((item) => ({
    value: item.id,
    label: item.category,
  }));
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
  if (Array.isArray(jobtype)) {
    const selected = options.filter((opt) =>
      jobtype.some((jt) => jt.id === opt.value || jt === opt.value)
    );
    setSelectedOptions((prev) => {
      const same =
        prev.length === selected.length &&
        prev.every((p, i) => p.value === selected[i].value);
      return same ? prev : selected;
    });
  }
}, [jobtype, options]);
  
  const handleChange = (selected) => {
    setSelectedOptions(selected);
    setJobtype(selected.map((opt) => opt.value));
  };
  return (
    <div className="text-white">
      <label className="block mb-2 text-gray-500">Select Categories:</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        className="text-black"
        classNamePrefix="select"
        placeholder="Select job types..."
      />

      <div className="mt-3 text-gray-500">
        Selected:{" "}
        {selectedOptions.length > 0
          ? selectedOptions.map((opt) => opt.label).join(", ")
          : "None"}
      </div>
      <p className="text-gray-500">
        Don’t find your Category?{" "}
        <span className="text-red-500">Add Category</span>
      </p>
    </div>
  );
};

export default Category;
