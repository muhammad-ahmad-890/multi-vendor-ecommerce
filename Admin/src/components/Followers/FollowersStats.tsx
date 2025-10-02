import React from "react";
import { Users, Store, Package, Ban } from "lucide-react";
import Card from "../UI/Card";
import { Follower } from "./types";

interface FollowersStatsProps {
  followers: Follower[];
}

const FollowersStats: React.FC<FollowersStatsProps> = ({ followers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">
              {followers.filter((f) => f.status === "active").length}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Store className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">
              Total Store Follows
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {followers.reduce((sum, f) => sum + f.storesFollowed, 0)}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {followers.reduce((sum, f) => sum + f.totalOrders, 0)}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <Ban className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Blocked Users</p>
            <p className="text-2xl font-bold text-gray-900">
              {followers.filter((f) => f.isBlocked).length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FollowersStats;
