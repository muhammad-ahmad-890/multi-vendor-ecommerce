import React from "react";
import { Save } from "lucide-react";
import Modal from "../UI/Modal";
import { User } from "./types";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | null;
  activeTab: string;
  onSave: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  activeTab,
  onSave,
}) => {
  if (!selectedUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              type="text"
              defaultValue={selectedUser.userName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {activeTab === "customers"
                ? "Customer Name"
                : activeTab === "vendors"
                ? "Vendor Name"
                : "Name"}
            </label>
            <input
              type="text"
              defaultValue={selectedUser.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Details
            </label>
            <input
              type="text"
              defaultValue={selectedUser.contactDetails}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              defaultValue={selectedUser.address}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {activeTab === "customers" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coins
              </label>
              <input
                type="number"
                defaultValue={selectedUser.coins}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {(activeTab === "vendors" || activeTab === "vendorStaff") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                defaultValue={selectedUser.storeName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
