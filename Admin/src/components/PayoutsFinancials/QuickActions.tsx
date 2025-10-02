import React from "react";
import { DollarSign, TrendingUp, AlertCircle, CreditCard } from "lucide-react";

const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
        <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
        <h4 className="text-sm font-medium text-blue-900">
          Process All Pending
        </h4>
        <p className="text-xs text-blue-700">8 payouts ready</p>
      </button>
      <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left">
        <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
        <h4 className="text-sm font-medium text-green-900">Export Reports</h4>
        <p className="text-xs text-green-700">Download financial data</p>
      </button>
      <button className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors text-left">
        <AlertCircle className="h-6 w-6 text-yellow-600 mb-2" />
        <h4 className="text-sm font-medium text-yellow-900">Review Disputes</h4>
        <p className="text-xs text-yellow-700">2 pending reviews</p>
      </button>
      <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
        <CreditCard className="h-6 w-6 text-purple-600 mb-2" />
        <h4 className="text-sm font-medium text-purple-900">
          Update Commission
        </h4>
        <p className="text-xs text-purple-700">Adjust rates</p>
      </button>
    </div>
  );
};

export default QuickActions;
