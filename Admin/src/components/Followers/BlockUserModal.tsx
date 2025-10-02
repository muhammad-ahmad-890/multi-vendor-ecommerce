import React from "react";
import Modal from "../UI/Modal";
import { Follower } from "./types";

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  follower: Follower | null;
  blockReason: string;
  onBlockReasonChange: (reason: string) => void;
  onConfirmBlock: () => void;
}

const BlockUserModal: React.FC<BlockUserModalProps> = ({
  isOpen,
  onClose,
  follower,
  blockReason,
  onBlockReasonChange,
  onConfirmBlock,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Block User">
      {follower && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              Are you sure you want to block <strong>{follower.name}</strong>?
              This will prevent them from accessing the platform.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Blocking
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter reason for blocking this user..."
              value={blockReason}
              onChange={(e) => onBlockReasonChange(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirmBlock}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Block User
        </button>
      </div>
    </Modal>
  );
};

export default BlockUserModal;
