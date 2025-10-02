import React from "react";
import { Download } from "lucide-react";

interface VendorPaymentHeaderProps {
  onDownloadReport: () => void;
}

const VendorPaymentHeader: React.FC<VendorPaymentHeaderProps> = ({
  onDownloadReport,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Vendor Payments</h1>
      <div className="flex items-center space-x-3">
        <button
          onClick={onDownloadReport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default VendorPaymentHeader;
