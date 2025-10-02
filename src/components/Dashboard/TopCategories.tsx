import React from "react";
import Card from "../UI/Card";
import { CategoryData } from "./types";

interface TopCategoriesProps {
  topCategories: CategoryData[];
}

const TopCategories: React.FC<TopCategoriesProps> = ({ topCategories }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Top Categories</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {topCategories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {category.name}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${category.value}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {category.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopCategories;
