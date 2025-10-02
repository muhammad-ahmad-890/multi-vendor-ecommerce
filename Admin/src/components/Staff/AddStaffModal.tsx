import React from "react";
import Modal from "../UI/Modal";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  newStaff: {
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
    permissions: string[];
  };
  onNewStaffChange: (
    field: string,
    value: string | "active" | "inactive"
  ) => void;
  onAddStaff: () => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  newStaff,
  onNewStaffChange,
  onAddStaff,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Staff" size="xl">
      <div className="space-y-6">
        {/* Avatar Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avatar
          </label>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer overflow-hidden">
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="text-gray-600">
                <p className="text-sm">Drag & drop or click to upload</p>
              </div>
            </div>
          </div>
        </div>

        {/* Name Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={newStaff.name}
            onChange={(e) => onNewStaffChange("name", e.target.value)}
            placeholder="Enter staff name"
          />
        </div>

        {/* Email Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={newStaff.email}
            onChange={(e) => onNewStaffChange("email", e.target.value)}
            placeholder="Enter staff email"
          />
        </div>

        {/* Role Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={newStaff.role}
            onChange={(e) => onNewStaffChange("role", e.target.value)}
            placeholder="Enter staff role"
          />
        </div>

        {/* Status Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              value={newStaff.status}
              onChange={(e) =>
                onNewStaffChange(
                  "status",
                  e.target.value as "active" | "inactive"
                )
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onAddStaff}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Staff
        </button>
      </div>
    </Modal>
  );
};

export default AddStaffModal;
