import React from "react";
import { Search, Filter } from "lucide-react";

interface VerificationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "PENDING" | "FORM_APPROVED" | "APPROVED" | "REJECTED";
  onStatusFilterChange: (value: "all" | "PENDING" | "FORM_APPROVED" | "APPROVED" | "REJECTED") => void;
  businessTypeFilter: "all" | "individual" | "company" | "partnership";
  onBusinessTypeFilterChange: (value: "all" | "individual" | "company" | "partnership") => void;
}

const VerificationFilters: React.FC<VerificationFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  businessTypeFilter,
  onBusinessTypeFilterChange,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
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
                | "PENDING"
                | "FORM_APPROVED"
                | "APPROVED"
                | "REJECTED"
            )
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="PENDING">Form Pending</option>
          <option value="FORM_APPROVED">Form Approved</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <select
          value={businessTypeFilter}
          onChange={(e) =>
            onBusinessTypeFilterChange(
              e.target.value as
                | "all"
                | "individual"
                | "company"
                | "partnership"
            )
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="individual">Individual</option>
          <option value="company">Company</option>
          <option value="partnership">Partnership</option>
        </select>
      </div>
    </div>
  );
};

export default VerificationFilters;
