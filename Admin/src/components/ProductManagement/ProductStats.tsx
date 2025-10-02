import React from "react";
import Card from "../UI/Card";

const ProductStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">74,329</div>
          <div className="text-sm text-gray-500">Total Products</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">68,945</div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">4,234</div>
          <div className="text-sm text-gray-500">Pending Review</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">1,150</div>
          <div className="text-sm text-gray-500">Out of Stock</div>
        </div>
      </Card>
    </div>
  );
};

export default ProductStats;
