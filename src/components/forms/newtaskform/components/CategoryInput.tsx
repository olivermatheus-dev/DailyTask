import React from "react";

interface CategoryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="font-bold">Category:</label>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CategoryInput;
