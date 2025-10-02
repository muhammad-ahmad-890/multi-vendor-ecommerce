import React from "react";
import { Eye, Check, X, FileText, Clock, UserCheck } from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { UnverifiedVendor, VendorDocument } from "./types";

interface VerificationTableProps {
  filteredRequests: UnverifiedVendor[];
  onViewRequest: (request: UnverifiedVendor) => void;
  onReviewRequest: (
    request: UnverifiedVendor,
    action: "approve" | "reject"
  ) => void;
  getStatusBadge: (request: UnverifiedVendor) => React.ReactNode;
  getStatusIcon: (request: UnverifiedVendor) => React.ReactNode;
  getBusinessTypeBadge: (
    type: "individual" | "company" | "partnership"
  ) => React.ReactNode;
  formatDate: (dateString: string) => string;
}

const VerificationTable: React.FC<VerificationTableProps> = ({
  filteredRequests,
  onViewRequest,
  onReviewRequest,
  getStatusBadge,
  getStatusIcon,
  getBusinessTypeBadge,
  formatDate,
}) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.vendor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {request.vendor.firstName} {request.vendor.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {request.vendor.email}
                    </div>
                    <div className="text-xs text-gray-400">
                      {request.vendor.mobile}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {request.store.storeName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getBusinessTypeBadge(
                    request.store.businessType || "individual"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request)}
                    {getStatusBadge(request)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{request.documents?.length || 0} documents</span>
                    </div>
                    {request.documents && (
                      <div className="text-xs text-gray-500 mt-1">
                        {
                          request.documents.filter(
                            (d: VendorDocument) => d.status === "VERIFIED"
                          ).length
                        }{" "}
                        verified
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(request.store.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewRequest(request)}
                      className="text-blue-600 hover:text-blue-700"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {request.vendor.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => onReviewRequest(request, "approve")}
                          className="text-green-600 hover:text-green-700"
                          title="Approve Form"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onReviewRequest(request, "reject")}
                          className="text-red-600 hover:text-red-700"
                          title="Reject Form"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {request.vendor.status === "FORM_APPROVED" && (
                      <>
                        <button
                          onClick={() => onReviewRequest(request, "approve")}
                          className="text-green-600 hover:text-green-700"
                          title="Approve Documents"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onReviewRequest(request, "reject")}
                          className="text-red-600 hover:text-red-700"
                          title="Reject Documents"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {request.vendor.status === "APPROVED" &&
                      request.store.isVerified === true && (
                        <button
                          onClick={() => onReviewRequest(request, "reject")}
                          className="text-red-600 hover:text-red-700"
                          title="Reject Final Approval"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default VerificationTable;
