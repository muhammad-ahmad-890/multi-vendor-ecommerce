import React, { useState } from "react";
import Badge from "../components/UI/Badge";
import {
  FollowersHeader,
  FollowersStats,
  FollowersFilters,
  FollowersTable,
  FollowerDetailsModal,
  BlockUserModal,
  type Follower,
} from "../components/Followers";

const Followers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "suspended" | "blocked"
  >("all");
  const [vendorTypeFilter, setVendorTypeFilter] = useState<
    "all" | "seller" | "buyer" | "both"
  >("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedFollower, setSelectedFollower] = useState<Follower | null>(
    null
  );
  const [blockReason, setBlockReason] = useState("");

  const [followers] = useState<Follower[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "New York, USA",
      joinDate: "2024-01-15",
      status: "active",
      followers: 1240,
      following: 890,
      lastActive: "2 hours ago",
      vendorType: "both",
      totalOrders: 45,
      totalSpent: 2840.5,
      engagementRate: 85.2,
      storesFollowed: 12,
      isBlocked: false,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "San Francisco, USA",
      joinDate: "2024-02-03",
      status: "active",
      followers: 856,
      following: 432,
      lastActive: "1 day ago",
      vendorType: "seller",
      totalOrders: 12,
      totalSpent: 0,
      engagementRate: 92.1,
      storesFollowed: 8,
      isBlocked: false,
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "London, UK",
      joinDate: "2024-01-28",
      status: "blocked",
      followers: 567,
      following: 234,
      lastActive: "1 week ago",
      vendorType: "buyer",
      totalOrders: 23,
      totalSpent: 1567.8,
      engagementRate: 45.3,
      storesFollowed: 15,
      isBlocked: true,
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "david.rodriguez@email.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Madrid, Spain",
      joinDate: "2024-03-10",
      status: "suspended",
      followers: 89,
      following: 156,
      lastActive: "3 days ago",
      vendorType: "seller",
      totalOrders: 8,
      totalSpent: 0,
      engagementRate: 12.5,
      storesFollowed: 3,
      isBlocked: false,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      location: "Toronto, Canada",
      joinDate: "2024-02-18",
      status: "active",
      followers: 2341,
      following: 1200,
      lastActive: "30 minutes ago",
      vendorType: "both",
      totalOrders: 67,
      totalSpent: 4230.75,
      engagementRate: 78.9,
      storesFollowed: 25,
      isBlocked: false,
    },
  ]);

  const filteredFollowers = followers.filter((follower) => {
    const matchesSearch =
      follower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || follower.status === statusFilter;
    const matchesVendorType =
      vendorTypeFilter === "all" || follower.vendorType === vendorTypeFilter;
    return matchesSearch && matchesStatus && matchesVendorType;
  });

  const getStatusBadge = (
    status: "active" | "inactive" | "suspended" | "blocked"
  ) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" size="sm">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="error" size="sm">
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="warning" size="sm">
            Suspended
          </Badge>
        );
      case "blocked":
        return (
          <Badge variant="error" size="sm">
            Blocked
          </Badge>
        );
      default:
        return null;
    }
  };

  const getVendorTypeBadge = (type: "seller" | "buyer" | "both") => {
    switch (type) {
      case "seller":
        return (
          <Badge variant="info" size="sm">
            Seller
          </Badge>
        );
      case "buyer":
        return (
          <Badge variant="default" size="sm">
            Buyer
          </Badge>
        );
      case "both":
        return (
          <Badge variant="success" size="sm">
            Both
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleViewFollower = (follower: Follower) => {
    setSelectedFollower(follower);
    setShowViewModal(true);
  };

  const handleSuspendUser = (followerId: number) => {
    console.log("Suspending user:", followerId);
    // Add suspend logic here
  };

  const handleActivateUser = (followerId: number) => {
    console.log("Activating user:", followerId);
    // Add activate logic here
  };

  const handleBlockUser = (follower: Follower) => {
    setSelectedFollower(follower);
    setShowBlockModal(true);
  };

  const handleUnblockUser = (followerId: number) => {
    console.log("Unblocking user:", followerId);
    // Add unblock logic here
  };

  const handleConfirmBlock = () => {
    if (selectedFollower) {
      console.log(
        "Blocking user:",
        selectedFollower.id,
        "Reason:",
        blockReason
      );
      setShowBlockModal(false);
      setBlockReason("");
      setSelectedFollower(null);
    }
  };

  const handleSendNotification = (followerId: number) => {
    console.log("Sending notification to:", followerId);
    // Add notification logic here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FollowersHeader totalFollowers={followers.length} />

      {/* Stats Cards */}
      <FollowersStats followers={followers} />

      {/* Filters */}
      <FollowersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        vendorTypeFilter={vendorTypeFilter}
        onVendorTypeFilterChange={setVendorTypeFilter}
      />

      {/* Followers Table */}
      <FollowersTable
        followers={filteredFollowers}
        onViewFollower={handleViewFollower}
        onSuspendUser={handleSuspendUser}
        onActivateUser={handleActivateUser}
        onBlockUser={handleBlockUser}
        onUnblockUser={handleUnblockUser}
        onSendNotification={handleSendNotification}
        getStatusBadge={getStatusBadge}
        getVendorTypeBadge={getVendorTypeBadge}
        formatCurrency={formatCurrency}
      />

      {/* View Follower Modal */}
      <FollowerDetailsModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        follower={selectedFollower}
        onSendNotification={handleSendNotification}
        onBlockUser={handleBlockUser}
        onUnblockUser={handleUnblockUser}
        getVendorTypeBadge={getVendorTypeBadge}
        getStatusBadge={getStatusBadge}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
      />

      {/* Block User Modal */}
      <BlockUserModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        follower={selectedFollower}
        blockReason={blockReason}
        onBlockReasonChange={setBlockReason}
        onConfirmBlock={handleConfirmBlock}
      />
    </div>
  );
};

export default Followers;
