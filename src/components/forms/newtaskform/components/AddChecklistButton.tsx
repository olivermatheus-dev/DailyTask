import React from "react";

interface AddChecklistButtonProps {
  onClick: () => void;
}

const AddChecklistButton: React.FC<AddChecklistButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
    >
      Add Checklist
    </button>
  );
};

export default AddChecklistButton;
