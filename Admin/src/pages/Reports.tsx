import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface ReportData {
  id: number;
  name: string;
  type:
    | "sales"
    | "revenue"
    | "orders"
    | "users"
    | "products"
    | "vendors"
    | "custom";
  format: "pdf" | "excel" | "csv" | "json";
  dateRange: string;
  status: "completed" | "processing" | "failed";
  createdAt: string;
  fileSize?: string;
  downloadUrl?: string;
}

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalVendors: number;
  revenueGrowth: number;
  orderGrowth: number;
  userGrowth: number;
  productGrowth: number;
  averageOrderValue: number;
  conversionRate: number;
  topSellingCategory: string;
  topPerformingVendor: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
  }[];
}

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "sales" | "users" | "products" | "vendors" | "custom"
  >("overview");
  const [dateRange, setDateRange] = useState<
    "7d" | "30d" | "90d" | "1y" | "custom"
  >("30d");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<
    "sales" | "revenue" | "orders" | "users" | "products" | "vendors" | "custom"
  >("sales");

  const [reports] = useState<ReportData[]>([
    {
      id: 1,
      name: "Monthly Sales Report - March 2024",
      type: "sales",
      format: "pdf",
      dateRange: "Mar 1 - Mar 31, 2024",
      status: "completed",
      createdAt: "2024-03-31",
      fileSize: "2.4 MB",
      downloadUrl: "#",
    },
    {
      id: 2,
      name: "Revenue Analytics Q1 2024",
      type: "revenue",
      format: "excel",
      dateRange: "Jan 1 - Mar 31, 2024",
      status: "completed",
      createdAt: "2024-03-31",
      fileSize: "1.8 MB",
      downloadUrl: "#",
    },
    {
      id: 3,
      name: "User Growth Report",
      type: "users",
      format: "csv",
      dateRange: "Mar 1 - Mar 31, 2024",
      status: "completed",
      createdAt: "2024-03-30",
      fileSize: "856 KB",
      downloadUrl: "#",
    },
    {
      id: 4,
      name: "Product Performance Analysis",
      type: "products",
      format: "pdf",
      dateRange: "Mar 1 - Mar 31, 2024",
      status: "processing",
      createdAt: "2024-03-30",
    },
    {
      id: 5,
      name: "Vendor Performance Report",
      type: "vendors",
      format: "excel",
      dateRange: "Mar 1 - Mar 31, 2024",
      status: "failed",
      createdAt: "2024-03-29",
    },
    {
      id: 6,
      name: "Custom Analytics Report",
      type: "custom",
      format: "json",
      dateRange: "Mar 15 - Mar 31, 2024",
      status: "completed",
      createdAt: "2024-03-28",
      fileSize: "3.2 MB",
      downloadUrl: "#",
    },
  ]);

  const analytics: AnalyticsData = {
    totalRevenue: 2845000.0,
    totalOrders: 45678,
    totalUsers: 125430,
    totalProducts: 8920,
    totalVendors: 456,
    revenueGrowth: 12.5,
    orderGrowth: 8.3,
    userGrowth: 15.7,
    productGrowth: 6.2,
    averageOrderValue: 62.3,
    conversionRate: 3.8,
    topSellingCategory: "Electronics",
    topPerformingVendor: "Tech Solutions Inc.",
  };

  const salesChartData: ChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [450000, 520000, 680000, 720000, 890000, 950000],
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 1)",
      },
      {
        label: "Orders",
        data: [3200, 3800, 4200, 4500, 5200, 5800],
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "rgba(16, 185, 129, 1)",
      },
    ],
  };

  const categoryChartData: ChartData = {
    labels: [
      "Electronics",
      "Fashion",
      "Home & Garden",
      "Sports",
      "Books",
      "Others",
    ],
    datasets: [
      {
        label: "Sales by Category",
        data: [35, 25, 15, 12, 8, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(107, 114, 128, 0.8)",
        ],
      },
    ],
  };

  const userGrowthChartData: ChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [12000, 15000, 18000, 22000, 25000, 28000],
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        borderColor: "rgba(139, 92, 246, 1)",
      },
    ],
  };

  const productPerformanceChartData: ChartData = {
    labels: ["Electronics", "Fashion", "Home", "Sports", "Books"],
    datasets: [
      {
        label: "Products Sold",
        data: [4500, 3200, 2800, 2100, 1800],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
      },
    ],
  };

  const getStatusBadge = (status: "completed" | "processing" | "failed") => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" size="sm">
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="warning" size="sm">
            Processing
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="error" size="sm">
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (
    type:
      | "sales"
      | "revenue"
      | "orders"
      | "users"
      | "products"
      | "vendors"
      | "custom"
  ) => {
    switch (type) {
      case "sales":
        return (
          <Badge variant="success" size="sm">
            Sales
          </Badge>
        );
      case "revenue":
        return (
          <Badge variant="info" size="sm">
            Revenue
          </Badge>
        );
      case "orders":
        return (
          <Badge variant="warning" size="sm">
            Orders
          </Badge>
        );
      case "users":
        return (
          <Badge variant="default" size="sm">
            Users
          </Badge>
        );
      case "products":
        return (
          <Badge variant="success" size="sm">
            Products
          </Badge>
        );
      case "vendors":
        return (
          <Badge variant="info" size="sm">
            Vendors
          </Badge>
        );
      case "custom":
        return (
          <Badge variant="warning" size="sm">
            Custom
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleGenerateReport = () => {
    console.log("Generating report:", selectedReportType);
    setShowGenerateModal(false);
  };

  const handleDownloadReport = (reportId: number) => {
    console.log("Downloading report:", reportId);
  };

  const handleRefreshData = () => {
    console.log("Refreshing analytics data");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefreshData}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Date Range:</label>
        <select
          value={dateRange}
          onChange={(e) =>
            setDateRange(
              e.target.value as "7d" | "30d" | "90d" | "1y" | "custom"
            )
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
          <option value="custom">Custom range</option>
        </select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(analytics.totalRevenue)}
              </p>
              <div className="flex items-center mt-1">
                {analytics.revenueGrowth > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    analytics.revenueGrowth > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {analytics.revenueGrowth > 0 ? "+" : ""}
                  {analytics.revenueGrowth}%
                </span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analytics.totalOrders)}
              </p>
              <div className="flex items-center mt-1">
                {analytics.orderGrowth > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    analytics.orderGrowth > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {analytics.orderGrowth > 0 ? "+" : ""}
                  {analytics.orderGrowth}%
                </span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analytics.totalUsers)}
              </p>
              <div className="flex items-center mt-1">
                {analytics.userGrowth > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    analytics.userGrowth > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {analytics.userGrowth > 0 ? "+" : ""}
                  {analytics.userGrowth}%
                </span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analytics.totalProducts)}
              </p>
              <div className="flex items-center mt-1">
                {analytics.productGrowth > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    analytics.productGrowth > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {analytics.productGrowth > 0 ? "+" : ""}
                  {analytics.productGrowth}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="p-2 bg-indigo-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              Average Order Value
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(analytics.averageOrderValue)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="p-2 bg-teal-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Activity className="h-6 w-6 text-teal-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.conversionRate}%
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="p-2 bg-pink-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-pink-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Top Category</p>
            <p className="text-lg font-bold text-gray-900">
              {analytics.topSellingCategory}
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "sales"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "users"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "products"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("vendors")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "vendors"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Vendors
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "custom"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Custom
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Revenue & Orders Trend
                </h3>
                <div className="h-64">
                  <Bar
                    data={salesChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Sales by Category
                </h3>
                <div className="h-64">
                  <Doughnut
                    data={categoryChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom" as const,
                        },
                        title: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Reports
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Range
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.slice(0, 5).map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {report.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(report.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getTypeBadge(report.type)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.dateRange}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(report.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {report.status === "completed" && (
                              <button
                                onClick={() => handleDownloadReport(report.id)}
                                className="text-blue-600 hover:text-blue-700"
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              className="text-gray-600 hover:text-gray-700"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Sales Tab */}
      {activeTab === "sales" && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Sales Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(analytics.totalRevenue)}
                  </div>
                  <div className="text-sm text-gray-500">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatNumber(analytics.totalOrders)}
                  </div>
                  <div className="text-sm text-gray-500">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(analytics.averageOrderValue)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Average Order Value
                  </div>
                </div>
              </div>
              <div className="h-64">
                <Line
                  data={salesChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                User Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatNumber(analytics.totalUsers)}
                  </div>
                  <div className="text-sm text-gray-500">Total Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {analytics.conversionRate}%
                  </div>
                  <div className="text-sm text-gray-500">Conversion Rate</div>
                </div>
              </div>
              <div className="h-64">
                <Line
                  data={userGrowthChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Product Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatNumber(analytics.totalProducts)}
                  </div>
                  <div className="text-sm text-gray-500">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {analytics.topSellingCategory}
                  </div>
                  <div className="text-sm text-gray-500">Top Category</div>
                </div>
              </div>
              <div className="h-64">
                <Bar
                  data={productPerformanceChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Vendors Tab */}
      {activeTab === "vendors" && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Vendor Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {analytics.totalVendors}
                  </div>
                  <div className="text-sm text-gray-500">Total Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {analytics.topPerformingVendor}
                  </div>
                  <div className="text-sm text-gray-500">Top Performer</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Custom Tab */}
      {activeTab === "custom" && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Custom Reports
              </h3>
              <p className="text-gray-600 mb-4">
                Create custom reports by selecting specific metrics, date
                ranges, and data filters.
              </p>
              <button
                onClick={() => setShowGenerateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Create Custom Report
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Generate Report Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Generate Report"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={selectedReportType}
              onChange={(e) =>
                setSelectedReportType(
                  e.target.value as
                    | "sales"
                    | "revenue"
                    | "orders"
                    | "users"
                    | "products"
                    | "vendors"
                    | "custom"
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="sales">Sales Report</option>
              <option value="revenue">Revenue Report</option>
              <option value="orders">Orders Report</option>
              <option value="users">Users Report</option>
              <option value="products">Products Report</option>
              <option value="vendors">Vendors Report</option>
              <option value="custom">Custom Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>

          {selectedReportType === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Metrics
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Revenue</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Orders</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Users</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Products</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowGenerateModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateReport}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Generate Report
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Reports;
