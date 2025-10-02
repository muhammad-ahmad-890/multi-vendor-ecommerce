import React from "react";
import { Users, Store, Package, DollarSign } from "lucide-react";
import {
  DashboardHeader,
  StatsCards,
  ChartsSection,
  RecentVendors,
  TopCategories,
  QuickActions,
  type StatCardData,
  type ChartData,
  type Vendor,
  type CategoryData,
} from "../components/Dashboard";

const Dashboard: React.FC = () => {
  const stats: StatCardData[] = [
    {
      title: "Total Vendors",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Store,
      iconBgColor: "bg-blue-500",
    },
    {
      title: "Active Customers",
      value: "18,493",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users,
      iconBgColor: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: "74,329",
      change: "+23.1%",
      changeType: "positive" as const,
      icon: Package,
      iconBgColor: "bg-purple-500",
    },
    {
      title: "Monthly Earnings",
      value: "$892,341",
      change: "-2.4%",
      changeType: "negative" as const,
      icon: DollarSign,
      iconBgColor: "bg-yellow-500",
    },
  ];

  const salesData: ChartData[] = [
    { name: "Jan", sales: 4000, orders: 240 },
    { name: "Feb", sales: 3000, orders: 198 },
    { name: "Mar", sales: 2000, orders: 180 },
    { name: "Apr", sales: 2780, orders: 208 },
    { name: "May", sales: 1890, orders: 147 },
    { name: "Jun", sales: 2390, orders: 189 },
    { name: "Jul", sales: 3490, orders: 251 },
  ];

  const recentVendors: Vendor[] = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      email: "contact@techsolutions.com",
      joinDate: "2024-01-15",
      status: "pending",
      products: 0,
    },
    {
      id: 2,
      name: "Fashion Hub",
      email: "info@fashionhub.com",
      joinDate: "2024-01-14",
      status: "approved",
      products: 45,
    },
    {
      id: 3,
      name: "Home & Garden Store",
      email: "support@homeandgarden.com",
      joinDate: "2024-01-13",
      status: "pending",
      products: 0,
    },
  ];

  const topCategories: CategoryData[] = [
    { name: "Electronics", value: 34.2 },
    { name: "Fashion", value: 28.7 },
    { name: "Home & Garden", value: 18.9 },
    { name: "Sports", value: 12.1 },
    { name: "Books", value: 6.1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts Section */}
      <ChartsSection salesData={salesData} />

      {/* Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vendor Signups */}
        <RecentVendors recentVendors={recentVendors} />

        {/* Top Categories */}
        <TopCategories topCategories={topCategories} />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default Dashboard;
