import React, { useState } from "react";
import {
  Search,
  Filter,
  Truck,
  Plus,
  Eye,
  Package,
  Store,
  MapPin,
  Calendar,
} from "lucide-react";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";

interface Shipment {
  id: number;
  orderId: string;
  vendorName: string;
  customerName: string;
  shippingType: "self" | "marketplace";
  logisticsProvider: string;
  trackingNumber: string;
  status: "pending" | "in_transit" | "delivered" | "failed" | "returned";
  origin: string;
  destination: string;
  weight: number;
  dimensions: string;
  shippingCost: number;
  estimatedDelivery: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

const Shipping: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shippingTypeFilter, setShippingTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("shipments");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const shipments: Shipment[] = [
    {
      id: 1,
      orderId: "ORD-2024-001",
      vendorName: "Fashion Store",
      customerName: "Rahul Kumar",
      shippingType: "self",
      logisticsProvider: "Self Shipping",
      trackingNumber: "SELF-001-2024",
      status: "in_transit",
      origin: "Mumbai, Maharashtra",
      destination: "Delhi, Delhi",
      weight: 2.5,
      dimensions: "30x20x15 cm",
      shippingCost: 150,
      estimatedDelivery: "2024-01-20",
      createdAt: "2024-01-15 10:00:00",
      updatedAt: "2024-01-15 10:00:00",
    },
    {
      id: 2,
      orderId: "ORD-2024-002",
      vendorName: "Electronics Hub",
      customerName: "Priya Patel",
      shippingType: "marketplace",
      logisticsProvider: "DTDC Express",
      trackingNumber: "DTDC-002-2024",
      status: "delivered",
      origin: "Bangalore, Karnataka",
      destination: "Pune, Maharashtra",
      weight: 1.8,
      dimensions: "25x18x12 cm",
      shippingCost: 200,
      estimatedDelivery: "2024-01-18",
      actualDelivery: "2024-01-17",
      createdAt: "2024-01-14 15:30:00",
      updatedAt: "2024-01-17 14:20:00",
    },
  ];

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;
    const matchesShippingType =
      shippingTypeFilter === "all" ||
      shipment.shippingType === shippingTypeFilter;
    return matchesSearch && matchesStatus && matchesShippingType;
  });

  const pendingCount = shipments.filter((s) => s.status === "pending").length;
  const inTransitCount = shipments.filter(
    (s) => s.status === "in_transit"
  ).length;
  const deliveredCount = shipments.filter(
    (s) => s.status === "delivered"
  ).length;
  const totalShipments = shipments.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="warning" size="sm">
            Pending
          </Badge>
        );
      case "in_transit":
        return (
          <Badge variant="info" size="sm">
            In Transit
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="success" size="sm">
            Delivered
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="error" size="sm">
            Failed
          </Badge>
        );
      case "returned":
        return (
          <Badge variant="default" size="sm">
            Returned
          </Badge>
        );
      default:
        return null;
    }
  };

  const getShippingTypeBadge = (type: string) => {
    switch (type) {
      case "self":
        return (
          <Badge variant="info" size="sm">
            Self Shipping
          </Badge>
        );
      case "marketplace":
        return (
          <Badge variant="success" size="sm">
            Marketplace
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleCreateShipment = () => {
    setShowCreateModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const tabs = [
    { id: "shipments", name: "Shipments", icon: Package },
    { id: "logistics", name: "Logistics Providers", icon: Truck },
    { id: "vendors", name: "Vendor Settings", icon: Store },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Shipping Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage shipments, logistics providers, and vendor shipping settings.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreateShipment}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Shipment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {totalShipments}
            </div>
            <div className="text-sm text-gray-500">Total Shipments</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {pendingCount}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {inTransitCount}
            </div>
            <div className="text-sm text-gray-500">In Transit</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {deliveredCount}
            </div>
            <div className="text-sm text-gray-500">Delivered</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </Card>

      {/* Shipments Content */}
      {activeTab === "shipments" && (
        <>
          {/* Filters and Search */}
          <Card>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search shipments..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                    <option value="returned">Returned</option>
                  </select>
                </div>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={shippingTypeFilter}
                  onChange={(e) => setShippingTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="self">Self Shipping</option>
                  <option value="marketplace">Marketplace</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Shipments List */}
          <Card padding={false}>
            <div className="divide-y divide-gray-200">
              {filteredShipments.length === 0 ? (
                <div className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No shipments found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                filteredShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-sm font-medium text-gray-900">
                              {shipment.orderId}
                            </h3>
                            {getStatusBadge(shipment.status)}
                            {getShippingTypeBadge(shipment.shippingType)}
                            <div className="flex items-center space-x-1">
                              <Truck className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {shipment.logisticsProvider}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {formatDate(shipment.createdAt)}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button
                                className="text-gray-400 hover:text-gray-600"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Vendor:</span>
                            <span className="ml-1 text-gray-900">
                              {shipment.vendorName}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Customer:</span>
                            <span className="ml-1 text-gray-900">
                              {shipment.customerName}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Weight:</span>
                            <span className="ml-1 text-gray-900">
                              {shipment.weight} kg
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Cost:</span>
                            <span className="ml-1 text-gray-900">
                              {formatCurrency(shipment.shippingCost)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {shipment.origin} → {shipment.destination}
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Est: {shipment.estimatedDelivery}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      )}

      {/* Create Shipment Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Shipment"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter order ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Type *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="self">Self Shipping</option>
                <option value="marketplace">Marketplace</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Name *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter vendor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter customer name"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Create Shipment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Shipping;
