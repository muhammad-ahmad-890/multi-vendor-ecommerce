import React from "react";
import { Store, Package, DollarSign, Users } from "lucide-react";
import Card from "../UI/Card";

const QuickActions: React.FC = () => {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
          <Store className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="text-sm font-medium text-gray-900">Approve Vendors</h4>
          <p className="text-xs text-gray-500">3 pending approvals</p>
        </button>
        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
          <Package className="h-6 w-6 text-green-600 mb-2" />
          <h4 className="text-sm font-medium text-gray-900">Review Products</h4>
          <p className="text-xs text-gray-500">12 products pending</p>
        </button>
        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
          <DollarSign className="h-6 w-6 text-yellow-600 mb-2" />
          <h4 className="text-sm font-medium text-gray-900">Process Payouts</h4>
          <p className="text-xs text-gray-500">8 payout requests</p>
        </button>
        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
          <Users className="h-6 w-6 text-purple-600 mb-2" />
          <h4 className="text-sm font-medium text-gray-900">Customer Issues</h4>
          <p className="text-xs text-gray-500">5 support tickets</p>
        </button>
      </div>
    </Card>
  );
};

export default QuickActions;
