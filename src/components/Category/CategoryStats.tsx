import React from "react";
import Card from "../UI/Card";

interface CategoryStatsProps {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
  totalProducts: number;
}

const CategoryStats: React.FC<CategoryStatsProps> = ({
  totalCategories,
  activeCategories,
  inactiveCategories,
  totalProducts,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {totalCategories}
          </div>
          <div className="text-sm text-gray-500">Total Categories</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {activeCategories}
          </div>
          <div className="text-sm text-gray-500">Active (Current Page)</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {inactiveCategories}
          </div>
          <div className="text-sm text-gray-500">Inactive (Current Page)</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {totalProducts}
          </div>
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-xs text-gray-400 mt-1">(Estimated)</div>
        </div>
      </Card>
    </div>
  );
};

export default CategoryStats;
