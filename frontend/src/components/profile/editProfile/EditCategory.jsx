import React, { useEffect, useState } from "react";
import Select from "react-select";
import getCategory from "../../api/providersApi/getCategory";
const EditCategory = ({
  setJobtype,
  jobtype,
  setProfile,
  provider,
}) => {
    const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory(setCategory);
    setJobtype(provider.jobtype.map((item) => item.id));
  }, []);
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

      const isSame =
        selectedOptions.length === selected.length &&
        selectedOptions.every((p, i) => p.value === selected[i].value);

      if (!isSame) {
        setSelectedOptions(selected);
      }
    }
  }, [jobtype, options]);
  const handleChange = (selected) => {
  setSelectedOptions(selected);

  const jobtypeData = selected
    ? selected.map((opt) => ({ id: opt.value, category: opt.label }))
    : [];

  setJobtype(jobtypeData);

  setProfile({
    ...provider,
    jobtype: jobtypeData,  // Use the fresh data here
  });
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

export default EditCategory;
