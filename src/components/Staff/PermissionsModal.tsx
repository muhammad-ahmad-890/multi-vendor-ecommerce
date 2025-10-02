import React from "react";
import { Shield } from "lucide-react";
import Modal from "../UI/Modal";
import { Staff, Permission } from "./types";

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStaff: Staff | null;
  availablePermissions: Permission[];
  onPermissionToggle: (permissionId: string) => void;
  onSavePermissions: () => void;
  getPermissionsByCategory: () => Array<{
    category: string;
    permissions: Permission[];
  }>;
}

const PermissionsModal: React.FC<PermissionsModalProps> = ({
  isOpen,
  onClose,
  selectedStaff,
  onPermissionToggle,
  onSavePermissions,
  getPermissionsByCategory,
}) => {
  if (!selectedStaff) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Permissions - ${selectedStaff.name}`}
      size="xl"
    >
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Current Permissions: {selectedStaff.permissions.length}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {getPermissionsByCategory().map((categoryGroup) => (
            <div key={categoryGroup.category} className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                {categoryGroup.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryGroup.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={permission.id}
                      checked={selectedStaff.permissions.includes(
                        permission.id
                      )}
                      onChange={() => onPermissionToggle(permission.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={permission.id}
                        className="text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {permission.name}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          onClick={onSavePermissions}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Save Permissions
        </button>
      </div>
    </Modal>
  );
};

export default PermissionsModal;
