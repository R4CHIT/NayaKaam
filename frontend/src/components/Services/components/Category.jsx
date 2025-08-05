import React from "react";

const Category = ({ category,setSelectedCategory,selectedCategory }) => {
  return (
    <>
      <button
        key={category.id}
        onClick={() => setSelectedCategory(category.id)}
        className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
          selectedCategory === category.id
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        <category.icon className="w-4 h-4" />
        <span className="text-sm font-medium">{category.name}</span>
      </button>
    </>
  );
};

export default Category;
