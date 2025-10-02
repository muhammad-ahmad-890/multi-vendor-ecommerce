import React, { useState } from "react";
import { FileText, Eye, Download, Check, X, User, Store, AlertCircle } from "lucide-react";
import Modal from "../UI/Modal";
import { UnverifiedVendor, VendorDocument } from "./types";

interface VerificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRequest: UnverifiedVendor | null;
  getBusinessTypeBadge: (
    type: "individual" | "company" | "partnership"
  ) => React.ReactNode;
  getDocumentTypeLabel: (type: string) => string;
  getDocumentStatusBadge: (
    status: "PENDING" | "VERIFIED" | "REJECTED"
  ) => React.ReactNode;
  formatDate: (dateString: string) => string;
  onDocumentView: (fileUrl: string) => void;
  onDocumentDownload: (fileUrl: string, documentType: string) => void;
  onDocumentApprove: (vendorId: string, documentId: string, notes: string) => Promise<void>;
  onDocumentReject: (vendorId: string, documentId: string, notes: string) => Promise<void>;
  onRefreshData: () => void;
}

const VerificationDetailsModal: React.FC<VerificationDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedRequest,
  getBusinessTypeBadge,
  getDocumentTypeLabel,
  getDocumentStatusBadge,
  formatDate,
  onDocumentView,
  onDocumentDownload,
  onDocumentApprove,
  onDocumentReject,
  onRefreshData,
}) => {
  const [showDocumentReviewModal, setShowDocumentReviewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<VendorDocument | null>(null);
  const [documentReviewNotes, setDocumentReviewNotes] = useState("");
  const [documentReviewAction, setDocumentReviewAction] = useState<"approve" | "reject">("approve");
  const [isSubmittingDocumentReview, setIsSubmittingDocumentReview] = useState(false);

  const handleDocumentReviewClick = (document: VendorDocument, action: "approve" | "reject") => {
    setSelectedDocument(document);
    setDocumentReviewAction(action);
    setDocumentReviewNotes("");
    setShowDocumentReviewModal(true);
  };

  const handleSubmitDocumentReview = async () => {
    if (!selectedRequest || !selectedDocument) return;

    setIsSubmittingDocumentReview(true);
    try {
      if (documentReviewAction === "approve") {
        await onDocumentApprove(selectedRequest.vendor.id, selectedDocument.id, documentReviewNotes);
      } else {
        await onDocumentReject(selectedRequest.vendor.id, selectedDocument.id, documentReviewNotes);
      }
      
      // Close both modals and refresh data
      setShowDocumentReviewModal(false);
      onClose(); // Close the main detail modal
      onRefreshData();
    } catch (error) {
      console.error(`Error ${documentReviewAction}ing document:`, error);
    } finally {
      setIsSubmittingDocumentReview(false);
      setSelectedDocument(null);
      setDocumentReviewNotes("");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Verification Request Details"
        size="xl"
      >
        {selectedRequest && (
          <div className="space-y-6">
            {/* Vendor and Store Information Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vendor Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Vendor Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRequest.vendor.firstName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRequest.vendor.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRequest.vendor.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRequest.vendor.mobile}
                    </p>
                  </div>
                </div>
              </div>

              {/* Store Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <Store className="h-5 w-5 mr-2" />
                  Store Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRequest.store.storeName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type
                    </label>
                    <div className="mt-1">
                      {selectedRequest.store.businessType ? getBusinessTypeBadge(selectedRequest.store.businessType) : null}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Address
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRequest.store.street}, {selectedRequest.store.city}, {selectedRequest.store.state}, {selectedRequest.store.country} - {selectedRequest.store.pinCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Social Media & Links
              </h3>
              <div className="text-sm text-gray-700">
                No social media links available.
              </div>
            </div>

            {/* Documents */}
            {selectedRequest.vendor.status === "FORM_APPROVED" && (
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Documents Review
                </h3>
                {selectedRequest.documents && selectedRequest.documents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedRequest.documents.map((document: VendorDocument) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {getDocumentTypeLabel(document.documentType as any)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {document.documentType}
                            </p>
                            {document.reason && (
                              <p className="text-xs text-red-500 mt-1">
                                Reason: {document.reason}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getDocumentStatusBadge(document.status as any)}
                          <button
                            onClick={() => onDocumentView(document.fileUrl)}
                            className="text-blue-600 hover:text-blue-700"
                            title="View Document"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDocumentDownload(document.fileUrl, document.documentType)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDocumentReviewClick(document, "approve")}
                            className="text-green-600 hover:text-green-700"
                            title="Approve Document"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDocumentReviewClick(document, "reject")}
                            className="text-red-600 hover:text-red-700"
                            title="Reject Document"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">Document Pending</p>
                    <p className="text-gray-400 text-sm mt-2">
                      No documents have been uploaded yet. Waiting for vendor to submit documents.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Review Information */}
            {selectedRequest.store.reason && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Review Notes
                </h3>
                <p className="text-sm text-gray-700">
                  {selectedRequest.store.reason}
                </p>
                {selectedRequest.store.isVerified && (
                  <div className="mt-2 text-xs text-gray-500">
                    Reviewed by Admin on{" "}
                    {selectedRequest.store.updatedAt &&
                      formatDate(selectedRequest.store.updatedAt)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Document Review Modal */}
      <Modal
        isOpen={showDocumentReviewModal}
        onClose={() => setShowDocumentReviewModal(false)}
        title={`${documentReviewAction === "approve" ? "Approve" : "Reject"} Document`}
        size="md"
      >
        <div className="space-y-4">
          {selectedDocument && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Document Details</h4>
              <p className="text-sm text-gray-700">
                <strong>Type:</strong> {getDocumentTypeLabel(selectedDocument.documentType as any)}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> {selectedDocument.status}
              </p>
            </div>
          )}
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
              <p className="text-sm text-yellow-800">
                {documentReviewAction === "approve"
                  ? "Are you sure you want to approve this document?"
                  : "Are you sure you want to reject this document?"}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Notes {documentReviewAction === "reject" && "(Required)"}
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              value={documentReviewNotes}
              onChange={(e) => setDocumentReviewNotes(e.target.value)}
              placeholder={
                documentReviewAction === "approve"
                  ? "Add any notes about the approval (optional)"
                  : "Please provide a reason for rejection"
              }
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowDocumentReviewModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitDocumentReview}
            disabled={documentReviewAction === "reject" && !documentReviewNotes.trim() || isSubmittingDocumentReview}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
              documentReviewAction === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmittingDocumentReview ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              documentReviewAction === "approve" ? "Approve Document" : "Reject Document"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default VerificationDetailsModal;
