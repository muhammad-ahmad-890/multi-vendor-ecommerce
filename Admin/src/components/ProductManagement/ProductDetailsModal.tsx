import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Product } from "./types";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Product Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <span className="ml-2 text-sm text-gray-900">{product.name}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Store:</span>
                <span className="ml-2 text-sm text-gray-900">{product.store}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Publisher:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {product.publisher}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Category:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {product.category}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Original Price:</span>
                <span className="ml-2 text-sm text-gray-900">{product.price}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Sale Price:</span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {product.salePrice}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Discount Price:</span>
                <span className="ml-2 text-sm font-medium text-red-600">
                  {product.discountPrice}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Variations:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {product.variations}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Stock:</span>
                <span
                  className={`ml-2 text-sm font-medium ${
                    product.stock === 0 ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  {product.stock}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
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
                  size="sm"
                >
                  {product.status}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-500">Created:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {product.createdDate}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center space-x-2">
            <Trash2 className="h-4 w-4" />
            <span>Move to Trash</span>
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Product</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
