import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Modal from "../UI/Modal";

interface BulkActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  selectedCount: number;
  onConfirm: () => void;
}

const BulkActionModal: React.FC<BulkActionModalProps> = ({
  isOpen,
  onClose,
  action,
  selectedCount,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Bulk ${action === "edit" ? "Edit" : "Move to Trash"}`}
    >
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm text-yellow-800">
            Are you sure you want to{" "}
            {action === "edit" ? "edit" : "move to trash"} {selectedCount}{" "}
            selected product(s)?
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center space-x-2 ${
              action === "edit"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {action === "edit" ? (
              <>
                <Edit className="h-4 w-4" />
                <span>Bulk Edit</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Move to Trash</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkActionModal;
