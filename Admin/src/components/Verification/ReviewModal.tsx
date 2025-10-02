import React from "react";
import { AlertCircle } from "lucide-react";
import Modal from "../UI/Modal";
import { UnverifiedVendor } from "./types";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRequest: UnverifiedVendor | null;
  reviewAction: "approve" | "reject";
  reviewNotes: string;
  onReviewNotesChange: (notes: string) => void;
  onSubmitReview: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  selectedRequest,
  reviewAction,
  reviewNotes,
  onReviewNotesChange,
  onSubmitReview,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${
        reviewAction === "approve" ? "Approve" : "Reject"
      } Verification Request`}
      size="lg"
    >
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-800">
              {reviewAction === "approve"
                ? "Are you sure you want to approve this verification request?"
                : "Are you sure you want to reject this verification request?"}
            </p>
          </div>
        </div>

        {selectedRequest &&
          (reviewAction === "reject" ||
            selectedRequest.vendor.status !== "PENDING") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Notes {reviewAction === "reject" && "(Required)"}
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={reviewNotes}
                onChange={(e) => onReviewNotesChange(e.target.value)}
                placeholder={
                  reviewAction === "approve"
                    ? "Add any notes about the approval (optional)"
                    : "Please provide a reason for rejection"
                }
              />
            </div>
          )}
      </div>

      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSubmitReview}
          disabled={reviewAction === "reject" && !reviewNotes.trim()}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
            reviewAction === "approve"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {reviewAction === "approve" ? "Approve Request" : "Reject Request"}
        </button>
      </div>
    </Modal>
  );
};

export default ReviewModal;
