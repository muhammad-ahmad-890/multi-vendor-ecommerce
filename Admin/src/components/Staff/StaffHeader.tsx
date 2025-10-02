import React from "react";
import { Plus } from "lucide-react";

interface StaffHeaderProps {
  onAddStaff: () => void;
}

const StaffHeader: React.FC<StaffHeaderProps> = ({ onAddStaff }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Staff</h1>
      <button
        onClick={onAddStaff}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Staff
      </button>
    </div>
  );
};

export default StaffHeader;
