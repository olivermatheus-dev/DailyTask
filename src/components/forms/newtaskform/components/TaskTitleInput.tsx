import React from "react";

interface TaskTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TaskTitleInput: React.FC<TaskTitleInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Task Title"
      className="text-xl font-bold rounded-md p-2"
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TaskTitleInput;
