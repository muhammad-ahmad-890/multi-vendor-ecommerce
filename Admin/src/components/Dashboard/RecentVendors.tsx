import React from "react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { Vendor } from "./types";

interface RecentVendorsProps {
  recentVendors: Vendor[];
}

const RecentVendors: React.FC<RecentVendorsProps> = ({ recentVendors }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Recent Vendor Signups
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {recentVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">
                {vendor.name}
              </h4>
              <p className="text-xs text-gray-500">{vendor.email}</p>
              <p className="text-xs text-gray-500">Joined: {vendor.joinDate}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={vendor.status === "approved" ? "success" : "warning"}
                size="sm"
              >
                {vendor.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentVendors;
