import React from "react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Customer } from "./types";

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  if (!customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Customer Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.name}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.email}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.phone}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Address:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.address}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Account Statistics
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <Badge
                  variant={customer.status === "active" ? "success" : "error"}
                  size="sm"
                >
                  {customer.status}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  Registration Date:
                </span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.registrationDate}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Orders:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.orders}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Spent:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.totalSpent}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Last Order:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {customer.lastOrder}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Recent Order History
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Order #12345
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  - Jan 12, 2024
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">$89.99</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Order #12344
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  - Jan 08, 2024
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">$156.50</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Order #12343
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  - Dec 28, 2023
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">$234.75</span>
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
            View All Orders
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailsModal;
