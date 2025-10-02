import React from "react";
import Modal from "../UI/Modal";
import { Vendor } from "./types";

interface EditVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingVendor: Vendor | null;
  onEditingVendorChange: (field: string, value: string | number) => void;
  onSave: () => void;
}

const EditVendorModal: React.FC<EditVendorModalProps> = ({
  isOpen,
  onClose,
  editingVendor,
  onEditingVendorChange,
  onSave,
}) => {
  if (!editingVendor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Vendor" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editingVendor.name}
              onChange={(e) => onEditingVendorChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editingVendor.storeName}
              onChange={(e) =>
                onEditingVendorChange("storeName", e.target.value)
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editingVendor.email}
              onChange={(e) => onEditingVendorChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editingVendor.phone}
              onChange={(e) => onEditingVendorChange("phone", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={editingVendor.address}
            onChange={(e) => onEditingVendorChange("address", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editingVendor.status}
              onChange={(e) => onEditingVendorChange("status", e.target.value)}
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Setups
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editingVendor.storeSetups}
              onChange={(e) =>
                onEditingVendorChange(
                  "storeSetups",
                  parseInt(e.target.value) || 0
                )
              }
            />
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
          onClick={onSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditVendorModal;
