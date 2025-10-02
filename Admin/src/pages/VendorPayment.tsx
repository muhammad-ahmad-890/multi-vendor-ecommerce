import React, { useState } from "react";
import { Clock, Send, CheckCircle, XCircle } from "lucide-react";
import Badge from "../components/UI/Badge";
import {
  VendorPaymentHeader,
  PaymentStats,
  PaymentSummary,
  PaymentTabs,
  PaymentFilters,
  PaymentTable,
  PaymentReports,
  PaymentSettings,
  ViewPaymentModal,
  ProcessPaymentModal,
  type VendorPayment,
} from "../components/VendorPayment";
import type { PaymentSummary as PaymentSummaryInterface } from "../components/VendorPayment/types";

const VendorPayment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "processing" | "completed" | "failed" | "cancelled"
  >("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<
    "all" | "bank_transfer" | "paypal" | "stripe" | "check"
  >("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<VendorPayment | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "payments" | "reports" | "settings"
  >("payments");

  const [vendorPayments] = useState<VendorPayment[]>([
    {
      id: 1,
      vendorName: "Tech Solutions Inc.",
      vendorId: "VEND001",
      email: "payments@techsolutions.com",
      paymentMethod: "bank_transfer",
      amount: 12500.0,
      commission: 1250.0,
      netAmount: 11250.0,
      status: "pending",
      paymentDate: "2024-03-20",
      dueDate: "2024-03-25",
      description: "Payment for March 2024 sales",
      orderCount: 45,
      totalSales: 25000.0,
      bankDetails: {
        accountName: "Tech Solutions Inc.",
        accountNumber: "****1234",
        bankName: "Chase Bank",
        routingNumber: "021000021",
      },
    },
    {
      id: 2,
      vendorName: "Sarah Johnson",
      vendorId: "VEND002",
      email: "sarah.johnson@email.com",
      paymentMethod: "paypal",
      amount: 8500.0,
      commission: 850.0,
      netAmount: 7650.0,
      status: "processing",
      paymentDate: "2024-03-19",
      dueDate: "2024-03-24",
      description: "Payment for March 2024 sales",
      orderCount: 32,
      totalSales: 17000.0,
    },
    {
      id: 3,
      vendorName: "Global Trading Partners",
      vendorId: "VEND003",
      email: "finance@globaltrading.com",
      paymentMethod: "stripe",
      amount: 18900.0,
      commission: 1890.0,
      netAmount: 17010.0,
      status: "completed",
      paymentDate: "2024-03-18",
      dueDate: "2024-03-23",
      description: "Payment for March 2024 sales",
      orderCount: 67,
      totalSales: 37800.0,
    },
    {
      id: 4,
      vendorName: "Digital Marketing Pro",
      vendorId: "VEND004",
      email: "accounts@digitalmarketingpro.com",
      paymentMethod: "bank_transfer",
      amount: 7200.0,
      commission: 720.0,
      netAmount: 6480.0,
      status: "failed",
      paymentDate: "2024-03-17",
      dueDate: "2024-03-22",
      description: "Payment for March 2024 sales",
      orderCount: 28,
      totalSales: 14400.0,
      bankDetails: {
        accountName: "Digital Marketing Pro LLC",
        accountNumber: "****5678",
        bankName: "Wells Fargo",
        routingNumber: "121000248",
      },
    },
    {
      id: 5,
      vendorName: "Mike Chen",
      vendorId: "VEND005",
      email: "mike.chen@email.com",
      paymentMethod: "check",
      amount: 3200.0,
      commission: 320.0,
      netAmount: 2880.0,
      status: "pending",
      paymentDate: "2024-03-16",
      dueDate: "2024-03-21",
      description: "Payment for March 2024 sales",
      orderCount: 15,
      totalSales: 6400.0,
    },
    {
      id: 6,
      vendorName: "Artisan Crafts Co.",
      vendorId: "VEND006",
      email: "payments@artisancrafts.com",
      paymentMethod: "paypal",
      amount: 15600.0,
      commission: 1560.0,
      netAmount: 14040.0,
      status: "completed",
      paymentDate: "2024-03-15",
      dueDate: "2024-03-20",
      description: "Payment for March 2024 sales",
      orderCount: 89,
      totalSales: 31200.0,
    },
  ]);

  const filteredPayments = vendorPayments.filter((payment) => {
    const matchesSearch =
      payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesPaymentMethod =
      paymentMethodFilter === "all" ||
      payment.paymentMethod === paymentMethodFilter;
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const paymentSummary: PaymentSummaryInterface = {
    totalPending: vendorPayments
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.netAmount, 0),
    totalProcessing: vendorPayments
      .filter((p) => p.status === "processing")
      .reduce((sum, p) => sum + p.netAmount, 0),
    totalCompleted: vendorPayments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.netAmount, 0),
    totalFailed: vendorPayments
      .filter((p) => p.status === "failed")
      .reduce((sum, p) => sum + p.netAmount, 0),
    totalAmount: vendorPayments.reduce((sum, p) => sum + p.amount, 0),
    totalCommission: vendorPayments.reduce((sum, p) => sum + p.commission, 0),
    totalNetAmount: vendorPayments.reduce((sum, p) => sum + p.netAmount, 0),
  };

  const getStatusBadge = (
    status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  ) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="warning" size="sm">
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="info" size="sm">
            Processing
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" size="sm">
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="error" size="sm">
            Failed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="default" size="sm">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPaymentMethodBadge = (
    method: "bank_transfer" | "paypal" | "stripe" | "check"
  ) => {
    switch (method) {
      case "bank_transfer":
        return (
          <Badge variant="info" size="sm">
            Bank Transfer
          </Badge>
        );
      case "paypal":
        return (
          <Badge variant="default" size="sm">
            PayPal
          </Badge>
        );
      case "stripe":
        return (
          <Badge variant="success" size="sm">
            Stripe
          </Badge>
        );
      case "check":
        return (
          <Badge variant="warning" size="sm">
            Check
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (
    status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  ) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "processing":
        return <Send className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const handleViewPayment = (payment: VendorPayment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  const handleProcessPayment = (payment: VendorPayment) => {
    setSelectedPayment(payment);
    setShowProcessModal(true);
  };

  const handleConfirmProcess = () => {
    console.log("Processing payment:", selectedPayment?.id);
    setShowProcessModal(false);
    setSelectedPayment(null);
  };

  const handleDownloadReport = () => {
    console.log("Downloading payment report");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <VendorPaymentHeader onDownloadReport={handleDownloadReport} />

      {/* Stats Cards */}
      <PaymentStats
        totalPending={paymentSummary.totalPending}
        totalProcessing={paymentSummary.totalProcessing}
        totalCompleted={paymentSummary.totalCompleted}
        totalFailed={paymentSummary.totalFailed}
        formatCurrency={formatCurrency}
      />

      {/* Summary Cards */}
      <PaymentSummary
        totalAmount={paymentSummary.totalAmount}
        totalCommission={paymentSummary.totalCommission}
        totalNetAmount={paymentSummary.totalNetAmount}
        formatCurrency={formatCurrency}
      />

      {/* Tabs */}
      <PaymentTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div className="space-y-6">
          {/* Filters */}
          <PaymentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            paymentMethodFilter={paymentMethodFilter}
            onPaymentMethodFilterChange={setPaymentMethodFilter}
          />

          {/* Payments Table */}
          <PaymentTable
            payments={filteredPayments}
            onViewPayment={handleViewPayment}
            onProcessPayment={handleProcessPayment}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            getPaymentMethodBadge={getPaymentMethodBadge}
            getStatusIcon={getStatusIcon}
          />
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && <PaymentReports />}

      {/* Settings Tab */}
      {activeTab === "settings" && <PaymentSettings />}

      {/* View Payment Modal */}
      <ViewPaymentModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        selectedPayment={selectedPayment}
        onProcessPayment={handleProcessPayment}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
        getPaymentMethodBadge={getPaymentMethodBadge}
      />

      {/* Process Payment Modal */}
      <ProcessPaymentModal
        isOpen={showProcessModal}
        onClose={() => setShowProcessModal(false)}
        selectedPayment={selectedPayment}
        onConfirmProcess={handleConfirmProcess}
        formatCurrency={formatCurrency}
        getPaymentMethodBadge={getPaymentMethodBadge}
      />
    </div>
  );
};

export default VendorPayment;
