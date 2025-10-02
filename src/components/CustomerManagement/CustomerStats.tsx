import React from "react";
import Card from "../UI/Card";

const CustomerStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">18,493</div>
          <div className="text-sm text-gray-500">Total Customers</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">17,851</div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">642</div>
          <div className="text-sm text-gray-500">Blocked</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">1,256</div>
          <div className="text-sm text-gray-500">New This Month</div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerStats;
