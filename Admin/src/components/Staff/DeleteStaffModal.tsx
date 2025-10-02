import React from "react";
import Modal from "../UI/Modal";
import { Staff } from "./types";

interface DeleteStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletingStaff: Staff | null;
  onConfirmDelete: () => void;
}

const DeleteStaffModal: React.FC<DeleteStaffModalProps> = ({
  isOpen,
  onClose,
  deletingStaff,
  onConfirmDelete,
}) => {
  if (!deletingStaff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Staff Member">
      <div className="space-y-4">
        <p className="text-gray-600">
          Are you sure you want to delete <strong>{deletingStaff.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">
            This will permanently remove the staff member and all associated
            data from the system.
          </p>
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
          onClick={onConfirmDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Delete Staff
        </button>
      </div>
    </Modal>
  );
};

export default DeleteStaffModal;
