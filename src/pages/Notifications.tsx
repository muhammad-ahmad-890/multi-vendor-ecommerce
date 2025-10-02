import React, { useState } from "react";
import {
  Search,
  Filter,
  Bell,
  AlertCircle,
  CheckCircle,
  Info,
  Trash2,
  Eye,
  Send,
  Users,
  User,
  Store,
  Package,
  Plus,
  Edit,
} from "lucide-react";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  status: "draft" | "sent" | "scheduled";
  targetAudience: "all" | "customers" | "vendors" | "specific";
  recipients: string[];
  scheduledDate?: string;
  sentDate?: string;
  createdAt: string;
  priority: "low" | "medium" | "high";
  actionRequired?: boolean;
  actionUrl?: string;
  createdBy: string;
}

const Notifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Feature Announcement",
      message:
        "We're excited to announce our new live streaming feature! Vendors can now go live and showcase their products in real-time.",
      type: "info",
      status: "sent",
      targetAudience: "vendors",
      recipients: ["All Vendors"],
      sentDate: "2024-01-15 10:30:00",
      createdAt: "2024-01-15 09:00:00",
      priority: "medium",
      actionRequired: false,
      createdBy: "Admin User",
    },
    {
      id: 2,
      title: "Holiday Sale Promotion",
      message:
        "Get ready for our biggest sale of the year! Up to 70% off on selected items. Sale starts from January 20th.",
      type: "success",
      status: "scheduled",
      targetAudience: "customers",
      recipients: ["All Customers"],
      scheduledDate: "2024-01-20 09:00:00",
      createdAt: "2024-01-15 08:15:00",
      priority: "high",
      actionRequired: false,
      createdBy: "Admin User",
    },
    {
      id: 3,
      title: "System Maintenance Notice",
      message:
        "Scheduled maintenance will occur on January 22nd from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.",
      type: "warning",
      status: "sent",
      targetAudience: "all",
      recipients: ["All Users"],
      sentDate: "2024-01-15 07:45:00",
      createdAt: "2024-01-15 07:00:00",
      priority: "medium",
      actionRequired: false,
      createdBy: "System Admin",
    },
    {
      id: 4,
      title: "Payment Processing Update",
      message:
        "We've updated our payment processing system. Please ensure your payment methods are up to date.",
      type: "info",
      status: "sent",
      targetAudience: "vendors",
      recipients: ["All Vendors"],
      sentDate: "2024-01-15 06:30:00",
      createdAt: "2024-01-15 06:00:00",
      priority: "high",
      actionRequired: true,
      actionUrl: "/vendors/payment-settings",
      createdBy: "Admin User",
    },
    {
      id: 5,
      title: "Welcome New Customers",
      message:
        "Welcome to our platform! We're excited to have you here. Check out our featured products and start shopping.",
      type: "success",
      status: "sent",
      targetAudience: "customers",
      recipients: ["New Customers"],
      sentDate: "2024-01-15 05:15:00",
      createdAt: "2024-01-15 05:00:00",
      priority: "low",
      actionRequired: false,
      createdBy: "Admin User",
    },
    {
      id: 6,
      title: "Security Alert",
      message:
        "We've detected unusual activity on some accounts. Please update your passwords and enable two-factor authentication.",
      type: "error",
      status: "sent",
      targetAudience: "all",
      recipients: ["All Users"],
      sentDate: "2024-01-15 04:00:00",
      createdAt: "2024-01-15 03:30:00",
      priority: "high",
      actionRequired: true,
      actionUrl: "/security/settings",
      createdBy: "Security Team",
    },
    {
      id: 7,
      title: "Vendor Performance Review",
      message:
        "Monthly performance review is now available. Check your dashboard for detailed analytics and improvement suggestions.",
      type: "info",
      status: "draft",
      targetAudience: "vendors",
      recipients: ["All Vendors"],
      createdAt: "2024-01-15 02:00:00",
      priority: "medium",
      actionRequired: false,
      createdBy: "Admin User",
    },
    {
      id: 8,
      title: "Customer Feedback Request",
      message:
        "We value your feedback! Please take a moment to rate your recent purchases and share your experience.",
      type: "info",
      status: "scheduled",
      targetAudience: "customers",
      recipients: ["Recent Customers"],
      scheduledDate: "2024-01-18 10:00:00",
      createdAt: "2024-01-15 01:30:00",
      priority: "low",
      actionRequired: false,
      createdBy: "Admin User",
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || notification.status === statusFilter;
    const matchesAudience =
      audienceFilter === "all" ||
      notification.targetAudience === audienceFilter;
    return matchesSearch && matchesType && matchesStatus && matchesAudience;
  });

  const sentCount = notifications.filter((n) => n.status === "sent").length;
  const scheduledCount = notifications.filter(
    (n) => n.status === "scheduled"
  ).length;
  const draftCount = notifications.filter((n) => n.status === "draft").length;
  const highPriorityCount = notifications.filter(
    (n) => n.priority === "high"
  ).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="success" size="sm">
            Sent
          </Badge>
        );
      case "scheduled":
        return (
          <Badge variant="warning" size="sm">
            Scheduled
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="default" size="sm">
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case "all":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "customers":
        return <User className="h-4 w-4 text-green-500" />;
      case "vendors":
        return <Store className="h-4 w-4 text-purple-500" />;
      case "specific":
        return <Package className="h-4 w-4 text-orange-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleCreateNotification = () => {
    setShowCreateModal(true);
  };

  const handleEditNotification = (notification: Notification) => {
    console.log(`Editing notification ${notification.id}`);
  };

  const handleDeleteNotification = (notificationId: number) => {
    console.log(`Deleting notification ${notificationId}`);
  };

  const handleSendNotification = (notificationId: number) => {
    console.log(`Sending notification ${notificationId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            User Notifications
          </h1>
          <p className="mt-2 text-gray-600">
            Send notifications to users, customers, and vendors.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreateNotification}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Notification
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{sentCount}</div>
            <div className="text-sm text-gray-500">Sent</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {scheduledCount}
            </div>
            <div className="text-sm text-gray-500">Scheduled</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{draftCount}</div>
            <div className="text-sm text-gray-500">Drafts</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {highPriorityCount}
            </div>
            <div className="text-sm text-gray-500">High Priority</div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search notifications..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sent">Sent</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
            >
              <option value="all">All Audiences</option>
              <option value="all">All Users</option>
              <option value="customers">Customers</option>
              <option value="vendors">Vendors</option>
              <option value="specific">Specific</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <Card padding={false}>
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        {getStatusBadge(notification.status)}
                        <div className="flex items-center space-x-1">
                          {getAudienceIcon(notification.targetAudience)}
                          <span className="text-xs text-gray-500 capitalize">
                            {notification.targetAudience}
                          </span>
                        </div>
                        <Badge
                          variant={
                            notification.priority === "high"
                              ? "error"
                              : notification.priority === "medium"
                              ? "warning"
                              : "success"
                          }
                          size="sm"
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {formatDate(notification.createdAt)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => {
                              setSelectedNotification(notification);
                              setShowNotificationModal(true);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {notification.status === "draft" && (
                            <button
                              onClick={() =>
                                handleEditNotification(notification)
                              }
                              className="text-blue-400 hover:text-blue-600"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          )}
                          {notification.status === "draft" && (
                            <button
                              onClick={() =>
                                handleSendNotification(notification.id)
                              }
                              className="text-green-400 hover:text-green-600"
                              title="Send Now"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteNotification(notification.id)
                            }
                            className="text-red-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                      <span>Created by: {notification.createdBy}</span>
                      {notification.sentDate && (
                        <span>Sent: {formatDate(notification.sentDate)}</span>
                      )}
                      {notification.scheduledDate && (
                        <span>
                          Scheduled: {formatDate(notification.scheduledDate)}
                        </span>
                      )}
                      <span>
                        Recipients: {notification.recipients.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Notification Details Modal */}
      <Modal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        title="Notification Details"
        size="lg"
      >
        {selectedNotification && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getTypeIcon(selectedNotification.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedNotification.title}
                </h3>
                <div className="flex items-center space-x-3 mt-2">
                  {getStatusBadge(selectedNotification.status)}
                  <div className="flex items-center space-x-1">
                    {getAudienceIcon(selectedNotification.targetAudience)}
                    <span className="text-sm text-gray-600 capitalize">
                      {selectedNotification.targetAudience}
                    </span>
                  </div>
                  <Badge
                    variant={
                      selectedNotification.priority === "high"
                        ? "error"
                        : selectedNotification.priority === "medium"
                        ? "warning"
                        : "success"
                    }
                  >
                    {selectedNotification.priority} Priority
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{selectedNotification.message}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Notification Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Created:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {formatDate(selectedNotification.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Created By:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedNotification.createdBy}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Type:</span>
                    <span className="ml-2 text-sm text-gray-900 capitalize">
                      {selectedNotification.type}
                    </span>
                  </div>
                  {selectedNotification.sentDate && (
                    <div>
                      <span className="text-sm text-gray-500">Sent:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {formatDate(selectedNotification.sentDate)}
                      </span>
                    </div>
                  )}
                  {selectedNotification.scheduledDate && (
                    <div>
                      <span className="text-sm text-gray-500">Scheduled:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {formatDate(selectedNotification.scheduledDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recipients</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">
                      Target Audience:
                    </span>
                    <span className="ml-2 text-sm text-gray-900 capitalize">
                      {selectedNotification.targetAudience}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Recipients:</span>
                    <div className="mt-1">
                      {selectedNotification.recipients.map(
                        (recipient, index) => (
                          <Badge key={index} variant="info" size="sm">
                            {recipient}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {selectedNotification.status === "draft" && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                  Send Now
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Create Notification Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Notification"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter notification title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter notification message"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Users</option>
                <option value="customers">Customers</option>
                <option value="vendors">Vendors</option>
                <option value="specific">Specific Users</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Send Type *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="now">Send Now</option>
                <option value="scheduled">Schedule for Later</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scheduled Date (if scheduling)
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Create Notification
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notifications;
