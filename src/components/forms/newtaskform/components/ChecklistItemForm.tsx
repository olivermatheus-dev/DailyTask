import React from "react";
import { ChecklistItem } from "@/types/task";

interface ChecklistItemFormProps {
  item: ChecklistItem;
  onNameChange: (name: string) => void;
  onToggle: (completed: boolean) => void;
}

const ChecklistItemForm: React.FC<ChecklistItemFormProps> = ({
  item,
  onNameChange,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <input
        type="text"
        placeholder="Checklist Item"
        className="border border-gray-300 rounded-md p-2"
        value={item.name}
        onChange={(e) => onNameChange(e.target.value)}
      />
    </div>
  );
};

export default ChecklistItemForm;
