import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  Settings,
  TrendingUp,
  DollarSign,
  MapPin,
  Calendar,
  Percent,
  Package,
  Building,
} from "lucide-react";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";

interface GSTCategory {
  id: number;
  name: string;
  description: string;
  rate: number;
  status: "active" | "inactive";
  effectiveDate: string;
  productsCount: number;
}

interface GSTReport {
  id: number;
  period: string;
  totalGST: number;
  totalSales: number;
  transactions: number;
  status: "completed" | "pending" | "processing";
  generatedDate: string;
}

const Tax: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<GSTCategory | null>(
    null
  );
  const [deletingCategory, setDeletingCategory] = useState<GSTCategory | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "categories" | "reports" | "settings"
  >("categories");

  const [gstCategories] = useState<GSTCategory[]>([
    {
      id: 1,
      name: "Essential Goods",
      description: "Food items, medicines, books, newspapers",
      rate: 0,
      status: "active",
      effectiveDate: "2024-01-01",
      productsCount: 1250,
    },
    {
      id: 2,
      name: "Standard Rate",
      description: "Most goods and services",
      rate: 18,
      status: "active",
      effectiveDate: "2024-01-01",
      productsCount: 3450,
    },
    {
      id: 3,
      name: "Reduced Rate",
      description: "Restaurant services, hotels, transport",
      rate: 12,
      status: "active",
      effectiveDate: "2024-01-01",
      productsCount: 890,
    },
    {
      id: 4,
      name: "Luxury Items",
      description: "Cars, jewelry, luxury goods",
      rate: 28,
      status: "active",
      effectiveDate: "2024-01-01",
      productsCount: 567,
    },
    {
      id: 5,
      name: "Exempt Items",
      description: "Agricultural products, healthcare services",
      rate: 0,
      status: "active",
      effectiveDate: "2024-01-01",
      productsCount: 2340,
    },
  ]);

  const [gstReports] = useState<GSTReport[]>([
    {
      id: 1,
      period: "Q1 2024",
      totalGST: 456789.0,
      totalSales: 2537722.0,
      transactions: 12340,
      status: "completed",
      generatedDate: "2024-04-01",
    },
    {
      id: 2,
      period: "Q4 2023",
      totalGST: 389456.7,
      totalSales: 2163648.0,
      transactions: 9870,
      status: "completed",
      generatedDate: "2024-01-01",
    },
    {
      id: 3,
      period: "Q3 2023",
      totalGST: 423451.2,
      totalSales: 2352507.0,
      transactions: 11560,
      status: "completed",
      generatedDate: "2023-10-01",
    },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    rate: 0,
    status: "active" as "active" | "inactive",
    effectiveDate: "",
  });

  const filteredCategories = gstCategories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getRateBadge = (rate: number) => {
    if (rate === 0) {
      return (
        <Badge variant="success" size="sm">
          Exempt (0%)
        </Badge>
      );
    } else if (rate === 5) {
      return (
        <Badge variant="info" size="sm">
          {rate}% GST
        </Badge>
      );
    } else if (rate === 12) {
      return (
        <Badge variant="warning" size="sm">
          {rate}% GST
        </Badge>
      );
    } else if (rate === 18) {
      return (
        <Badge variant="default" size="sm">
          {rate}% GST
        </Badge>
      );
    } else if (rate === 28) {
      return (
        <Badge variant="error" size="sm">
          {rate}% GST
        </Badge>
      );
    } else {
      return (
        <Badge variant="default" size="sm">
          {rate}% GST
        </Badge>
      );
    }
  };

  const getStatusBadge = (status: "active" | "inactive") => {
    return status === "active" ? (
      <Badge variant="success" size="sm">
        Active
      </Badge>
    ) : (
      <Badge variant="error" size="sm">
        Inactive
      </Badge>
    );
  };

  const getReportStatusBadge = (
    status: "completed" | "pending" | "processing"
  ) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" size="sm">
            Completed
          </Badge>
        );
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
      default:
        return null;
    }
  };

  const handleAddCategory = () => {
    console.log("Adding GST category:", newCategory);
    setShowAddModal(false);
    setNewCategory({
      name: "",
      description: "",
      rate: 0,
      status: "active",
      effectiveDate: "",
    });
  };

  const handleEditCategory = () => {
    console.log("Editing GST category:", editingCategory);
    setShowEditModal(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = () => {
    console.log("Deleting GST category:", deletingCategory);
    setShowDeleteModal(false);
    setDeletingCategory(null);
  };

  const openEditModal = (category: GSTCategory) => {
    setEditingCategory(category);
    setShowEditModal(true);
  };

  const openDeleteModal = (category: GSTCategory) => {
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">GST Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add GST Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total GST Collected
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  gstReports.reduce((sum, report) => sum + report.totalGST, 0)
                )}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Active Categories
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {gstCategories.filter((cat) => cat.status === "active").length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {gstCategories
                  .reduce((sum, cat) => sum + cat.productsCount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Reports Generated
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {gstReports.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            GST Categories
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "reports"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            GST Reports
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "settings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* GST Categories Tab */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as "all" | "active" | "inactive"
                  )
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* GST Categories Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GST Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Effective Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRateBadge(category.rate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Package className="h-4 w-4 text-gray-400 mr-1" />
                          {category.productsCount.toLocaleString()} products
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(category.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(category.effectiveDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(category)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(category)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* GST Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total GST
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transactions
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
                  {gstReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {report.period}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(report.generatedDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(report.totalGST)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(report.totalSales)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {report.transactions.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getReportStatusBadge(report.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-700"
                          title="Download Report"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                GST Configuration
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Automatic GST Calculation
                    </p>
                    <p className="text-sm text-gray-500">
                      Enable automatic GST calculation based on product category
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      GST Inclusive Pricing
                    </p>
                    <p className="text-sm text-gray-500">
                      Display prices with GST included
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      GST Exemption for B2B
                    </p>
                    <p className="text-sm text-gray-500">
                      Allow GST exemption for business customers
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Reverse Charge Mechanism
                    </p>
                    <p className="text-sm text-gray-500">
                      Enable reverse charge for applicable services
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add GST Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add GST Category"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              placeholder="e.g., Essential Goods"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              placeholder="Describe what products fall under this category"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Rate (%)
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newCategory.rate}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    rate: parseInt(e.target.value) || 0,
                  })
                }
              >
                <option value={0}>Exempt (0%)</option>
                <option value={5}>5% GST</option>
                <option value={12}>12% GST</option>
                <option value={18}>18% GST</option>
                <option value={28}>28% GST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newCategory.status}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    status: e.target.value as "active" | "inactive",
                  })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Effective Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newCategory.effectiveDate}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  effectiveDate: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>
      </Modal>

      {/* Edit GST Category Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit GST Category"
        size="lg"
      >
        {editingCategory && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                value={editingCategory.description}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Rate (%)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editingCategory.rate}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      rate: parseInt(e.target.value) || 0,
                    })
                  }
                >
                  <option value={0}>Exempt (0%)</option>
                  <option value={5}>5% GST</option>
                  <option value={12}>12% GST</option>
                  <option value={18}>18% GST</option>
                  <option value={28}>28% GST</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editingCategory.status}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingCategory.effectiveDate}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    effectiveDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleEditCategory}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Delete GST Category Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete GST Category"
      >
        {deletingCategory && (
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete the GST category{" "}
              <strong>{deletingCategory.name}</strong>?
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">
                This action cannot be undone. The category and its GST rate will
                be permanently removed from the system.
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCategory}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete Category
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Tax;
