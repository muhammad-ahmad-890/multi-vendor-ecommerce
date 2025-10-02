import React from "react";
import { Trash2, User, Building } from "lucide-react";
import Modal from "../UI/Modal";
import { User as UserType } from "./types";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: UserType | null;
  activeTab: string;
  onDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  activeTab,
  onDelete,
}) => {
  if (!selectedUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedUser.name}</span>?
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">User Name</p>
              <p className="font-medium">{selectedUser.userName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">
                {activeTab === "customers"
                  ? "Customer Name"
                  : activeTab === "vendors"
                  ? "Vendor Name"
                  : "Name"}
              </p>
              <p className="font-medium">{selectedUser.name}</p>
            </div>
          </div>
          {(activeTab === "vendors" || activeTab === "vendorStaff") &&
            selectedUser.storeName && (
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Store Name</p>
                  <p className="font-medium">{selectedUser.storeName}</p>
                </div>
              </div>
            )}
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          {activeTab === 'vendors' ? (
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> Deleting this vendor from Vendors will remove their
              store(s), products and vendor-related info. The account will be kept and converted to
              a <strong>Customer</strong>.
            </p>
          ) : (
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> This action cannot be undone. All user data will be permanently
              deleted. If this user has a vendor side, it will also be deleted.
            </p>
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
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete User</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
