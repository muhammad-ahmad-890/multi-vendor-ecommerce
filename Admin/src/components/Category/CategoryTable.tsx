import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  Package,
  Percent,
  Image as ImageIcon,
} from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import Table from "../UI/Table";
import { Category } from "./types";

interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  searchTerm: string;
  statusFilter: string;
  onViewCategory: (category: Category) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isLoading,
  searchTerm,
  statusFilter,
  onViewCategory,
  onEditCategory,
  onDeleteCategory,
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

  const columns = [
    { key: "image", label: "Image", sortable: false },
    { key: "name", label: "Category Name", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "commission", label: "Commission", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "productsCount", label: "Products", sortable: true },
    { key: "createdAt", label: "Created", sortable: true },
    { key: "updatedAt", label: "Updated", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const renderCell = (
    category: Category,
    column: { key: string; label: string; sortable?: boolean }
  ) => {
    switch (column.key) {
      case "image":
        return (
          <div className="flex items-center">
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12 object-cover rounded-lg border border-gray-200 cursor-pointer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkMxMiAxNC4zNDMxIDEzLjM0MzEgMTMgMTUgMTNIMzNDMzQuNjU2OSAxMyAzNiAxNC4zNDMxIDM2IDE2VjMyQzM2IDMzLjY1NjkgMzQuNjU2OSAzNSAzMyAzNUgxNUMxMy4zNDMxIDM1IDEyIDMzLjY1NjkgMTIgMzJWMTZaIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxOEMxNiAxNi44OTU0IDE2Ljg5NTQgMTYgMTggMTZIMzBDMzEuMTA0NiAxNiAzMiAxNi44OTU0IDMyIDE4VjMwQzMyIDMxLjEwNDYgMzEuMTA0NiAzMiAzMCAzMkgxOEMxNi44OTU0IDMyIDE2IDMxLjEwNDYgMTYgMzBWMThaIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMkMyMCAyMC44OTU0IDIwLjg5NTQgMjAgMjIgMjBIMjZDMjcuMTA0NiAyMCAyOCAyMC44OTU0IDI4IDIyVjI2QzI4IDI3LjEwNDYgMjcuMTA0NiAyOCAyNiAyOEgyMkMyMC44OTU0IDI4IDIwIDI3LjEwNDYgMjAgMjZWMjJaIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=";
                }}
                onClick={() => onViewCategory(category)}
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        );
      case "description":
        return (
          <span title={category.description}>
            {category.description.length > 20
              ? category.description.slice(0, 20) + "..."
              : category.description}
          </span>
        );
      case "commission":
        return (
          <div className="flex items-center space-x-2">
            {category.type === "percentage" ? (
              <Percent className="h-4 w-4 text-gray-400" />
            ) : (
              <span className="text-xs text-gray-400">$</span>
            )}
            <span className="text-sm font-medium text-gray-900">
              {category.commission}
              {category.type === "percentage" ? "%" : ""}
            </span>
          </div>
        );
      case "status":
        return (
          <Badge variant={category.status === "active" ? "success" : "error"}>
            {category.status}
          </Badge>
        );
      case "productsCount":
        return (
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-gray-400" />
            <span>{category.productsCount}</span>
          </div>
        );
      case "createdAt":
        const createdDate = formatDate(category.createdAt);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {createdDate.date}
            </span>
            <span className="text-xs text-gray-500">{createdDate.time}</span>
          </div>
        );
      case "updatedAt":
        const updatedDate = formatDate(category.updatedAt);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {updatedDate.date}
            </span>
            <span className="text-xs text-gray-500">{updatedDate.time}</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewCategory(category)}
              className="text-blue-600 hover:text-blue-700"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEditCategory(category)}
              className="text-green-600 hover:text-green-700"
              title="Edit Category"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDeleteCategory(category)}
              className="text-red-600 hover:text-red-700"
              title="Delete Category"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      default:
        return String((category as any)[column.key] || "");
    }
  };

  return (
    <Card padding={false}>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading categories...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No categories found
          </h3>
          <p className="text-gray-500 text-center">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first category."}
          </p>
        </div>
      ) : (
        <Table columns={columns} data={categories} renderCell={renderCell} />
      )}
    </Card>
  );
};

export default CategoryTable;
