import React from "react";
import { AlertCircle } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { VendorPayment } from "./types";

interface ProcessPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPayment: VendorPayment | null;
  onConfirmProcess: () => void;
  formatCurrency: (amount: number) => string;
  getPaymentMethodBadge: (
    method: "bank_transfer" | "paypal" | "stripe" | "check"
  ) => React.ReactNode;
}

const ProcessPaymentModal: React.FC<ProcessPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPayment,
  onConfirmProcess,
  formatCurrency,
  getPaymentMethodBadge,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Process Payment" size="lg">
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-400 mr-2" />
            <p className="text-sm text-blue-800">
              Are you sure you want to process the payment for{" "}
              <strong>{selectedPayment?.vendorName}</strong>?
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Payment Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Net Amount:</span>
              <span className="text-sm font-medium text-gray-900">
                {selectedPayment && formatCurrency(selectedPayment.netAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Method:</span>
              <span className="text-sm font-medium text-gray-900">
                {selectedPayment &&
                  getPaymentMethodBadge(selectedPayment.paymentMethod)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirmProcess}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Process Payment
        </button>
      </div>
    </Modal>
  );
};

export default ProcessPaymentModal;
