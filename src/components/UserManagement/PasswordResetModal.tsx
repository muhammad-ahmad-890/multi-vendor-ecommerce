import React from "react";
import { Key } from "lucide-react";
import Modal from "../UI/Modal";
import { User } from "./types";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | null;
  onResetPassword: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  onResetPassword,
}) => {
  if (!selectedUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Password Reset">
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Are you sure you want to reset the password for{" "}
              <span className="font-medium">{selectedUser.name}</span>?
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onResetPassword}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <Key className="h-4 w-4" />
            <span>Reset Password</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordResetModal;
