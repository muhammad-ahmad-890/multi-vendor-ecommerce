import React from "react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Follower } from "./types";

interface FollowerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  follower: Follower | null;
  onSendNotification: (followerId: number) => void;
  onBlockUser: (follower: Follower) => void;
  onUnblockUser: (followerId: number) => void;
  getVendorTypeBadge: (type: "seller" | "buyer" | "both") => React.ReactNode;
  getStatusBadge: (
    status: "active" | "inactive" | "suspended" | "blocked"
  ) => React.ReactNode;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
}

const FollowerDetailsModal: React.FC<FollowerDetailsModalProps> = ({
  isOpen,
  onClose,
  follower,
  onSendNotification,
  onBlockUser,
  onUnblockUser,
  getVendorTypeBadge,
  getStatusBadge,
  formatDate,
  formatCurrency,
}) => {
  if (!follower) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Profile" size="lg">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <img
            className="h-24 w-24 rounded-full object-cover mx-auto mb-4"
            src={follower.avatar}
            alt={follower.name}
          />
          <h3 className="text-xl font-semibold text-gray-900">
            {follower.name}
          </h3>
          <p className="text-gray-600">{follower.email}</p>
          <div className="flex justify-center space-x-4 mt-2">
            {getVendorTypeBadge(follower.vendorType)}
            {getStatusBadge(follower.status)}
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <p className="text-sm text-gray-900">{follower.location}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date
            </label>
            <p className="text-sm text-gray-900">
              {formatDate(follower.joinDate)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stores Followed
            </label>
            <p className="text-sm text-gray-900">
              {follower.storesFollowed} stores
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Orders
            </label>
            <p className="text-sm text-gray-900">
              {follower.totalOrders} orders
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Spent
            </label>
            <p className="text-sm text-gray-900">
              {formatCurrency(follower.totalSpent)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Engagement Rate
            </label>
            <p className="text-sm text-gray-900">{follower.engagementRate}%</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Active
            </label>
            <p className="text-sm text-gray-900">{follower.lastActive}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <p className="text-sm text-gray-900">
              {follower.isBlocked ? "Blocked" : "Not Blocked"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => onSendNotification(follower.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Send Notification
          </button>
          {follower.isBlocked ? (
            <button
              onClick={() => onUnblockUser(follower.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Unblock User
            </button>
          ) : (
            <button
              onClick={() => onBlockUser(follower)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Block User
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FollowerDetailsModal;
