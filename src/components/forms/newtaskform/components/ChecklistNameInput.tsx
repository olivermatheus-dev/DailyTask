import React from "react";

interface ChecklistNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ChecklistNameInput: React.FC<ChecklistNameInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Checklist Name"
      className="border border-gray-300 rounded-md p-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ChecklistNameInput;
