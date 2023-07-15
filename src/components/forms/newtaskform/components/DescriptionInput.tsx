import React from "react";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div>X</div>
        <label className="font-bold">Task Description:</label>
      </div>
      <input
        type="text"
        placeholder="Task Description"
        className="border border-gray-300 rounded-md p-2"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DescriptionInput;
