import React from "react";
import { Package, Percent } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Category } from "./types";

interface CategoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

const CategoryDetailsModal: React.FC<CategoryDetailsModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      date: formattedDate,
      time: formattedTime,
      isToday: diffDays === 0,
      isYesterday: diffDays === 1,
    };
  };

  if (!category) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Category Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          {category.image && (
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
            <p className="text-gray-600 mt-1">{category.description}</p>
            <div className="flex items-center space-x-4 mt-3">
              <Badge
                variant={category.status === "active" ? "success" : "error"}
              >
                {category.status}
              </Badge>
              <div className="flex items-center space-x-1 text-gray-500">
                <Package className="h-4 w-4" />
                <span>{category.productsCount} products</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                {category.type === "percentage" ? (
                  <Percent className="h-4 w-4" />
                ) : (
                  <span className="text-xs">$</span>
                )}
                <span>
                  {category.commission}
                  {category.type === "percentage" ? "%" : ""} commission
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Category Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Created:</span>
                <div className="mt-1">
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(category.createdAt).date}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    {formatDate(category.createdAt).time}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Last Updated:</span>
                <div className="mt-1">
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(category.updatedAt).date}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    {formatDate(category.updatedAt).time}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Commission:</span>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {category.commission}
                  {category.type === "percentage" ? "%" : ""} ({category.type})
                </span>
              </div>
              {category.parentCategory && (
                <div>
                  <span className="text-sm text-gray-500">
                    Parent Category:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {category.parentCategory}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            View Products
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryDetailsModal;
