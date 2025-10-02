import React, { useState } from "react";
import {
  PayoutsHeader,
  PayoutsStats,
  ChartsSection,
  QuickActions,
  PayoutsTable,
  PayoutDetailsModal,
  type Payout,
  type RevenueData,
  type PayoutData,
} from "../components/PayoutsFinancials";

const PayoutsFinancials: React.FC = () => {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const revenueData: RevenueData[] = [
    { name: "Jan", revenue: 65000, commission: 6500 },
    { name: "Feb", revenue: 58000, commission: 5800 },
    { name: "Mar", revenue: 72000, commission: 7200 },
    { name: "Apr", revenue: 68000, commission: 6800 },
    { name: "May", revenue: 81000, commission: 8100 },
    { name: "Jun", revenue: 77000, commission: 7700 },
    { name: "Jul", revenue: 89000, commission: 8900 },
  ];

  const payoutData: PayoutData[] = [
    { name: "Completed", value: 78, color: "#10B981" },
    { name: "Pending", value: 15, color: "#F59E0B" },
    { name: "Processing", value: 7, color: "#3B82F6" },
  ];

  const pendingPayouts: Payout[] = [
    {
      id: 1,
      vendor: "Tech Solutions Inc",
      amount: "$12,450.00",
      commission: "$1,245.00",
      period: "Dec 2023",
      requestDate: "2024-01-05",
      status: "pending",
      vendorEmail: "finance@techsolutions.com",
      bankAccount: "**** **** **** 4532",
    },
    {
      id: 2,
      vendor: "Fashion Hub",
      amount: "$8,920.50",
      commission: "$892.05",
      period: "Dec 2023",
      requestDate: "2024-01-03",
      status: "processing",
      vendorEmail: "payments@fashionhub.com",
      bankAccount: "**** **** **** 7890",
    },
    {
      id: 3,
      vendor: "Home & Garden Store",
      amount: "$15,760.00",
      commission: "$1,576.00",
      period: "Dec 2023",
      requestDate: "2024-01-02",
      status: "pending",
      vendorEmail: "billing@homeandgarden.com",
      bankAccount: "**** **** **** 1234",
    },
    {
      id: 4,
      vendor: "Art & Crafts Corner",
      amount: "$7,890.25",
      commission: "$789.03",
      period: "Dec 2023",
      requestDate: "2024-01-01",
      status: "pending",
      vendorEmail: "money@artcrafts.com",
      bankAccount: "**** **** **** 5678",
    },
  ];

  const columns = [
    { key: "vendor", label: "Vendor", sortable: true },
    { key: "amount", label: "Payout Amount", sortable: true },
    { key: "commission", label: "Commission", sortable: true },
    { key: "period", label: "Period", sortable: true },
    { key: "requestDate", label: "Request Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const handlePayoutAction = (payoutId: number, action: string) => {
    console.log(`${action} payout ${payoutId}`);
    // In a real app, this would make an API call
  };

  const handleViewPayout = (payout: Payout) => {
    setSelectedPayout(payout);
    setShowPayoutModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PayoutsHeader />

      {/* Stats Cards */}
      <PayoutsStats />

      {/* Charts Section */}
      <ChartsSection revenueData={revenueData} payoutData={payoutData} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Pending Payouts Table */}
      <PayoutsTable
        payouts={pendingPayouts}
        onViewPayout={handleViewPayout}
        onPayoutAction={handlePayoutAction}
        columns={columns}
      />

      {/* Payout Details Modal */}
      <PayoutDetailsModal
        isOpen={showPayoutModal}
        onClose={() => setShowPayoutModal(false)}
        payout={selectedPayout}
        onPayoutAction={handlePayoutAction}
      />
    </div>
  );
};

export default PayoutsFinancials;
