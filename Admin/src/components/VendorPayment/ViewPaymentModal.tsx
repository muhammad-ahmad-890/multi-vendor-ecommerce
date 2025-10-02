import React from "react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { VendorPayment } from "./types";

interface ViewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPayment: VendorPayment | null;
  onProcessPayment: (payment: VendorPayment) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  getStatusBadge: (
    status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  ) => React.ReactNode;
  getPaymentMethodBadge: (
    method: "bank_transfer" | "paypal" | "stripe" | "check"
  ) => React.ReactNode;
}

const ViewPaymentModal: React.FC<ViewPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPayment,
  onProcessPayment,
  formatCurrency,
  formatDate,
  getStatusBadge,
  getPaymentMethodBadge,
}) => {
  if (!selectedPayment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Details" size="xl">
      <div className="space-y-6">
        {/* Payment Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Payment Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Name
              </label>
              <p className="text-sm text-gray-900">
                {selectedPayment.vendorName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor ID
              </label>
              <p className="text-sm text-gray-900">
                {selectedPayment.vendorId}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-sm text-gray-900">{selectedPayment.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <div className="mt-1">
                {getPaymentMethodBadge(selectedPayment.paymentMethod)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="mt-1">
                {getStatusBadge(selectedPayment.status)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <p className="text-sm text-gray-900">
                {formatDate(selectedPayment.dueDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Financial Details
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gross Amount
              </label>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(selectedPayment.amount)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission
              </label>
              <p className="text-lg font-bold text-red-600">
                -{formatCurrency(selectedPayment.commission)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Net Amount
              </label>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(selectedPayment.netAmount)}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Count
              </label>
              <p className="text-sm text-gray-900">
                {selectedPayment.orderCount} orders
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Sales
              </label>
              <p className="text-sm text-gray-900">
                {formatCurrency(selectedPayment.totalSales)}
              </p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        {selectedPayment.bankDetails && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Bank Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name
                </label>
                <p className="text-sm text-gray-900">
                  {selectedPayment.bankDetails.accountName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <p className="text-sm text-gray-900">
                  {selectedPayment.bankDetails.bankName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <p className="text-sm text-gray-900">
                  {selectedPayment.bankDetails.accountNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Routing Number
                </label>
                <p className="text-sm text-gray-900">
                  {selectedPayment.bankDetails.routingNumber}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {selectedPayment.status === "pending" && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => onProcessPayment(selectedPayment)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Process Payment
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewPaymentModal;
