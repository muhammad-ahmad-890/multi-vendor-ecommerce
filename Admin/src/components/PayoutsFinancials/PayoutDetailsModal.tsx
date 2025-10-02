import React from "react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Payout } from "./types";

interface PayoutDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  payout: Payout | null;
  onPayoutAction: (payoutId: number, action: string) => void;
}

const PayoutDetailsModal: React.FC<PayoutDetailsModalProps> = ({
  isOpen,
  onClose,
  payout,
  onPayoutAction,
}) => {
  if (!payout) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payout Request Details"
      size="lg"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Vendor Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Vendor Name:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {payout.vendor}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {payout.vendorEmail}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Bank Account:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {payout.bankAccount}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Payout Details</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Period:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {payout.period}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Request Date:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {payout.requestDate}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <Badge
                  variant={
                    payout.status === "processing"
                      ? "info"
                      : payout.status === "pending"
                      ? "warning"
                      : "default"
                  }
                  size="sm"
                >
                  {payout.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Financial Breakdown
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Gross Sales:</span>
                <span className="text-sm font-medium text-gray-900">
                  $
                  {(
                    parseFloat(
                      payout.amount.replace("$", "").replace(",", "")
                    ) +
                    parseFloat(
                      payout.commission.replace("$", "").replace(",", "")
                    )
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Platform Commission (10%):
                </span>
                <span className="text-sm text-red-600">
                  -{payout.commission}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Net Payout:
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {payout.amount}
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
          {payout.status === "pending" && (
            <>
              <button
                onClick={() => onPayoutAction(payout.id, "reject")}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => onPayoutAction(payout.id, "approve")}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Approve Payout
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PayoutDetailsModal;
