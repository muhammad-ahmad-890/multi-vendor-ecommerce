import React from "react";

interface VerificationHeaderProps {
  totalItems: number;
}

const VerificationHeader: React.FC<VerificationHeaderProps> = ({ totalItems }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">
        Vendor Verification
      </h1>
      <div className="flex items-center space-x-3">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{totalItems}</span>{" "}
          total requests
        </div>
      </div>
    </div>
  );
};

export default VerificationHeader;
