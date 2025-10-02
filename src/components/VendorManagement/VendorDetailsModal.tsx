import React from "react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Vendor } from "./types";

interface VendorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVendor: Vendor | null;
  onEditVendor: (vendor: Vendor) => void;
  formatCurrency: (amount: number) => string;
}

const VendorDetailsModal: React.FC<VendorDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedVendor,
  onEditVendor,
  formatCurrency,
}) => {
  if (!selectedVendor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vendor Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Basic Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.name}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Store Name:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.storeName}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.email}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.phone}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Address:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.address}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Store Statistics</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <Badge
                  variant={
                    selectedVendor.status === "approved"
                      ? "success"
                      : selectedVendor.status === "pending"
                      ? "warning"
                      : selectedVendor.status === "suspended"
                      ? "error"
                      : selectedVendor.status === "blocked"
                      ? "error"
                      : "default"
                  }
                  size="sm"
                >
                  {selectedVendor.status}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-500">Join Date:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.joinDate}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Products:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.products}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Live Streams:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.liveStreams}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Orders:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.totalOrders.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Sales:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {formatCurrency(selectedVendor.totalSales)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Store Setups:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.storeSetups}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Rating:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {selectedVendor.rating}/5.0
                </span>
              </div>
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
          <button
            onClick={() => onEditVendor(selectedVendor)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Edit Vendor
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VendorDetailsModal;
