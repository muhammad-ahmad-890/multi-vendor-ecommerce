import React from "react";
import { Eye, Edit, Trash2, Store, User, Tag, Clock } from "lucide-react";
import Card from "../UI/Card";
import Table from "../UI/Table";
import Badge from "../UI/Badge";
import { Product } from "./types";

interface ProductsTableProps {
  products: Product[];
  selectedProducts: number[];
  onProductSelect: (productId: number) => void;
  onSelectAll: () => void;
  onProductClick: (product: Product) => void;
  columns: any[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  selectedProducts,
  onProductSelect,
  onSelectAll,
  onProductClick,
  columns,
}) => {
  const renderCell = (product: Product, column: any) => {
    switch (column.key) {
      case "name":
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => onProductSelect(product.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <img
              src={product.image}
              alt={product.name}
              className="w-10 h-10 rounded-lg object-cover cursor-pointer"
              onClick={() => onProductClick(product)}
            />
            <span
              className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
              onClick={() => onProductClick(product)}
            >
              {product.name}
            </span>
          </div>
        );
      case "store":
        return (
          <div className="flex items-center space-x-2">
            <Store className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900">{product.store}</span>
          </div>
        );
      case "publisher":
        return (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900">{product.publisher}</span>
          </div>
        );
      case "salePrice":
        return (
          <span className="text-sm font-medium text-green-600">
            {product.salePrice}
          </span>
        );
      case "discountPrice":
        return (
          <span className="text-sm font-medium text-red-600">
            {product.discountPrice}
          </span>
        );
      case "variations":
        return (
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900">{product.variations}</span>
          </div>
        );
      case "stock":
        return (
          <span
            className={
              product.stock === 0 ? "text-red-600 font-medium" : "text-gray-900"
            }
          >
            {product.stock}
          </span>
        );
      case "status":
        return (
          <Badge
            variant={
              product.status === "approved"
                ? "success"
                : product.status === "pending"
                ? "warning"
                : product.status === "rejected"
                ? "error"
                : "default"
            }
          >
            {product.status}
          </Badge>
        );
      case "createdDate":
        return (
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900">{product.createdDate}</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onProductClick(product)}
              className="text-blue-600 hover:text-blue-700"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button className="text-gray-600 hover:text-gray-700" title="Edit">
              <Edit className="h-4 w-4" />
            </button>
            <button
              className="text-red-600 hover:text-red-700"
              title="Move to Trash"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      default:
        return product[column.key as keyof Product];
    }
  };

  return (
    <Card padding={false}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={
                selectedProducts.length === products.length && products.length > 0
              }
              onChange={onSelectAll}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              Select All ({products.length} products)
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {products.length} products found
          </span>
        </div>
      </div>
      <Table columns={columns} data={products} renderCell={renderCell} />
    </Card>
  );
};

export default ProductsTable;
