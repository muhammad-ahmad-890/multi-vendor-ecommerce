import React, { useState, useEffect, useCallback } from "react";
import {
  Eye,
  ToggleLeft,
  ToggleRight,
  Video,
  Package,
  DollarSign,
} from "lucide-react";
import Badge from "../components/UI/Badge";
import {
  VendorManagementHeader,
  VendorStats,
  VendorFilters,
  VendorTable,
  VendorDetailsModal,
  EditVendorModal,
  type Vendor,
} from "../components/VendorManagement";
import { apiService } from "../services/apiService";
import Toast from "../components/UI/Toast";

const VendorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  
  // Dynamic state
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean } | null>(null);

  // Fetch vendors data
  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getVendorsManagement({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: statusFilter === "all" ? undefined : statusFilter,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      if (response.success) {
        setVendors(response.data.vendors);
        setTotalItems(response.data.pagination.totalItems);
        setCurrentPage(response.data.pagination.currentPage);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError("Failed to fetch vendors");
        setToast({
          message: "Failed to fetch vendors",
          type: "error",
          show: true,
        });
      }
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setError("Failed to fetch vendors");
      setToast({
        message: "Failed to fetch vendors",
        type: "error",
        show: true,
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const columns = [
    { key: "name", label: "Vendor Name", sortable: true },
    { key: "storeName", label: "Store Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "products", label: "Products", sortable: true },
    { key: "liveStreams", label: "Live Streams", sortable: true },
    { key: "totalOrders", label: "Total Orders", sortable: true },
    { key: "totalSales", label: "Total Sales", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  // No need for client-side filtering since API handles it
  const filteredVendors = vendors;

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setShowEditModal(true);
  };

  const handleToggleActive = async (vendor: Vendor) => {
    try {
      const response = await apiService.toggleVendorActiveStatus(vendor.id);
      if (response.success) {
        setToast({
          message: `Store ${vendor.isActive ? 'deactivated' : 'activated'} successfully!`,
          type: "success",
          show: true,
        });
        // Refresh the data
        fetchVendors();
      } else {
        setToast({
          message: response.message || "Failed to toggle vendor status",
          type: "error",
          show: true,
        });
      }
    } catch (error) {
      console.error("Error toggling vendor status:", error);
      setToast({
        message: "Failed to toggle vendor status",
        type: "error",
        show: true,
      });
    }
  };

  const handleEditingVendorChange = (field: string, value: string | number) => {
    if (!editingVendor) return;
    setEditingVendor({ ...editingVendor, [field]: value });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderCell = (vendor: Vendor, column: any) => {
    switch (column.key) {
      case "status":
        return (
          <Badge
            variant={
              vendor.status === "approved"
                ? "success"
                : vendor.status === "pending"
                ? "warning"
                : vendor.status === "suspended"
                ? "error"
                : vendor.status === "blocked"
                ? "error"
                : "default"
            }
          >
            {vendor.status}
          </Badge>
        );
      case "liveStreams":
        return (
          <div className="flex items-center text-sm text-gray-900">
            <Video className="h-4 w-4 text-gray-400 mr-1" />
            {vendor.liveStreams} streams
          </div>
        );
      case "totalOrders":
        return (
          <div className="flex items-center text-sm text-gray-900">
            <Package className="h-4 w-4 text-gray-400 mr-1" />
            {vendor.totalOrders.toLocaleString()} orders
          </div>
        );
      case "totalSales":
        return (
          <div className="flex items-center text-sm text-gray-900">
            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
            {formatCurrency(vendor.totalSales)}
          </div>
        );
      case "products":
        return (
          <div className="flex items-center text-sm text-gray-900">
            <Package className="h-4 w-4 text-gray-400 mr-1" />
            <span>{vendor.products} total</span>
            {vendor.activeProducts > 0 && (
              <span className="ml-1 text-green-600">({vendor.activeProducts} active)</span>
            )}
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedVendor(vendor);
                setShowVendorModal(true);
              }}
              className="text-blue-600 hover:text-blue-700"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleToggleActive(vendor)}
              className={`${vendor.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
              title={vendor.isActive ? "Deactivate Vendor" : "Activate Vendor"}
            >
              {vendor.isActive ? (
                <ToggleRight className="h-4 w-4" />
              ) : (
                <ToggleLeft className="h-4 w-4" />
              )}
            </button>
          </div>
        );
      default:
        return (vendor as any)[column.key];
    }
  };

  // Calculate dynamic stats
  const totalLiveStreams = vendors.reduce(
    (sum, vendor) => sum + vendor.liveStreams,
    0
  );
  const totalOrders = vendors.reduce(
    (sum, vendor) => sum + vendor.totalOrders,
    0
  );
  const totalSales = vendors.reduce(
    (sum, vendor) => sum + vendor.totalSales,
    0
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <VendorManagementHeader totalItems={totalItems} />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading vendors...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={fetchVendors}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && (
        <VendorStats
          totalLiveStreams={totalLiveStreams}
          totalOrders={totalOrders}
          totalSales={totalSales}
          formatCurrency={formatCurrency}
        />
      )}

      {/* Filters and Search */}
      {!loading && !error && (
        <VendorFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      )}

      {/* Vendors Table */}
      {!loading && !error && (
        <>
          {filteredVendors.length > 0 ? (
            <VendorTable
              vendors={filteredVendors}
              columns={columns}
              onViewVendor={(vendor) => {
                setSelectedVendor(vendor);
                setShowVendorModal(true);
              }}
              onEditVendor={handleEditVendor}
              onToggleActive={handleToggleActive}
              formatCurrency={formatCurrency}
              renderCell={renderCell}
            />
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <Package className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No vendors found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "No vendors match your current search criteria"
                  : "No vendors available at the moment"
                }
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!loading && !error && filteredVendors.length > 0 && (
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
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
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

      {/* Vendor Details Modal */}
      <VendorDetailsModal
        isOpen={showVendorModal}
        onClose={() => setShowVendorModal(false)}
        selectedVendor={selectedVendor}
        onEditVendor={handleEditVendor}
        formatCurrency={formatCurrency}
      />

      {/* Edit Vendor Modal */}
      <EditVendorModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        editingVendor={editingVendor}
        onEditingVendorChange={handleEditingVendorChange}
        onSave={() => {
          console.log("Saving vendor changes:", editingVendor);
          setShowEditModal(false);
        }}
      />

    </div>
  );
};

export default VendorManagement;
