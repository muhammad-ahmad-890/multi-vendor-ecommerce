import React from "react";
import { Save } from "lucide-react";

interface SaveButtonProps {
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
      >
        <Save className="h-4 w-4" />
        <span>Save Settings</span>
      </button>
    </div>
  );
};

export default SaveButton;
