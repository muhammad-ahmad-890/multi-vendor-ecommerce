import React from "react";
import Card from "../UI/Card";

const OrderStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">74,329</div>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">58,234</div>
          <div className="text-sm text-gray-500">Delivered</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">12,456</div>
          <div className="text-sm text-gray-500">In Transit</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">3,639</div>
          <div className="text-sm text-gray-500">Processing</div>
        </div>
      </Card>
    </div>
  );
};

export default OrderStats;
