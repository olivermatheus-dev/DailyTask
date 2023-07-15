import React from "react";
import { Checklist, ChecklistItem } from "@/types/task";
import ChecklistNameInput from "./ChecklistNameInput";
import ChecklistItemForm from "./ChecklistItemForm";

interface ChecklistFormProps {
  checklists: Checklist[];
  onChecklistNameChange: (checklistId: string, name: string) => void;
  onAddChecklistItem: (checklistId: string) => void;
  onChecklistItemNameChange: (
    checklistId: string,
    itemId: string,
    name: string
  ) => void;
  onChecklistItemToggle: (
    checklistId: string,
    itemId: string,
    completed: boolean
  ) => void;
}

const ChecklistForm: React.FC<ChecklistFormProps> = ({
  checklists,
  onChecklistNameChange,
  onAddChecklistItem,
  onChecklistItemNameChange,
  onChecklistItemToggle,
}) => {
  return (
    <>
      {checklists.map((checklist) => (
        <div key={checklist.id} className="flex flex-col gap-2">
          <ChecklistNameInput
            value={checklist.name}
            onChange={(name) => onChecklistNameChange(checklist.id, name)}
          />

          {checklist.items.map((item) => (
            <ChecklistItemForm
              key={item.id}
              item={item}
              onNameChange={(name) =>
                onChecklistItemNameChange(checklist.id, item.id, name)
              }
              onToggle={(completed) =>
                onChecklistItemToggle(checklist.id, item.id, completed)
              }
            />
          ))}

          <button
            type="button"
            onClick={() => onAddChecklistItem(checklist.id)}
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
      ))}
    </>
  );
};

export default ChecklistForm;
