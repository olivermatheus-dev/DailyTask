import React from "react";

interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <button
      type="submit"
      onClick={onSubmit}
      className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
    >
      Save
    </button>
  );
};

export default SubmitButton;
