import React, { useState } from 'react';
import Select from 'react-select';
import Button from '../../ui/Button';


const Category = ({category}) => {
    const data =category
    console.log(data);
    const options = category.map((item) => ({
    value: item.category,
    label: item.category,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    console.log("Selected:", selected);
  };
  const handleAddCategory=()=>{

  }

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
      <p className='text-gray-500'>Does'nt found your Category?<span className='text-red-500'>Add Category</span></p>
      
    </div>
  );
};

export default Category;
