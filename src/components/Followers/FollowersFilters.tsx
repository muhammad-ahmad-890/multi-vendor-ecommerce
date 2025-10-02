import React from "react";
import { Search, Filter } from "lucide-react";

interface FollowersFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "active" | "inactive" | "suspended" | "blocked";
  onStatusFilterChange: (
    value: "all" | "active" | "inactive" | "suspended" | "blocked"
  ) => void;
  vendorTypeFilter: "all" | "seller" | "buyer" | "both";
  onVendorTypeFilterChange: (
    value: "all" | "seller" | "buyer" | "both"
  ) => void;
}

const FollowersFilters: React.FC<FollowersFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  vendorTypeFilter,
  onVendorTypeFilterChange,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(
              e.target.value as
                | "all"
                | "active"
                | "inactive"
                | "suspended"
                | "blocked"
            )
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <select
          value={vendorTypeFilter}
          onChange={(e) =>
            onVendorTypeFilterChange(
              e.target.value as "all" | "seller" | "buyer" | "both"
            )
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="seller">Sellers</option>
          <option value="buyer">Buyers</option>
          <option value="both">Both</option>
        </select>
      </div>
    </div>
  );
};

export default FollowersFilters;
