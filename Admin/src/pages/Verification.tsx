import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  Clock,
  FileText,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";
import { apiService } from "../services/apiService";
import Toast from "../components/UI/Toast";
import {
  VerificationHeader,
  VerificationFilters,
  VerificationDetailsModal,
  type UnverifiedVendor,
  type ToastState,
} from "../components/Verification";

const Verification: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "PENDING" | "FORM_APPROVED" | "APPROVED" | "REJECTED"
  >("all");
  const [businessTypeFilter, setBusinessTypeFilter] = useState<
    "all" | "individual" | "company" | "partnership"
  >("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<UnverifiedVendor | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">(
    "approve"
  );
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [verificationRequests, setVerificationRequests] = useState<
    UnverifiedVendor[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Changed default limit to 5
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // State for Toast notifications
  const [toast, setToast] = useState<ToastState | null>(null);

  const fetchUnverifiedVendors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await apiService.getUnverifiedVendors({
        page: currentPage,
        limit: itemsPerPage,
      });
      // //console.log("API Response:", response);
      if (response.success) {
        const businessTypes = ["individual", "company", "partnership"];
        const dataWithBusinessTypes = response.data.data.map((vendor) => ({
          ...vendor,
          store: {
            ...vendor.store,
            businessType:
              vendor.store.businessType ||
              businessTypes[Math.floor(Math.random() * businessTypes.length)],
          },
        }));
        setVerificationRequests(dataWithBusinessTypes as UnverifiedVendor[]);
        setTotalItems(response.data.pagination.totalItems);
        setCurrentPage(response.data.pagination.currentPage);
        setTotalPages(response.data.pagination.totalPages);
        //console.log("Fetched Unverified Vendors:", dataWithBusinessTypes);
      } else {
        setError(response.message || "Failed to fetch unverified vendors");
        setToast({
          message: response.message || "Failed to fetch unverified vendors",
          type: "error",
          show: true,
        });
        console.error("API Error:", response.message);
      }
    } catch (err) {
      console.error("Error fetching unverified vendors:", err);
      setError("Failed to fetch unverified vendors.");
      setToast({
        message: "Failed to fetch unverified vendors.",
        type: "error",
        show: true,
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]); // Dependencies for useCallback

  useEffect(() => {
    fetchUnverifiedVendors();
  }, [fetchUnverifiedVendors]); // Dependency for useEffect

  const filteredRequests = verificationRequests.filter((request) => {
    const matchesSearch =
      `${request.store.storeName} ${request.vendor.email} ${request.vendor.mobile}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    let matchesStatus = false;
    if (statusFilter === "all") {
      matchesStatus = true;
    } else if (statusFilter === "PENDING") {
      matchesStatus = request.vendor.status === "PENDING";
    } else if (statusFilter === "FORM_APPROVED") {
      matchesStatus = request.vendor.status === "FORM_APPROVED";
    } else if (statusFilter === "APPROVED") {
      matchesStatus =
        request.vendor.status === "APPROVED" && request.store.isVerified;
    } else if (statusFilter === "REJECTED") {
      matchesStatus = request.vendor.status === "REJECTED";
    }

    const matchesBusinessType =
      businessTypeFilter === "all" ||
      request.store.businessType === businessTypeFilter;
    return matchesSearch && matchesStatus && matchesBusinessType;
  });

  //console.log("Current Verification Requests state:", verificationRequests);
  //console.log("Current Filtered Requests:", filteredRequests);

  //console.log("Pagination debug - loading:", loading, "error:", error, "totalPages:", totalPages);

  // const getStatusBadge = (
  //   request: UnverifiedVendor
  // ) => {
  //   if (request.vendor.status === "PENDING") {
  //       return (
  //         <Badge variant="warning" size="sm">
  //           Form Pending
  //         </Badge>
  //       );
  //   } else if (request.vendor.status === "APPROVED" && request.store.isVerified === false) {
  //     return (
  //       <Badge variant="info" size="sm">
  //         Form Approved
  //       </Badge>
  //     );

  // }else if (request.vendor.status === "APPROVED") {
  //       return (
  //         <Badge variant="info" size="sm">
  //           Approved
  //         </Badge>
  //       );
  //   } else if (request.vendor.status === "REJECTED") {
  //       return (
  //       <Badge variant="error" size="sm">
  //         Rejected
  //         </Badge>
  //       );
  //   } else if (request.vendor.status === "APPROVED" && request.store.isVerified) {
  //       return (
  //         <Badge variant="success" size="sm">
  //           Approved
  //         </Badge>
  //       );
  //   } else {
  //     return null; // Default case if none of the above match
  //   }
  // };
  const getStatusBadge = (request: UnverifiedVendor) => {
    if (request.vendor.status === "PENDING") {
      return (
        <Badge variant="warning" size="sm">
          Form Pending
        </Badge>
      );
    } else if (
      request.vendor.status === "FORM_APPROVED" ||
      (request.vendor.status === "APPROVED" &&
        request.store.isVerified === false)
    ) {
      return (
        <Badge variant="info" size="sm">
          Form Approved
        </Badge>
      );
    } else if (
      request.vendor.status === "APPROVED" &&
      request.store.isVerified
    ) {
      return (
        <Badge variant="success" size="sm">
          Approved
        </Badge>
      );
    } else if (request.vendor.status === "REJECTED") {
      return (
        <Badge variant="error" size="sm">
          Rejected
        </Badge>
      );
    } else {
      return null;
    }
  };

  const getStatusIcon = (request: UnverifiedVendor) => {
    if (request.vendor.status === "PENDING") {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    } else if (
      request.vendor.status === "FORM_APPROVED" ||
      (request.vendor.status === "APPROVED" &&
        request.store.isVerified === false)
    ) {
      return <UserCheck className="h-4 w-4 text-blue-500" />;
    } else if (
      request.vendor.status === "APPROVED" &&
      request.store.isVerified
    ) {
      return <Check className="h-4 w-4 text-green-500" />;
    } else if (request.vendor.status === "REJECTED") {
      return <X className="h-4 w-4 text-red-500" />;
    } else {
      return null;
    }
  };

  const getBusinessTypeBadge = (
    type: "individual" | "company" | "partnership"
  ) => {
    switch (type) {
      case "individual":
        return (
          <Badge variant="default" size="sm">
            Individual
          </Badge>
        );
      case "company":
        return (
          <Badge variant="info" size="sm">
            Company
          </Badge>
        );
      case "partnership":
        return (
          <Badge variant="warning" size="sm">
            Partnership
          </Badge>
        );
      default:
        return null; // No longer need a default 'Individual' as it's assigned randomly or from backend
    }
  };

  const getDocumentStatusBadge = (
    status: "PENDING" | "VERIFIED" | "REJECTED"
  ) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="warning" size="sm">
            Pending
          </Badge>
        );
      case "VERIFIED":
        return (
          <Badge variant="success" size="sm">
            Verified
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="error" size="sm">
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "ID_PROOF":
        return "ID Proof";
      case "BUSINESS_LICENSE":
        return "Business License";
      case "TAX_CERTIFICATE":
        return "Tax Certificate";
      case "BANK_STATEMENT":
        return "Bank Statement";
      case "ADDRESS_PROOF":
        return "Address Proof";
      case "Adharcard":
        return "Adharcard";
      default:
        return type;
    }
  };

  const handleViewRequest = (request: UnverifiedVendor) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const handleReviewRequest = (
    request: UnverifiedVendor,
    action: "approve" | "reject"
  ) => {
    setSelectedRequest(request);
    setReviewAction(action);
    setReviewNotes("");
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedRequest) return;

    setIsSubmittingReview(true);
    try {
      if (reviewAction === "approve") {
        const vendorId = selectedRequest.vendor.id;
        console.log("s",selectedRequest.vendor.status)
        console.log("s",selectedRequest.store.isVerified)

        if (selectedRequest.vendor.status === "PENDING") {
          // Case 1: PENDING → Approve Form
          //console.log("Calling Approve Form API:", { vendorId });
    
          const response = await apiService.approveForm(vendorId);
          if (response.success) {
            setToast({ message: "Form approved successfully!", type: "success", show: true });
          } else {
            setToast({ message: response.message || "Failed to approve form.", type: "error", show: true });
          }
    
        } else if (
          selectedRequest.vendor.status === "FORM_APPROVED" &&
          selectedRequest.store.isVerified === false
        ) {
          // Case 2: APPROVED but not verified → Final Approve
          //console.log("Calling Approve Final API:", { vendorId });
    
          const response = await apiService.approveFinal(vendorId);
          if (response.success) {
            setToast({ message: "Final approval successful!", type: "success", show: true });
          } else {
            setToast({ message: response.message || "Failed to approve final.", type: "error", show: true });
          }
        }
    
      } else if (reviewAction === "reject") {
        // Case 3: Reject Vendor
        const vendorId = selectedRequest.vendor.id;
    
        //console.log("Calling Reject API:", { vendorId });
    
        const res = await apiService.rejectVendor(vendorId);
        if (res.success) {
          setToast({ message: "Request rejected successfully!", type: "success", show: true });
        } else {
          setToast({ message: res.message || "Failed to reject request", type: "error", show: true });
        }
      }
    } catch (error) {
      console.error("Error during review submission:", error);
      setToast({ message: "An error occurred during review submission.", type: "error", show: true });
    } finally {
      setIsSubmittingReview(false);
      setShowReviewModal(false);
      setSelectedRequest(null);
      setReviewNotes("");

      // After submission, re-fetch data to update the table
      fetchUnverifiedVendors();
    }
  };




  const handleDocumentDownload = async (fileUrl: string, documentType: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", documentType + ".pdf"); // Assuming all documents are PDFs for naming
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Failed to download document. Please try again.");
    }
  };

  const handleDocumentView = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // const getStatusIcon = (
  //   request: UnverifiedVendor
  // ) => {
  //   if (request.vendor.status === "PENDING") {
  //       return <Clock className="h-4 w-4 text-yellow-500" />;
  //   } else if (request.vendor.status === "FORM_APPROVED") {
  //       return <UserCheck className="h-4 w-4 text-blue-500" />;
  //   } else if (request.vendor.status === "REJECTED") {
  //       return <X className="h-4 w-4 text-red-500" />;
  //   } else if (request.vendor.status === "APPROVED" && request.store.isVerified) {
  //     return <Check className="h-4 w-4 text-green-500" />;
  //   } else {
  //       return null;
  //   }
  // };

  return (
    <div className="space-y-6">
      {toast && toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <VerificationHeader totalItems={totalItems} />

      {loading && <p>Loadin vendors...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && verificationRequests.length === 0 && (
        <p>No unverified vendors found.</p>
      )}

      {!loading && !error && verificationRequests.length > 0 && (
      <div className="space-y-4">
        {/* Show All Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              statusFilter === "all" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Show All ({verificationRequests.length})
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <button 
            onClick={() => setStatusFilter("PENDING")}
            className={`w-full text-left transition-colors duration-200 ${
              statusFilter === "PENDING" ? "bg-yellow-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Form Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                      verificationRequests.filter(
                        (r) => r.vendor.status === "PENDING"
                      ).length
                  }
                </p>
              </div>
            </div>
          </button>
        </Card>
        <Card>
          <button 
            onClick={() => setStatusFilter("FORM_APPROVED")}
            className={`w-full text-left transition-colors duration-200 ${
              statusFilter === "FORM_APPROVED" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Form Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    verificationRequests.filter(
                        (r) => r.vendor.status === "FORM_APPROVED"
                    ).length
                  }
                </p>
              </div>
            </div>
          </button>
        </Card>
        <Card>
          <button 
            onClick={() => setStatusFilter("APPROVED")}
            className={`w-full text-left transition-colors duration-200 ${
              statusFilter === "APPROVED" ? "bg-green-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                      verificationRequests.filter(
                        (r) => r.vendor.status === "APPROVED" && r.store.isVerified
                      ).length
                  }
                </p>
              </div>
            </div>
          </button>
        </Card>
        <Card>
          <button 
            onClick={() => setStatusFilter("REJECTED")}
            className={`w-full text-left transition-colors duration-200 ${
              statusFilter === "REJECTED" ? "bg-red-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                      verificationRequests.filter((r) => r.vendor.status === "REJECTED")
                      .length
                  }
                </p>
              </div>
            </div>
          </button>
        </Card>
        </div>
      </div>
      )}

      {!loading && !error && (
        <VerificationFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          businessTypeFilter={businessTypeFilter}
          onBusinessTypeFilterChange={setBusinessTypeFilter}
        />
      )}

      {/* Verification Requests Table */}
      {!loading && !error && (
        <>
          {filteredRequests.length > 0 ? (
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
                      {getBusinessTypeBadge(request.store.businessType || "individual")}
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
                                (d: any) => d.status === "APPROVED"
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
                        onClick={() => handleViewRequest(request)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {request.vendor.status === "PENDING" && (
                        <button
                          onClick={() =>
                            handleReviewRequest(request, "approve")
                          }
                          className="text-green-600 hover:text-green-700"
                          title="Approve Form"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleReviewRequest(request, "reject")
                        }
                        className="text-red-600 hover:text-red-700"
                        title="Reject Form"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <Search className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No vendors found
                </h3>
                <p className="text-gray-500 mb-4">
                  {statusFilter !== "all" 
                    ? `No vendors found with status "${statusFilter.toLowerCase().replace('_', ' ')}"`
                    : "No vendors match your current search criteria"
                  }
                </p>
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setSearchTerm("");
                    setBusinessTypeFilter("all");
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </Card>
          )}
        </>
      )}

      {/* Pagination Controls */}
      {!loading && !error && filteredRequests.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when items per page changes
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
          </select>
         
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      <VerificationDetailsModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        selectedRequest={selectedRequest}
        getBusinessTypeBadge={getBusinessTypeBadge}
        getDocumentTypeLabel={getDocumentTypeLabel}
        getDocumentStatusBadge={getDocumentStatusBadge}
        formatDate={formatDate}
        onDocumentView={handleDocumentView}
        onDocumentDownload={handleDocumentDownload}
        onDocumentApprove={async (vendorId: string, documentId: string, notes: string) => {
          const response = await apiService.updateDocumentStatus(vendorId, documentId, "APPROVED", notes);
          if (response.success) {
            setToast({ message: "Document approved successfully!", type: "success", show: true });
          } else {
            setToast({ message: response.message || "Failed to approve document.", type: "error", show: true });
          }
        }}
        onDocumentReject={async (vendorId: string, documentId: string, notes: string) => {
          const response = await apiService.updateDocumentStatus(vendorId, documentId, "REJECTED", notes);
          if (response.success) {
            setToast({ message: "Document rejected successfully!", type: "success", show: true });
          } else {
            setToast({ message: response.message || "Failed to reject document.", type: "error", show: true });
          }
        }}
        onRefreshData={fetchUnverifiedVendors}
      />

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
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

          {selectedRequest && (reviewAction === "reject" || selectedRequest.vendor.status !== "PENDING") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Notes {reviewAction === "reject" && "(Required)"}
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
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
            onClick={() => setShowReviewModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitReview}
            disabled={(reviewAction === "reject" && !reviewNotes.trim()) || isSubmittingReview}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
              reviewAction === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmittingReview ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              reviewAction === "approve" ? "Approve Request" : "Reject Request"
            )}
          </button>
        </div>
      </Modal>

    </div>
  );
};

export default Verification;
