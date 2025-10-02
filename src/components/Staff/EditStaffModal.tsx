import React from "react";
import Modal from "../UI/Modal";
import { Staff } from "./types";

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingStaff: Staff | null;
  onEditingStaffChange: (
    field: string,
    value: string | "active" | "inactive"
  ) => void;
  onSaveChanges: () => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  isOpen,
  onClose,
  editingStaff,
  onEditingStaffChange,
  onSaveChanges,
}) => {
  if (!editingStaff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Staff Member">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={editingStaff.name}
            onChange={(e) => onEditingStaffChange("name", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={editingStaff.email}
            onChange={(e) => onEditingStaffChange("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={editingStaff.role}
            onChange={(e) => onEditingStaffChange("role", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={editingStaff.status}
            onChange={(e) =>
              onEditingStaffChange(
                "status",
                e.target.value as "active" | "inactive"
              )
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSaveChanges}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditStaffModal;
