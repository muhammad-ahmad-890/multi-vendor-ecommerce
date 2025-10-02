import React from "react";
import {
  Eye,
  UserPlus,
  UserMinus,
  Mail,
  MapPin,
  Store,
  Package,
  Ban,
  CheckCircle,
} from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { Follower } from "./types";

interface FollowersTableProps {
  followers: Follower[];
  onViewFollower: (follower: Follower) => void;
  onSuspendUser: (followerId: number) => void;
  onActivateUser: (followerId: number) => void;
  onBlockUser: (follower: Follower) => void;
  onUnblockUser: (followerId: number) => void;
  onSendNotification: (followerId: number) => void;
  getStatusBadge: (
    status: "active" | "inactive" | "suspended" | "blocked"
  ) => React.ReactNode;
  getVendorTypeBadge: (type: "seller" | "buyer" | "both") => React.ReactNode;
  formatCurrency: (amount: number) => string;
}

const FollowersTable: React.FC<FollowersTableProps> = ({
  followers,
  onViewFollower,
  onSuspendUser,
  onActivateUser,
  onBlockUser,
  onUnblockUser,
  onSendNotification,
  getStatusBadge,
  getVendorTypeBadge,
  formatCurrency,
}) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stores Followed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engagement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {followers.map((follower) => (
              <tr key={follower.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={follower.avatar}
                      alt={follower.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {follower.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {follower.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatCurrency(follower.totalSpent)} spent
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getVendorTypeBadge(follower.vendorType)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Store className="h-4 w-4 text-gray-400 mr-1" />
                    {follower.storesFollowed} stores
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Package className="h-4 w-4 text-gray-400 mr-1" />
                    {follower.totalOrders} orders
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    {follower.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(follower.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${follower.engagementRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {follower.engagementRate}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewFollower(follower)}
                      className="text-blue-600 hover:text-blue-700"
                      title="View Profile"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onSendNotification(follower.id)}
                      className="text-green-600 hover:text-green-700"
                      title="Send Notification"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    {follower.isBlocked ? (
                      <button
                        onClick={() => onUnblockUser(follower.id)}
                        className="text-green-600 hover:text-green-700"
                        title="Unblock User"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onBlockUser(follower)}
                        className="text-red-600 hover:text-red-700"
                        title="Block User"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                    )}
                    {follower.status === "active" ? (
                      <button
                        onClick={() => onSuspendUser(follower.id)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Suspend User"
                      >
                        <UserMinus className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onActivateUser(follower.id)}
                        className="text-green-600 hover:text-green-700"
                        title="Activate User"
                      >
                        <UserPlus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default FollowersTable;
