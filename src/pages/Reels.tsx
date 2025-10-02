import React, { useState } from "react";
import {
  Search,
  Filter,
  Play,
  Eye,
  Heart,
  MessageCircle,
  Share,
  MoreVertical,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Edit,
  Trash2,
  Flag,
  Volume2,
  VolumeX,
} from "lucide-react";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";

interface Reel {
  id: number;
  title: string;
  description: string;
  vendorName: string;
  vendorId: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  status: "active" | "pending" | "rejected" | "featured" | "suspended";
  category: "product" | "tutorial" | "lifestyle" | "promotion" | "review";
  tags: string[];
  createdAt: string;
  publishedAt: string;
  engagementRate: number;
  revenue: number;
  isMuted: boolean;
  isFlagged: boolean;
  flagReason?: string;
}

interface ReelAnalytics {
  totalReels: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalRevenue: number;
  averageEngagement: number;
  topPerformingReel: Reel | null;
}

const Reels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "pending" | "rejected" | "featured" | "suspended"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "product" | "tutorial" | "lifestyle" | "promotion" | "review"
  >("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [activeTab, setActiveTab] = useState<
    "all" | "featured" | "trending" | "flagged"
  >("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [reels] = useState<Reel[]>([
    {
      id: 1,
      title: "New Product Launch - Wireless Earbuds",
      description:
        "Introducing our latest wireless earbuds with premium sound quality and 24-hour battery life.",
      vendorName: "Tech Solutions Inc.",
      vendorId: "VEND001",
      thumbnail:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=400&fit=crop",
      videoUrl: "https://example.com/video1.mp4",
      duration: 45,
      views: 125000,
      likes: 8900,
      comments: 450,
      shares: 1200,
      status: "featured",
      category: "product",
      tags: ["wireless", "earbuds", "audio", "tech"],
      createdAt: "2024-03-15",
      publishedAt: "2024-03-16",
      engagementRate: 8.5,
      revenue: 12500.0,
      isMuted: false,
      isFlagged: false,
    },
    {
      id: 2,
      title: "How to Style Your Home Office",
      description:
        "Transform your workspace with these simple styling tips and product recommendations.",
      vendorName: "Sarah Johnson",
      vendorId: "VEND002",
      thumbnail:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop",
      videoUrl: "https://example.com/video2.mp4",
      duration: 120,
      views: 89000,
      likes: 5600,
      comments: 320,
      shares: 890,
      status: "active",
      category: "tutorial",
      tags: ["home", "office", "styling", "interior"],
      createdAt: "2024-03-14",
      publishedAt: "2024-03-15",
      engagementRate: 7.2,
      revenue: 8900.0,
      isMuted: false,
      isFlagged: false,
    },
    {
      id: 3,
      title: "Summer Fashion Collection Preview",
      description:
        "Get ready for summer with our latest fashion collection featuring sustainable materials.",
      vendorName: "Global Trading Partners",
      vendorId: "VEND003",
      thumbnail:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop",
      videoUrl: "https://example.com/video3.mp4",
      duration: 90,
      views: 156000,
      likes: 12300,
      comments: 780,
      shares: 2100,
      status: "active",
      category: "lifestyle",
      tags: ["fashion", "summer", "sustainable", "collection"],
      createdAt: "2024-03-13",
      publishedAt: "2024-03-14",
      engagementRate: 9.1,
      revenue: 18900.0,
      isMuted: false,
      isFlagged: false,
    },
    {
      id: 4,
      title: "Flash Sale - 50% Off Electronics",
      description:
        "Limited time offer! Get 50% off on all electronics. Hurry, sale ends soon!",
      vendorName: "Digital Marketing Pro",
      vendorId: "VEND004",
      thumbnail:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop",
      videoUrl: "https://example.com/video4.mp4",
      duration: 30,
      views: 89000,
      likes: 3400,
      comments: 120,
      shares: 560,
      status: "pending",
      category: "promotion",
      tags: ["sale", "electronics", "discount", "flash"],
      createdAt: "2024-03-12",
      publishedAt: "2024-03-13",
      engagementRate: 4.8,
      revenue: 6700.0,
      isMuted: true,
      isFlagged: true,
      flagReason: "Promotional content requires review",
    },
    {
      id: 5,
      title: "Product Review - Smart Watch",
      description:
        "Honest review of the latest smartwatch features, pros, and cons.",
      vendorName: "Mike Chen",
      vendorId: "VEND005",
      thumbnail:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop",
      videoUrl: "https://example.com/video5.mp4",
      duration: 180,
      views: 67000,
      likes: 4200,
      comments: 290,
      shares: 340,
      status: "active",
      category: "review",
      tags: ["review", "smartwatch", "tech", "honest"],
      createdAt: "2024-03-11",
      publishedAt: "2024-03-12",
      engagementRate: 6.8,
      revenue: 5400.0,
      isMuted: false,
      isFlagged: false,
    },
    {
      id: 6,
      title: "DIY Home Decor Ideas",
      description:
        "Creative and budget-friendly home decor ideas you can make yourself.",
      vendorName: "Artisan Crafts Co.",
      vendorId: "VEND006",
      thumbnail:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop",
      videoUrl: "https://example.com/video6.mp4",
      duration: 150,
      views: 112000,
      likes: 8900,
      comments: 670,
      shares: 1200,
      status: "featured",
      category: "tutorial",
      tags: ["diy", "home", "decor", "crafts"],
      createdAt: "2024-03-10",
      publishedAt: "2024-03-11",
      engagementRate: 8.9,
      revenue: 13400.0,
      isMuted: false,
      isFlagged: false,
    },
  ]);

  const filteredReels = reels.filter((reel) => {
    const matchesSearch =
      reel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reel.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reel.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || reel.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || reel.category === categoryFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && reel.status === "featured") ||
      (activeTab === "trending" && reel.engagementRate > 8) ||
      (activeTab === "flagged" && reel.isFlagged);
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  const analytics: ReelAnalytics = {
    totalReels: reels.length,
    totalViews: reels.reduce((sum, reel) => sum + reel.views, 0),
    totalLikes: reels.reduce((sum, reel) => sum + reel.likes, 0),
    totalComments: reels.reduce((sum, reel) => sum + reel.comments, 0),
    totalShares: reels.reduce((sum, reel) => sum + reel.shares, 0),
    totalRevenue: reels.reduce((sum, reel) => sum + reel.revenue, 0),
    averageEngagement:
      reels.reduce((sum, reel) => sum + reel.engagementRate, 0) / reels.length,
    topPerformingReel: reels.reduce(
      (top, reel) =>
        reel.engagementRate > (top?.engagementRate || 0) ? reel : top,
      null as Reel | null
    ),
  };

  const getStatusBadge = (
    status: "active" | "pending" | "rejected" | "featured" | "suspended"
  ) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" size="sm">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="warning" size="sm">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="error" size="sm">
            Rejected
          </Badge>
        );
      case "featured":
        return (
          <Badge variant="info" size="sm">
            Featured
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="default" size="sm">
            Suspended
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (
    category: "product" | "tutorial" | "lifestyle" | "promotion" | "review"
  ) => {
    switch (category) {
      case "product":
        return (
          <Badge variant="success" size="sm">
            Product
          </Badge>
        );
      case "tutorial":
        return (
          <Badge variant="info" size="sm">
            Tutorial
          </Badge>
        );
      case "lifestyle":
        return (
          <Badge variant="default" size="sm">
            Lifestyle
          </Badge>
        );
      case "promotion":
        return (
          <Badge variant="warning" size="sm">
            Promotion
          </Badge>
        );
      case "review":
        return (
          <Badge variant="info" size="sm">
            Review
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
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

  const handleViewReel = (reel: Reel) => {
    setSelectedReel(reel);
    setShowViewModal(true);
  };

  const handleEditReel = (reel: Reel) => {
    setSelectedReel(reel);
    setShowEditModal(true);
  };

  const handleFlagReel = (reel: Reel) => {
    setSelectedReel(reel);
    setShowFlagModal(true);
  };

  const handleToggleMute = (reelId: number) => {
    console.log("Toggle mute for reel:", reelId);
  };

  const handleApproveReel = (reelId: number) => {
    console.log("Approve reel:", reelId);
  };

  const handleRejectReel = (reelId: number) => {
    console.log("Reject reel:", reelId);
  };

  const handleFeatureReel = (reelId: number) => {
    console.log("Feature reel:", reelId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reels Management</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            {viewMode === "grid" ? "List View" : "Grid View"}
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Play className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reels</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.totalReels}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analytics.totalViews)}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analytics.totalLikes)}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Avg Engagement
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.averageEngagement.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="p-2 bg-yellow-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Total Comments</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics.totalComments)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="p-2 bg-indigo-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Share className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Total Shares</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics.totalShares)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="p-2 bg-green-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(analytics.totalRevenue)}
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Reels
          </button>
          <button
            onClick={() => setActiveTab("featured")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "featured"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "trending"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab("flagged")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "flagged"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Flagged
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reels..."
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
                e.target.value as
                  | "all"
                  | "active"
                  | "pending"
                  | "rejected"
                  | "featured"
                  | "suspended"
              )
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="featured">Featured</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value as
                  | "all"
                  | "product"
                  | "tutorial"
                  | "lifestyle"
                  | "promotion"
                  | "review"
              )
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="product">Product</option>
            <option value="tutorial">Tutorial</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="promotion">Promotion</option>
            <option value="review">Review</option>
          </select>
        </div>
      </div>

      {/* Reels Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReels.map((reel) => (
            <Card key={reel.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(reel.duration)}
                </div>
                <div className="absolute top-2 right-2">
                  {reel.isMuted ? (
                    <VolumeX className="h-4 w-4 text-white bg-black bg-opacity-75 rounded p-1" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-white bg-black bg-opacity-75 rounded p-1" />
                  )}
                </div>
                {reel.isFlagged && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <Flag className="h-4 w-4 text-red-500 bg-white rounded p-1" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-white text-xs">
                    <span>{formatNumber(reel.views)} views</span>
                    <span>•</span>
                    <span>{formatNumber(reel.likes)} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusBadge(reel.status)}
                    {getCategoryBadge(reel.category)}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                  {reel.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {reel.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{reel.vendorName}</div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleViewReel(reel)}
                      className="text-blue-600 hover:text-blue-700"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditReel(reel)}
                      className="text-gray-600 hover:text-gray-700"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleFlagReel(reel)}
                      className="text-red-600 hover:text-red-700"
                      title="Flag"
                    >
                      <Flag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
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
                {filteredReels.map((reel) => (
                  <tr key={reel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {reel.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDuration(reel.duration)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {reel.vendorName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reel.vendorId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(reel.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatNumber(reel.views)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatNumber(reel.likes)} likes
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {reel.engagementRate}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(reel.revenue)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(reel.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewReel(reel)}
                          className="text-blue-600 hover:text-blue-700"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditReel(reel)}
                          className="text-gray-600 hover:text-gray-700"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleFlagReel(reel)}
                          className="text-red-600 hover:text-red-700"
                          title="Flag"
                        >
                          <Flag className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleMute(reel.id)}
                          className="text-purple-600 hover:text-purple-700"
                          title={reel.isMuted ? "Unmute" : "Mute"}
                        >
                          {reel.isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* View Reel Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Reel Details"
        size="xl"
      >
        {selectedReel && (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={selectedReel.thumbnail}
                alt={selectedReel.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded">
                {formatDuration(selectedReel.duration)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <p className="text-sm text-gray-900">{selectedReel.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor
                </label>
                <p className="text-sm text-gray-900">
                  {selectedReel.vendorName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="mt-1">
                  {getCategoryBadge(selectedReel.category)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="mt-1">
                  {getStatusBadge(selectedReel.status)}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <p className="text-sm text-gray-900">
                {selectedReel.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(selectedReel.views)}
                </div>
                <div className="text-sm text-gray-500">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(selectedReel.likes)}
                </div>
                <div className="text-sm text-gray-500">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(selectedReel.comments)}
                </div>
                <div className="text-sm text-gray-500">Comments</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEditReel(selectedReel)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit Reel
              </button>
              <button
                onClick={() => handleFlagReel(selectedReel)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Flag Reel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Flag Reel Modal */}
      <Modal
        isOpen={showFlagModal}
        onClose={() => setShowFlagModal(false)}
        title="Flag Reel"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-800">
                Are you sure you want to flag this reel for review?
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Flagging
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select a reason</option>
              <option value="inappropriate">Inappropriate Content</option>
              <option value="spam">Spam</option>
              <option value="copyright">Copyright Violation</option>
              <option value="misleading">Misleading Information</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide additional details..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowFlagModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowFlagModal(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Flag Reel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Reels;
