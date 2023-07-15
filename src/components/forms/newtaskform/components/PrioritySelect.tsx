import React from "react";
import { Task } from "@/types/task";

interface PrioritySelectProps {
  value: Task["priority"];
  onChange: (value: Task["priority"]) => void;
}

const PrioritySelect: React.FC<PrioritySelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="font-bold">Priority:</label>
      <select
        className="border border-gray-300 rounded-md p-2"
        value={value}
        onChange={(e) => onChange(e.target.value as Task["priority"])}
      >
        <option value="alta">High</option>
        <option value="média">Medium</option>
        <option value="baixa">Low</option>
      </select>
    </div>
  );
};

export default PrioritySelect;
