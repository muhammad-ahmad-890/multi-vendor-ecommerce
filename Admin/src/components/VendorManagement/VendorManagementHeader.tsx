import React from "react";

interface VendorManagementHeaderProps {
  totalItems?: number;
}

const VendorManagementHeader: React.FC<VendorManagementHeaderProps> = ({ totalItems }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
      <p className="mt-2 text-gray-600">
        Manage all vendors on your marketplace platform.
        {totalItems !== undefined && (
          <span className="ml-2 font-medium text-blue-600">
            ({totalItems} vendors)
          </span>
        )}
      </p>
    </div>
  );
};

export default VendorManagementHeader;
